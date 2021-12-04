import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { RTMessage } from "../main";
const diceCss = `
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-right: 5px;
    background: #eeeeee;
    border: solid 1px grey;
    border-radius: 5px;
    cursor: hand;
`;

export const createDiceBlock = (
  result: DiceRoll,
  sid: string,
  view: string
): HTMLSpanElement => {
  const retv = document.createElement("span");
  retv.setAttribute("id", sid);
  retv.style.cssText = diceCss;
  retv.innerHTML = result.total.toString();
  retv.setAttribute("title", result.notation);
  const btn = document.createElement("span");
  btn.style.cursor = "hand";
  btn.innerHTML = " 🎲";
  const msg = <RTMessage>{
    type: "dice:roll",
    id: sid,
    data: result.notation,
  };
  var msgx = btoa(JSON.stringify(msg));
  const action = `
    event.stopPropagation();
    webviewApi.postMessage('${msgx}');
    return false;
`;
  retv.setAttribute("onclick", action.trim().replace(/\n/g, " "));
  retv.appendChild(btn);
  return retv;
};
