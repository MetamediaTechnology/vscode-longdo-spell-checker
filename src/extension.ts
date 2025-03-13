import * as vscode from "vscode";
import { tabActiveLineCount } from "./text";
import { Command } from "./command";
import { spellCheckPromises } from "./spell";
import { ErrorsResult, TextEditing } from "./types";
import { onClearDiagnostics, onShowDiagnostics } from "./diagnostics";
import { Configuration } from "./configuration";
import { hideStatusBar, showStatusBar } from "./ui";

let errorsResult: ErrorsResult[] = [];
let typeOfError: TextEditing[] = [];

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        showStatusBar(context);
      } else {
        hideStatusBar(context);
      }
    })
  );

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      Configuration.languages,
      new Mistakes(),
      {
        providedCodeActionKinds: Mistakes.providedCodeActionKinds,
      }
    )
  );

  const disposable = vscode.commands.registerCommand(
    Command.CheckSpelling,
    async () => {
      errorsResult = [];
      onClearDiagnostics();
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const lines = document.lineCount;
      tabActiveLineCount(lines, document);

      try {
        const results = await spellCheckPromises();
        if (results.length === 0) {
          vscode.window.showInformationMessage(
            "ไม่พบการสะกดคำผิดในเอกสาร โปรดตรวจสอบด้วยตนเองเพื่อความแม่นยำ"
          );
          return;
        }
        onShowDiagnostics(results, editor);
        errorsResult = results;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while checking spelling.";
        vscode.window.showErrorMessage(errorMessage);
      }
    }
  );

  const markCheck = vscode.commands.registerCommand(
    "longdo-spell.markCheck",
    async (fixIndex) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      errorsResult = errorsResult.filter((err) => err !== fixIndex);
      onShowDiagnostics(errorsResult, editor);
    }
  );

  const clearCommand = vscode.commands.registerCommand(
    Command.ClearSpell,
    async () => {
      onClearDiagnostics();
    }
  );

  const openSetApiKey = vscode.commands.registerCommand(
    Command.OpenSetKey,
    async () => {
      const apiKey = await vscode.window.showInputBox({
        placeHolder: "Enter your Longdo API key",
        prompt: "Please enter your API key for Longdo Spell Checker",
        ignoreFocusOut: true,
      });

      if (apiKey) {
        const config = vscode.workspace.getConfiguration("longdo-spell");
        try {
          await config.update(
            "apiKey",
            apiKey,
            vscode.ConfigurationTarget.Global
          );
          vscode.window.showInformationMessage("API key saved successfully!");
        } catch (error) {
          console.error("Failed to update API key:", error);
          vscode.window.showErrorMessage(
            "Failed to save API key. Please try again."
          );
        }
      } else {
        vscode.window.showWarningMessage(
          "API key is required for Longdo Spell Checker to work properly."
        );
      }
    }
  );
  const showQuickPick = vscode.commands.registerCommand(
    Command.showQuickPick,
    async () => {
      const options = ["Spell Check", "Clear Spell Check", "Set API Key"];
      const selected = await vscode.window.showQuickPick(options, {
        placeHolder: "Select an action",
      });

      if (!selected) {
        return;
      }
      if (selected === "Spell Check") {
        vscode.commands.executeCommand(Command.CheckSpelling);
      }
      if (selected === "Clear Spell Check") {
        vscode.commands.executeCommand(Command.ClearSpell);
      }
      if (selected === "Set API Key") {
        vscode.commands.executeCommand(Command.OpenSetKey);
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(clearCommand);
  context.subscriptions.push(openSetApiKey);
  context.subscriptions.push(markCheck);
  context.subscriptions.push(showQuickPick);
  context.subscriptions.push(listenerDocumentChanged());
  // context.subscriptions.push(
  //   vscode.window.onDidChangeActiveTextEditor(() => {
  //     console.log("Active text editor changed");
  //   })
  // );
  // context.subscriptions.push(
  //   vscode.workspace.onDidChangeTextDocument(() => {

  //   })
  // );
}

function listenerDocumentChanged() {
  return vscode.workspace.onDidChangeTextDocument((e) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const changePos = editor.selection.active;
    const cursorLine = changePos.line;

    const typeOnTheError = errorsResult.find(
      (error) =>
        error.originalPosition.line === cursorLine &&
        changePos.character >= error.originalPosition.start &&
        changePos.character <= error.originalPosition.start + error.word.length
    );

    if (typeOnTheError) {
      const isExist = typeOfError.findIndex((data) => {
        return data.text === typeOnTheError.word;
      });
      if (isExist === -1) {
        typeOfError.push({
          type_count: 1,
          text: typeOnTheError.word,
        });
      } else {
        isExist >= 0 && typeOfError[isExist].type_count++;
        if (
          typeOfError[isExist].type_count >= typeOfError[isExist].text.length
        ) {
          const index = errorsResult.findIndex(
            (error) => error.word === typeOfError[isExist].text
          );
          if (index >= 0) {
            errorsResult.splice(index, 1);
            onShowDiagnostics(errorsResult, editor);
          }
        }
      }
    }
  });
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

    const error = matchingErrors.sort(
      (a, b) =>
        Math.abs(a.originalPosition.start - charPosition) -
        Math.abs(b.originalPosition.start - charPosition)
    )[0];

    const startPos = new vscode.Position(
      lineNumber,
      error.originalPosition.start
    );
    const endPos = new vscode.Position(
      lineNumber,
      error.originalPosition.start + error.word.length
    );

    const errorRange = new vscode.Range(startPos, endPos);

    const fixes = error.suggests.map((suggestion) => {
      const fix = new vscode.CodeAction(
        `Replace with: ${suggestion}`,
        vscode.CodeActionKind.QuickFix
      );

      fix.edit = new vscode.WorkspaceEdit();
      fix.edit.replace(document.uri, errorRange, suggestion);
      fix.isPreferred = true;
      fix.command = {
        title: "Replace",
        command: "longdo-spell.markCheck",
        arguments: [error],
      };
      return fix;
    });

    const markAsCorrect = new vscode.CodeAction(
      "Mark as Correct",
      vscode.CodeActionKind.QuickFix
    );
    markAsCorrect.command = {
      title: "Mark as Correct",
      command: "longdo-spell.markCheck",
      arguments: [error],
    };

    return [...fixes, markAsCorrect];
  }

  private isAtStartWrongWord(range: vscode.Range): boolean {
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
