import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifest = JSON.parse(
  readFileSync(join(__dirname, "posts-manifest.json"), "utf8"),
);

const events = manifest.map((post) => {
  const dir = join(root, "public", "images", "events", post.id);
  let images = [`/images/events/${post.id}/01.jpg`];
  if (existsSync(dir)) {
    const files = readdirSync(dir)
      .filter((f) => /\.(jpg|jpeg|webp|mp4)$/i.test(f))
      .sort();
    const imageFiles = files.filter((f) => !/\.mp4$/i.test(f));
    if (imageFiles.length > 0) {
      images = imageFiles.map((f) => `/images/events/${post.id}/${f}`);
    }
  }
  return {
    id: post.id,
    category: post.category,
    date: post.date,
    images,
    instagram: post.instagram || null,
    isVideo: post.isVideo || false,
    title: post.title,
    location: post.location,
    description: post.description,
  };
});

const out = `/** Auto-generated — events sourced from @cik_fsbm */

export const events = ${JSON.stringify(events, null, 2)};

export function getSortedEvents() {
  const sorted = [...events];
  sorted.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
  return sorted;
}

export function getEventById(id) {
  return events.find((event) => event.id === id) || null;
}

export function getAdjacentEvents(id) {
  const sorted = getSortedEvents();
  const index = sorted.findIndex((event) => event.id === id);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;
  return { prev, next };
}

export function getAllGalleryImages() {
  const allImages = [];
  events.forEach((event) => {
    event.images.forEach((src) => {
      allImages.push({
        src: src,
        eventId: event.id,
        category: event.category,
        caption: event.title,
        instagram: event.instagram,
      });
    });
  });
  return allImages;
}
`;

writeFileSync(join(root, "src", "data", "events.js"), out);
const total = events.reduce((n, e) => n + e.images.length, 0);
console.log(
  `✓ Wrote ${events.length} events, ${total} images → src/data/events.js`,
);
