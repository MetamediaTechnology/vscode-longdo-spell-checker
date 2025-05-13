import { Position, ShikiLine, TextIndex } from "./interface/types";
import * as vscode from "vscode";
import { shikiUtil } from "./lib/shiki";
import { languageMap } from "./interface/lang";
import { StringUtils } from "./utils/strings";
import { isImportJavascript } from "./rule/js";
// Use a class instead of global variables
export class TextProcessor {
  private static readonly MAX_TEXT_LENGTH = 1000;
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

    const fileExtension = 
      document.fileName.split(".").pop()?.toLowerCase() || "txt";
    const isSupportedFile = fileExtension in languageMap;
    
    const config = vscode.workspace.getConfiguration("longdoSpellChecker");
    const languages = config.get<string[]>("language") || [];
    const isEnglishEnabled = languages.includes("English");

    // If document line is morethan 1500 ask user to continue
    const lineCount = document.lineCount;
    if (lineCount > 1500) {
      const message = `This document has ${lineCount} lines. Do you want to continue?`;
      const result = await vscode.window.showInformationMessage(message, {
        modal: false
      },
      "Continue",
      "Cancel");
      
      if (result !== "Continue") {
        return [];
      }
   
    }
    // If the file is not supported or English is disabled, process Thai text onl
    
    // Process Thai text for unsupported files or when English is disabled
    if (!isSupportedFile || !isEnglishEnabled) {
      this.processWithThaiTextOnly(document);
      this.flushData();
      return this.textData;
    }
    
    // Process code with language-specific highlighting
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
    
    // Also process Thai text in supported files
    this.processWithThaiTextOnly(document);
    this.flushData();
    return this.textData;
  }

  /**
   * Process line with tokens
   */
  private processLineWithTokens(
    fileExtension: string,
    line: ShikiLine[],
    lineIndex: number
  ): void {
    const langMapEntry = languageMap[fileExtension];
    const targetColors = Array.isArray(langMapEntry) && langMapEntry.length > 1 
      ? langMapEntry[1] 
      : undefined;

    if (!targetColors) {
      return;
    }
    const lines = line.map((token) => [token.content, token.color]) as [
      string,
      string
    ][];


    const lineText = lines.map((token) => token[0]).join("");
    
    switch (fileExtension) {
      case "js":
      case "ts":
        if (isImportJavascript(lineText)) {
          return;
        }
        break;
      case "md":
        if (StringUtils.markdownLink(lineText)) {
          return;
        }
        break;
    }

    let linePosition = 0;
    lines.forEach((token) => {
      const [content, color] = token;
      const isTargetColor = targetColors.includes(color);
      if (
        isTargetColor &&
        content.trim().length > 0 &&
        !StringUtils.containsThai(content)
      ) {
        // Get grapheme clusters (including emojis) instead of code points
        const visualLength = (str: string) => 
          [...str].length;
          
        const visualTrimStart = (str: string) => {
          const chars = [...str];
          let i = 0;
          while (i < chars.length && chars[i].trim() === '') {
            i++;
          }
          return chars.slice(i).join('');
        };
          
        const trimmedContent = content.trim();
        const leadingWhitespace = content.length - visualTrimStart(content).length;
        const start = linePosition + leadingWhitespace;
        const end = start + visualLength(trimmedContent);

        if (this.textToCheck.length + trimmedContent.length + 1 > TextProcessor.MAX_TEXT_LENGTH) {
          this.flushData();
        }

        const globalStart = this.globalOffset;
        const globalEnd = globalStart + visualLength(trimmedContent);

        this.allIndices.push({
          line: lineIndex,
          start,
          end,
          text: trimmedContent,
          globalStart,
          globalEnd,
        });

        this.textToCheck += trimmedContent + " ";
        this.globalOffset = globalEnd + 1; // Add 1 for the space

        if (this.textToCheck.length >= TextProcessor.MAX_TEXT_LENGTH) {
          this.flushData();
        }
      }
      linePosition += content.length; // Use actual string length for position tracking
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
