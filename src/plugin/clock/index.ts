import { parse } from "yaml";
import { RpgClock_circle3 } from "../assets/clock3";
import { RpgClock_circle5 } from "../assets/clock5";
import { RpgClock_circle6 } from "../assets/clock6";
import { RpgClock_circle8 } from "../assets/clock8";
import { RpgClock_pbta } from "./../assets/clock-pbta";
import { RpgClock_circle4 } from "./../assets/clock4";
import { clickAction, errorHtml } from "./../util/html";

export const CLOCK_PREFIX = "rpg-clock";

export interface RpgClockSegmentData {
  fill: boolean;
  desc: string;
}

export interface RpgClockData {
  // can be:
  // circle3, circle4, circle5, circle6, circle8, pbta
  type: string;
  segments: Record<number, RpgClockSegmentData>;
  title: string;
}

const fillSegments = (
  n: number,
  el: HTMLElement,
  data: RpgClockData,
  bid: string
) => {
  for (let i = 1; i <= n; i++) {
    const e = el.querySelector("#s" + i) as SVGPathElement;
    if (!data.segments[i]) {
      data.segments[i] = <RpgClockSegmentData>{ fill: false, desc: "" };
    }
    const seg = data.segments[i];
    if (seg.fill) {
      e.style.fill = "grey";
    } else {
      e.style.fill = "transparent";
    }
    if (seg.desc) {
      e.setAttribute("title", seg.desc);
      e.setAttribute("aria-label", seg.desc);
    } else {
      e.removeAttribute("title");
    }
    e.setAttribute("onclick", clickAction(CLOCK_PREFIX, bid, i.toString()));
  }
};

export const rpgClockHtml = (bid: string, content: string) => {
  const data = parse(content) as RpgClockData;
  if (!data.segments) data.segments = {};

  const el = document.createElement("div");
  el.className += CLOCK_PREFIX;
  switch (data.type) {
    case "circle3":
      el.innerHTML = RpgClock_circle3.trim();
      fillSegments(3, el, data, bid);
      break;
    case "circle4":
      el.innerHTML = RpgClock_circle4.trim();
      fillSegments(4, el, data, bid);
      break;
    case "circle5":
      el.innerHTML = RpgClock_circle5.trim();
      fillSegments(5, el, data, bid);
      break;
    case "circle6":
      el.innerHTML = RpgClock_circle6.trim();
      fillSegments(6, el, data, bid);
      break;
    case "circle8":
      el.innerHTML = RpgClock_circle8.trim();
      fillSegments(8, el, data, bid);
      break;
    case "pbta":
      el.innerHTML = RpgClock_pbta.trim();
      fillSegments(6, el, data, bid);
      break;
    default:
      el.innerHTML = '<div class="error">Uknown clock type</div>';
  }
  const title = document.createElement("div");
  title.className += CLOCK_PREFIX;
  title.appendChild(document.createTextNode(data.title));

  const retv = document.createElement("div");
  retv.appendChild(el);
  retv.appendChild(title);
  return retv.outerHTML;
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
