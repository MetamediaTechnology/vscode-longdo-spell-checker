import type { BundledLanguage } from "shiki" with { "resolution-mode": "import" };
const languageMap: Record<string, [BundledLanguage, string[]]> = {
  "js": ["javascript", ["#81A1C1", "#D8DEE9FF"]],
  "json": ["json", ["#81A1C1", "#D8DEE9FF"]],
  "md": ["markdown", ["#81A1C1", "#D8DEE9FF"]],
};

export {
    languageMap
};