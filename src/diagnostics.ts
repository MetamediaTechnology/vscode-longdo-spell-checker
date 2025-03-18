import * as vscode from "vscode";
import { ErrorsResult } from "./interface/types";

let diagnosticCollection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection("longdoSpell");

export function onClearDiagnostics() {
  if (diagnosticCollection) {
    diagnosticCollection.clear();
  }
}

export function onShowDiagnostics(
  results: ErrorsResult[],
  editor: vscode.TextEditor,
) {
    
  diagnosticCollection.clear();

  const diagnostics: vscode.Diagnostic[] = results.map((error) => {
    const { line, start } = error.originalPosition;
    const wordLength = error.word?.length || 0;
    const range = new vscode.Range(
      new vscode.Position(line, start),
      new vscode.Position(line, start + wordLength)
    );

    const diagnostic = new vscode.Diagnostic(
      range,
      `คำที่อาจสะกดผิด: "${error.word}"${
        error.suggests.length
          ? `. แนะนำ: ${error.suggests.join(", ")}`
          : ""
      }`,
      vscode.DiagnosticSeverity.Information
    );

    diagnostic.source = "Longdo Spell Checker";
    return diagnostic;
  });
  diagnosticCollection.set(editor.document.uri, diagnostics);
}
