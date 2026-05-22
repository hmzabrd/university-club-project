/**
 * Rebuilds posts-manifest.json from a local Instagram export folder.
 * Before running, update the two paths below to match your machine.
 * Run: npm run setup
 */
import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Update these two paths before running ---
const CIK = "path/to/your/instagram/export"; // folder containing manifest.json and media/
const MEMBERS_DIR = "path/to/your/member/photos"; // folder with member portrait photos
// ---------------------------------------------

const mediaDir = join(CIK, "media");

const raw = JSON.parse(readFileSync(join(CIK, "manifest.json"), "utf8"));

// ── helpers ──────────────────────────────────────────────────────────────────

function getCategory(caption = "") {
  const c = caption.toLowerCase();
  if (/قافلة|صحة مدرسية|caravane|طبية|فحوص|صحي|مدرسة/.test(c)) return "health";
  if (
    /كسوة|إفطار|تبرع بالدم|دار الأطفال|تضامن|رمضان|يتيم|أطفال|بورد|سعادة|فطور/.test(
      c,
    )
  )
    return "solidarity";
  if (
    /ذكرى|ريادة|توجيه|ملتقى|جامعة|طلبة|عميد|تكريم|أستاذ|anniversary|entrepreneurship|orientation/.test(
      c,
    )
  )
    return "campus";
  return "culture";
}

function cleanCaption(caption = "") {
  return caption
    .replace(/[⁨⁩\u202A\u202C\u200F\u200E]/g, "")
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
    .trim();
}

function firstLine(caption = "") {
  const lines = cleanCaption(caption)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines[0] || "";
}

function excerpt(caption = "", maxLen = 120) {
  const text = cleanCaption(caption).replace(/\n+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen).trimEnd() + "…";
}

// Category → French/English label helpers
function titleFr(caption = "", code = "") {
  const c = caption.toLowerCase();
  if (/قافلة طبية رقم 7/.test(c)) return "Caravane médicale n°7";
  if (/قافلة.*مدرسية|صحة مدرسية/.test(c)) return "Caravane de santé scolaire";
  if (/قافلة/.test(c)) return "Caravane médicale";
  if (/كسوة.*عيد|12 كسوة/.test(c)) return "Kiswa Aïd";
  if (/إفطار|فطور/.test(c)) return "Iftar solidaire";
  if (/تبرع.*دم/.test(c)) return "Don du sang";
  if (/دار الأطفال|زيارة.*أطفال/.test(c)) return "Visite foyer d'enfants";
  if (/ليلة.*رمضان|رمضان.*أطفال/.test(c))
    return "Nuit de Ramadan avec les enfants";
  if (/ذكرى.*عاشرة|10 سنوات|10 ans/.test(c))
    return "10e anniversaire — célébration";
  if (/ترحيب|رحّب/.test(c)) return "10e anniversaire — accueil";
  if (/ريادة الأعمال/.test(c)) return "Semaine entrepreneuriat";
  if (/ملتقى التوجيه|توجيه/.test(c)) return "Forum d'orientation";
  if (/كاريوكي/.test(c)) return "Soirée karaoké";
  if (/الألعاب الإلكترونية|gaming|e-sport/.test(c)) return "Tournoi e-sport";
  if (/أسبوع.*رياضة/.test(c)) return "Semaine du sport";
  if (/تكريم.*أساتذة/.test(c)) return "Cérémonie de distinction";
  if (/مدرسة عليا/.test(c)) return "Visite École Normale Supérieure";
  if (/شكر.*عميد/.test(c)) return "Lettre de remerciement au doyen";
  if (/تبادل.*ثقافي|مغرب.*صين/.test(c)) return "Échange culturel Maroc–Chine";
  if (/البحث عن الكنز/.test(c)) return "Chasse au trésor";
  if (/إدماج|قارع.*طبول/.test(c)) return "Partenariat Idmaj";
  if (/الوطن.*الملك|عيد الاستقلال/.test(c)) return "Fête nationale";
  if (/نزهة/.test(c)) return "Sortie du club";
  if (/meeting|meet you/.test(c)) return "Rencontre du bureau";
  if (/ملتقى/.test(c)) return "Rencontre annuelle";
  if (/تهنئة.*مولد/.test(c)) return "Mawlid an-Nabawi";
  if (/زيارة.*مدرسة عليا/.test(c)) return "Visite officielle";
  if (/memories|recap|moments/.test(c)) return "Moments du club";
  if (/team|girls|fun/.test(c)) return "Esprit d'équipe";
  return "Activité du club";
}

