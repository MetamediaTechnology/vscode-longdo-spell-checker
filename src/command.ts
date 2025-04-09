/**
 * Enum representing commands used in Longdo Spell extension.
 */
export enum Command {
  /**
   * Command to check spelling in the current document.
   */
  CheckSpelling = "longdo-spell-checker.spell",

  /**
   * Command to clear spelling decorations in the current document.
   */
  ClearSpell = "longdo-spell-checker.clear",

  /**
   * Command to open the set key
   */

  OpenSetKey = "longdo-spell-checker.openSetKey",

  /**
   * Command to open the set key.
   */
  SetAPIKey = "longdo-spell-checker.setKey",

  /**
   *
   * Command to open the settings UI.
   *
   */
  openSettingUI = "longdo-spell-checker.openSettings",

  /**
   * 
   * Command to open the web api page.
   * 
   */
  openWebAPI = "longdo-spell-checker.openWebConsole",

  /**
   * 
   * 
   * Command to show quick pick for select command.
   * 
   */
  showQuickPick = "longdo-spell-checker.showQuickPick",
}
