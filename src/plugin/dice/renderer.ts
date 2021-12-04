import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { randomUUID } from "crypto";
import MarkdownIt = require("markdown-it");
import { createDiceBlock } from "./html";

export function setupRenderer(view: string, md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.fence ||
    md.renderer.rules.code_inline ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.info !== "dice") {
      return defaultRender(tokens, idx, options, env, self);
    }
    return "Here we have dice " + token.content;
  };

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const [type, data] = ParseInlineCode(token.content);
    if (type == "dice") {
      return GenerateDiceContent(view, data);
    } else {
      return defaultRender(tokens, idx, options, env, self);
    }
  };
}

export const ParseInlineCode = (content: string): string[] => {
  if (!content.trim().startsWith("dice:")) return ["", ""];
  return ["dice", content.replace("dice:", "").trim()];
};

export const GenerateDiceContent = (view: string, content: string): string => {
  // TODO: determine what kind of rolling should we perform
  // Simple roll
  try {
    const sid = randomUUID();
    const result = new DiceRoll(content);
    const span = createDiceBlock(result, sid, view);
    return span.outerHTML;
  } catch (err) {
    return "Dice parsing error: " + err;
  }
};
