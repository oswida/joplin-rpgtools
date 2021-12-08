import joplin from "api";
import { ToolbarButtonLocation } from "api/types";

export class RpgPanel {
  view: string;

  constructor() {
    this.view = null;
  }

  async init() {
    this.view = await joplin.views.panels.create("rpg-panel");
    await joplin.views.panels.setHtml(this.view, "Loading...");
    // await panels.addScript(view, './webview.js');
    await joplin.views.panels.addScript(this.view, "./rpg-panel.css");

    joplin.workspace.onNoteChange(async () => {
      await this.update();
    });

    joplin.workspace.onNoteSelectionChange(async () => {
      await this.update();
    });

    await joplin.commands.register({
      name: "toggleRpgPanel",
      label: "Toggle RPG Panel",
      iconName: "fas fa-drum",
      execute: async () => {
        const isVisible = await joplin.views.panels.visible(this.view);
        await joplin.views.panels.show(this.view, !isVisible);
      },
    });
    await joplin.views.toolbarButtons.create(
      "toggleRpgPanel",
      "toggleRpgPanel",
      ToolbarButtonLocation.NoteToolbar
    );

    await this.update();
  }

  async update() {
    // const html = await getCurrentNoteHtml();
    // joplin.views.panels.setHtml(this.view, html);
  }
}
