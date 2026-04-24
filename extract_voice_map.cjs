// v2 - smarter matching
const fs = require('fs');
const src = fs.readFileSync('game/src/script.ts', 'utf8');

const lines = src.split('\n');

let currentScene = null;
let lineIdx = 0;
const scenes = {};
let inLines = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const sceneMatch = line.match(/^\s+id: "([a-z0-9_]+)",/);
  if (sceneMatch) {
    currentScene = sceneMatch[1];
    lineIdx = 0;
    scenes[currentScene] = [];
    inLines = false;
  }
  if (currentScene && line.includes('lines: [')) { inLines = true; }
  if (inLines && line.match(/speaker: /)) {
    const speaker = line.match(/speaker: "([^"]+)"/)?.[1] || '?';
    scenes[currentScene].push(speaker);
    lineIdx++;
  }
}

// VOICE_MAP from script
const voiceMap = {
  "day1_start:16": "/voice/day1_start_16_irisReal.mp3",
  "day1_start:18": "/voice/day1_start_18_irisReal.mp3",
  "day1_start:21": "/voice/day1_start_21_irisReal.mp3",
  "day1_start:23": "/voice/day1_start_23_irisReal.mp3",
  "day1_start:25": "/voice/day1_start_25_irisReal.mp3",
  "day1_branch_a:02": "/voice/day1_branch_a_02_irisReal.mp3",
  "day1_branch_b:02": "/voice/day1_branch_b_02_irisReal.mp3",
  "day1_branch_b:04": "/voice/day1_branch_b_04_irisReal.mp3",
  "day1_branch_b:06": "/voice/day1_branch_b_06_irisReal.mp3",
  "day2_start:13": "/voice/day2_start_13_leo.mp3",
  "day2_start:15": "/voice/day2_start_15_leo.mp3",
  "day2_start:17": "/voice/day2_start_17_leo.mp3",
  "day2_start:19": "/voice/day2_start_19_leo.mp3",
  "day2_branch_a:02": "/voice/day2_branch_a_02_leo.mp3",
  "day2_branch_b:02": "/voice/day2_branch_b_02_leo.mp3",
  "day2_branch_b:04": "/voice/day2_branch_b_04_leo.mp3",
  "day3_start:04": "/voice/day3_start_04_chloe.mp3",
  "day3_start:06": "/voice/day3_start_06_chloe.mp3",
  "day3_start:09": "/voice/day3_start_09_chloe.mp3",
  "day3_start:13": "/voice/day3_start_13_chloe.mp3",
  "day3_start:17": "/voice/day3_start_17_chloe.mp3",
  "day3_start:24": "/voice/day3_start_24_chloe.mp3",
  "day3_start:26": "/voice/day3_start_26_chloe.mp3",
  "day4_start:07": "/voice/day4_start_07_irisReal.mp3",
  "day4_start:10": "/voice/day4_start_10_irisReal.mp3",
  "day4_start:12": "/voice/day4_start_12_irisReal.mp3",
  "day4_start:13": "/voice/day4_start_13_irisReal.mp3",
  "day4_branch_a:02": "/voice/day4_branch_a_02_irisReal.mp3",
  "day4_branch_a:08": "/voice/day4_branch_a_08_irisReal.mp3",
  "day4_branch_a:10": "/voice/day4_branch_a_10_irisReal.mp3",
  "day4_branch_b:03": "/voice/day4_branch_b_03_irisReal.mp3",
  "day4_branch_b:06": "/voice/day4_branch_b_06_irisReal.mp3",
  "day4_branch_b:08": "/voice/day4_branch_b_08_irisReal.mp3",
  "day5_start:04": "/voice/day5_start_04_leo.mp3",
  "day5_start:07": "/voice/day5_start_07_leo.mp3",
  "day5_start:09": "/voice/day5_start_09_leo.mp3",
  "day5_start:12": "/voice/day5_start_12_leo.mp3",
  "day5_start:14": "/voice/day5_start_14_leo.mp3",
  "day5_start:16": "/voice/day5_start_16_leo.mp3",
  "day5_start:18": "/voice/day5_start_18_leo.mp3",
  "day5_start:19": "/voice/day5_start_19_leo.mp3",
  "day5_start:23": "/voice/day5_start_23_leo.mp3",
  "day5_start:26": "/voice/day5_start_26_leo.mp3",
  "day6_start:05": "/voice/day6_start_05_leo.mp3",
  "day6_start:07": "/voice/day6_start_07_leo.mp3",
  "day6_start:10": "/voice/day6_start_10_maya.mp3",
  "day6_start:11": "/voice/day6_start_11_chloe.mp3",
  "day6_start:14": "/voice/day6_start_14_irisVr.mp3",
  "day6_start:17": "/voice/day6_start_17_irisVr.mp3",
  "day6_start:20": "/voice/day6_start_20_randomStudent.mp3",
  "day6_start:21": "/voice/day6_start_21_crowd.mp3",
  "day6_start:23": "/voice/day6_start_23_irisVr.mp3",
  "day6_branch_a:02": "/voice/day6_branch_a_02_irisVr.mp3",
  "day6_branch_a:03": "/voice/day6_branch_a_03_mayaChloe.mp3",
  "day6_branch_b:02": "/voice/day6_branch_b_02_irisVr.mp3",
  "day6_branch_b:04": "/voice/day6_branch_b_04_leo.mp3",
  "day6_branch_b:06": "/voice/day6_branch_b_06_irisVr.mp3",
  "day6_branch_b:09": "/voice/day6_branch_b_09_irisVr.mp3",
  "day7_start:07": "/voice/day7_start_07_irisVr.mp3",
  "day7_start:10": "/voice/day7_start_10_irisVr.mp3",
  "day7_start:11": "/voice/day7_start_11_irisVr.mp3",
  "day7_branch_a:03": "/voice/day7_branch_a_03_irisVr.mp3",
  "day7_branch_a:05": "/voice/day7_branch_a_05_irisVr.mp3",
  "day7_branch_b:02": "/voice/day7_branch_b_02_irisVr.mp3",
  "day7_branch_b:05": "/voice/day7_branch_b_05_irisVr.mp3",
  "day8_start:03": "/voice/day8_start_03_maya.mp3",
  "day8_start:08": "/voice/day8_start_08_maya.mp3",
  "day8_start:12": "/voice/day8_start_12_maya.mp3",
  "day8_start:17": "/voice/day8_start_17_irisVr.mp3",
  "day8_start:19": "/voice/day8_start_19_irisVr.mp3",
  "day8_start:20": "/voice/day8_start_20_maya.mp3",
  "day8_start:23": "/voice/day8_start_23_irisVr.mp3",
  "day8_start:24": "/voice/day8_start_24_irisVr.mp3",
  "day8_branch_a:03": "/voice/day8_branch_a_03_irisVr.mp3",
  "day8_branch_a:05": "/voice/day8_branch_a_05_irisVr.mp3",
  "day8_branch_b:02": "/voice/day8_branch_b_02_irisVr.mp3",
  "day8_branch_b:04": "/voice/day8_branch_b_04_irisVr.mp3",
  "day9_start:06": "/voice/day9_start_06_leo.mp3",
  "day9_start:08": "/voice/day9_start_08_leo.mp3",
  "day9_start:10": "/voice/day9_start_10_leo.mp3",
  "day9_start:12": "/voice/day9_start_12_leo.mp3",
  "day9_start:13": "/voice/day9_start_13_irisVr.mp3",
  "day9_start:15": "/voice/day9_start_15_irisVr.mp3",
  "day9_branch_a:02": "/voice/day9_branch_a_02_irisVr.mp3",
  "day9_branch_b:02": "/voice/day9_branch_b_02_irisVr.mp3",
  "day9_branch_b:04": "/voice/day9_branch_b_04_irisVr.mp3",
  "day10_start:04": "/voice/day10_start_04_chloe.mp3",
  "day10_start:07": "/voice/day10_start_07_chloe.mp3",
  "day10_start:10": "/voice/day10_start_10_chloe.mp3",
  "day10_start:12": "/voice/day10_start_12_chloe.mp3",
  "day10_start:15": "/voice/day10_start_15_irisVr.mp3",
  "day10_start:16": "/voice/day10_start_16_chloe.mp3",
  "day10_start:17": "/voice/day10_start_17_irisVr.mp3",
  "day10_start:20": "/voice/day10_start_20_irisVr.mp3",
  "day10_branch_a:05": "/voice/day10_branch_a_05_irisVr.mp3",
  "day10_branch_b:05": "/voice/day10_branch_b_05_irisVr.mp3",
  "day11_start:07": "/voice/day11_start_07_leo.mp3",
  "day11_start:10": "/voice/day11_start_10_leo.mp3",
  "day11_start:12": "/voice/day11_start_12_leo.mp3",
  "day11_start:15": "/voice/day11_start_15_leo.mp3",
  "day11_start:17": "/voice/day11_start_17_leo.mp3",
  "day11_start:19": "/voice/day11_start_19_leo.mp3",
  "day11_start:23": "/voice/day11_start_23_irisVr.mp3",
  "day11_branch_a:02": "/voice/day11_branch_a_02_irisVr.mp3",
  "day11_branch_a:04": "/voice/day11_branch_a_04_irisVr.mp3",
  "day11_branch_b:02": "/voice/day11_branch_b_02_irisVr.mp3",
  "day11_branch_b:04": "/voice/day11_branch_b_04_irisVr.mp3",
  "day11_branch_b:06": "/voice/day11_branch_b_06_irisVr.mp3",
  "day12_start:08": "/voice/day12_start_08_irisVr.mp3",
  "day12_start:11": "/voice/day12_start_11_irisVr.mp3",
  "day12_start:13": "/voice/day12_start_13_irisVr.mp3",
  "day12_start:14": "/voice/day12_start_14_irisVr.mp3",
  "day12_start:16": "/voice/day12_start_16_irisVr.mp3",
  "day12_start:18": "/voice/day12_start_18_irisVr.mp3",
  "day12_branch_a:04": "/voice/day12_branch_a_04_irisVr.mp3",
  "day12_branch_a:05": "/voice/day12_branch_a_05_irisVr.mp3",
  "day12_branch_b:02": "/voice/day12_branch_b_02_irisVr.mp3",
  "day12_branch_b:04": "/voice/day12_branch_b_04_irisVr.mp3",
  "final_start:03": "/voice/final_start_03_irisVr.mp3",
  "final_start:05": "/voice/final_start_05_irisVr.mp3",
  "final_start:08": "/voice/final_start_08_irisVr.mp3",
  "ending_loop:04": "/voice/ending_loop_04_irisVr.mp3",
  "ending_breakout:03": "/voice/ending_breakout_03_irisVr.mp3",
  "ending_breakout:07": "/voice/ending_breakout_07_irisVr.mp3",
  "ending_breakout:09": "/voice/ending_breakout_09_irisVr.mp3",
  "ending_sunrise:04": "/voice/ending_sunrise_04_irisVr.mp3",
  "ending_sunrise:06": "/voice/ending_sunrise_06_irisVr.mp3",
  "ending_sunrise:08": "/voice/ending_sunrise_08_irisVr.mp3",
  "ending_sunrise:12": "/voice/ending_sunrise_12_leo.mp3",
  "ending_sunrise:16": "/voice/ending_sunrise_16_leo.mp3",
  "ending_sunrise:18": "/voice/ending_sunrise_18_leo.mp3",
  "ending_sunrise:21": "/voice/ending_sunrise_21_leo.mp3",
  "ending_sunrise:23": "/voice/ending_sunrise_23_leo.mp3",
};

