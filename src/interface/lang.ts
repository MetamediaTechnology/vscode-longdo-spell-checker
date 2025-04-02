import type { BundledLanguage } from "shiki" with { "resolution-mode": "import" };
const languageMap: Record<string, [BundledLanguage, string[]]> = {
  "js": ["javascript", ["#A3BE8C"]],
  // "vue": ["vue", ["#81A1C1"]],
  "json": ["json", ["#81A1C1", "#D8DEE9FF"]],
  "md": ["markdown", ["#D8DEE9"]],
};

export {
    languageMap
};