import joplin from "api";
import { parse, stringify } from "yaml";
import { RTMessage } from "./../main";
import { findFences, replaceFenceContent } from "./../util/markdown";

export const ProcessClockMessage = async (msg: RTMessage) => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return;

  const data = await joplin.data.get(["notes", note.id], {
    fields: ["id", "body"],
  });
  const clocks = findFences(data.body, "rpgclock");
  if (!clocks || clocks.length <= 0) return;

  let retv = data.body;
  let done = false;

  clocks.forEach((c) => {
    if (!done) {
      const obj = parse(c.text);
      if (obj.id == msg.id) {
        let segments = obj.segments.split("");
        const i = Number.parseInt(msg.data);
        segments[i - 1] = segments[i - 1] == "0" ? "1" : "0";
        obj.segments = segments.join("");
        retv = replaceFenceContent(retv, c, stringify(obj, { nullStr: "" }));
        done = true;
      }
    }
  });
  await joplin.data.put(["notes", note.id], null, {
    body: retv,
  });
  await joplin.commands.execute("editor.setText", retv);
};
