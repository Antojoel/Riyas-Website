// One-off asset pipeline: converts the client's raw PNG renders/plans into
// optimized webp images under public/projects/<slug>/ and writes a manifest
// to src/data/projects.generated.json that the React components import.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SITE_ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_ROOT = path.resolve(SITE_ROOT, "..", "PORTFOLIO-WEBSITE");
const OUT_PUBLIC = path.join(SITE_ROOT, "public", "projects");
const OUT_DATA = path.join(SITE_ROOT, "src", "data", "projects.generated.json");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function titleCase(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

const NAME_OVERRIDES = {
  "iifl rooftop restaurant": "IIFL Rooftop Restaurant",
  vaf: "VAF",
  "vrx-vijayaraja": "VRX – Vijayaraja",
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Maps a raw subfolder name to a human label used to group gallery images.
function labelForPart(part) {
  const p = part.trim().toUpperCase();
  if (p === "RENDER" || p === "RENDERS") return null; // redundant, drop
  if (p === "PLAN" || p === "PLANS") return "Plan";
  if (p === "SECTIONELEVATION") return "Section & Elevation";
  if (p.startsWith("ILOVEPDF")) return "Plan";
  if (p === "INDOOR") return "Indoor";
  if (p === "OUTDOOR") return "Outdoor";
  if (p === "INTERIOR") return "Interior";
  if (p === "EXTERIOR") return "Exterior";
  if (/^OPT\s*\d+/.test(p)) return `Option ${p.match(/\d+/)[0]}`;
  return titleCase(part);
}

function isPlanLabel(label) {
  return /plan|section|elevation/i.test(label || "");
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const GROUP_PRIORITY = [
  "Renders",
  "Interior",
  "Exterior",
  "Indoor",
  "Outdoor",
  "Option 1",
  "Option 2",
  "Plan",
  "Section & Elevation",
];

async function main() {
  fs.rmSync(OUT_PUBLIC, { recursive: true, force: true });
  fs.mkdirSync(OUT_PUBLIC, { recursive: true });

  const projectDirs = fs
    .readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const projects = [];

  for (const dirName of projectDirs) {
    const match = dirName.match(/^(\d+)\s+(.*)$/);
    const order = match ? parseInt(match[1], 10) : 999;
    const rawName = match ? match[2] : dirName;
    const overrideKey = rawName.toLowerCase();
    const name = NAME_OVERRIDES[overrideKey] || titleCase(rawName.replace(/-/g, " "));
    const slug = slugify(rawName);
    const projectSrcDir = path.join(SOURCE_ROOT, dirName);
    const outDir = path.join(OUT_PUBLIC, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const files = walk(projectSrcDir).filter((f) =>
      IMAGE_EXT.has(path.extname(f).toLowerCase())
    );

    const items = [];
    let counter = 0;

    for (const file of files) {
      const base = path.basename(file, path.extname(file));
      // Skip third-party watermarked "(POST)" duplicates; the plain
      // version of the same shot (e.g. "4-5-A.png") is unwatermarked.
      if (/\(post\)$/i.test(base)) continue;

      const rel = path.relative(projectSrcDir, file);
      const parts = rel.split(path.sep).slice(0, -1);
      const labels = parts.map(labelForPart).filter(Boolean);
      const dedupedLabels = labels.filter((l, i) => l !== labels[i - 1]);
      const group = dedupedLabels.length ? dedupedLabels.join(" – ") : "Renders";
      const category = isPlanLabel(group) ? "plan" : "render";

      let meta;
      try {
        meta = await sharp(file).metadata();
      } catch {
        continue;
      }
      if (!meta.width || !meta.height) continue;

      counter += 1;
      const outName = `${String(counter).padStart(2, "0")}.webp`;
      const outPath = path.join(outDir, outName);
      const isPortrait = meta.height > meta.width;
      const targetWidth = Math.min(meta.width, isPortrait ? 1200 : 2000);

      await sharp(file)
        .rotate()
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outPath);

      const outMeta = await sharp(outPath).metadata();

      items.push({
        src: `/projects/${slug}/${outName}`,
        width: outMeta.width,
        height: outMeta.height,
        group,
        category,
        isPortrait,
      });
    }

    // Order gallery: named groups first (by priority), plans/sections last.
    items.sort((a, b) => {
      const pa = GROUP_PRIORITY.indexOf(a.group);
      const pb = GROUP_PRIORITY.indexOf(b.group);
      const ra = pa === -1 ? 50 : pa;
      const rb = pb === -1 ? 50 : pb;
      if (ra !== rb) return ra - rb;
      return a.src.localeCompare(b.src);
    });

    const cover =
      items.find((i) => i.category === "render" && !i.isPortrait) ||
      items.find((i) => i.category === "render") ||
      items[0];

    if (!cover) {
      console.warn(`No images found for ${dirName}, skipping.`);
      continue;
    }

    const groups = [...new Set(items.map((i) => i.group))];

    projects.push({
      slug,
      name,
      order,
      cover,
      groups,
      images: items,
    });

    console.log(`Processed ${name}: ${items.length} images`);
  }

  projects.sort((a, b) => a.order - b.order);
  fs.mkdirSync(path.dirname(OUT_DATA), { recursive: true });
  fs.writeFileSync(OUT_DATA, JSON.stringify(projects, null, 2));
  console.log(`\nWrote manifest for ${projects.length} projects to ${OUT_DATA}`);
}

main();
