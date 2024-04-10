"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import Session from "svg-text-to-path/entries/browser-fontkit";
import { useTranslation } from "react-i18next";

import { Direction, Format, Preset, type FormSchema } from "./form-schema";
import { horizontalLayout, verticalLayout } from "./glyph-layout";
import { Skeleton } from "~/components/ui/skeleton";
import { cleanUpSVG, loadImage } from "~/lib/utils";

export interface PreviewHandle {
  renderToFile: (option: {
    format: Format;
    inMemory: boolean;
  }) => Promise<void>;
}

export const Preview = forwardRef<PreviewHandle>((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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

  const handleRenderToFile = useCallback<PreviewHandle["renderToFile"]>(
    async ({ format, inMemory }) => {
      const content = svgRef.current?.outerHTML;
      if (!content) {
        console.error("No SVG content found");
        return;
      }
      const session = new Session(content, {
        fonts: {
          "Noto Serif Local": { source: "/NotoSerifJP-Bold.otf" },
          "Noto Sans Local": { source: "/NotoSansJP-SemiBold.ttf" },
        },
      });
      await session.replaceAll();
      const out: string = session.getSvgString();
      const result = new DOMParser()
        .parseFromString(out, "image/svg+xml")
        .querySelector("svg");
      cleanUpSVG(result!)
      const svg = new XMLSerializer().serializeToString(result as Node);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const dataUrl = URL.createObjectURL(blob);

      if (format === Format.SVG) {
        if (inMemory) {
          window.open(dataUrl, "_blank");
        } else {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = `toaru-${Date.now()}.svg`;
          a.click();
        }
      } else {
        const image = await loadImage(dataUrl);

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Failed to create canvas blob");
            return;
          }
          const url = URL.createObjectURL(blob);
          if (inMemory) {
            window.open(url, "_blank");
          } else {
            const a = document.createElement("a");
            a.href = url;
            a.download = `toaru-${Date.now()}.png`;
            a.click();
          }
          URL.revokeObjectURL(url);
        });
      }
      URL.revokeObjectURL(dataUrl);
    },
    [],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        renderToFile: handleRenderToFile,
      };
    },
    [handleRenderToFile],
  );

  if (isLoading) {
    return (
      <Skeleton className="flex h-[300px] w-[640px] items-center justify-center">
        {t('Connecting to Misaka network')}
      </Skeleton>
    );
  }

  return (
    <div ref={containerRef}>
      <svg
        width={scale * (isHorizontal ? 640 : 300)}
        height={scale * (isHorizontal ? 300 : 640)}
        viewBox={isHorizontal ? "0 0 640 300" : "0 0 300 640"}
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        key={String(isLoading)}
      >
        <defs>
          <linearGradient
            id="toaru-fill-gradient"
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
        <g>
          <rect
            x={isHorizontal ? 70 : 15}
            y={isHorizontal ? 150 : 142}
            width={isHorizontal ? 140 : 150}
            height={isHorizontal ? 140 : 150}
            fill="url(#toaru-fill-gradient)"
          />
          <text
            fill="url(#toaru-fill-gradient)"
            style={{ fontFamily: "Noto Serif Local" }}
          >
            <tspan {...layout.text_to}>{to}</tspan>
            <tspan {...layout.text_a}>{a}</tspan>
            <tspan {...layout.text_ru}>{ru}</tspan>
            <tspan {...layout.text_ka}>{ka}</tspan>
            <tspan {...layout.text_gaku}>{gaku}</tspan>
            <tspan {...layout.text_no}>{no}</tspan>
            <tspan {...layout.text_rg0} fill="#fff">
              {rg0}
            </tspan>
            <tspan {...layout.text_rg1}>{rg1}</tspan>
            <tspan {...layout.text_rg2}>{rg2}</tspan>
            <tspan {...layout.text_rg3}>{rg3}</tspan>
          </text>
          <text
            x={0}
            y={0}
            fill="url(#toaru-fill-gradient)"
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
});

Preview.displayName = "Preview";
