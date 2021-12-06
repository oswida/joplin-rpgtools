import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import joplin from "api";
import { RTMessage } from "../main";
import { findInline, replaceInlineContent } from "./../util/markdown";
import { getCurrentNoteBody } from "./../util/note";
import { DICE_PREFIX } from "./index";

export const ProcessDiceMessage = async (msg: RTMessage) => {
  const content = await getCurrentNoteBody();
  if (content == null) return;
  const ind = findInline(content, `${DICE_PREFIX}:${msg.id}`);
  if (!ind) return;
  //prefix:id:roll:result
  const parts = ind.text.split(":");
  const roll = new DiceRoll(parts[2]);
  parts[3] = roll.total.toString();
  const newContent = parts.join(":");
  let retv = content;
  retv = replaceInlineContent(retv, ind, newContent);
  const note = await joplin.workspace.selectedNote();
  await joplin.data.put(["notes", note.id], null, {
    body: retv,
  });
  await joplin.commands.execute("editor.setText", retv);
};
