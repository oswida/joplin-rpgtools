import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { clickAction } from "./../util/html";
import { rtDataContainer } from "./../util/toolsdata";
import { DICE_PREFIX } from "./index";

const diceTpl = `
<span id="text"></span>
<span> 🎲</span> `;

export const diceSpanHtml = (
  id: string,
  roll: string,
  result: string
): HTMLSpanElement => {
  const retv = document.createElement("span");
  retv.innerHTML = diceTpl;
  retv.className += "dice";
  retv.setAttribute("title", roll);
  retv.setAttribute("aria-label", roll);
  retv.setAttribute("onclick", clickAction(`${DICE_PREFIX}:roll`, id, roll));
  const t = retv.querySelector("#text");
  t.setAttribute("id", id);

  try {
    const r = new DiceRoll(roll);
    // it is ok., looks like dice
    t.innerHTML = result;
  } catch (e) {
    const res = rtDataContainer.data.dice[id];
    if (res) {
      t.innerHTML = res;
    } else {
      t.innerHTML = "no data!";
    }
  }
  return retv;
};
