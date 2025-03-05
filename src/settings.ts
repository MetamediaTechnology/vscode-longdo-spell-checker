import * as vscode from "vscode";

function renderHTML() {
  return `<html> 
 <head>
     <style>
         body {
             font-family: Arial, sans-serif;
             padding: 20px;
             text-align: center;
         }
 
         h1 {
             font-size: 1.5em;
         }
 
         p {
             font-size: 1em;
         }
 
         input {
             padding: 5px;
             margin: 5px;
         }
 
         button {
             padding: 5px 10px;
             margin: 5px;
             background-color: #007acc;
             color: white;
             border: none;
             cursor: pointer;
         }
 
         .container {
             max-width: 400px;
             margin: 0 auto;
         }
     </style>
 </head>
 
 <body>
     <div class="container">
         <h1>Longdo Spell Checker Settings</h1>
         <p>Enter your Longdo Dict API key below:</p>
         <input type="text" id="apiKey" placeholder="Enter your API key" />
         <button id="saveButton">Save</button>
     </div>
     <script>
         const vscode = acquireVsCodeApi();
         const apiKeyInput = document.getElementById("apiKey");
         const saveButton = document.getElementById("saveButton");
         saveButton.addEventListener("click", () => {
             vscode.postMessage({
                 command: "save",
                 apiKey: apiKeyInput.value
             })
         })
     </script>
 </body>
 
 </html>`;
}

export function openSettingUI() {
  const panel = vscode.window.createWebviewPanel(
    "longdoSpellSettings",
    "Longdo Spell Checker Settings",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );
  panel.webview.html = renderHTML();
}
