import { parse } from "yaml";
import { RpgClockImg_4 } from "./../assets/clock4";
import { OnClickAction } from "./../util/html";

export interface RpgClockData {
  id: string;
  count: number;
  segments: string;
}

export const rpgClockHtml = (content: string) => {
  const data = parse(content) as RpgClockData;
  const el = document.createElement("div");
  el.className += "rpgclock";
  switch (data.count) {
    case 4:
      el.innerHTML = RpgClockImg_4.trim();
      for (let i = 1; i <= 4; i++) {
        const e = el.querySelector("#s" + i) as SVGPathElement;
        if (data.segments[i - 1] == "1") {
          e.style.fill = "grey";
        } else {
          e.style.fill = "transparent";
        }
        e.setAttribute(
          "onclick",
          OnClickAction("rpgclock", data.id, i.toString())
        );
      }
  }
  return el.outerHTML;
};

export const rpgClockContent = (content: string) => {
  return rpgClockHtml(content);
};
