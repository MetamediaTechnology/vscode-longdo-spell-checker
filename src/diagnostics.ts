import * as vscode from "vscode";
import { ErrorsResult } from "./interface/types";
import { Language } from "./language";

const lang = Language.getInstance();
let diagnosticCollection: vscode.DiagnosticCollection =
  vscode.languages.createDiagnosticCollection("longdoSpell");

export class Diagnostics {
  /**
   * Clears all diagnostics from the editor
   */
  public static clearDiagnostics() {
    diagnosticCollection.clear();
  }

  /**
   * Shows diagnostics in the editor
   * @param results - the errors result
   * @param editor - the text editor
   */
  public static onShowDiagnostics(results: ErrorsResult[], editor: vscode.TextEditor) {
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
        `${lang.getTranslation("potentialMistake")} "${error.word}"${
          error.suggests.length ? `. ${lang.getTranslation("suggest")}: ${error.suggests.join(", ")}` : ""
        }`,
        vscode.DiagnosticSeverity.Information
      );

      diagnostic.source = "Longdo Spell Checker";
      return diagnostic;
    });
    diagnosticCollection.set(editor.document.uri, diagnostics);
  }
}
