import type { Highlighter, BundledLanguage } from 'shiki' with { 'resolution-mode': 'import' };

class ShikiUtil {
    private highlighter: Highlighter | null = null;
    
    private async getHighlighter(): Promise<Highlighter> {
        if (!this.highlighter) {
            const { createHighlighter } = await import("shiki");
            this.highlighter = await createHighlighter({
                langs: ["javascript", "typescript", "vue","html", "css", "json"],
                themes: ["nord"],
            });
        }
        return this.highlighter;
    }
    
    /**
     * Converts code to HTML with syntax highlighting
     * @param code The source code to highlight
     * @param options Shiki highlighting options
     * @returns HTML string with highlighted code
     */
    public async codeToHTML(code: string, options: any): Promise<string> {
        const highlighter = await this.getHighlighter();
        return highlighter.codeToHtml(code, options);
    }

    /**
     * Highlights code and returns the token structure
     * @param code The source code to tokenize
     * @param lang Language for syntax highlighting
     * @param theme Theme to use for highlighting
     * @returns The tokens from the highlighted code
     */
    public async getCodeTokens(code: string, lang: BundledLanguage, theme: string) {
        const highlighter = await this.getHighlighter();
        const tokens = highlighter.codeToTokens(code, { lang, theme });

        const tokenStrings = tokens.tokens.flat().filter((token) => {
            if (token.color === "#D8DEE9") {
            }
        });
    
        return tokens;
    }
    
}

export const shikiUtil = new ShikiUtil();