// Map character identifier in filename to speaker name
const charToSpeaker = {
  irisReal: 'Iris',
  irisVr: 'Iris',
  leo: 'Leo',
  chloe: 'Chloe',
  maya: 'Maya',
  randomStudent: null, // match by position
  crowd: null,
  mayaChloe: null,
};

// Group voice entries by scene
const byScene = {};
for (const [key, path] of Object.entries(voiceMap)) {
  const [sceneId, idxStr] = key.split(':');
  const originalIdx = parseInt(idxStr, 10) - 1; // 0-based
  const charMatch = path.match(/_([a-zA-Z]+)\.mp3$/);
  const charKey = charMatch ? charMatch[1] : null;
  if (!byScene[sceneId]) byScene[sceneId] = [];
  byScene[sceneId].push({ originalIdx, path, charKey });
}

// For each scene, show the current index mapping
console.log('# VOICE LINE MAPPING (original 1-based idx -> current 0-based idx)\n');
console.log('# Format: sceneId | voice_file | original_idx(1-based) | CURRENT_IDX(0-based) | speaker\n');

for (const [sceneId, entries] of Object.entries(byScene)) {
  const sceneSpeakers = scenes[sceneId];
  if (!sceneSpeakers) {
    console.log(`${sceneId}: SCENE NOT FOUND`);
    continue;
  }

  // Sort by original index
  entries.sort((a, b) => a.originalIdx - b.originalIdx);

  // For each voice entry, find the current correct index
  // Strategy: for each character, find nth occurrence of that speaker 
  // We use the original ordering to determine which nth occurrence it was

  // Build character occurrence counters
  const charOccurrences = {}; // track how many times we've assigned per char

  console.log(`\n=== ${sceneId} (${sceneSpeakers.length} lines) ===`);
  console.log('Current speaker list:');
  sceneSpeakers.forEach((sp, i) => console.log(`  [${String(i).padStart(2, '0')}] ${sp}`));

  console.log('Voice files (original index -> character):');
  for (const e of entries) {
    console.log(`  orig:${String(e.originalIdx).padStart(2, '0')} char:${e.charKey} file:${e.path.replace('/voice/', '')}`);
  }
}
