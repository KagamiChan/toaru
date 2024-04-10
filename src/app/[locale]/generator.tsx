"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useRef } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Slider } from "~/components/ui/slider";
import { Direction, FormSchema, Format, Preset } from "./form-schema";
import { Preview, type PreviewHandle } from "./preview";
import { Trans, useTranslation } from "react-i18next";

const colorLabel = {
  [Preset.Kagaku]: "Kagaku",
  [Preset.Majutsu]: "Majutsu",
  [Preset.Custom]: "Custom",
};

const directionLabel = {
  [Direction.Horizontal]: "Horizontal",
  [Direction.Vertical]: "Vertical",
};

const stringDefaults = {
  toaru: "とある",
  kagaku: "科学",
  no: "の",
  railgun: "超電磁砲",
  nato: "レールガン",
};

const formatLabel = {
  [Format.PNG]: "PNG",
  [Format.SVG]: "SVG",
};

export const Generator = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preset: Preset.Kagaku,
      direction: Direction.Horizontal,
      format: Format.PNG,
      scale: 1,
      startColor: "#00428D",
      stopColor: "#EB7334",
      ...stringDefaults,
    },
  });

  const [parent] = useAutoAnimate();
  const preview = useRef<PreviewHandle>(null);

  const { t } = useTranslation();

  return (
    <Form {...form}>
      <Preview ref={preview} />
      <Card className="sticky bottom-0">
        <CardHeader>
          <CardTitle>{t("Parameters")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(ev) => ev.preventDefault()}
            className="flex flex-col space-y-4"
            ref={parent}
          >
            <FormItem>
              <FormLabel>{t('Text')}</FormLabel>
              <div className="flex space-x-4">
                {["toaru", "kagaku", "no", "railgun", "nato"].map((name) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={
                      name as "toaru" | "kagaku" | "no" | "railgun" | "nato"
                    }
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input {...field} list={name} />
                        </FormControl>
                        <datalist id={name}>
                          <option
                            value={
                              stringDefaults[
                                name as
                                  | "toaru"
                                  | "kagaku"
                                  | "no"
                                  | "railgun"
                                  | "nato"
                              ]
                            }
                          />
                        </datalist>
                      </>
                    )}
                  />
                ))}
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="preset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Preset")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      {Object.values(Preset).map((preset) => (
                        <FormItem
                          key={preset}
                          className="flex items-center space-x-1 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={preset}></RadioGroupItem>
                          </FormControl>
                          <FormLabel>{t(colorLabel[preset])}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("preset") === Preset.Custom && (
              <FormItem>
                <FormLabel>{t('Custom gradient')}</FormLabel>
                <div className="flex space-x-4 space-y-0">
                  {["startColor", "stopColor"].map((name) => (
                    <FormItem key={name} className="w-16">
                      <FormField
                        control={form.control}
                        name={name as "startColor" | "stopColor"}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} type="color" />
                          </FormControl>
                        )}
                      />
                    </FormItem>
                  ))}
                </div>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Direction")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      {Object.values(Direction).map((direction) => (
                        <FormItem
                          key={direction}
                          className="flex items-center space-x-1 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={direction}></RadioGroupItem>
                          </FormControl>
                          <FormLabel>{t(directionLabel[direction])}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>{t("Scale")}</FormLabel>

              <div className="flex space-x-4">
                <Badge variant="secondary">{form.watch("scale")}</Badge>
                <FormField
                  control={form.control}
                  name={"scale"}
                  render={({ field }) => (
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        onValueChange={([v]) => field.onChange(v)}
                        min={0.1}
                        max={4}
                        step={0.1}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Format")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      {Object.values(Format).map((format) => (
                        <FormItem
                          key={format}
                          className="flex items-center space-x-1 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={format}></RadioGroupItem>
                          </FormControl>
                          <FormLabel>{formatLabel[format]}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              onClick={(ev) => {
                ev.preventDefault();
                void preview.current?.renderToFile({
                  format: form.watch("format"),
                  inMemory: false,
                });
              }}
            >
              {t("Download")} <DownloadIcon />
            </Button>
            <Button
              variant="secondary"
              onClick={(ev) => {
                ev.preventDefault();
                void preview.current?.renderToFile({
                  format: form.watch("format"),
                  inMemory: true,
                });
              }}
            >
              {t("Open in new tab")} <OpenInNewWindowIcon />
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <p>
          <Trans
            i18nKey="optimizationWarning"
          >
            Generated images are not optimized. For best results, consider using
            3rd party optimization tools, e.g.{" "}
            {form.watch("format") === Format.PNG ? (
              <a href="https://tinypng.com/" target="_blank">
                {// @ts-expect-error special interpolation
                { provider: "TinyPNG" }}
              </a>
            ) : (
              <a href="https://jakearchibald.github.io/svgomg/" target="_blank">
                {// @ts-expect-error special interpolation
                { provider: "SVGOMG" }}
              </a>
            )}
            .
          </Trans>
        </p>
      </div>
    </Form>
  );
};
