import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://comoboatrental.com";

// SEO metadata — Variant A "Editorial" copy (recommended for the homepage in
// the SEO Copy & Palette doc). Title, description, OG, Twitter are baked in
// regardless of which copy variant the visitor selects with the on-site
// toggle. This is what crawlers and previews see.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lake Como Boat Rental · Private Wooden Tours from Como — Como Boat Rental",
  description:
    "Private boat tours of Lake Como aboard hand-built mahogany boats. Bellagio, Varenna, Villa del Balbianello and Villa Carlotta — with a skipper who knows the lake.",
  keywords: [
    "lake como boat rental",
    "lake como boat tour",
    "private boat tour bellagio",
    "como boat hire",
    "villa balbianello boat tour",
    "wooden taxi lake como",
    "private boat charter como",
    "lake como sunset cruise",
    "como to bellagio boat",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "Bellagio. Varenna. Balbianello. — Como Boat Rental",
    description: "Half-day private tours of Lake Como, aboard a hand-built mahogany boat.",
    url: SITE_URL,
    siteName: "Como Boat Rental",
    locale: "en_GB",
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
    title: "Bellagio. Varenna. Balbianello. — Como Boat Rental",
    description: "Half-day private tours of Lake Como, aboard a hand-built mahogany boat.",
    images: ["/images/hero-sunset.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Schema.org JSON-LD — LocalBusiness + TravelAgency on the homepage. Drops a
// rich-result-eligible block into the head so Google can lift hours, location,
// telephone, founder and price band into the SERP card. Founders Loris and
// Claudio show up here as the named operators.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TravelAgency"],
  "@id": `${SITE_URL}/#business`,
  name: "Como Boat Rental",
  url: SITE_URL,
  telephone: "+39 340 648 7574",
  email: "info@comoboatrental.it",
  description:
    "Private boat tours of Lake Como aboard hand-built mahogany boats, departing from Como. Founded by Loris and Claudio — third-generation lake skippers.",
  image: `${SITE_URL}/images/hero-sunset.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lungolago Viale Geno, 10",
    addressLocality: "Como",
    addressRegion: "Lombardy",
    postalCode: "22100",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.808,
    longitude: 9.085,
  },
  areaServed: { "@type": "Place", "name": "Lake Como" },
  founder: [
    { "@type": "Person", "name": "Loris" },
    { "@type": "Person", "name": "Claudio" },
  ],
  priceRange: "€€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/comoboatrental",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${cairo.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // Single trusted JSON-LD blob, generated server-side; safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
