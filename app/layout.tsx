// Root layout — shell only. Per-locale metadata + JSON-LD live in
// app/[locale]/layout.tsx and app/[locale]/page.tsx so each locale
// emits its own title, description, hreflang and Open Graph variants.
//
// What this file owns:
//   - The single <html> + <body> tags Next.js requires
//   - Font loading (next/font self-hosts the four families used)
//   - Preconnect hints for Leaflet tiles
//   - Manifest + favicon wiring
//   - A locale-agnostic baseline metadata object (title fallback,
//     metadataBase, icons, manifest)

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "./seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: "Private wooden-boat tours of Lake Como.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: {
    // The bundled .ico is multi-resolution (16, 32) and serves all
    // major browsers. Better PNG variants (icon-192, icon-512,
    // apple-touch-icon-180) are pending — see docs/HANDOFF.md.
    icon: [{ url: "/favicon.ico" }],
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

export const viewport: Viewport = {
  themeColor: "#1a1f24",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${inter.variable} ${cairo.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Performance hints for the third-party tile server used in the Leaflet map. */}
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/* Detect the locale from the URL path on first load and flip <html lang>
            and <html dir> before the page paints. Ships in every page, runs ~1ms. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.split('/')[1]||'en';var L=['en','it','ru','ar'];var l=L.indexOf(p)!==-1?p:'en';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
