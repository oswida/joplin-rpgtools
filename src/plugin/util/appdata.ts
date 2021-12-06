import joplin from "api";

export class AppData {
  dice: Record<string, string>;

  constructor() {
    this.dice = {};
  }

  encode(): string {
    return btoa(
      JSON.stringify({
        dice: this.dice,
      })
    );
  }

  decode(data: string) {
    const val = JSON.parse(atob(data));
    this.dice = val.dice;
  }

  async writeToSelected() {
    const note = await joplin.workspace.selectedNote();
    if (!note) {
      return;
    }
    await joplin.data.put(["notes", note.id], null, {
      application_data: this.encode(),
    });
  }

  async loadFromSelected() {
    const note = await joplin.workspace.selectedNote();
    const data = await joplin.data.get(["notes", note.id], {
      fields: ["id", "application_data"],
    });
    this.decode(data.application_data);
  }
}