function titleEn(caption = "") {
  const c = caption.toLowerCase();
  if (/قافلة طبية رقم 7/.test(c)) return "Medical caravan #7";
  if (/قافلة.*مدرسية|صحة مدرسية/.test(c)) return "School health caravan";
  if (/قافلة/.test(c)) return "Medical caravan";
  if (/كسوة.*عيد|12 كسوة/.test(c)) return "Eid clothing drive";
  if (/إفطار|فطور/.test(c)) return "Ramadan iftar";
  if (/تبرع.*دم/.test(c)) return "Blood donation drive";
  if (/دار الأطفال|زيارة.*أطفال/.test(c)) return "Children's home visit";
  if (/ليلة.*رمضان|رمضان.*أطفال/.test(c)) return "Ramadan night with children";
  if (/ذكرى.*عاشرة|10 سنوات/.test(c)) return "10th anniversary celebration";
  if (/ترحيب|رحّب/.test(c)) return "10th anniversary welcome";
  if (/ريادة الأعمال/.test(c)) return "Entrepreneurship week";
  if (/ملتقى التوجيه|توجيه/.test(c)) return "Orientation forum";
  if (/كاريوكي/.test(c)) return "Karaoke night";
  if (/الألعاب الإلكترونية|gaming|e-sport/.test(c)) return "Gaming tournament";
  if (/أسبوع.*رياضة/.test(c)) return "Sports week";
  if (/تكريم.*أساتذة/.test(c)) return "Faculty honors ceremony";
  if (/مدرسة عليا/.test(c)) return "Visit to École Normale Supérieure";
  if (/شكر.*عميد/.test(c)) return "Thank-you letter to the dean";
  if (/تبادل.*ثقافي|مغرب.*صين/.test(c))
    return "Morocco–China cultural exchange";
  if (/البحث عن الكنز/.test(c)) return "Treasure hunt";
  if (/إدماج|قارع.*طبول/.test(c)) return "Idmaj partnership event";
  if (/الوطن.*الملك|عيد الاستقلال/.test(c)) return "National day tribute";
  if (/نزهة/.test(c)) return "Club outing";
  if (/meeting|meet you/.test(c)) return "Bureau introduction";
  if (/ملتقى/.test(c)) return "Annual meeting";
  if (/تهنئة.*مولد/.test(c)) return "Mawlid al-Nabawi";
  if (/زيارة.*مدرسة عليا/.test(c)) return "Official visit";
  if (/memories|recap|moments/.test(c)) return "Club memories";
  if (/team|girls|fun/.test(c)) return "Team spirit";
  return "Club activity";
}

function titleAr(caption = "") {
  const line = firstLine(caption)
    .replace(/^[📍🎉✨🩺🤝🔙⁨⁩\s]+/, "")
    .trim();
  if (line.length > 5) return line.substring(0, 60);
  return "نشاط نادي ابن خلدون";
}

function locationAr(caption = "") {
  const m = caption.match(/📍\s*([^\n\-–]+)/);
  if (m) return m[1].trim().substring(0, 50);
  if (/fsbm|كلية العلوم/.test(caption.toLowerCase()))
    return "كلية العلوم بن مسيك";
  if (/الدار البيضاء/.test(caption)) return "الدار البيضاء";
  if (/النواصر/.test(caption)) return "إقليم النواصر";
  if (/بوسكورة/.test(caption)) return "بوسكورة";
  return "الدار البيضاء";
}

function locationFr(ar = "") {
  if (/fsbm|كلية/.test(ar.toLowerCase())) return "FSBM Casablanca";
  if (/نواصر/.test(ar)) return "Nouaceur";
  if (/بوسكورة/.test(ar)) return "Bouskoura";
  if (/البيضاء/.test(ar)) return "Casablanca";
  return "Casablanca";
}

// ── Build manifest ────────────────────────────────────────────────────────────
const posts = [];

for (const p of raw.posts) {
  // Only include posts that have at least one image (skip video-only)
  const imageFiles = p.media_file_names.filter((f) => !f.endsWith(".mp4"));
  if (imageFiles.length === 0) continue;

  const cap = p.caption || "";
  const locAr = locationAr(cap);
  const locFr = locationFr(locAr);
  const date = p.timestamp.substring(0, 10);

  posts.push({
    id: p.code,
    images: imageFiles.length,
    category: getCategory(cap),
    date,
    title: {
      ar: titleAr(cap),
      fr: titleFr(cap, p.code),
      en: titleEn(cap),
    },
    location: {
      ar: locAr,
      fr: locFr,
      en: locFr
        .replace("Casablanca", "Casablanca")
        .replace("Nouaceur", "Nouaceur"),
    },
    description: {
      ar: excerpt(cap, 150),
      fr: titleFr(cap, p.code) + " — " + date + ".",
      en: titleEn(cap) + " — " + date + ".",
    },
    instagram: `https://www.instagram.com/p/${p.code}/`,
  });
}

