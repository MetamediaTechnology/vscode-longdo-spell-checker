import { Position, TextIndex } from "./interface/types";
import * as vscode from "vscode";
import hljs from "highlight.js";

let textToCheck: string = "";
let allIndices: TextIndex[] = [];
let dataToSend: { text: string; indices: TextIndex[] }[] = [];
let globalOffset = 0;

const THAI_PATTERN = /[\u0E00-\u0E7F]+/g;
const ENGLISH_PATTERN = /\b[A-Za-z][a-z]{2,}\b(?!\()/g;
const EXCLUDE_PATTERN = /\b(function|const|let|var|if|else|while|for|return|class|interface|type|import|export|from|as|of|in|true|false|null|undefined)\b/;
const CAMELCASE_PATTERN = /^[A-Z][a-z]+[A-Z]/;

function findOriginalPosition(
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

function processMatches(
  text: string,
  pattern: RegExp,
  lineNumber: number,
  filterFn?: (matchText: string) => boolean
) {
  let match;
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchText = match[0];

    if (filterFn && filterFn(matchText)) {
      continue;
    }

    allIndices.push({
      line: lineNumber,
      start: match.index,
      end: match.index + matchText.length,
      text: matchText,
      globalStart: globalOffset,
      globalEnd: globalOffset + matchText.length,
    });

    textToCheck += matchText + " ";
    globalOffset += matchText.length + 1;

    if (textToCheck.length >= 1000) {
      flushData();
    }
  }
}

function flushData() {
  if (textToCheck.length > 0) {
    dataToSend.push({ text: textToCheck.trim(), indices: [...allIndices] });
    textToCheck = "";
    allIndices = [];
    globalOffset = 0;
  }
}

function getDocumentText(document: vscode.TextDocument) {
  allIndices = [];
  dataToSend = [];
  textToCheck = "";
  globalOffset = 0;

  const lines = document.lineCount;
  const isVueFile = document.fileName.split(".").pop() === "vue";

  for (let i = 0; i < lines; i++) {
    const text = document.lineAt(i).text;
    processMatches(text, THAI_PATTERN, i);
    if (isVueFile) {
      processMatches(text, ENGLISH_PATTERN, i, (matchText) => {
        return EXCLUDE_PATTERN.test(matchText) || CAMELCASE_PATTERN.test(matchText);
      });
    }
  }

  flushData();
}

export {
  getDocumentText,
  findOriginalPosition,
  textToCheck,
  allIndices,
  dataToSend,
};
