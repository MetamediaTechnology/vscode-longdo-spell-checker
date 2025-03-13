# Longdo Spell Checker for VS Code 

![Build Status](https://github.com/MetamediaTechnology/vscode-longdo-spell/actions/workflows/node.js.yml/badge.svg)

Longdo Spell Checker is a VSCode extension for Thai spell checking. It highlights errors and suggests corrections, helping you write accurate Thai text effortlessly. 🚀

![Longdo Spell Checker](https://api.longdo.com/spell-checker/static/images/vscode/preview.gif)

---  

## 🔧 Installation  

### 1. Get an API Key (Free)  
To use Longdo Spell Checker, you need an API key, which allows up to **100,000 free requests per month**.  
🔗 **Register for free** at [Longdo Account](https://map.longdo.com/console/).  

### 2. Configure the API Key  
Choose one of the following methods:  

#### **Option 1: Set via VS Code Settings**  
1. Open **VS Code Settings**  
   - **Windows/Linux:** `File > Preferences > Settings`  
   - **MacOS:** `Code > Preferences > Settings`  
2. Search for **"Longdo Spell Checker"**  
3. Enter your **API Key**  

![Settings](https://api.longdo.com/spell-checker/static/images/vscode/setup_1.png)  

#### **Option 2: Set via `settings.json`**  
1. Open **settings.json**  
   - **Windows/Linux:** `File > Preferences > Settings` > Click `{}` (top right)  
   - **MacOS:** `Code > Preferences > Settings` > Click `{}` (top right)  
2. Add the following configuration:  
   ```json
   "longdo-spell-checker.apiKey": "YOUR_API_KEY"
   ```  

---  

## ✨ How to Use  

### ✅ **Using the UI**  
Once installed, you’ll see **Longdo Spell** in the **status bar (bottom right)**.  
- Click on it to access options such as **Check Spelling (Current Tab)** or **Clear All Errors (Current Tab)**.  

### 🎯 **Using Commands**  
1. Open the **Command Palette**:  
   - **Windows/Linux:** `Ctrl + Shift + P`  
   - **MacOS:** `Cmd + Shift + P`  
2. Type and select:  
   - `Longdo Spell Checker: Check Spelling (Current Tab)` → Check spelling  
   - `Clear All Errors (Current Tab)` → Clear suggestions  

---

## 💡 Features  

✅ **Thai spell checking with suggestions**  
✅ **Quick fix for spelling errors**  
✅ **Supports multiple file types**  
✅ **Customizable settings**  

---

## 🌏 Language Support  

| Language | Support Level |
|----------|--------------|
| 🇹🇭 Thai  | ✅ Full Support |
| 🇬🇧 English | ❌ None |

---

## 📂 Supported File Extensions  

| File Type  | Supported |
|------------|-----------|
| Markdown (.md), JavaScript (.js), TypeScript (.ts) | ✅ |
| Python (.py), PHP (.php), Vue (.vue), Go (.go) | ✅ |
| HTML (.html), CSS (.css), JSON (.json), Dart (.dart) | ✅ |
| Ruby (.rb), Java (.java), C (.c), C++ (.cpp) | ✅ |
| C# (.cs), XML (.xml), YAML (.yml/.yaml), Plain Text (.txt) | ✅ |
| Shell Script (.sh), SQL (.sql), Rust (.rs) | ✅ |

---

## 📜 Terms of Use  

The extension **requires an API key** because spell checking is processed on a server.  
- **Free Tier**: 100,000 requests/month  
- **Text Limit**: If your text exceeds **1,024 characters**, it will be split into multiple requests.  

📌 Example:  
- A **1,025-character** text = **2 requests**  
- A **5,000-character** text = **5 requests**  

🔗 **Register for an API Key:** [Longdo Console](https://map.longdo.com/console/) (It's free!)  

---

## 🔒 Privacy Policy  

- **No personal data is stored.**  
- All Thai text sent is used **only** for spell-checking purposes.  
