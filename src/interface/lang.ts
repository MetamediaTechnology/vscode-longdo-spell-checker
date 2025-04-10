import type { BundledLanguage } from "shiki" with { "resolution-mode": "import" };
const languageMap: Record<string, [BundledLanguage, string[]]> = {
  "js": ["javascript", ["#A3BE8C"]],
  "ts": ["typescript", ["#A3BE8C"]],
  "json": ["json", ["#A3BE8C"]],
  "md": ["markdown", ["#D8DEE9FF"]],
};

export {
    languageMap
};