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
import { isNativeMobileRuntime } from "../platform/runtime";

interface SettingsMenuProps {
  isVRMode: boolean;
  onClose: () => void;
  onMainMenu: () => void;
}

export function SettingsMenu({
  isVRMode,
  onClose,
  onMainMenu,
}: SettingsMenuProps) {
  const { state, dispatch } = useGame();
  const [slotMode, setSlotMode] = useState<"save" | "load" | null>(null);
  const [selectedControl, setSelectedControl] = useState(0);

  const isVR = isVRMode;
  const isNativeMobile = isNativeMobileRuntime();

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

  const CONTROL_COUNT = 9;

  useGamepadControls({
    enabled: !slotMode,
    onMenu: onClose,
    onBack: onClose,
    onUp: () =>
      setSelectedControl((prev) => (prev + CONTROL_COUNT - 1) % CONTROL_COUNT),
    onDown: () => setSelectedControl((prev) => (prev + 1) % CONTROL_COUNT),
    onLeft: () => {
      if (selectedControl === 1) adjustVolume("master", -0.05);
      if (selectedControl === 2) adjustVolume("bgm", -0.05);
      if (selectedControl === 3) adjustVolume("sfx", -0.05);
      if (selectedControl === 4) adjustVolume("voice", -0.05);
      if (selectedControl === 5) adjustTextSpeed(5);
    },
    onRight: () => {
      if (selectedControl === 1) adjustVolume("master", 0.05);
      if (selectedControl === 2) adjustVolume("bgm", 0.05);
      if (selectedControl === 3) adjustVolume("sfx", 0.05);
      if (selectedControl === 4) adjustVolume("voice", 0.05);
      if (selectedControl === 5) adjustTextSpeed(-5);
    },
    onConfirm: () => {
      if (selectedControl === 0) onClose();
      if (selectedControl === 6) setSlotMode("save");
      if (selectedControl === 7) setSlotMode("load");
      if (selectedControl === 8) onMainMenu();
    },
  });

  return (
    <>
      <div className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-4 backdrop-blur-sm animate-fade-in sm:items-center sm:py-6">
        <div
          className={`w-[90%] max-w-md max-h-[calc(100vh-2rem)] overflow-hidden ${panelClass} animate-slide-up sm:max-h-[90vh]`}
        >
          <div className="flex max-h-[inherit] flex-col">
            <div
              className={`flex shrink-0 items-center justify-between border-b ${
                isVR ? "border-pink-400/15" : "border-gray-700/50"
              } ${isNativeMobile ? "px-4 py-3" : "px-6 py-5"}`}
            >
              <h2
                className={`font-bold ${
                  isNativeMobile ? "text-lg" : "text-xl"
                } ${isVR ? "text-pink-200" : "text-gray-200"}`}
              >
                Settings
              </h2>
              <button
                onClick={onClose}
                className={`flex items-center justify-center text-lg ${
                  isNativeMobile ? "h-7 w-7" : "h-8 w-8"
                } ${buttonClass} ${selectedControl === 0 ? selectedClass : ""}`}
              >
                ✕
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto ${
                isNativeMobile ? "px-4 py-3" : "px-6 py-5 pr-1"
              }`}
            >
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
            </div>

            {isNativeMobile ? (
              <div
                className={`shrink-0 border-t px-4 py-3 ${
                  isVR
                    ? "border-pink-400/15 bg-black/15"
                    : "border-gray-700/50 bg-black/10"
                }`}
              >
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSlotMode("save")}
                    className={`min-w-0 px-2 py-2 text-xs font-medium transition-all ${buttonClass} ${selectedControl === 6 ? selectedClass : ""}`}
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setSlotMode("load")}
                    className={`min-w-0 px-2 py-2 text-xs font-medium transition-all ${buttonClass} ${selectedControl === 7 ? selectedClass : ""}`}
                  >
                    📂 Load
                  </button>
                  <button
                    onClick={onMainMenu}
                    className={`min-w-0 px-2 py-2 text-xs font-medium transition-all ${
                      isVR
                        ? "bg-red-600/50 hover:bg-red-500/70 text-white rounded-xl border border-red-400/30"
                        : "bg-red-900/50 hover:bg-red-800/60 text-gray-200 border border-red-700/50 rounded-sm"
                    } ${selectedControl === 8 ? selectedClass : ""}`}
                  >
                    🏠 Menu
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 pb-6">
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setSlotMode("save")}
                    className={`w-full py-3 text-base font-medium transition-all ${buttonClass} ${selectedControl === 6 ? selectedClass : ""}`}
                  >
                    💾 Save Game
                  </button>
                  <button
                    onClick={() => setSlotMode("load")}
                    className={`w-full py-3 text-base font-medium transition-all ${buttonClass} ${selectedControl === 7 ? selectedClass : ""}`}
                  >
                    📂 Load Game
                  </button>
                  <button
                    onClick={onMainMenu}
                    className={`w-full py-3 text-base font-medium transition-all ${
                      isVR
                        ? "bg-red-600/50 hover:bg-red-500/70 text-white rounded-xl border border-red-400/30"
                        : "bg-red-900/50 hover:bg-red-800/60 text-gray-200 border border-red-700/50 rounded-sm"
                    } ${selectedControl === 8 ? selectedClass : ""}`}
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
            )}
          </div>
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
