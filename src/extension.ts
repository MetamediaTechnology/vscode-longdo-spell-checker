import * as vscode from "vscode";
import { tabActiveLineCount, dataToSend, findOriginalPosition } from "./text";

import { postProof } from "./api";
import { Position, ProofResponse } from "./types";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "longdo-spell.spell",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const existingDecorations = vscode.window.visibleTextEditors
        .filter(e => e === editor)
        .map(e => e.document.uri.toString());
        
      if (existingDecorations.length > 0) {
        const decorationTypes = vscode.window.activeTextEditor?.visibleRanges || [];
        decorationTypes.forEach(() => {
          editor.setDecorations(vscode.window.createTextEditorDecorationType({}), []);
        });
      }

      const document = editor.document;
      const lines = document.lineCount;

      tabActiveLineCount(lines, document);

      const spellCheckPromises = dataToSend.map(async (data) => {
        try {
          const spell = await postProof(data.text, data.indices);
          const results = spell?.result || [];

          // Map results to original positions
          const originalResults = results
            .map((item: ProofResponse) => ({
              ...item,
              originalPosition: findOriginalPosition(item.index, data.indices),
            }))
            .filter(
              (result: { originalPosition: Position }) =>
                result.originalPosition
            ); // Filter out items without position data

          return originalResults;
        } catch (error) {
          console.error("Error during spell checking:", error);
          return [];
        }
      });
      const allResults = await Promise.all(spellCheckPromises);
      const flattenedResults = allResults.flat();

      const decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        border: "1px solid red",
        cursor: "pointer",
      });

      const decorations = flattenedResults.map((result) => {
        const { line, start } = result.originalPosition;
        const wordLength = result.word?.length || 0;
        const range = new vscode.Range(
          new vscode.Position(line, start),
          new vscode.Position(line, start + wordLength)
        );

        return {
          range,
          hoverMessage: `คำแนะนำ: ${
            result.suggests?.join(", ") || "ไม่มีคำแนะนำ"
          }`,
        };
      });
      editor.setDecorations(decorationType, decorations);
    
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
