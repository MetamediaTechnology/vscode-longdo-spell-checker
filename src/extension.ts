import * as vscode from "vscode";
import { tabActiveLineCount, dataToSend, findOriginalPosition } from "./text";

import { postProof } from "./api";
import { Position, ProofResponse } from "./types";
import { Command } from "./command";
import { setDecorations, clearDecorations } from "./decoration";
import { openSettingUI } from "./settings";
import { spellCheckPromises } from "./spell";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    Command.CheckSpelling,
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const lines = document.lineCount;

      tabActiveLineCount(lines, document);

      const results = await spellCheckPromises();
      
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

export function deactivate() {}
