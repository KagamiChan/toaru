"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";

import { Direction, Preset, type FormSchema } from "./form-schema";
import { horizontalLayout, verticalLayout } from "./glyph-layout";
import { Skeleton } from "~/components/ui/skeleton";

export const Preview = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReady = async () => {
      await Promise.all([
        document.fonts.load('1em "Noto Serif Local"'),
        document.fonts.load('1em "Noto Sans Local"'),
      ]);
      setIsLoading(false);
    };
    void getReady();
  }, []);

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

  const svgRef = useRef<SVGSVGElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (isLoading) {
  //     return
  //   }

  //   const draw = debounce(async () => {
  //     const content = svgRef.current?.outerHTML;
  //     console.log(content);
  //     const session = new Session(content, {
  //       fonts: {
  //         "Noto Serif Local": { source: "/NotoSerifJP-Bold.otf" },
  //         "Noto Sans Local": { source: "/NotoSansJP-SemiBold.ttf" },
  //       },
  //     });
  //     const stat = await session.replaceAll();
  //     const out: string = session.getSvgString();
  //     const result = new DOMParser()
  //       .parseFromString(out, "image/svg+xml")
  //       .querySelector("svg");
  //     if (result) {
  //       result.id = "result-svg";
  //       result.classList.remove("in-background");
  //       const old = containerRef.current?.querySelector("#result-svg");
  //       if (old) {
  //         containerRef.current?.removeChild(old);
  //       }
  //       containerRef.current?.appendChild(result);
  //     }
  //   }, 200);
  //   const observer = new MutationObserver(() => void draw())
  //   observer.observe(svgRef.current as Node, { attributes: true, childList: true, subtree: true })
  //   svgRef.current?.classList.add("in-background");
  //   return () => observer.disconnect()
  // }, [isLoading]);

  if (isLoading) {
    return <Skeleton className="h-[300px] w-[640px] flex items-center justify-center" >Connecting to Misaka network</Skeleton>;
  }

  return (
    <div ref={containerRef}>
      <svg
        width={scale * (isHorizontal ? 640 : 300)}
        height={scale * (isHorizontal ? 300 : 640)}
        viewBox={isHorizontal ? "0 0 640 300" : "0 0 300 640"}
        id="toaru_svg"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        key={String(isLoading)}
      >
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
            style={{ fontFamily: "Noto Serif Local" }}
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
            x={0}
            y={0}
            id="text_nato"
            fill="url(#fill_gradient)"
            style={{
              fontFamily: "Noto Sans Local",
              transform: isHorizontal ? undefined : "rotate(90deg)",
              transformOrigin: isHorizontal ? undefined : "15px 310px",
              letterSpacing: "0.5em",
            }}
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
