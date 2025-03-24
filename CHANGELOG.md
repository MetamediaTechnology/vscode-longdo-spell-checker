# Change Log

All notable changes to the "longdo-spell" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### [0.2.1] : 24/03/2568
- fix: Fixed issue with language switching functionality not working correctly

### [0.2.0] : 24/03/2568
- feat: Implemented variable substitution instead of direct text insertion
- perf: Enhanced code architecture by replacing hardcoded values with variables
- improve: Refactored implementation to use dynamic variable references for better maintainability
- feat: Can switch language 

### [0.1.5] : 17/03/2568
- perf: Improved code performance through optimization
- improve: Enhanced TypeScript typings for better type safety and developer experience

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
 - feat: Changed from just showing underline to showing dianostics, but it does not affect or interfere with the code execution in any way.
 - feat: Can use quick fix via dianostics popup
 - 

### [0.1.0] : 05/03/2568
 - feat: Quick fix for replace of the word is spell errors.
 - chore: Reflector code.
 - fix: Highlighted and recommend
 
### [0.0.1]
 - Highlighted of the word is not correct
