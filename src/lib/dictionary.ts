import "server-only";
import { cache } from "react";
import type { Locale } from "@/i18n.config";

export const dictionaries = {
  en: {
    admin: () =>
      import("@/dictionaries/admin/en.json").then((module) => module.default),
  },
  fr: {
    admin: () =>
      import("@/dictionaries/admin/fr.json").then((module) => module.default),
  },
};

export type Pages = keyof (typeof dictionaries)["en"];

export const getDictionary = async <K extends Pages>(
  locale: Locale,
  page: K,
) => {
  return dictionaries[locale][page]() as Promise<
    (typeof dictionaries.en)[K] extends () => Promise<infer R> ? R : never
  >;
};

export type Dictionary = {
  [K in Pages]: ReturnType<(typeof dictionaries.en)[K]> extends Promise<infer R>
    ? R
    : never;
};

export const cacheDictionary = cache(
  async <K extends Pages>(lang: Locale, page: K) => {
    return await getDictionary(lang, page);
  },
);

export type paramsi18 = {
  lang: Locale;
};
