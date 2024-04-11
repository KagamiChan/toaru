import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { i18nConfig } from "~/i18n-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "とある画像の生成装置 | Toaru Image Generator",
  description:
    "とあるスタイルの画像生成ツール | Toaru style image generation tool",
  icons: [
    { rel: "icon", url: "/favicon.svg" },
    { rel: "icon", url: "/favicon.png" },
  ],
  openGraph: {
    title: "とある画像の生成装置 | Toaru Image Generator",
    description:
      "とあるスタイルの画像生成ツール | Toaru style image generation tool",
    images: [
      {
        url: "https://toaru.lv0.dev/og.png",
        width: 1280,
        height: 600,
        alt: "とある画像の生成装置 | Toaru Image Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const generateStaticParams = async () => {
  return i18nConfig.locales.map((locale) => ({ locale }));
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
