import hljs from "highlight.js";
import { Position, TextIndex } from "./interface/types";
import * as vscode from "vscode";
import { languageMap } from "./interface/lang";
import { JSDOM } from "jsdom";

// Use a class instead of global variables
export class TextProcessor {
  private static readonly TAGS_ACCEPTED = ["language-xml", "hljs-string"];
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
        indices: [...this.allIndices]
      });
      this.textToCheck = "";
      this.allIndices = [];
      this.globalOffset = 0;
    }
  }

  /**
   * Gets highlighted text from document
   */
  private getHighlightedText(document: vscode.TextDocument): string {
    const fileExtension = document.fileName.split(".").pop()?.toLowerCase() || "plaintext";
    const supportedLanguages = hljs.listLanguages();
    const language = languageMap[fileExtension] || fileExtension;
    
    try {
      if (supportedLanguages.includes(language)) {
        return hljs.highlight(document.getText(), { language }).value;
      }
      return hljs.highlight(document.getText(), { language: "plaintext" }).value;
    } catch (error) {
      return hljs.highlight(document.getText(), { language: "plaintext" }).value;
    }
  }

  /**
   * Process document text and extract relevant content
   */
  public processDocument(document: vscode.TextDocument): { text: string; indices: TextIndex[] }[] {
    this.resetState();
    
    const highlightedText = this.getHighlightedText(document);
    const virtualDOM = new JSDOM(highlightedText);
    const spans = virtualDOM.window.document.getElementsByTagName("span");
    const fullText = document.getText();
    
    for (let i = 0; i < spans.length; i++) {
      const spanElement = spans[i];
      if (TextProcessor.TAGS_ACCEPTED.includes(spanElement.className)) {
        this.processSpanElement(spanElement, fullText, document);
      }
    }
    
    this.flushData();
    return this.textData;
  }
  
  /**
   * Process individual span elements
   */
  private processSpanElement(
    spanElement: Element, 
    fullText: string, 
    document: vscode.TextDocument
  ): void {
    let directTextContent = "";
    
    for (let node of spanElement.childNodes) {
      if (node.nodeType === 3) { // Text node
        directTextContent += node.textContent;
      }
    }

    if (directTextContent.trim()) {
      const textPosition = fullText.indexOf(directTextContent);

      if (textPosition !== -1) {
        const position = document.positionAt(textPosition);
        
        this.allIndices.push({
          line: position.line,
          start: position.character,
          end: position.character + directTextContent.length,
          text: directTextContent,
          globalStart: this.globalOffset,
          globalEnd: this.globalOffset + directTextContent.length,
        });

        this.textToCheck += directTextContent + " ";
        this.globalOffset += directTextContent.length + 1;

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
