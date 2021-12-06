import { DICE_PREFIX } from "./index";
import { OnClickAction } from "./../util/html";
const diceTpl = `
<span id="text"></span>
<span> 🎲</span> `;

export const diceSpanHtml = (
  id: string,
  roll: string,
  result: number
): HTMLSpanElement => {
  const retv = document.createElement("span");
  retv.innerHTML = diceTpl;
  retv.className += "dice";
  retv.setAttribute("title", roll);
  retv.setAttribute("aria-label", roll);
  const t = retv.querySelector("#text");
  t.setAttribute("id", id);
  t.innerHTML = result.toString();
  retv.setAttribute("onclick", OnClickAction(DICE_PREFIX, id, roll));
  return retv;
};
