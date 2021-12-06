import {
  FenceData,
  findFences,
  replaceFenceContent,
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
