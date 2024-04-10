"use client";
import { z } from "zod";

export enum Preset {
  Kagaku = "kagaku",
  Majutsu = "majutsu",
  Custom = "custom",
}

export enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export enum Format {
  PNG = "png",
  SVG = "svg",
}

export const FormSchema = z.object({
  preset: z.nativeEnum(Preset),
  direction: z.nativeEnum(Direction),
  format: z.nativeEnum(Format),
  toaru: z.string(),
  kagaku: z.string(),
  no: z.string(),
  railgun: z.string(),
  nato: z.string(),
  scale: z.number(),
  startColor: z.string(),
  stopColor: z.string(),
});
