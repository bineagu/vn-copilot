import { useEffect, useRef } from "react";
import { useGame } from "../useGame";

let currentAudio: HTMLAudioElement | null = null;
let currentSrc: string | null = null;

export function AudioManager() {
  const { state } = useGame();
  const volumeRef = useRef(state.bgmVolume);
  volumeRef.current = state.bgmVolume;

  useEffect(() => {
    if (currentAudio) {
      currentAudio.volume = state.bgmVolume;
    }
  }, [state.bgmVolume]);

  return null;
}

export function playBGM(src: string, volume: number) {
  if (currentSrc === src && currentAudio && !currentAudio.paused) {
    currentAudio.volume = volume;
    return;
  }
  stopBGM();
  currentAudio = new Audio(src);
  currentAudio.loop = true;
  currentAudio.volume = volume;
  currentAudio.play().catch(() => {});
  currentSrc = src;
}

export function stopBGM() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentSrc = null;
  }
}

export function setBGMVolume(volume: number) {
  if (currentAudio) {
    currentAudio.volume = volume;
  }
}

export function playSFX(src: string, volume: number = 1) {
  const sfx = new Audio(src);
  sfx.volume = volume;
  sfx.play().catch(() => {});
}

let currentVoice: HTMLAudioElement | null = null;

export function playVoice(src: string, volume: number = 1) {
  stopVoice();
  currentVoice = new Audio(src);
  currentVoice.volume = volume;
  currentVoice.play().catch(() => {});
  currentVoice.addEventListener("ended", () => {
    currentVoice = null;
  });
}

export function stopVoice() {
  if (currentVoice) {
    currentVoice.pause();
    currentVoice.currentTime = 0;
    currentVoice = null;
  }
}

export function setVoiceVolume(volume: number) {
  if (currentVoice) {
    currentVoice.volume = volume;
  }
}
