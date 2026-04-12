import lines from "./voice_lines.json" with { type: "json" };

let count = 0;
lines.forEach((line) => {
  count += line.line.length;
});

console.log(`Total characters: ${count}`);
