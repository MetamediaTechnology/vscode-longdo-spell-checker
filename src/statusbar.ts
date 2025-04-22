import * as vscode from 'vscode';
import { Command } from './command';

const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
statusBar.text = "$(pass) Longdo Spell";
statusBar.command = Command.showQuickPick;

export function showStatusBar(context: vscode.ExtensionContext) {

  statusBar.show();
  context.subscriptions.push(statusBar);
}

export function updateStatusBar(text:string) {
  statusBar.text = text;
}

export function updateEmoji(emoji: string) {
  statusBar.text = emoji + " Longdo Spell";
}

export function hideStatusBar(context: vscode.ExtensionContext) {
  statusBar.hide();
  context.subscriptions.push(statusBar);
}