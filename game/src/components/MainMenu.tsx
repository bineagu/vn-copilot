import { useEffect, useState } from "react";
import { useGame } from "../useGame";
import { SaveLoadModal } from "./SaveLoadModal";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  const { state, dispatch, hasAnySave } = useGame();
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState(state.playerName);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const hasSave = hasAnySave();

  useEffect(() => {
    if (!hasSave) setSelectedMenuIndex(0);
  }, [hasSave]);

  const handleNewGame = () => {
    setShowNameInput(true);
  };

  const handleStartGame = () => {
    if (nameValue.trim()) {
      dispatch({ type: "SET_PLAYER_NAME", name: nameValue.trim() });
    } else if (state.playerName === "Player") {
      dispatch({ type: "SET_PLAYER_NAME", name: "" });
    }
    dispatch({ type: "SET_SCENE", sceneId: "day1_start", lineIndex: 0 });
    onStart();
  };

  const handleContinue = () => {
    setShowLoadSlots(true);
  };

  useGamepadControls({
    enabled: !showLoadSlots,
    onBack: () => {
      if (showNameInput) setShowNameInput(false);
    },
    onUp: () => {
      if (!showNameInput && hasSave) {
        setSelectedMenuIndex((prev) => (prev + 1) % 2);
      }
    },
    onDown: () => {
      if (!showNameInput && hasSave) {
        setSelectedMenuIndex((prev) => (prev + 1) % 2);
      }
    },
    onConfirm: () => {
      if (showNameInput) {
        handleStartGame();
        return;
      }

      if (selectedMenuIndex === 0) {
        handleNewGame();
      } else if (hasSave) {
        handleContinue();
      }
    },
  });

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center animate-bg-pan"
          style={{
            backgroundImage: `url("/backgrounds/5. The Dark Street.png")`,
            filter: "grayscale(80%) contrast(1.2)",
          }}
        />
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-black/80" />

      {/* Title */}
      <div className="relative z-10 text-center mb-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 tracking-tight leading-tight">
          <span className="text-red-400">System</span>
          <span className="text-gray-500">.Override(</span>
          <span className="text-pink-400">Love</span>
          <span className="text-gray-500">)</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 tracking-widest uppercase">
          A Psychological Horror Visual Novel
        </p>
      </div>

      {/* Name Input */}
      {showNameInput && (
        <div className="relative z-10 mb-8 w-[85%] max-w-sm animate-slide-up">
          <label className="block text-gray-400 text-sm mb-2 text-center">
            Enter your name
          </label>
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
            maxLength={20}
            className="w-full bg-gray-900/80 border border-gray-600 text-gray-100 text-center text-lg py-3 px-4 rounded focus:outline-none focus:border-red-400/60 transition-colors"
            autoFocus
            placeholder="Your name..."
          />
          <button
            onClick={handleStartGame}
            className="w-full mt-3 py-3 bg-red-900/60 hover:bg-red-800/70 text-gray-100 border border-red-700/40 rounded transition-all text-base font-medium active:scale-95 ring-2 ring-red-400/60"
          >
            Begin
          </button>
        </div>
      )}

      {/* Menu buttons */}
      {!showNameInput && (
        <div className="relative z-10 flex flex-col gap-4 w-[70%] max-w-xs animate-slide-up">
          <button
            onClick={handleNewGame}
            className={`py-4 text-lg font-medium text-gray-200 bg-gray-900/60 hover:bg-gray-800/70 border border-gray-600/40 rounded transition-all active:scale-95 ${selectedMenuIndex === 0 ? "ring-2 ring-red-400/60" : ""}`}
          >
            New Game
          </button>
          {hasSave && (
            <button
              onClick={handleContinue}
              className={`py-4 text-lg font-medium text-gray-200 bg-gray-900/60 hover:bg-gray-800/70 border border-gray-600/40 rounded transition-all active:scale-95 ${selectedMenuIndex === 1 ? "ring-2 ring-red-400/60" : ""}`}
            >
              Continue
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-gray-700 z-10">
        v0.1 — Day 1
      </div>

      <ControllerHints
        hints={
          showNameInput
            ? [
                { button: "KB", action: "Type Name" },
                { button: "A", action: "Begin" },
                { button: "B", action: "Back" },
              ]
            : hasSave
              ? [
                  { button: "D-Pad", action: "Navigate" },
                  { button: "A", action: "Select" },
                ]
              : [{ button: "A", action: "New Game" }]
        }
        isVRMode={false}
        className="absolute right-4 bottom-14"
      />

      {showLoadSlots && (
        <SaveLoadModal
          mode="load"
          isVRMode={false}
          onClose={() => setShowLoadSlots(false)}
          onLoadComplete={onStart}
        />
      )}
    </div>
  );
}
