import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I've held this chocolate hostage all day. Press my button and I'll drop everything for you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const text = ENTRY.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
const roundTrip = readFileSync(join(outDir, "entry.txt"), "utf8");
if (roundTrip !== text) {
  throw new Error("round-trip mismatch: entry.txt does not match the entry");
}
