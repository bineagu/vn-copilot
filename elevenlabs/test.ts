/// <reference types="node" />

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import apiKey from "./../api-key.json" with { type: "json" };
import { BodyTextToDialogueMultiVoiceV1TextToDialoguePostApplyTextNormalization } from "@elevenlabs/elevenlabs-js/api/index.js";

const elevenlabs = new ElevenLabsClient({
  apiKey: apiKey.key, // Defaults to process.env.ELEVENLABS_API_KEY
});

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

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
    promptInfluence: 0.5,
  });

  const audioBytes = await readStreamFully(sfx);

  const outputPath = path.resolve(
    scriptDirectory,
    ensureMp3Extension(fileName),
  );

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, audioBytes);

  return outputPath;
}

const voices = {
  irisReal: "p7g5YXt4rAnjYuiiuCzb",
};

async function generateLine(line: string, character: string, id: string) {
  const voiceId = "EXAVITQu4vr4xnSDxMaL/EXAMPLE_VOICE_ID";
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

async function main() {
  const prompt = process.argv[2];
  const fileName = process.argv[3];
  const durationArg = process.argv[4] ?? undefined;
  const loopArg = process.argv[5] ?? "false";

  if (!prompt || !fileName) {
    console.error(
      'Usage: node .\\test.ts "prompt" "output-file" [durationSeconds] [loop]',
    );
    process.exit(1);
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

await main();
