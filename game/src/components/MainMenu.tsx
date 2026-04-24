import { useMemo, useState } from "react";
import { useGame } from "../useGame";
import { SaveLoadModal } from "./SaveLoadModal";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";
import { MainMenuNameEntry } from "./MainMenuNameEntry";

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  const { state, dispatch, getAllSlots, hasAnySave, loadFromSlot } = useGame();
  const [showNameInput, setShowNameInput] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const hasSave = hasAnySave();
  const latestSaveSlot = useMemo(() => {
    const slots = getAllSlots();
    let latestIndex: number | null = null;

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (!slot) continue;
      if (
        latestIndex === null ||
        slot.timestamp > (slots[latestIndex]?.timestamp ?? 0)
      ) {
        latestIndex = i;
      }
    }

    return latestIndex;
  }, [getAllSlots]);

  const handleLoadGame = () => {
    setShowLoadSlots(true);
  };

  const handleNewGame = () => {
    setShowLoadSlots(false);
    setShowNameInput(true);
  };

  const handleStartGame = (playerName: string) => {
    dispatch({ type: "SET_PLAYER_NAME", name: playerName });
    dispatch({ type: "SET_SCENE", sceneId: "day1_start", lineIndex: 0 });
    onStart();
  };

  const handleContinue = () => {
    if (latestSaveSlot === null) return;
    if (loadFromSlot(latestSaveSlot)) {
      onStart();
    }
  };

  const menuActions = hasSave
    ? [
        { label: "Continue", onSelect: handleContinue },
        { label: "Load Game", onSelect: handleLoadGame },
        { label: "New Game", onSelect: handleNewGame },
      ]
    : [{ label: "New Game", onSelect: handleNewGame }];
  const clampedSelectedMenuIndex = Math.min(
    selectedMenuIndex,
    Math.max(0, menuActions.length - 1),
  );

  useGamepadControls({
    enabled: !showLoadSlots && !showNameInput,
    onBack: () => {
      if (showNameInput) {
        setShowNameInput(false);
      }
    },
    onUp: () => {
      if (menuActions.length > 1) {
        setSelectedMenuIndex(
          (prev) => (prev + menuActions.length - 1) % menuActions.length,
        );
      }
    },
    onDown: () => {
      if (menuActions.length > 1) {
        setSelectedMenuIndex((prev) => (prev + 1) % menuActions.length);
      }
    },
    onConfirm: () => {
      menuActions[clampedSelectedMenuIndex]?.onSelect();
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
        <MainMenuNameEntry
          initialName={state.playerName}
          onSubmit={handleStartGame}
          onCancel={() => setShowNameInput(false)}
        />
      )}

      {/* Menu buttons */}
      {!showNameInput && (
        <div className="relative z-10 flex flex-col gap-4 w-[70%] max-w-xs animate-slide-up">
          {menuActions.map((action, index) => (
            <button
              key={action.label}
              onClick={action.onSelect}
              className={`py-4 text-lg font-medium text-gray-200 bg-gray-900/60 hover:bg-gray-800/70 border border-gray-600/40 rounded transition-all active:scale-95 ${clampedSelectedMenuIndex === index ? "ring-2 ring-red-400/60" : ""}`}
            >
              {action.label}
            </button>
          ))}
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
                { button: "D-Pad", action: "Navigate" },
                { button: "A", action: "Select Key" },
                { button: "Y", action: "Delete" },
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
