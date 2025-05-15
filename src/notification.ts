import * as vscode from "vscode";
import { Command } from "./command";

export async function showWarningAPIKey() {
  const action = await vscode.window.showWarningMessage(
    "You're using the default API key. For best results, please set your own API key.",
    "Set API Key",
    "Get API Key",
    "Dismiss"
  );

  if (action === "Set API Key") {
    vscode.commands.executeCommand(Command.OpenSetKey);
    return;
  } else if (action === "Get API Key") {
    vscode.commands.executeCommand(Command.openWebAPI);
    return;
  }
}

export async function showErrorAPIKey() {
  const actionItems = ["Yes", "No", "Get API Key"];
  const notification = await vscode.window.showWarningMessage(
    "API key is not set. Do you want to set it now?",
    ...actionItems
  );

  if (notification === "Yes") {
    vscode.commands.executeCommand(Command.OpenSetKey);
  } else if (notification === "Get API Key") {
    vscode.commands.executeCommand(Command.openWebAPI);
  }
}
