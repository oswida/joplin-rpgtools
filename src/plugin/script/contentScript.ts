import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { randomUUID } from "crypto";
import { diceSpanHtml } from "../dice/html";
import { CLOCK_PREFIX, rpgClockContent } from "./../clock/index";

export const ParseInlineCode = (content: string): string[] => {
  const cc = content.trim().split(":");
  if (cc.length < 2) return ["", ""];
  switch (cc[0]) {
    case "roll":
      return ["roll", content.replace("roll:", "").trim()];
  }
  return ["", ""];
};

export default function () {
  return {
    plugin: function (markdownIt, _options) {
      const defaultRender =
        markdownIt.renderer.rules.code_inline ||
        markdownIt.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      markdownIt.renderer.rules.code_inline = function (
        tokens,
        idx,
        options,
        env,
        self
      ) {
        const token = tokens[idx];
        const [type, data] = ParseInlineCode(token.content);
        switch (type) {
          case "roll":
            const result = new DiceRoll(data);
            const sid = randomUUID();
            // const ad = new AppData();
            // ad.dice[sid] = result.total.toString();
            // ad.writeToSelected();
            const span = diceSpanHtml(result, sid);
            return span.outerHTML;
          default:
            return defaultRender(tokens, idx, options, env, self);
        }
      };

      markdownIt.renderer.rules.fence = function (
        tokens,
        idx,
        options,
        env,
        self
      ) {
        const token = tokens[idx];
        if (token.info.startsWith(CLOCK_PREFIX)) {
          return rpgClockContent(token.info, token.content);
        } else {
          return defaultRender(tokens, idx, options, env, self);
        }
      };
    },

    assets: function () {
      return [{ name: "style.css" }];
    },
  };
}
