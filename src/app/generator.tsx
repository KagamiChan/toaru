"use client";

import { useForm } from "react-hook-form";
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

enum Color {
  Kagaku = "kagaku",
  Mahou = "mahou",
  Custom = "custom",
}

enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

const colorLabel = {
  [Color.Kagaku]: "Kagaku",
  [Color.Mahou]: "Mahou",
  [Color.Custom]: "Custom",
};

const directionLabel = {
  [Direction.Horizontal]: "Horizontal",
  [Direction.Vertical]: "Vertical",
};

const FormSchema = z.object({
  color: z.nativeEnum(Color),
  direction: z.nativeEnum(Direction),
  toaru: z.string(),
  kagaku: z.string(),
  no: z.string(),
  railgun: z.string(),
  nato: z.string(),
});

export const Generator = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      color: Color.Kagaku,
      direction: Direction.Horizontal,
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-4">
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
                      className="flex items-center space-x-3 space-y-0"
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
                      className="flex items-center space-x-3 space-y-0"
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
      </form>
    </Form>
  );
};
