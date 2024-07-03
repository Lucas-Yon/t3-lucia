import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error `locales` are read only
  const locales: string[] = i18n.locales;
  // TODO: Find the reason why I got error in staging
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    console.error(error);
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
