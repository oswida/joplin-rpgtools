import joplin from "api";
import {
  CONTENT_SCRIPT_ID,
  ProcessRTMessage,
  updateRTView,
} from "./plugin/main";

joplin.plugins.register({
  onStart: async function () {
    const contentScriptId = CONTENT_SCRIPT_ID;

    const view = await joplin.views.panels.create("RTView");
    await joplin.views.panels.addScript(view, "./plugin/rpgtools.css");
    await joplin.views.panels.setHtml(view, "Loading...");

    joplin.workspace.onNoteSelectionChange(() => {
      updateRTView(view);
    });

    joplin.workspace.onNoteChange(() => {
      updateRTView(view);
    });

    await joplin.views.panels.onMessage(view, (message: string) => {
      ProcessRTMessage(view, message);
    });

    // await joplin.contentScripts.register(
    //   ContentScriptType.MarkdownItPlugin,
    //   contentScriptId,
    //   "./dice.js"
    // );
  },
});
