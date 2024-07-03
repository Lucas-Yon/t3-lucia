import { expect, test, vi } from "vitest";
import { i18n } from "@/i18n.config";
import { getDictionary, dictionaries } from "@/lib/dictionary";
import { structureIsEqual } from "@/lib/utils";

vi.mock("server-only", () => {
  return {
    // mock server-only module
  };
});
vi.mock("react", async () => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func;
  const originalModule = await vi.importActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});
test("Lang Available", () => {
  const orderCountryEnable = i18n.locales as unknown as string[];
  orderCountryEnable.sort();
  expect(Object.keys(dictionaries).sort()).toEqual(orderCountryEnable);
});

test("Check Admin JSON In Each Language", async () => {
  await checkLanguage("admin");
});

async function checkLanguage(page: keyof (typeof dictionaries)["en"]) {
  for (const lang of i18n.locales) {
    const en = await getDictionary(lang, page);
    for (const locale of i18n.locales) {
      const currentlang = await getDictionary(locale, page);
      structureIsEqual(en, currentlang);
      expect(dictionaries[lang].admin).toBeDefined();
      expect(structureIsEqual(en, currentlang)).toEqual(true);
    }
  }
}
