import {
  FenceData,
  findFences,
  findInline,
  replaceFenceContent,
  replaceInlineContent,
} from "./../plugin/util/markdown";

const SAMPLE1 = `Some text before fence

\`\`\`lookfor
Some text inside fence
\`\`\`

# Other data.

`;

const RESULT1 = `Some text before fence

\`\`\`lookfor
This
is
replacement
\`\`\`

# Other data.

`;

const SAMPLE2 = `# title

\`\`\`lookfor
Some text inside fence
And a second line ...
\`\`\`

`;

const SAMPLE3 = `#inlines
some text with \`inline:to:test\` and the rest 
of a block
`;

const SAMPLE4 = `#inlines

some text with \`inline:to:test\` and the rest 
of a block
`;

test("Replace fence text", () => {
  const result = replaceFenceContent(
    SAMPLE1,
    { from: 3, to: 3 } as FenceData,
    "This\nis\nreplacement"
  );
  expect(result).toBe(RESULT1);
});

test("Find fence", () => {
  const result = findFences(SAMPLE1, "lookfor");
  expect(result.length).toBe(1);
  expect(result[0].from).toBe(3);
  expect(result[0].to).toBe(3);
  const result2 = findFences(SAMPLE2, "lookfor");
  expect(result2.length).toBe(1);
  expect(result2[0].from).toBe(3);
  expect(result2[0].to).toBe(4);
});

test("Find inline", () => {
  const result = findInline(SAMPLE3, "inline:to");
  expect(result.text).toBe("inline:to:test");
});

test("Replace inline", () => {
  const result = findInline(SAMPLE3, "inline:to");
  const result2 = replaceInlineContent(SAMPLE3, result, "AAA");
  expect(result2).toBe(`#inlines
some text with \`AAA\` and the rest 
of a block
`);
});
