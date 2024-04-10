"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";

import { Direction, Preset, type FormSchema } from "./form-schema";
import { horizontalLayout, verticalLayout } from "./glyph-layout";

export const Preview = () => {
  const { watch } = useFormContext<z.infer<typeof FormSchema>>();

  const [to, a, ru] = watch("toaru");
  const [ka, gaku] = watch("kagaku");
  const no = watch("no");
  const [rg0, rg1, rg2, rg3] = watch("railgun");
  const nato = watch("nato");

  const preset = watch("preset");
  const direction = watch("direction");
  const scale = watch("scale");
  const customStartColor = watch("startColor");
  const customStopColor = watch("stopColor");

  const [startColor, stopColor] = useMemo(() => {
    if (preset === Preset.Kagaku) {
      return ["#EB7334", "#E9131D"];
    }
    if (preset === Preset.Majutsu) {
      return ["#49B8E3", "#00428D"];
    }
    return [customStartColor, customStopColor];
  }, [customStartColor, customStopColor, preset]);

  const isHorizontal = direction === Direction.Horizontal;

  const layout = isHorizontal ? horizontalLayout : verticalLayout;

  return (
    <div>
      <svg
        width={scale * (isHorizontal ? 640 : 300)}
        height={scale * (isHorizontal ? 300 : 640)}
        viewBox={isHorizontal ? "0 0 640 300" : "0 0 300 640"}
        id="toaru_svg"
      >
        <style id="svg_style"></style>
        <defs>
          <linearGradient
            id="fill_gradient"
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop id="startLG" stopColor={startColor} offset="0%" />
            <stop id="stopLG" stopColor={stopColor} offset="100%" />
          </linearGradient>
        </defs>
        <g id="toaru_g">
          <rect
            x={isHorizontal ? 70 : 15}
            y={isHorizontal ? 150 : 142}
            width={isHorizontal ? 140 : 150}
            height={isHorizontal ? 140 : 150}
            fill="url(#fill_gradient)"
          />
          <text
            fill="url(#fill_gradient)"
            style={{ fontFamily: "ＭＳ 明朝", fontWeight: "bold" }}
          >
            <tspan {...layout.text_to} id="text_to">
              {to}
            </tspan>
            <tspan {...layout.text_a} id="text_a">
              {a}
            </tspan>
            <tspan {...layout.text_ru} id="text_ru">
              {ru}
            </tspan>
            <tspan {...layout.text_ka} id="text_ka">
              {ka}
            </tspan>
            <tspan {...layout.text_gaku} id="text_gaku">
              {gaku}
            </tspan>
            <tspan {...layout.text_no} id="text_no">
              {no}
            </tspan>
            <tspan {...layout.text_rg0} id="text_rg0" fill="#fff">
              {rg0}
            </tspan>
            <tspan {...layout.text_rg1} id="text_rg1">
              {rg1}
            </tspan>
            <tspan {...layout.text_rg2} id="text_rg2">
              {rg2}
            </tspan>
            <tspan {...layout.text_rg3} id="text_rg3">
              {rg3}
            </tspan>
          </text>
          <text
            id="text_nato"
            fill="url(#fill_gradient)"
            style={
              isHorizontal
                ? { fontFamily: "ＭＳ ゴシック" }
                : { fontFamily: "ＭＳ ゴシック", transform: "rotate(90deg)", transformOrigin: "15px 310px" }
            }
          >
            <tspan
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              {...layout.text_nato}
            >
              {nato}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};
