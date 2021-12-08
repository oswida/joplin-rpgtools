import joplin from "api";
import { parse, stringify } from "yaml";
import { RTMessage } from "./../main";
import { findFences, replaceFenceContent } from "./../util/markdown";
import { CLOCK_PREFIX, RpgClockData, RpgClockSegmentData } from "./index";

export const ProcessClockMessage = async (msg: RTMessage) => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return;

  const data = await joplin.data.get(["notes", note.id], {
    fields: ["id", "body"],
  });
  const clocks = findFences(data.body, `${CLOCK_PREFIX}:${msg.id}`);
  if (!clocks || clocks.length <= 0) return;

  let retv = data.body;
  const obj = parse(clocks[0].text) as RpgClockData;
  const i = Number.parseInt(msg.data);
  if (!obj.segments) obj.segments = {};
  if (!obj.segments[i]) {
    obj.segments[i] = <RpgClockSegmentData>{ fill: false, desc: "" };
  }
  obj.segments[i].fill = !obj.segments[i].fill;
  retv = replaceFenceContent(retv, clocks[0], stringify(obj, { nullStr: "" }));
  await joplin.data.put(["notes", note.id], null, {
    body: retv,
  });
  await joplin.commands.execute("editor.setText", retv);
};
