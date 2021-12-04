import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import joplin from "api";
import { RTMessage } from "../main";

export const ProcessDiceMessage = (
  view: string,
  content: string,
  msg: RTMessage
) => {
  var doc = new Document();
  var h = doc.createElement("html");
  h.innerHTML = content;
  doc.appendChild(h);

  const el = doc.getElementById(msg.id);
  if (el) {
    switch (msg.type) {
      case "dice:roll": {
        const roll = new DiceRoll(msg.data);
        (el as HTMLSpanElement).innerHTML = roll.total.toString();
        joplin.views.panels.setHtml(view, h.outerHTML);
      }
    }
  } else {
    console.error("Cannot find element with id=" + msg.id);
  }
};
