import * as vscode from "vscode";
import  {
  tabActiveLineCount,
  dataToSend,
  mapApiResponseToOriginalIndices
} from './text';

import {
  postProof
} from './api';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "longdo-spell.spell",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const lines = document.lineCount;

      tabActiveLineCount(lines, document);

      dataToSend.forEach(async (data: any) => {
          const spell = await postProof(data.text, data.indices);
          const maping = mapApiResponseToOriginalIndices(spell, data);
      });


    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
