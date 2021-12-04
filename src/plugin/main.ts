import joplin from "api";
import { setupRenderer } from "./dice/renderer";
import { ProcessDiceMessage } from "./dice/roller";
import MarkdownIt = require("markdown-it");

export const CONTENT_SCRIPT_ID = "9aa48bf2-277d-4765-b263-3b8d829e4d1d";

const title = `
<h1>Rpg Tools</h1>
`;

class RTPlugin {
  currentHtml: string;
  joplinView: string;

  constructor(view: string) {
    this.joplinView = view;
    this.currentHtml = "";
  }

  async updateRTView(view: string) {
    const note = await joplin.workspace.selectedNote();
    const md = new MarkdownIt();
    setupRenderer(view, md);
    this.currentHtml = title + md.render(note.body);
    joplin.views.panels.setHtml(view, this.currentHtml);
  }

  processMessage(msg: string) {
    try {
      var decoded = atob(msg);
    } catch (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(decoded) as RTMessage;
    if (data.type.startsWith("dice:")) {
      ProcessDiceMessage(this.joplinView, this.currentHtml, data);
    }
  }
}

export var plugin: RTPlugin;

export interface RTMessage {
  type: string;
  id: string;
  data: string;
}
