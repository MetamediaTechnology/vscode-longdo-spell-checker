import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension can be activated", () => {
  test("Extension is activated", async () => {
    const extension = vscode.extensions.getExtension(
      "metamediatechnology.longdo-spell"
    );
    assert.ok(extension, "Extension not found");
    await extension?.activate();
    assert.ok(extension?.isActive, "Extension is not active");
  });
});

suite("Extension can be readed and set configuration", () => {
  test("Extension configuration is set", async () => {
    const config = vscode.workspace.getConfiguration("longdo-spell");
    await config.update("apiKey", "test", vscode.ConfigurationTarget.Global);
    assert.strictEqual(config.get("apiKey"), "test", "Configuration not set");
  });
});
