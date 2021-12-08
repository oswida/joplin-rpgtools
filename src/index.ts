import joplin from "api";
import { ContentScriptType } from "api/types";
import { RTPlugin } from "./plugin/main";

var plugin: RTPlugin;

joplin.plugins.register({
  onStart: async function () {
    plugin = new RTPlugin();

    await plugin.rpgPanel.init();

    await joplin.contentScripts.onMessage("rpgtools-content", (msg: string) => {
      return plugin.processMessage(msg);
    });

    await joplin.contentScripts.register(
      ContentScriptType.MarkdownItPlugin,
      "rpgtools-content",
      "./plugin/script/contentScript.js"
    );
  },
});
