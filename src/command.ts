/**
 * Enum representing commands used in Longdo Spell extension.
 */
export enum Command {
  /**
   * Command to check spelling in the current document.
   */
  CheckSpelling = "longdo-spell.spell",

  /**
   * Command to clear spelling decorations in the current document.
   */
  ClearSpell = "longdo-spell.clear",

  /**
   * Command to open the set key.
   */
  SetAPIKey = "longdo-spell.setKey",

  /**
   *
   * Command to open the settings UI.
   *
   */
  openSettingUI = "longdo-spell.openSettings",
}
