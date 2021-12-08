import joplin from "api";

export const getCurrentNoteBody = async (): Promise<string | null> => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return null;
  const data = await joplin.data.get(["notes", note.id], {
    fields: ["id", "body"],
  });
  return data.body;
};

export const getNoteBody = async (id: string): Promise<string | null> => {
  const data = await joplin.data.get(["notes", id], {
    fields: ["id", "body"],
  });
  return data.body;
};

export const saveCurrentNoteBody = async (text: string) => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return null;
  await joplin.data.put(["notes", note.id], null, {
    body: text,
  });
  await joplin.commands.execute("editor.setText", text);
};

export const getNoteLine = async (
  id: string,
  line: number
): Promise<string> => {
  const note = await joplin.data.get(["notes", id], { fields: ["id", "body"] });
  if (!note) return "";
  const lines = note.body.trim().split("\n");
  if (line - 1 >= lines.length || line - 1 < 0) return "";
  return lines[line - 1];
};
