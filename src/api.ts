import { ApiResponse } from "./interface/types";
import { updateEmoji } from "./statusbar";
import * as vscode from "vscode";

/**
 * 
 * @returns 
 * Check if the internet connection is available
 * @throws Error if the network is not available
 */
async function checkInternetConnection(): Promise<boolean> {
  try {
    await fetch('https://api.longdo.com', { 
      method: 'HEAD',
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 
 * @param text 
 * @returns json data from Longdo API
 * @throws Error if the API request fails
 */
async function postProof(text: string) {
  try {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      updateEmoji("$(debug-disconnect)");
      throw new Error("NetworkError");
    }

    const apiKey = vscode.workspace.getConfiguration("longdoSpellChecker").get("apiKey");
    if (!apiKey) {
      updateEmoji("$(debug-disconnect)");
      throw new Error("API key is not set. Please set it in the settings.");
    }
    
    const response = await fetch("https://api.longdo.com/spell-checker/proof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        key: apiKey 
      }),
    });

    const result = await response.json() as ApiResponse;
    if (!result.status || result.status !== 200) {
      throw new Error(result?.message || "API Error");
    }
    return result;
  } catch (error: unknown) {
    throw error;
  }
}

export {
    postProof
};