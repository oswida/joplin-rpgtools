import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { RTMessage } from "../main";
import { AppData } from "./../util/appdata";

export const ProcessDiceMessage = async (msg: RTMessage) => {
  switch (msg.type) {
    case "dice:roll": {
      const ad = new AppData();
      ad.loadFromSelected();
      const roll = new DiceRoll(msg.data);
      ad.dice[msg.id] = roll.total.toString();
      ad.writeToSelected();
    }
  }
};
