// Transforms script.ts:
// 1. Inserts `voice: "..."` on each voiced DialogueLine
// 2. Removes the VOICE_MAP and getVoiceLine function
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'game/src/script.ts');
const src = fs.readFileSync(filePath, 'utf8');
const lines = src.split('\n');

// --- Build scene -> lineIndex -> voice path map (corrected) ---
const inlineMap = {
    "day1_start:15": "/voice/day1_start_16_irisReal.mp3",
    "day1_start:17": "/voice/day1_start_18_irisReal.mp3",
    "day1_start:20": "/voice/day1_start_21_irisReal.mp3",
    "day1_start:22": "/voice/day1_start_23_irisReal.mp3",
    "day1_start:24": "/voice/day1_start_25_irisReal.mp3",
    "day1_branch_a:1": "/voice/day1_branch_a_02_irisReal.mp3",
    "day1_branch_b:1": "/voice/day1_branch_b_02_irisReal.mp3",
    "day1_branch_b:3": "/voice/day1_branch_b_04_irisReal.mp3",
    "day1_branch_b:5": "/voice/day1_branch_b_06_irisReal.mp3",
    "day2_start:12": "/voice/day2_start_13_leo.mp3",
    "day2_start:14": "/voice/day2_start_15_leo.mp3",
    "day2_start:16": "/voice/day2_start_17_leo.mp3",
    "day2_start:18": "/voice/day2_start_19_leo.mp3",
    "day2_branch_a:1": "/voice/day2_branch_a_02_leo.mp3",
    "day2_branch_b:1": "/voice/day2_branch_b_02_leo.mp3",
    "day2_branch_b:3": "/voice/day2_branch_b_04_leo.mp3",
    "day3_start:3": "/voice/day3_start_04_chloe.mp3",
    "day3_start:5": "/voice/day3_start_06_chloe.mp3",
    "day3_start:8": "/voice/day3_start_09_chloe.mp3",
    "day3_start:12": "/voice/day3_start_13_chloe.mp3",
    "day3_start:16": "/voice/day3_start_17_chloe.mp3",
    "day3_start:23": "/voice/day3_start_24_chloe.mp3",
    "day3_start:25": "/voice/day3_start_26_chloe.mp3",
    "day4_start:6": "/voice/day4_start_07_irisReal.mp3",
    "day4_start:9": "/voice/day4_start_10_irisReal.mp3",
    "day4_start:11": "/voice/day4_start_12_irisReal.mp3",
    "day4_start:12": "/voice/day4_start_13_irisReal.mp3",
    "day4_branch_a:1": "/voice/day4_branch_a_02_irisReal.mp3",
    "day4_branch_a:10": "/voice/day4_branch_a_08_irisReal.mp3",
    "day4_branch_a:12": "/voice/day4_branch_a_10_irisReal.mp3",
    "day4_branch_b:2": "/voice/day4_branch_b_03_irisReal.mp3",
    "day4_branch_b:5": "/voice/day4_branch_b_06_irisReal.mp3",
    "day4_branch_b:7": "/voice/day4_branch_b_08_irisReal.mp3",
    "day5_start:3": "/voice/day5_start_04_leo.mp3",
    "day5_start:6": "/voice/day5_start_07_leo.mp3",
    "day5_start:8": "/voice/day5_start_09_leo.mp3",
    "day5_start:11": "/voice/day5_start_12_leo.mp3",
    "day5_start:13": "/voice/day5_start_14_leo.mp3",
    "day5_start:15": "/voice/day5_start_16_leo.mp3",
    "day5_start:17": "/voice/day5_start_18_leo.mp3",
    "day5_start:18": "/voice/day5_start_19_leo.mp3",
    "day5_start:22": "/voice/day5_start_23_leo.mp3",
    "day5_start:25": "/voice/day5_start_26_leo.mp3",
    "day6_start:4": "/voice/day6_start_05_leo.mp3",
    "day6_start:6": "/voice/day6_start_07_leo.mp3",
    "day6_start:9": "/voice/day6_start_10_maya.mp3",
    "day6_start:10": "/voice/day6_start_11_chloe.mp3",
    "day6_start:13": "/voice/day6_start_14_irisVr.mp3",
    "day6_start:16": "/voice/day6_start_17_irisVr.mp3",
    "day6_start:19": "/voice/day6_start_20_randomStudent.mp3",
    "day6_start:20": "/voice/day6_start_21_crowd.mp3",
    "day6_start:22": "/voice/day6_start_23_irisVr.mp3",
    "day6_branch_a:1": "/voice/day6_branch_a_02_irisVr.mp3",
    "day6_branch_a:2": "/voice/day6_branch_a_03_mayaChloe.mp3",
    "day6_branch_b:1": "/voice/day6_branch_b_02_irisVr.mp3",
    "day6_branch_b:3": "/voice/day6_branch_b_04_leo.mp3",
    "day6_branch_b:5": "/voice/day6_branch_b_06_irisVr.mp3",
    "day6_branch_b:8": "/voice/day6_branch_b_09_irisVr.mp3",
    "day7_start:6": "/voice/day7_start_07_irisVr.mp3",
    "day7_start:9": "/voice/day7_start_10_irisVr.mp3",
    "day7_start:10": "/voice/day7_start_11_irisVr.mp3",
    "day7_branch_a:2": "/voice/day7_branch_a_03_irisVr.mp3",
    "day7_branch_a:4": "/voice/day7_branch_a_05_irisVr.mp3",
    "day7_branch_b:1": "/voice/day7_branch_b_02_irisVr.mp3",
    "day7_branch_b:4": "/voice/day7_branch_b_05_irisVr.mp3",
    "day8_start:2": "/voice/day8_start_03_maya.mp3",
    "day8_start:7": "/voice/day8_start_08_maya.mp3",
    "day8_start:11": "/voice/day8_start_12_maya.mp3",
    "day8_start:16": "/voice/day8_start_17_irisVr.mp3",
    "day8_start:18": "/voice/day8_start_19_irisVr.mp3",
    "day8_start:19": "/voice/day8_start_20_maya.mp3",
    "day8_start:22": "/voice/day8_start_23_irisVr.mp3",
    "day8_start:23": "/voice/day8_start_24_irisVr.mp3",
    "day8_branch_a:2": "/voice/day8_branch_a_03_irisVr.mp3",
    "day8_branch_a:4": "/voice/day8_branch_a_05_irisVr.mp3",
    "day8_branch_b:1": "/voice/day8_branch_b_02_irisVr.mp3",
    "day8_branch_b:3": "/voice/day8_branch_b_04_irisVr.mp3",
    "day9_start:5": "/voice/day9_start_06_leo.mp3",
    "day9_start:7": "/voice/day9_start_08_leo.mp3",
    "day9_start:9": "/voice/day9_start_10_leo.mp3",
    "day9_start:11": "/voice/day9_start_12_leo.mp3",
    "day9_start:12": "/voice/day9_start_13_irisVr.mp3",
    "day9_start:14": "/voice/day9_start_15_irisVr.mp3",
    "day9_branch_a:1": "/voice/day9_branch_a_02_irisVr.mp3",
    "day9_branch_b:1": "/voice/day9_branch_b_02_irisVr.mp3",
    "day9_branch_b:3": "/voice/day9_branch_b_04_irisVr.mp3",
    "day10_start:3": "/voice/day10_start_04_chloe.mp3",
    "day10_start:6": "/voice/day10_start_07_chloe.mp3",
    "day10_start:9": "/voice/day10_start_10_chloe.mp3",
    "day10_start:11": "/voice/day10_start_12_chloe.mp3",
    "day10_start:14": "/voice/day10_start_15_irisVr.mp3",
    "day10_start:15": "/voice/day10_start_16_chloe.mp3",
    "day10_start:16": "/voice/day10_start_17_irisVr.mp3",
    "day10_start:19": "/voice/day10_start_20_irisVr.mp3",
    "day10_branch_a:4": "/voice/day10_branch_a_05_irisVr.mp3",
    "day10_branch_b:4": "/voice/day10_branch_b_05_irisVr.mp3",
    "day11_start:6": "/voice/day11_start_07_leo.mp3",
    "day11_start:9": "/voice/day11_start_10_leo.mp3",
    "day11_start:11": "/voice/day11_start_12_leo.mp3",
    "day11_start:14": "/voice/day11_start_15_leo.mp3",
    "day11_start:16": "/voice/day11_start_17_leo.mp3",
    "day11_start:18": "/voice/day11_start_19_leo.mp3",
    "day11_start:22": "/voice/day11_start_23_irisVr.mp3",
    "day11_branch_a:1": "/voice/day11_branch_a_02_irisVr.mp3",
    "day11_branch_a:3": "/voice/day11_branch_a_04_irisVr.mp3",
    "day11_branch_b:1": "/voice/day11_branch_b_02_irisVr.mp3",
    "day11_branch_b:3": "/voice/day11_branch_b_04_irisVr.mp3",
    "day11_branch_b:5": "/voice/day11_branch_b_06_irisVr.mp3",
    "day12_start:7": "/voice/day12_start_08_irisVr.mp3",
    "day12_start:10": "/voice/day12_start_11_irisVr.mp3",
    "day12_start:12": "/voice/day12_start_13_irisVr.mp3",
    "day12_start:13": "/voice/day12_start_14_irisVr.mp3",
    "day12_start:15": "/voice/day12_start_16_irisVr.mp3",
    "day12_start:17": "/voice/day12_start_18_irisVr.mp3",
    "day12_branch_a:3": "/voice/day12_branch_a_04_irisVr.mp3",
    "day12_branch_a:4": "/voice/day12_branch_a_05_irisVr.mp3",
    "day12_branch_b:1": "/voice/day12_branch_b_02_irisVr.mp3",
    "day12_branch_b:3": "/voice/day12_branch_b_04_irisVr.mp3",
    "final_start:2": "/voice/final_start_03_irisVr.mp3",
    "final_start:4": "/voice/final_start_05_irisVr.mp3",
    "final_start:7": "/voice/final_start_08_irisVr.mp3",
    "ending_loop:3": "/voice/ending_loop_04_irisVr.mp3",
    "ending_breakout:2": "/voice/ending_breakout_03_irisVr.mp3",
    "ending_breakout:6": "/voice/ending_breakout_07_irisVr.mp3",
    "ending_breakout:8": "/voice/ending_breakout_09_irisVr.mp3",
    "ending_sunrise:3": "/voice/ending_sunrise_04_irisVr.mp3",
    "ending_sunrise:5": "/voice/ending_sunrise_06_irisVr.mp3",
    "ending_sunrise:7": "/voice/ending_sunrise_08_irisVr.mp3",
    "ending_sunrise:11": "/voice/ending_sunrise_12_leo.mp3",
    "ending_sunrise:15": "/voice/ending_sunrise_16_leo.mp3",
    "ending_sunrise:17": "/voice/ending_sunrise_18_leo.mp3",
    "ending_sunrise:20": "/voice/ending_sunrise_21_leo.mp3",
    "ending_sunrise:22": "/voice/ending_sunrise_23_leo.mp3",
};

