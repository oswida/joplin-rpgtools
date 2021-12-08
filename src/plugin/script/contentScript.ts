import { CLOCK_PREFIX, rpgClockContent } from "./../clock/index";
import { DICE_PREFIX, rpgDiceInlineContent } from "./../dice/index";
import { RPGTOOLS_DATA_PREFIX, rtDataContainer } from "./../util/toolsdata";
import MarkdownIt = require("markdown-it");

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
        if (token.content.startsWith(DICE_PREFIX)) {
          return rpgDiceInlineContent(token.content);
        } else {
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
        if (token.info.startsWith(RPGTOOLS_DATA_PREFIX)) {
          rtDataContainer.decode(token.content);
          return "";
        } else if (token.info.startsWith(CLOCK_PREFIX)) {
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
