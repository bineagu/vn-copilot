/// <reference types="node" />

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import apiKey from "./../api-key.json" with { type: "json" };
import sfxEntries from "./sfx.json" with { type: "json" };
import voiceLines from "./voice_lines.json" with { type: "json" };

const elevenlabs = new ElevenLabsClient({
  apiKey: apiKey.key, // Defaults to process.env.ELEVENLABS_API_KEY
});

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

type SfxEntry = {
  prompt: string;
  loop: boolean;
  durationSeconds?: number;
  fileName: string;
};

type VoiceLineEntry = {
  line: string;
  character: string;
  id: string;
};

async function generateSfx(
  prompt: string,
  loop: boolean,
  durationSeconds: number | undefined,
  fileName: string,
) {
  const sfx = await elevenlabs.textToSoundEffects.convert({
    text: prompt,
    loop,
    outputFormat: "mp3_44100_128",
    durationSeconds,
    promptInfluence: 0.4,
  });

  const audioBytes = await readStreamFully(sfx);

  const outputPath = path.resolve(
    scriptDirectory,
    "sfx",
    ensureMp3Extension(fileName),
  );

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, audioBytes);

  return outputPath;
}

const voices = {
  irisReal: "zPABhxcjU5slbQSedYKn",
  irisVr: "WyVvr9QxPuxX5FI4AWH0",
  maya: "IA1Uo0uGXjm4EZdkWo1t",
  chloe: "9LQXwQNBrPJQQ5D2qv07",
  leo: "8YIOgzXVOYUwEENkD1m0",
  randomStudent: "LWDjGNDPlm2PQwnzQKdK",
  // crowd: "LWDjGNDPlm2PQwnzQKdK",
  // mayaChloe: "IA1Uo0uGXjm4EZdkWo1t",
};

async function generateLine(line: string, character: string, id: string) {
  const voiceId = voices[character as keyof typeof voices];
  if (!voiceId) {
    throw new Error(`No voice found for character "${character}"`);
  }
  const audio = await elevenlabs.textToSpeech.convert(voiceId, {
    text: line,
    outputFormat: "mp3_44100_128",
    modelId: "eleven_v3",
  });

  const audioBytes = await readStreamFully(audio);

  const outputPath = path.resolve(
    scriptDirectory,
    "lines",
    ensureMp3Extension(id),
  );

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, audioBytes);

  return outputPath;
}

async function readStreamFully(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      totalLength += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result;
}

function ensureMp3Extension(fileName: string) {
  return path.extname(fileName) ? fileName : `${fileName}.mp3`;
}

function parseOptionalNumber(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Expected a non-negative integer, received "${value}".`);
  }

  return parsed;
}

function printUsage() {
  console.log(`Usage:
  node .\\elevenlabs\\test.ts --sfx [skip] [take]
  node .\\elevenlabs\\test.ts --lines [skip] [take]
  node .\\elevenlabs\\test.ts --line "text" "character" "id"
  node .\\elevenlabs\\test.ts --line-id <id>
  node .\\elevenlabs\\test.ts "prompt" "output-file" [durationSeconds] [loop]

Examples:
  node .\\elevenlabs\\test.ts --sfx 0 10
  node .\\elevenlabs\\test.ts --lines 20 5
  node .\\elevenlabs\\test.ts --line "[urgent] Hello?" leo sample_line_001
  node .\\elevenlabs\\test.ts --line-id day8_start_20_maya
  node .\\elevenlabs\\test.ts "metal door slam" "door_slam" 2 false`);
}

async function generateSfxBatch(skip: number, take?: number) {
  const entries = sfxEntries as SfxEntry[];
  const selected = entries.slice(
    skip,
    take === undefined ? undefined : skip + take,
  );

  if (selected.length === 0) {
    console.log("No SFX entries selected.");
    return;
  }

  for (let index = 0; index < selected.length; index += 1) {
    const entry = selected[index];
    const absoluteIndex = skip + index;
    console.log(
      `Generating SFX ${absoluteIndex + 1}/${entries.length}: ${entry.fileName}`,
    );
    const outputPath = await generateSfx(
      entry.prompt,
      entry.loop,
      entry.durationSeconds,
      entry.fileName,
    );
    console.log(`Saved SFX to ${outputPath}`);
  }
}

async function generateLineBatch(skip: number, take?: number) {
  const entries = voiceLines as VoiceLineEntry[];
  const selected = entries.slice(
    skip,
    take === undefined ? undefined : skip + take,
  );

  if (selected.length === 0) {
    console.log("No line entries selected.");
    return;
  }

  for (let index = 0; index < selected.length; index += 1) {
    const entry = selected[index];
    const absoluteIndex = skip + index;
    console.log(
      `Generating line ${absoluteIndex + 1}/${entries.length}: ${entry.id}`,
    );
    const outputPath = await generateLine(
      entry.line,
      entry.character,
      entry.id,
    );
    console.log(`Saved line to ${outputPath}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printUsage();
    return;
  }

  if (args[0] === "--sfx") {
    const skip = parseOptionalNumber(args[1], 0);
    const take =
      args[2] === undefined ? undefined : parseOptionalNumber(args[2], 0);
    await generateSfxBatch(skip, take);
    return;
  }

  if (args[0] === "--lines") {
    const skip = parseOptionalNumber(args[1], 0);
    const take =
      args[2] === undefined ? undefined : parseOptionalNumber(args[2], 0);
    await generateLineBatch(skip, take);
    return;
  }

  if (args[0] === "--line") {
    const line = args[1];
    const character = args[2];
    const id = args[3];

    if (!line || !character || !id) {
      throw new Error(
        'Usage: node .\\elevenlabs\\test.ts --line "text" "character" "id"',
      );
    }

    const outputPath = await generateLine(line, character, id);
    console.log(`Saved line to ${outputPath}`);
    return;
  }

  if (args[0] === "--line-id") {
    const id = args[1];
    if (!id) {
      throw new Error("Usage: node .\\elevenlabs\\test.ts --line-id <id>");
    }
    const entries = voiceLines as VoiceLineEntry[];
    const entry = entries.find((e) => e.id === id);
    if (!entry) {
      throw new Error(`No voice line found with id "${id}".`);
    }
    console.log(`Generating line: ${entry.id} (${entry.character})`);
    const outputPath = await generateLine(
      entry.line,
      entry.character,
      entry.id,
    );
    console.log(`Saved line to ${outputPath}`);
    return;
  }

  const prompt = args[0];
  const fileName = args[1];
  const durationArg = args[2];
  const loopArg = args[3] ?? "false";

  if (!prompt || !fileName) {
    throw new Error(
      'Usage: node .\\elevenlabs\\test.ts "prompt" "output-file" [durationSeconds] [loop]',
    );
  }

  let durationSeconds: number | undefined = Number(durationArg);

  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    durationSeconds = undefined;
  }

  const outputPath = await generateSfx(
    prompt,
    loopArg.toLowerCase() === "true",
    durationSeconds,
    fileName,
  );

  console.log(`Saved SFX to ${outputPath}`);
}

await main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
