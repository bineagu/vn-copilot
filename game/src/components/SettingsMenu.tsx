import { useState } from "react";
import { useGame } from "../useGame";
import {
  setBGMVolume,
  stopBGM,
  setVoiceVolume,
  stopVoice,
} from "./AudioManager";
import { SaveLoadModal } from "./SaveLoadModal";

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

  const isVR = isVRMode;

  const panelClass = isVR
    ? "bg-gradient-to-b from-purple-900/95 to-pink-900/95 border border-pink-400/30 rounded-2xl"
    : "bg-gray-900/95 border border-gray-600/50";

  const buttonClass = isVR
    ? "bg-pink-600/60 hover:bg-pink-500/80 text-white rounded-xl border border-pink-400/30"
    : "bg-gray-700/80 hover:bg-gray-600/80 text-gray-100 border border-gray-500/50 rounded-sm";

  const sliderAccent = isVR ? "accent-pink-400" : "accent-gray-400";

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
              className={`w-8 h-8 flex items-center justify-center text-lg ${buttonClass}`}
            >
              ✕
            </button>
          </div>

          {/* BGM Volume */}
          <div className="mb-5">
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
                setBGMVolume(v);
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* Voice Volume */}
          <div className="mb-5">
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
                setVoiceVolume(v);
              }}
              className={`w-full h-2 rounded-lg cursor-pointer ${sliderAccent}`}
            />
          </div>

          {/* Text Speed */}
          <div className="mb-5">
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

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => setSlotMode("save")}
              className={`w-full py-3 text-base font-medium transition-all ${buttonClass}`}
            >
              💾 Save Game
            </button>
            <button
              onClick={() => setSlotMode("load")}
              className={`w-full py-3 text-base font-medium transition-all ${buttonClass}`}
            >
              📂 Load Game
            </button>
            <button
              onClick={onMainMenu}
              className={`w-full py-3 text-base font-medium transition-all ${
                isVR
                  ? "bg-red-600/50 hover:bg-red-500/70 text-white rounded-xl border border-red-400/30"
                  : "bg-red-900/50 hover:bg-red-800/60 text-gray-200 border border-red-700/50 rounded-sm"
              }`}
            >
              🏠 Main Menu
            </button>
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
