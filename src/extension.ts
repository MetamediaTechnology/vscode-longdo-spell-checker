import * as vscode from "vscode";
import { tabActiveLineCount } from "./text";
import { Command } from "./command";
import { openSettingUI } from "./settings";
import { spellCheckPromises } from "./spell";
import { setDecorations, clearDecorations } from "./decoration";
import { ErrorsResult } from "./types";

let errorsResult: ErrorsResult[] = [];

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      ["markdown", "vue"],
      new Mistakes(),
      {
        providedCodeActionKinds: Mistakes.providedCodeActionKinds,
      }
    )
  );

  const disposable = vscode.commands.registerCommand(
    Command.CheckSpelling,
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      errorsResult = [];

      const document = editor.document;
      const lines = document.lineCount;

      tabActiveLineCount(lines, document);

      const results = await spellCheckPromises();
      errorsResult = results;
      console.log("errorsResult", errorsResult);

      setDecorations(editor, results);
    }
  );

  const clearCommand = vscode.commands.registerCommand(
    Command.ClearSpell,
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      clearDecorations(editor);
    }
  );

  const setAPIKey = vscode.commands.registerCommand(
    Command.SetAPIKey,
    async () => {
      const apiKey = await vscode.window.showInputBox({
        placeHolder: "Enter your Longdo Dict API key",
        prompt: "Please enter your API key for Longdo Spell Checker",
        ignoreFocusOut: true,
      });

      if (apiKey) {
        await vscode.workspace
          .getConfiguration("longdoSpell")
          .update("apiKey", apiKey, true);
        vscode.window.showInformationMessage("API key saved successfully!");
      } else {
        vscode.window.showWarningMessage(
          "API key is required for Longdo Spell Checker to work properly."
        );
      }
    }
  );

  const openSettingUICommand = vscode.commands.registerCommand(
    "longdo-spell.openSettings",
    async () => {
      openSettingUI();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(clearCommand);
  context.subscriptions.push(setAPIKey);
  context.subscriptions.push(openSettingUICommand);
}

/**
 * Provides suggestions for fixing spelling mistakes.
 */
export class Mistakes implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    if (!this.isAtStartWrongWord(range)) {
      return;
    }
    
    const lineNumber = range.start.line;
    const charPosition = range.start.character;
    

    const matchingErrors = errorsResult.filter(
      (err) => 
      err.originalPosition.line === lineNumber &&
      charPosition >= err.originalPosition.start &&
      charPosition <= err.originalPosition.end
    );
    
    if (matchingErrors.length === 0) {
      return;
    }
    
    const error = matchingErrors.sort((a, b) => 
      Math.abs(a.originalPosition.start - charPosition) - 
      Math.abs(b.originalPosition.start - charPosition)
    )[0];
    
    const startPos = new vscode.Position(lineNumber, error.originalPosition.start);
    const endPos = new vscode.Position(lineNumber, (error.originalPosition.start + error.word.length));
    const errorRange = new vscode.Range(startPos, endPos);
    
    return error.suggests.map((suggestion) => {
      const fix = new vscode.CodeAction(
      `Replace with: ${suggestion}`,
      vscode.CodeActionKind.QuickFix
      );
      
      fix.edit = new vscode.WorkspaceEdit();
      fix.edit.replace(document.uri, errorRange, suggestion);
      fix.isPreferred = true;
      fix.command = {
      title: 'Run Spell Checker',
      command: Command.CheckSpelling
      };
      return fix;
    });
  }

  private isAtStartWrongWord(
    range: vscode.Range
  ): boolean {
    const start = range.start;
    for (const error of errorsResult) {
      if (error.originalPosition.line === start.line) {
        if (
          start.character >= error.originalPosition.start &&
          start.character <= error.originalPosition.end
        ) {
          return true;
        }
      }
    }
    return false;
  }
}

export function deactivate() {}
