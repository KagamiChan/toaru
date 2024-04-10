"use client";

import { useForm } from "react-hook-form";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DownloadIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

enum Color {
  Kagaku = "kagaku",
  Majutsu = "majutsu",
  Custom = "custom",
}

enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

enum Format {
  PNG = "png",
  SVG = "svg",
}

const colorLabel = {
  [Color.Kagaku]: "Kagaku",
  [Color.Majutsu]: "Majutsu",
  [Color.Custom]: "Custom",
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

const sizeLabel = {
  width: "Width",
  height: "Height",
};

const formatLabel = {
  [Format.PNG]: "PNG",
  [Format.SVG]: "SVG",
};

const FormSchema = z.object({
  color: z.nativeEnum(Color),
  direction: z.nativeEnum(Direction),
  format: z.nativeEnum(Format),
  toaru: z.string(),
  kagaku: z.string(),
  no: z.string(),
  railgun: z.string(),
  nato: z.string(),
  width: z.number(),
  height: z.number(),
  startColor: z.string(),
  endColor: z.string(),
});

export const Generator = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      color: Color.Kagaku,
      direction: Direction.Horizontal,
      format: Format.PNG,
      width: 640,
      height: 300,
      startColor: "#00428D",
      endColor: "#EB7334",
      ...stringDefaults,
    },
  });

  const [parent] = useAutoAnimate()

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-4" ref={parent}>
        <FormItem>
          <FormLabel>Text</FormLabel>
          {["toaru", "kagaku", "no", "railgun", "nato"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as "toaru" | "kagaku" | "no" | "railgun" | "nato"}
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input {...field} list={name} />
                  </FormControl>
                  <datalist id={name}>
                    <option
                      value={
                        stringDefaults[
                          name as "toaru" | "kagaku" | "no" | "railgun" | "nato"
                        ]
                      }
                    />
                  </datalist>
                </>
              )}
            />
          ))}
        </FormItem>
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-2"
                >
                  {Object.values(Color).map((color) => (
                    <FormItem
                      key={color}
                      className="flex items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={color}></RadioGroupItem>
                      </FormControl>
                      <FormLabel>{colorLabel[color]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {
          form.watch("color") === Color.Custom &&
          <FormItem>
            <FormLabel>Custom gradient</FormLabel>
            <div className="flex space-x-4 space-y-0">
              {["startColor", "endColor"].map((name) => (
                <FormItem key={name} className="w-16">
                  <FormField
                    control={form.control}
                    name={name as "startColor" | "endColor"}
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
        }
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direction</FormLabel>
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
                      <FormLabel>{directionLabel[direction]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem className="flex space-x-4 space-y-0">
          {["width", "height"].map((name) => (
            <FormItem key={name}>
              <FormLabel>{sizeLabel[name as "width" | "height"]}</FormLabel>
              <FormField
                control={form.control}
                name={name as "width" | "height"}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                )}
              />
            </FormItem>
          ))}
        </FormItem>
        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format</FormLabel>
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
        <Button>
          Download <DownloadIcon />
        </Button>
        <Button variant="secondary">
          Open in new tab <OpenInNewWindowIcon />
        </Button>
      </form>
    </Form>
  );
};
