import { parse } from "yaml";
import { RpgClockImg_4 } from "./../assets/clock4";
import { errorHtml, clickAction } from "./../util/html";

export const CLOCK_PREFIX = "rpg-clock";

export interface RpgClockData {
  count: number;
  segments: string;
}

export const rpgClockHtml = (bid: string, content: string) => {
  const data = parse(content) as RpgClockData;
  const el = document.createElement("div");
  el.className += CLOCK_PREFIX;
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
        e.setAttribute("onclick", clickAction(CLOCK_PREFIX, bid, i.toString()));
      }
  }
  return el.outerHTML;
};

export const rpgClockContent = (info: string, content: string) => {
  const parts = info.split(":");
  if (parts.length < 2)
    return errorHtml(
      "Clock block should have an ID. Please use `" +
        CLOCK_PREFIX +
        ":id` notation. "
    );
  return rpgClockHtml(parts[1], content);
};
