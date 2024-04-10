"use client";

import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import { useMemo } from "react";

import { Direction, Preset, type FormSchema } from "./form-schema";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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

  const [startColor, stopColor] = useMemo(() => {
    if (preset === Preset.Kagaku) {
      return ["#EB7334", "#E9131D"];
    }
    if (preset === Preset.Majutsu) {
      return ["#49B8E3", "#00428D"];
    }
    return [watch("startColor"), watch("stopColor")];
  }, [preset, watch]);

  const isHorizontal = direction === Direction.Horizontal;

  const [ref] = useAutoAnimate();

  return (
    <div ref={ref}>
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
            <stop id="startLG" stop-color={startColor} offset="0%" />
            <stop id="stopLG" stop-color={stopColor} offset="100%" />
          </linearGradient>
        </defs>
        <g id="toaru_g">
          <rect
            x={isHorizontal ? 70 : 15}
            y={isHorizontal ? 150 : 142}
            width={isHorizontal ? 140 : 152}
            height={isHorizontal ? 140 : 150}
            fill="url(#fill_gradient)"
          />
          <text fill="url(#fill_gradient)">
            <tspan
              x={0}
              y={120}
              style={{ font: "bold 140px 'ＭＳ 明朝','MMO'" }}
              id="txt_to"
            >
              {to}
            </tspan>
            <tspan
              x={110}
              y={120}
              style={{ font: "bold 80px 'ＭＳ 明朝','MMO'" }}
              id="txt_a"
            >
              {a}
            </tspan>
            <tspan
              x={160}
              y={90}
              style={{ font: "bold 70px 'ＭＳ 明朝','MMO'" }}
              id="txt_ru"
            >
              {ru}
            </tspan>
            <tspan
              x={210}
              y={120}
              style={{ font: "bold 130px 'ＭＳ 明朝','MMO'" }}
              id="txt_ka"
            >
              {ka}
            </tspan>
            <tspan
              x={340}
              y={110}
              style={{ font: "bold 100px 'ＭＳ 明朝','MMO'" }}
              id="txt_gaku"
            >
              {gaku}
            </tspan>
            <tspan
              x={430}
              y={120}
              style={{ font: "bold 120px 'ＭＳ 明朝','MMO'" }}
              id="txt_no"
            >
              {no}
            </tspan>
            <tspan
              x={70}
              y={270}
              style={{ font: "bold 140px 'ＭＳ 明朝','MMO'" }}
              id="txt_rg0"
              fill="#fff"
            >
              {rg0}
            </tspan>
            <tspan
              x={205}
              y={250}
              style={{ font: "bold 100px 'ＭＳ 明朝','MMO'" }}
              id="txt_rg1"
            >
              {rg1}
            </tspan>
            <tspan
              x={290}
              y={250}
              style={{ font: "bold 130px 'ＭＳ 明朝','MMO'" }}
              id="txt_rg2"
            >
              {rg2}
            </tspan>
            <tspan
              x={400}
              y={280}
              style={{ font: "bold 160px 'ＭＳ 明朝','MMO'" }}
              id="txt_rg3"
            >
              {rg3}
            </tspan>
            <tspan
              x={220}
              y={290}
              style={{ font: "bold 30px 'MS Gothic','MGO'" }}
              id="txt_nato"
            >
              {nato}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};
