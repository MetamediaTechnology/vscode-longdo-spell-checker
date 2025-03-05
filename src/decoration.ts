import * as vscode from "vscode";
import { Position } from "./types";

let decorationType: vscode.TextEditorDecorationType | null = null;

export function setDecorations(
  editor: vscode.TextEditor,
  results: { originalPosition: Position }[]
) {
  const decorations: vscode.DecorationOptions[] = results.map((result:any) => {
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

  decorationType = vscode.window.createTextEditorDecorationType({
    textDecoration: "underline wavy #ff0000",
    cursor: "pointer",
  });

  editor.setDecorations(decorationType, decorations);
}

export function clearDecorations(editor: vscode.TextEditor) {
  if (decorationType) {
    editor.setDecorations(decorationType, []);
  }
}