// --- Walk through source and insert voice: lines ---
let currentScene = null;
let dialogueIdx = 0;
let inLines = false;
const outLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const sceneMatch = line.match(/^\s+id: "([a-z0-9_]+)",/);
    if (sceneMatch) {
        currentScene = sceneMatch[1];
        dialogueIdx = 0;
        inLines = false;
    }

    if (currentScene && line.includes('lines: [')) inLines = true;

    if (inLines && line.match(/^\s+speaker: /)) {
        // The next `text:` line - we'll insert voice after it
        // Actually insert after this speaker line by tracking text line below
        outLines.push(line);
        // Look ahead for text: line within the same dialogue object
        // We insert voice right after speaker: 
        const key = `${currentScene}:${dialogueIdx}`;
        const voicePath = inlineMap[key];
        if (voicePath) {
            const indent = line.match(/^(\s+)/)[1];
            outLines.push(`${indent}voice: "${voicePath}",`);
        }
        dialogueIdx++;
        continue;
    }

    outLines.push(line);
}

let result = outLines.join('\n');

// --- Remove VOICE_MAP and getVoiceLine function ---
// Find the comment line before VOICE_MAP and remove until end of getVoiceLine
const mapStart = result.indexOf('\n// Voice line map:');
const fnEnd = result.indexOf('\nexport function getVoiceLine(');
if (mapStart === -1 || fnEnd === -1) {
    console.error('Could not find VOICE_MAP section!');
    process.exit(1);
}
// Find the closing brace of getVoiceLine
let depth = 0;
let fnBodyStart = result.indexOf('{', fnEnd);
let fnBodyEnd = fnBodyStart;
for (let i = fnBodyStart; i < result.length; i++) {
    if (result[i] === '{') depth++;
    else if (result[i] === '}') {
        depth--;
        if (depth === 0) { fnBodyEnd = i; break; }
    }
}

// Remove from mapStart to fnBodyEnd (inclusive)
result = result.slice(0, mapStart) + result.slice(fnBodyEnd + 1);

// Also remove the export of VOICE_MAP if it's gone (it's already covered by the section removal above)

fs.writeFileSync(filePath, result, 'utf8');
console.log('Done! script.ts updated.');
console.log('Removed VOICE_MAP and getVoiceLine.');
console.log('Added voice: properties to', Object.keys(inlineMap).length, 'dialogue lines.');
