import MarkdownIt = require("markdown-it");

export interface FenceData {
  from: number;
  to: number;
  text: string;
}

export const findFences = (content: string, type: string): FenceData[] => {
  const m = new MarkdownIt();
  const tokens = m.parse(content, {});

  return tokens
    .filter((t) => {
      return t.type == "fence" && t.info == type;
    })
    .map((t) => {
      return <FenceData>{
        from: t.map[0] + 1,
        to: t.map[1] - 2,
        text: content
          .split("\n")
          .slice(t.map[0] + 1, t.map[1] - 1)
          .join("\n"),
      };
    });
};

export const replaceFenceContent = (
  source: string,
  fn: FenceData,
  newContent: string
): string => {
  const lines = source.split("\n");
  const retv: string[] = [];
  retv.push(...lines.slice(0, fn.from));
  retv.push(...newContent.split("\n"));
  retv.push(...lines.slice(fn.to + 1, undefined));
  return retv.join("\n");
};
