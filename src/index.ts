import joplin from "api";
import { ContentScriptType } from "api/types";
import { RTPlugin } from "./plugin/main";

var plugin: RTPlugin;

joplin.plugins.register({
  onStart: async function () {
    plugin = new RTPlugin();

    await joplin.contentScripts.onMessage("rpgtools-content", (msg: string) => {
      plugin.processMessage(msg);
    });

    // joplin.workspace.onNoteChange();

    await joplin.contentScripts.register(
      ContentScriptType.MarkdownItPlugin,
      "rpgtools-content",
      "./plugin/script/contentScript.js"
    );
  },
});
