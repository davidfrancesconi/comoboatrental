// Per-locale layout. Sets the document language, metadata title and
// description, hreflang alternates and Open Graph locale.
//
// This DOES NOT replace the <html> tag — that stays in app/layout.tsx
// because Next.js requires a single root layout. The lang/dir attributes
// for non-English locales are flipped at runtime (see HomePage), and
// the metadata.alternates.languages here are the strongest crawler
// signal Google uses to associate locale variants.

import type { Metadata } from "next";
import type { Locale } from "../translations";
import { rtlLocales, translations } from "../translations";
import {
  SITE_URL,
  SITE_NAME,
  alternateLanguages,
  localeUrl,
  LOCALE_OG,
} from "../seo";

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "it" },
    { locale: "ru" },
    { locale: "ar" },
  ];
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const url = localeUrl(locale, "/");

  // Per-locale title / description. We bake the same Variant-A
  // editorial copy across locales — the variant toggle lives client-side.
  const titles: Record<Locale, string> = {
    en: "Lake Como Boat Rental · Private Wooden Tours from Como — Como Boat Rental",
    it: "Noleggio Barche Lago di Como · Tour Privati in Mogano da Como — Como Boat Rental",
    ru: "Аренда Лодки на Озере Комо · Частные Туры из Комо — Como Boat Rental",
    ar: "تأجير قوارب بحيرة كومو · جولات خاصة من كومو — Como Boat Rental",
  };
  const descs: Record<Locale, string> = {
    en: "Private boat tours of Lake Como aboard hand-built mahogany boats. Bellagio, Varenna, Villa del Balbianello and Villa Carlotta — with a skipper who knows the lake.",
    it: "Tour privati in barca sul Lago di Como su motoscafi in mogano fatti a mano. Bellagio, Varenna, Villa del Balbianello e Villa Carlotta — con uno skipper che conosce il lago.",
    ru: "Частные туры по озеру Комо на лодках из красного дерева ручной работы. Беладжо, Варенна, Вилла Бальбьянелло и Вилла Карлотта — с шкипером, знающим озеро.",
    ar: "جولات خاصة بالقارب على بحيرة كومو على متن قوارب فاخرة من خشب الماهوغني. بيلاجيو وفارينا وفيلا بالبيانيلو وفيلا كارلوتا — مع ربان يعرف البحيرة.",
  };

  return {
    title: titles[locale],
    description: descs[locale],
    alternates: {
      canonical: url,
      languages: alternateLanguages("/"),
    },
    openGraph: {
      type: "website",
      title: titles[locale],
      description: descs[locale],
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      alternateLocale: (Object.keys(LOCALE_OG) as Locale[])
        .filter((l) => l !== locale)
        .map((l) => LOCALE_OG[l]),
      images: [
        {
          url: "/images/hero-sunset.jpg",
          width: 1200,
          height: 630,
          alt: "Hand-built mahogany boat on Lake Como at sunset",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descs[locale],
      images: ["/images/hero-sunset.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}
