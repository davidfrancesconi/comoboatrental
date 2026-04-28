#!/usr/bin/env node
/*
 * sync-instagram.mjs
 *
 * Pulls the latest N public posts from Instagram for IG_USERNAME, downloads
 * each thumbnail to /public/images/instagram/{shortcode}.jpg, and writes a
 * manifest to /public/instagram-feed.json.
 *
 * Runs as a `prebuild` step in package.json so a `bun run build` always ships
 * the freshest feed. Failures are non-fatal: if Instagram changes its public
 * API or the request is throttled, the build continues with whatever feed
 * is already on disk (or with no feed at all — the page falls back to the
 * static curated grid).
 *
 *   IG_USERNAME   — defaults to "comoboatrental"
 *   IG_POST_LIMIT — defaults to 6
 *
 * The endpoint hit is the same one the Instagram web app uses for its
 * public profile pages. No login, no Graph API token, no third-party
 * service. May break if Instagram changes the endpoint or its CDN headers.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const PHOTOS_DIR = join(PUBLIC, "images", "instagram");
const MANIFEST = join(PUBLIC, "instagram-feed.json");

const USERNAME = process.env.IG_USERNAME || "comoboatrental";
const LIMIT = parseInt(process.env.IG_POST_LIMIT || "6", 10);

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
const APP_ID = "936619743392459"; // public Instagram web app id

async function main() {
  console.log(`[sync-instagram] fetching @${USERNAME} …`);
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "X-IG-App-ID": APP_ID,
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": `https://www.instagram.com/${USERNAME}/`,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
  });

  if (!res.ok) {
    throw new Error(`Instagram returned HTTP ${res.status}`);
  }

  const data = await res.json();
  const user = data?.data?.user;
  if (!user) throw new Error("No user object in response");

  const edges = user?.edge_owner_to_timeline_media?.edges ?? [];
  if (!edges.length) throw new Error("No posts in response");

  // Pick the first N ITEMS (newest first). Skip videos so the grid stays
  // visually consistent — videos in this layout would freeze on poster.
  // (Sidecar / multi-photo posts come through as their first image.)
  const picks = edges
    .map((e) => e.node)
    .filter((n) => n.__typename !== "GraphVideo")
    .slice(0, LIMIT);

  if (!picks.length) throw new Error("All recent posts are videos");

  mkdirSync(PHOTOS_DIR, { recursive: true });

  const manifest = [];
  for (const node of picks) {
    const shortcode = node.shortcode;
    const src = node.display_url || node.thumbnail_src;
    const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text ?? "";
    const permalink = `https://www.instagram.com/p/${shortcode}/`;

    const dest = join(PHOTOS_DIR, `${shortcode}.jpg`);
    process.stdout.write(`  · ${shortcode} … `);
    const photo = await fetch(src, {
      headers: { "User-Agent": UA, Referer: "https://www.instagram.com/" },
    });
    if (!photo.ok) {
      console.log(`HTTP ${photo.status} (skipped)`);
      continue;
    }
    const buf = Buffer.from(await photo.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`${(buf.length / 1024).toFixed(0)} KB`);

    manifest.push({
      shortcode,
      src: `/images/instagram/${shortcode}.jpg`,
      permalink,
      // First line of caption, trimmed for use as alt text / hover preview.
      alt: caption.split("\n")[0].slice(0, 200),
    });
  }

  if (!manifest.length) throw new Error("Downloaded zero photos");

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`[sync-instagram] wrote ${manifest.length} posts → ${MANIFEST}`);
}

main().catch((err) => {
  console.warn(`[sync-instagram] skipped: ${err.message}`);
  // Always exit 0 — feed sync is best-effort, not a build blocker.
  // If the manifest file already exists from a previous successful sync,
  // the build will use that one.
  process.exit(0);
});
