import { ApiResponse } from "./interface/types";
import * as vscode from "vscode";


async function postProof(text: string) {
    try {
      const response = await fetch("https://api.longdo.com/spell-checker/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          key: vscode.workspace.getConfiguration("longdo-spell").get("apiKey"),
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