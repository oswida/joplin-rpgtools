import joplin from "api";
import { parse, stringify } from "yaml";
import { RTMessage } from "./../main";
import { findFences, replaceFenceContent } from "./../util/markdown";
import { CLOCK_PREFIX } from "./index";

export const ProcessClockMessage = async (msg: RTMessage) => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return;

  const data = await joplin.data.get(["notes", note.id], {
    fields: ["id", "body"],
  });
  const clocks = findFences(data.body, `${CLOCK_PREFIX}:${msg.id}`);
  if (!clocks || clocks.length <= 0) return;

  let retv = data.body;
  const obj = parse(clocks[0].text);
  let segments = obj.segments.split("");
  const i = Number.parseInt(msg.data);
  segments[i - 1] = segments[i - 1] == "0" ? "1" : "0";
  obj.segments = segments.join("");
  retv = replaceFenceContent(retv, clocks[0], stringify(obj, { nullStr: "" }));
  await joplin.data.put(["notes", note.id], null, {
    body: retv,
  });
  await joplin.commands.execute("editor.setText", retv);
};
