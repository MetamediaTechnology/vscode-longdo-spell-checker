import * as vscode from 'vscode';
import { Command } from './command';


export function statusBar(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text = "$(pass) Longdo Spell";
  statusBar.command = Command.showQuickPick;
  statusBar.show();
  context.subscriptions.push(statusBar);

}