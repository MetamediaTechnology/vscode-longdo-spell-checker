import { LineInfo, Position, ShikiLine, TextIndex } from "./interface/types";
import * as vscode from "vscode";
import { shikiUtil } from "./lib/shiki";
import { languageMap } from "./interface/lang";
// Use a class instead of global variables
export class TextProcessor {
  private static readonly MAX_TEXT_LENGTH = 1000;
  private static readonly SUPPORTED_COLORS_BY_EXT: Record<string, string[]> = {
    ts: ["#81A1C1", "#D8DEE9FF"],
    js: ["#A3BE8C"],
    py: ["#88C0D0", "#ECEFF4"],
    html: ["#EBCB8B", "#D8DEE9FF"],
    css: ["#D8DEE9FF"],
    json: ["#A3BE8C"],
    vue: ["#D8DEE9FF"],
    md: ["#D8DEE9FF"],
  };
  private textToCheck: string = "";
  private allIndices: TextIndex[] = [];
  private textData: { text: string; indices: TextIndex[] }[] = [];
  private globalOffset = 0;

  /**
   * Finds the original position in the document based on API index
   */
  public findOriginalPosition(
    apiIndex: number,
    originalData: TextIndex[]
  ): Position | null {
    for (let i = 0; i < originalData.length; i++) {
      const lineInfo = originalData[i];
      const nextLine = originalData[i + 1];

      if (
        apiIndex >= lineInfo.globalStart! &&
        (!nextLine || apiIndex < nextLine.globalStart!)
      ) {
        return {
          line: lineInfo.line,
          start: apiIndex - lineInfo.globalStart! + lineInfo.start,
          end:
            apiIndex -
            lineInfo.globalStart! +
            lineInfo.start +
            lineInfo.text.length,
        };
      }
    }
    return null;
  }

  /**
   * Flushes accumulated text data
   */
  private flushData(): void {
    if (this.textToCheck.length > 0) {
      this.textData.push({
        text: this.textToCheck.trim(),
        indices: [...this.allIndices],
      });
      this.textToCheck = "";
      this.allIndices = [];
      this.globalOffset = 0;
    }
  }

  /**
   * Process document text and extract relevant content
   */
  public async processDocument({
    document,
  }: {
    document: vscode.TextDocument;
  }): Promise<{ text: string; indices: TextIndex[] }[]> {
    this.resetState();

    // When unknow file extenstion, assume it's a text file 555
    const fileExtension =
      document.fileName.split(".").pop()?.toLowerCase() || "txt";

    const isSupportedFile = languageMap[fileExtension];

    if (!isSupportedFile) {
      console.log("Unsupported file extension:", fileExtension);
      this.processWithThaiTextOnly(document);
      this.flushData();
      return this.textData;
    } else {
      const codeLanguage = languageMap[fileExtension];
      const language = Array.isArray(codeLanguage) ? codeLanguage[0] : codeLanguage;
      const codeTokens = await shikiUtil.getCodeTokens(
        document.getText(),
        language,
        "nord"
      );
      codeTokens.tokens.forEach((line: any[], lineIndex) => {
        this.processLineWithTokens(fileExtension, line, lineIndex);
      });
      this.processWithThaiTextOnly(document);
      this.flushData();
      return this.textData;
    }
  }

  /**
   * Process line with tokens
   */
  private processLineWithTokens(
    fileExtension: string,
    line: ShikiLine[],
    lineIndex: number
  ): void {
    const targetColors = TextProcessor.SUPPORTED_COLORS_BY_EXT[fileExtension];
    const thaiWordPattern = /[\u0E00-\u0E7F]+/g;

    if (!targetColors) {
      console.log("Unsupported file extension:", fileExtension);
      return;
    }
    const lines = line.map((token) => [token.content, token.color]) as [
      string,
      string
    ][];

    let nonTargetTextLength = 0;
    lines.forEach((token) => {
      const [content, color] = token;
      const isTargetColor = targetColors.includes(color);
      if (
        isTargetColor &&
        content.trim().length > 0 &&
        !content.match(thaiWordPattern)
      ) {
        const start = nonTargetTextLength;
        const end = nonTargetTextLength + content.length;
        this.allIndices.push({
          line: lineIndex,
          start,
          end,
          text: content,
          globalStart: this.globalOffset,
          globalEnd: this.globalOffset + content.length,
        });

        this.textToCheck += content + " ";
        this.globalOffset += content.length + 1;

        if (this.textToCheck.length >= TextProcessor.MAX_TEXT_LENGTH) {
          this.flushData();
        }
      } else {
        nonTargetTextLength += content.length;
      }
    });
  }

  /**
   * Process text with Thai text
   *
   */
  private processWithThaiTextOnly(document: vscode.TextDocument): void {
    const text = document.getText();
    const lines = text.split("\n");

    const thaiWordPattern = /[\u0E00-\u0E7F]+/g;

    for (let i = 0; i < lines.length; i++) {
      const lineText = document.lineAt(i).text;
      let match;
      thaiWordPattern.lastIndex = 0;

      while ((match = thaiWordPattern.exec(lineText)) !== null) {
        const thaiWord = match[0];

        this.allIndices.push({
          line: i,
          start: match.index,
          end: match.index + thaiWord.length,
          text: thaiWord,
          globalStart: this.globalOffset,
          globalEnd: this.globalOffset + thaiWord.length,
        });

        this.textToCheck += thaiWord + " ";
        this.globalOffset += thaiWord.length + 1;

        if (this.textToCheck.length >= TextProcessor.MAX_TEXT_LENGTH) {
          this.flushData();
        }
      }
    }
  }

  /**
   * Reset the state of the processor
   */
  private resetState(): void {
    this.allIndices = [];
    this.textData = [];
    this.textToCheck = "";
    this.globalOffset = 0;
  }

  /**
   * Get the current text data
   */
  public getTextData(): { text: string; indices: TextIndex[] }[] {
    return this.textData;
  }

  /**
   * Get the current indices
   */
  public getAllIndices(): TextIndex[] {
    return this.allIndices;
  }
}

// Create and export a singleton instance
export const textProcessor = new TextProcessor();
