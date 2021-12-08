import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { RTMessage } from "../main";
import { findInline, replaceInlineContent } from "./../util/markdown";
import {
  getCurrentNoteBody,
  getNoteBody,
  getNoteLine,
  saveCurrentNoteBody,
} from "./../util/note";
import { rtDataContainer } from "./../util/toolsdata";
import { DICE_PREFIX, rollOnFolder, rollOnNote } from "./index";

export const ProcessDiceMessage = async (msg: RTMessage) => {
  switch (msg.type) {
    case `${DICE_PREFIX}:roll`:
      return processRoll(msg);
  }
};

const processRoll = async (msg: RTMessage) => {
  const content = await getCurrentNoteBody();
  if (content == null) return;
  const ind = findInline(content, `${DICE_PREFIX}:${msg.id}`);
  if (!ind) return;
  let retv = content;
  //prefix:id:roll:result
  const parts = ind.text.split(":");
  if (parts[2].startsWith("#")) {
    // note id
    const noteId = parts[2].replace("#", "");
    parts[3] = await rollOnNote(noteId);
    rtDataContainer.data.dice[parts[1]] = await getNoteLine(
      noteId,
      Number.parseInt(parts[3])
    );
  } else if (parts[2].startsWith("/")) {
    // folder id
    parts[3] = await rollOnFolder(parts[2].replace("/", ""));
    rtDataContainer.data.dice[parts[1]] = await getNoteBody(parts[3]);
  } else {
    try {
      const roll = new DiceRoll(parts[2]);
      parts[3] = roll.total.toString();
    } catch (e) {
      parts[3] = "error";
    }
  }
  const newContent = parts.join(":");
  retv = replaceInlineContent(retv, ind, newContent);
  retv = rtDataContainer.updateNote(retv);

  saveCurrentNoteBody(retv);
  return;
};
