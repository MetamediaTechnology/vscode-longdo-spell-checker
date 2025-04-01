import type { BundledLanguage } from "shiki" with { "resolution-mode": "import" };
const languageMap: Record<string, BundledLanguage> = {
  "js": "javascript",
  "ts": "typescript",
  "jsx": "javascript",
  "tsx": "typescript",
  "html": "xml",
  "css": "css",
  "py": "python",
  "php": "php",
  "rb": "ruby",
  "java": "java",
  "json": "json",
  "md": "markdown",
  "vue": "vue",
  "dart": "dart",
};

export {
    languageMap
};