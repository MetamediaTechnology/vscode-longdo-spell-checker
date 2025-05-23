# Change Log

All notable changes to the "longdo-spell-checker" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Released]
### [0.2.10] : 13/04/2568
- refactor: Can use the extension with default key

### [0.2.9] : 22/04/2568
- refactor: Improved notification for better experience.

### [0.2.8] : 21/04/2568
- feat: Set spell checking on save as the default behavior
- refactor: Change configuration name from longdo-spell-checker to Longdo Spell Checker.
- feat: Enhanced status bar to reflect different states:
    - Check mark when no spelling errors are found
    - Disconnection icon when API key is missing
    - Offline indicator when internet connection is unavailable

### [0.2.7] : 10/04/2568
- chore: Add URL to web console page in the setting description
- refactor: Dialog to ask before change API Key
- refactor: Add dialog for ask to set key when key is empty.
- refactor: typescript supported.
- feat: add check if link in code.

### [0.2.6] : 08/04/2568
- feat: Added option to enable/disable English spell checking
- fix: Corrected language detection for mixed content files
- improve: Enhanced spell checking performance for multilingual documents
- fix: Changed extension reference from "longdo-spell" to "longdo-spell-checker" for consistency
- docs: Updated documentation to reflect correct extension name throughout


### [0.2.5] : 08/04/2568
- feat: Added ability to switch display language
- feat: Added rule to exclude specific JavaScript syntax from spell checking

### [0.2.4] : 03/04/2568
- fix: Fixed position calculation when emoji appears at the beginning of text.
- chore: Updated logo for a more modern look and feel

### [0.2.3] : 03/04/2568
- fix: Fixed Thai spell checking being applied to English-focused files like JS and Markdown

### [0.2.2] : 03/04/2568
- fix: Fixed incorrect cursor position when spaces exist at the beginning of lines 
- refactor: Simplified code by standardizing configuration usage across components
- fix(text): fix incorrect index of the word is emoji :3 

## [Unreleased]
### [0.2.1] : 02/04/2568
- fix:Supports English spelling for  JS, Markdown file
- fix:Bugs Error spelling when disable on save.

### [0.2.0] : 24/03/2568
- refactor(text): remember marked the words and remove highlights all of the word until restart vscode
- feat: add English word checking support (excluding grammar)
- chore: improve offline mode behavior
- Suppress notification boxes when in offline mode.
- Add internet connectivity checks.
- fix: Fixed issue with language switching functionality not working correctly
- feat: Added automatic spell checking option that suppresses notifications
- improve: Enhanced notification system to respect user preferences
- feat: Implemented variable substitution instead of direct text insertion
- perf: Enhanced code architecture by replacing bad coding values with variables
- improve: Refactored implementation to use dynamic variable references for better maintainability


### [0.1.5] : 17/03/2568 perf: Improved code performance through optimization
- improve: Enhanced TypeScript typing's for better type safety and developer experience

### [0.1.4] : 13/03/2568
 - fix: Resolved title formatting issues for consistent display
 - fix(diagnostics): Fixed issue where diagnostics continued to display due to caching previous spell check results
 - fix(diagnostics): Fixed issue where error notifications persisted after deleting selected misspelled text
 
### [0.1.3] : 13/03/2568
 - feat: Hide sidebar menu in the bottom right when no files are open

### [0.1.2] : 12/03/2568
 - feat: Added UI improvement with Longdo Spell action buttons in the menu for spell checking, clearing, and key settings
 - fix: Fixed bug where Diagnostics data wasn't cleared when performing multiple spell checks
 - improve: Implemented clearing of Diagnostics when removing misspelled word positions

### [0.1.1] : 06/03/2568
 - feat: Changed from just showing underline to showing diagnostics, but it does not affect or interfere with the code execution in any way.
 - feat: Can use quick fix via diagnostic popup
 - 

### [0.1.0] : 05/03/2568
 - feat: Quick fix for replace of the word is spell errors.
 - chore: refactor code.
 - fix: Highlighted and recommend
 
### [0.0.1]
 - Highlighted of the word is not correct
