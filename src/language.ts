/**
 *
 * Language class to handle the language of the editor
 * Author:  bankji
 * Date: 2025/03/22
 *
 */

import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");
export class Language {
  private static instance: Language;
  private LanguageData: { [key: string]: string } | null = null;

  private constructor() {
    this.LanguageData = this.loadLanguage();
  }

  /**
   * Returns the singleton instance of Language
   */
  public static getInstance(): Language {
    if (!Language.instance) {
      Language.instance = new Language();
    }

    return Language.instance;
  }

  /**
   * Switches the language of the editor
   */
  public switchLanguage() {
    const currentLanguage =
      vscode.workspace.getConfiguration("longdoSpellChecker").get("locale") ?? "en";
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    vscode.workspace
      .getConfiguration("longdoSpellChecker")
      .update("locale", newLanguage, vscode.ConfigurationTarget.Global);
  }

  /**
   * Returns the language of the current editor
   */
  public getLanguage(): string {
    const locale = vscode.workspace.getConfiguration("longdoSpellChecker").get("locale") as string;
    return locale === "Thai" ? "th" : "en";
  }

  /**
   *
   * @param key
   *
   * Returns the translation of the key
   */

  public getTranslation(key: string): string {
    return this.LanguageData?.[key] ?? key;
  }

  /**
   * Loads the language file
   */
  private loadLanguage(): Record<string, string> | null {
    try {
      const language = this.getLanguage();
      // Get extension path instead of using __dirname
      const extensionPath = vscode.extensions.getExtension("metamediatechnology.longdo-spell-checker")?.extensionPath;
      
      if (!extensionPath) {
        console.error("Extension path not found");
        return null;
      }
      
      const languageFilePath = path.join(
        extensionPath,
        "src",
        "i18n",
        `${language}.json`
      );

      if (fs.existsSync(languageFilePath)) {
        const languageData = JSON.parse(
          fs.readFileSync(languageFilePath, "utf8")
        );
        console.log(`Language file loaded: ${languageFilePath}`);
        return languageData;
      } else {
        console.error(`Language file not found: ${languageFilePath}`);
        return null;
      }
    } catch (error) {
      console.error("Error loading language file:", error);
      return null;
    }
  }
}
