const IMPORT_JS_REGEX = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;


export function isImportJavascript(text:string) : boolean {
    const matches = text.match(IMPORT_JS_REGEX);
    return matches !== null && matches.length > 0;
}