// Sort newest first
posts.sort((a, b) => b.date.localeCompare(a.date));

writeFileSync(
  join(__dirname, "posts-manifest.json"),
  JSON.stringify(posts, null, 2),
  "utf8",
);
console.log(`✓ posts-manifest.json → ${posts.length} posts with images`);

// ── Copy images ───────────────────────────────────────────────────────────────
// Build lookup: lowercase code → image filenames from raw manifest
const codeToFiles = {};
for (const p of raw.posts) {
  codeToFiles[p.code.toLowerCase()] = p.media_file_names.filter(
    (f) => !f.endsWith(".mp4"),
  );
}

let eventsCopied = 0,
  imagesCopied = 0;

for (const post of posts) {
  const files = codeToFiles[post.id.toLowerCase()] || [];
  if (files.length === 0) continue;

  const destDir = join(root, "public", "images", "events", post.id);
  mkdirSync(destDir, { recursive: true });

  files.forEach((fname, i) => {
    const src = join(mediaDir, fname);
    const ext = extname(fname) || ".jpg";
    const dest = join(destDir, String(i + 1).padStart(2, "0") + ext);
    if (existsSync(src)) {
      copyFileSync(src, dest);
      imagesCopied++;
    }
  });
  eventsCopied++;
}
console.log(`✓ Images: ${eventsCopied} events, ${imagesCopied} files copied`);

// ── Team photos ───────────────────────────────────────────────────────────────
const membersDir = MEMBERS_DIR;
const teamMap = [
  { file: "douaa baslam-presidente.jpeg", dest: "01.jpg" },
  { file: "ali oulahbib-vice president.jpeg", dest: "02.jpg" },
  { file: "fatima zahraa farhat-vice presidente.jpeg", dest: "03.jpg" },
  { file: "Taha housni-secretaire general.jpeg", dest: "04.jpg" },
  { file: "Fatima ezzahra ajmari-tresoriere.jpeg", dest: "05.jpg" },
  { file: "hiba allah kamil-responsable media.jpeg", dest: "06.jpg" },
  {
    file: "merzem channoun-responsable de communication .jpeg",
    dest: "07.jpg",
  },
  { file: "saif eddine zaoui-event manager.jpeg", dest: "08.jpg" },
  { file: "oussama aboul mahassine elidrissi-conseiller.jpeg", dest: "09.jpg" },
];
const teamDir = join(root, "public", "images", "team");
mkdirSync(teamDir, { recursive: true });
for (const m of teamMap) {
  const src = join(membersDir, m.file);
  const dest = join(teamDir, m.dest);
  if (existsSync(src)) copyFileSync(src, dest);
}
console.log("✓ Team photos copied");

// ── Hero fallback ─────────────────────────────────────────────────────────────
const imgRoot = join(root, "public", "images");
const heroJpeg = join(imgRoot, "hero.jpeg");
const heroJpg = join(imgRoot, "hero.jpg");
if (!existsSync(heroJpg) && existsSync(heroJpeg)) {
  copyFileSync(heroJpeg, heroJpg);
  console.log("✓ hero.jpeg → hero.jpg");
}

// ── Generate events.js ────────────────────────────────────────────────────────
const eventsData = posts.map((post) => {
  const dir = join(root, "public", "images", "events", post.id);
  let images = [`/images/events/${post.id}/01.jpg`];
  if (existsSync(dir)) {
    const files = readdirSync(dir)
      .filter((f) => /\.(jpg|jpeg|webp)$/i.test(f))
      .sort();
    if (files.length > 0)
      images = files.map((f) => `/images/events/${post.id}/${f}`);
  }
  return { ...post, images };
});

const eventsJs = `/** Auto-generated from @cik_fsbm — ${eventsData.length} events */

export const events = ${JSON.stringify(eventsData, null, 2)};

export function getSortedEvents() {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}

export function getEventById(id) {
  return events.find((e) => e.id === id);
}

export function getAdjacentEvents(id) {
  const sorted = getSortedEvents();
  const index = sorted.findIndex((e) => e.id === id);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getAllGalleryImages() {
  return events.flatMap((e) =>
    e.images.map((src) => ({
      src,
      eventId: e.id,
      category: e.category,
      caption: e.title,
      instagram: e.instagram,
    }))
  );
}
`;

writeFileSync(join(root, "src", "data", "events.js"), eventsJs, "utf8");
const totalImgs = eventsData.reduce((n, e) => n + e.images.length, 0);
console.log(`✓ events.js → ${eventsData.length} events, ${totalImgs} images`);
console.log("\nDone. Run: npm run dev");
