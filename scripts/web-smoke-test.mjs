import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const requiredFiles = [
  "apps/web/src/app/page.tsx",
  "apps/web/src/app/proof/page.tsx",
  "apps/web/src/app/keys/page.tsx",
  "contracts/cornerstone/Move.toml",
  "contracts/cornerstone/sources/support_proof.move",
  "contracts/cornerstone/sources/corner_key.move",
  "docs/sui.md",
  "docs/architecture.md",
  "AGENTS.md",
  "BUILD_GUIDE.md"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length > 0) {
  console.error("Missing required project files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("Project smoke test passed.");
