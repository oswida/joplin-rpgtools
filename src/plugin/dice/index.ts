import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { errorHtml } from "./../util/html";
import { diceSpanHtml } from "./html";
export const DICE_PREFIX = "rpg-dice";

export const rpgDiceInlineContent = (text: string): string => {
  const parts = text.split(":");
  if (parts.length < 3)
    return errorHtml(
      "Dice inline code should have id and roll specification, for example `dice:id:2d6`."
    );
  if (parts.length >= 4) {
    let res = Number.parseInt(parts[3]);
    if (Number.isNaN(res)) {
      return errorHtml("Bad roll result: " + parts[3]);
    } else {
      return diceSpanHtml(parts[1], parts[2], res).outerHTML;
    }
  } else {
    const roll = new DiceRoll(parts[2]);
    return diceSpanHtml(parts[1], parts[2], roll.total).outerHTML;
  }
};
