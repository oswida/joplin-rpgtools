import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import joplin from "api";
import { errorHtml } from "./../util/html";
import { diceSpanHtml } from "./html";

export const DICE_PREFIX = "rpg-dice";

export const rpgDiceInlineContent = (text: string): string => {
  const parts = text.split(":");
  if (parts.length < 3)
    return errorHtml(
      "Dice inline code should have id and roll specification, for example `dice:id:2d6` or `dice:id:note_id`."
    );
  if (parts.length >= 4) {
    return diceSpanHtml(parts[1], parts[2], parts[3]).outerHTML;
  } else {
    try {
      const roll = new DiceRoll(parts[2]);
      return diceSpanHtml(parts[1], parts[2], roll.total.toString()).outerHTML;
    } catch (e) {
      const roll = "click to roll";
      return diceSpanHtml(parts[1], parts[2], roll).outerHTML;
    }
  }
};

export const rollOnNote = async (id: string): Promise<string> => {
  const note = await joplin.data.get(["notes", id], { fields: ["id", "body"] });
  if (!note) return "";
  const lines = note.body.trim().split("\n");
  const roll = new DiceRoll("1d" + lines.length.toString());
  return roll.total.toString();
};

const linkTpl = `
<a data-from-md="" data-resource-id="$id" href="#" onclick="ipcProxySendToHost(&quot;joplin://$id&quot;, { resourceId: &quot;$id&quot; }); return false;">
<span class="resource-icon fa-joplin"></span>$title</a>
`;

export const rollOnFolder = async (data: string): Promise<string> => {
  const parts = data.split("|");
  const notes = await joplin.data.get(["folders", parts[0], "notes"], {
    fields: ["id"],
  });
  if (!notes) return "";
  const roll = new DiceRoll("1d" + notes.items.length.toString());
  const item = notes.items[roll.total - 1];
  return item.id;
};
