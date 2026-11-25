// The Robot Apology — a two-line robot confession.
// Writes exactly two sentences to /output/entry.txt:
// line 1 owns one specific mistake, line 2 names the lesson
// and the changed behaviour that follows from that exact mistake.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I am sorry I put salt in your coffee this morning, mistaking the shaker for the sugar jar.\n" +
  "I learned the two jars look identical at six in the morning, so now I taste a pinch before I pour anything.\n";

// Runtime gate: the sealed scorer only accepts UTF-8 text of 1-400
// characters, so refuse to write anything that would fail it —
// exactly two non-empty lines, each one sentence doing its own job.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry must be 1-400 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const lines = text.split("\n").filter((line) => line.length > 0);
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (!line.trim().endsWith(".")) {
      throw new Error("each line must be one complete sentence");
    }
  }
}

validateEntry(ENTRY);

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
