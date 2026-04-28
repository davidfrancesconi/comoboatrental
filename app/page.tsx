// Root URL handler. Under `output: "export"` we can't use server-side
// redirects, so this page emits a meta-refresh + JS Accept-Language
// detection that:
//   - On JS-enabled clients: replaces history with the user's preferred
//     locale (falling back to /en/) instantly, no flash.
//   - On crawlers and no-JS clients: meta refreshes to /en/ after 0s.
//
// hreflang on /en/ tells Google this redirect is canonical, so the root
// won't compete with the locale homepages for indexing.

import type { Metadata } from "next";
import { SITE_URL } from "./seo";

export const metadata: Metadata = {
  title: "Como Boat Rental",
  description: "Private wooden-boat tours of Lake Como.",
  alternates: { canonical: `${SITE_URL}/en/` },
  robots: { index: false, follow: true },
};

export default function RootIndex() {
  // Lightweight script: pick from the user's Accept-Language list, default to en.
  const detectScript = `
    (function(){
      try {
        var langs = (navigator.languages || [navigator.language || 'en']).map(function(l){ return l.toLowerCase(); });
        var supported = ['en','it','ru','ar'];
        var pick = 'en';
        for (var i = 0; i < langs.length; i++) {
          var L = langs[i].split('-')[0];
          if (supported.indexOf(L) !== -1) { pick = L; break; }
        }
        window.location.replace('/' + pick + '/');
      } catch(e) {
        window.location.replace('/en/');
      }
    })();
  `;
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <script dangerouslySetInnerHTML={{ __html: detectScript }} />
      <noscript>
        <p style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
          Redirecting to <a href="/en/">Como Boat Rental</a>…
        </p>
      </noscript>
    </>
  );
}
