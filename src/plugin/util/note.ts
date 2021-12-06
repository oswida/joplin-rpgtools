import joplin from "api";

export const getCurrentNoteBody = async (): Promise<string | null> => {
  const note = await joplin.workspace.selectedNote();
  if (!note) return null;
  const data = await joplin.data.get(["notes", note.id], {
    fields: ["id", "body"],
  });
  return data.body;
};
