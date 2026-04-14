import { useState } from "react";
import { useGame } from "../useGame";
import {
  setBGMVolume,
  stopBGM,
  setVoiceVolume,
  stopVoice,
} from "./AudioManager";
import { SaveLoadModal } from "./SaveLoadModal";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";

interface SettingsMenuProps {
  isVRMode: boolean;
  autoplay: boolean;
  onAutoplayChange: (v: boolean) => void;
  onClose: () => void;
  onMainMenu: () => void;
}

export function SettingsMenu({
  isVRMode,
  autoplay,
  onAutoplayChange,
  onClose,
  onMainMenu,
}: SettingsMenuProps) {
  const { state, dispatch } = useGame();
  const [slotMode, setSlotMode] = useState<"save" | "load" | null>(null);
  const [selectedControl, setSelectedControl] = useState(0);

  const isVR = isVRMode;

  const panelClass = isVR
    ? "bg-gradient-to-b from-purple-900/95 to-pink-900/95 border border-pink-400/30 rounded-2xl"
    : "bg-gray-900/95 border border-gray-600/50";

  const buttonClass = isVR
    ? "bg-pink-600/60 hover:bg-pink-500/80 text-white rounded-xl border border-pink-400/30"
    : "bg-gray-700/80 hover:bg-gray-600/80 text-gray-100 border border-gray-500/50 rounded-sm";

  const sliderAccent = isVR ? "accent-pink-400" : "accent-gray-400";
  const selectedClass = isVR
    ? "ring-2 ring-cyan-300/80"
    : "ring-2 ring-green-400/70";

  const clampVolume = (value: number) => Math.max(0, Math.min(1, value));

  const adjustVolume = (
    type: "master" | "bgm" | "sfx" | "voice",
    delta: number,
  ) => {
    const current =
      type === "master"
        ? state.masterVolume
        : type === "bgm"
          ? state.bgmVolume
          : type === "sfx"
            ? state.sfxVolume
            : state.voiceVolume;
    const next = clampVolume(Math.round((current + delta) * 20) / 20);

    if (type === "master") {
      dispatch({ type: "SET_MASTER_VOLUME", volume: next });
      setBGMVolume(state.bgmVolume * next);
      setVoiceVolume(state.voiceVolume * next);
      return;
    }

    if (type === "bgm") {
      dispatch({ type: "SET_BGM_VOLUME", volume: next });
      setBGMVolume(next * state.masterVolume);
      return;
    }

    if (type === "sfx") {
      dispatch({ type: "SET_SFX_VOLUME", volume: next });
      return;
    }

    dispatch({ type: "SET_VOICE_VOLUME", volume: next });
    setVoiceVolume(next * state.masterVolume);
  };

  const adjustTextSpeed = (delta: number) => {
    const next = Math.max(0, Math.min(75, state.textSpeed + delta));
    dispatch({ type: "SET_TEXT_SPEED", speed: next });
  };

  useGamepadControls({
    enabled: !slotMode,
    onMenu: onClose,
    onBack: onClose,
    onUp: () => setSelectedControl((prev) => (prev + 9) % 10),
    onDown: () => setSelectedControl((prev) => (prev + 1) % 10),
    onLeft: () => {
      if (selectedControl === 1) adjustVolume("master", -0.05);
      if (selectedControl === 2) adjustVolume("bgm", -0.05);
      if (selectedControl === 3) adjustVolume("sfx", -0.05);
      if (selectedControl === 4) adjustVolume("voice", -0.05);
      if (selectedControl === 5) adjustTextSpeed(5);
      if (selectedControl === 6) onAutoplayChange(false);
    },
    onRight: () => {
      if (selectedControl === 1) adjustVolume("master", 0.05);
      if (selectedControl === 2) adjustVolume("bgm", 0.05);
      if (selectedControl === 3) adjustVolume("sfx", 0.05);
      if (selectedControl === 4) adjustVolume("voice", 0.05);
      if (selectedControl === 5) adjustTextSpeed(-5);
      if (selectedControl === 6) onAutoplayChange(true);
    },
    onConfirm: () => {
      if (selectedControl === 0) onClose();
      if (selectedControl === 6) onAutoplayChange(!autoplay);
      if (selectedControl === 7) setSlotMode("save");
      if (selectedControl === 8) setSlotMode("load");
      if (selectedControl === 9) onMainMenu();
    },
  });

  return (
    <>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className={`w-[90%] max-w-md p-6 ${panelClass} animate-slide-up`}>
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-xl font-bold ${isVR ? "text-pink-200" : "text-gray-200"}`}
            >
              Settings
            </h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center text-lg ${buttonClass} ${selectedControl === 0 ? selectedClass : ""}`}
            >
              ✕
            </button>
          </div>

          {/* Master Volume */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 1 ? selectedClass : ""}`}
          >
            <label
              className={`block text-sm mb-1 ${isVR ? "text-pink-300" : "text-gray-400"}`}
            >
              Master Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.masterVolume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                dispatch({ type: "SET_MASTER_VOLUME", volume: v });
                setBGMVolume(state.bgmVolume * v);
                setVoiceVolume(state.voiceVolume * v);
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* BGM Volume */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 2 ? selectedClass : ""}`}
          >
            <label
              className={`block text-sm mb-1 ${isVR ? "text-pink-300" : "text-gray-400"}`}
            >
              Music Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.bgmVolume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                dispatch({ type: "SET_BGM_VOLUME", volume: v });
                setBGMVolume(v * state.masterVolume);
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* SFX Volume */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 3 ? selectedClass : ""}`}
          >
            <label
              className={`block text-sm mb-1 ${isVR ? "text-pink-300" : "text-gray-400"}`}
            >
              SFX Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.sfxVolume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                dispatch({ type: "SET_SFX_VOLUME", volume: v });
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* Voice Volume */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 4 ? selectedClass : ""}`}
          >
            <label
              className={`block text-sm mb-1 ${isVR ? "text-pink-300" : "text-gray-400"}`}
            >
              Voice Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.voiceVolume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                dispatch({ type: "SET_VOICE_VOLUME", volume: v });
                setVoiceVolume(v * state.masterVolume);
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* Text Speed */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 5 ? selectedClass : ""}`}
          >
            <label
              className={`block text-sm mb-1 ${isVR ? "text-pink-300" : "text-gray-400"}`}
            >
              Text Speed
            </label>
            <input
              type="range"
              min="5"
              max="80"
              step="5"
              value={80 - state.textSpeed}
              onChange={(e) =>
                dispatch({
                  type: "SET_TEXT_SPEED",
                  speed: 80 - parseInt(e.target.value),
                })
              }
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Autoplay */}
          <div
            className={`mb-5 rounded-lg p-2 ${selectedControl === 6 ? selectedClass : ""}`}
          >
            <label
              className={`flex items-center justify-between cursor-pointer ${
                isVR ? "text-pink-300" : "text-gray-400"
              }`}
            >
              <span className="text-sm">Auto-advance read lines</span>
              <button
                onClick={() => onAutoplayChange(!autoplay)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                  autoplay
                    ? isVR
                      ? "bg-pink-500"
                      : "bg-green-600"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    autoplay ? "translate-x-[1px]" : "translate-x-[-20.5px]"
                  }`}
                />
              </button>
            </label>
            <p
              className={`text-xs mt-1 ${isVR ? "text-pink-400/60" : "text-gray-600"}`}
            >
              Skips through already-seen lines automatically
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => setSlotMode("save")}
              className={`w-full py-3 text-base font-medium transition-all ${buttonClass} ${selectedControl === 7 ? selectedClass : ""}`}
            >
              💾 Save Game
            </button>
            <button
              onClick={() => setSlotMode("load")}
              className={`w-full py-3 text-base font-medium transition-all ${buttonClass} ${selectedControl === 8 ? selectedClass : ""}`}
            >
              📂 Load Game
            </button>
            <button
              onClick={onMainMenu}
              className={`w-full py-3 text-base font-medium transition-all ${
                isVR
                  ? "bg-red-600/50 hover:bg-red-500/70 text-white rounded-xl border border-red-400/30"
                  : "bg-red-900/50 hover:bg-red-800/60 text-gray-200 border border-red-700/50 rounded-sm"
              } ${selectedControl === 9 ? selectedClass : ""}`}
            >
              🏠 Main Menu
            </button>
          </div>

          <ControllerHints
            hints={[
              { button: "D-Pad", action: "Navigate" },
              { button: "Left/Right", action: "Adjust" },
              { button: "A", action: "Confirm" },
              { button: "B", action: "Close" },
            ]}
            isVRMode={isVR}
            className="mt-5"
          />
        </div>
      </div>

      {slotMode && (
        <SaveLoadModal
          mode={slotMode}
          isVRMode={isVR}
          onClose={() => setSlotMode(null)}
          onLoadComplete={() => {
            stopBGM();
            stopVoice();
            onClose();
          }}
        />
      )}
    </>
  );
}
