import { findFences, replaceFenceContent } from "./markdown";

export const RPGTOOLS_DATA_PREFIX = "rpgtools-data";
const rtDataTpl = "```" + RPGTOOLS_DATA_PREFIX + "\n```\n";

export interface RTData {
  dice: Record<string, string>;
}

class RTDataContainer {
  data: RTData;

  constructor(content: string | null) {
    if (content) {
      this.decode(content);
    } else {
      this.data = <RTData>{
        dice: {},
      };
    }
  }

  decode(content: string) {
    const ct = atob(content);
    if (ct.trim() == "") {
      this.data = <RTData>{
        dice: {},
      };
    } else {
      this.data = JSON.parse(decodeURIComponent(ct));
    }
  }

  encode(): string {
    return btoa(encodeURIComponent(JSON.stringify(this.data)));
  }

  updateNote(text: string): string {
    const fn = findFences(text, RPGTOOLS_DATA_PREFIX);
    if (!fn || fn.length == 0) {
      return rtDataTpl + text;
    } else {
      return replaceFenceContent(text, fn[0], this.encode());
    }
  }

  updateElements() {
    Object.keys(this.data.dice).forEach((key) => {
      const el = document.querySelector("#" + key);
      el.innerHTML = this.data.dice[key];
    });
  }
}

export var rtDataContainer = new RTDataContainer(null);
