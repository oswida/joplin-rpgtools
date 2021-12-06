import { CLOCK_PREFIX } from "./clock/index";
import { ProcessClockMessage } from "./clock/msg";
import { ProcessDiceMessage } from "./dice/msg";

export class RTPlugin {
  noteHash: Record<string, string>;

  constructor() {
    this.noteHash = {};
  }

  processMessage(msg: string) {
    try {
      var decoded = atob(msg);
    } catch (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(decoded) as RTMessage;
    console.log("Message", data);

    if (data.type.startsWith("dice")) {
      ProcessDiceMessage(data);
    } else if (data.type.startsWith(CLOCK_PREFIX)) {
      ProcessClockMessage(data);
    }
  }
}

export interface RTMessage {
  type: string;
  id: string;
  data: string;
}

// const crypto = require("crypto");
// async updateRTView(view: string) {
//   const note = await joplin.workspace.selectedNote();
//   let hash = this.noteHash[note.id];

//   const check = crypto.createHash("sha1").update(note.body).digest("base64");
//   if (check == hash) {
//     // Seems that metadata has changed
//     return;
//   }
//   this.noteHash[note.id] = crypto
//     .createHash("sha1")
//     .update(note.body)
//     .digest("base64");

//   const md = new MarkdownIt();
//   this.currentHtml = page.replace("{content}", md.render(note.body));
//   joplin.views.panels.setHtml(view, this.currentHtml);
// }
