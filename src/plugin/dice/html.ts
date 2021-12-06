import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const diceTpl = `
<span id="text"></span>
<span> 🎲</span> `;

export const diceSpanHtml = (
  result: DiceRoll,
  sid: string
): HTMLSpanElement => {
  const retv = document.createElement("span");
  retv.innerHTML = diceTpl;
  retv.className += "dice";
  retv.setAttribute("title", result.notation);

  const t = retv.querySelector("#text");
  t.setAttribute("id", sid);
  t.innerHTML = result.total.toString();

  return retv;
};
