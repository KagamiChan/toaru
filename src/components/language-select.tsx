"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { i18nConfig } from "~/i18n-config";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { GlobeIcon } from "@radix-ui/react-icons";

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = useCallback(
    (newLocale: string) => {
      // set cookie for next-i18n-router
      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = date.toUTCString();
      document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

      // redirect to the new locale path
      if (currentLocale === i18nConfig.defaultLocale) {
        router.push("/" + newLocale + currentPathname);
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
        );
      }

      router.refresh();
    },
    [currentLocale, currentPathname, router],
  );

  return (
    <Select onValueChange={handleChange} value={currentLocale}>
      <SelectTrigger className="w-[10em]">
        <GlobeIcon /><SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
      </SelectContent>
    </Select>
  );
};
