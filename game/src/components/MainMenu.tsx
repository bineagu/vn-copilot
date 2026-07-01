import { useEffect, useMemo, useState } from "react";
import { useGame } from "../useGame";
import { SaveLoadModal } from "./SaveLoadModal";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";
import { MainMenuNameEntry } from "./MainMenuNameEntry";
import { isNativeMobileRuntime, isTauriRuntime } from "../platform/runtime";
import { exit } from "@tauri-apps/plugin-process";

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  const { state, dispatch, getAllSlots, hasAnySave, loadFromSlot } = useGame();
  const [showNameInput, setShowNameInput] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const hasSave = hasAnySave();
  const isTauri = isTauriRuntime();
  const isNativeMobile = isNativeMobileRuntime();

  useEffect(() => {
    const handlePopState = () => {
      if (showNameInput && window.history.state?.screen === "menu") {
        setShowNameInput(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showNameInput]);

  const handleExit = async () => {
    await exit(0);
  };
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
    window.history.pushState({ screen: "name-entry" }, "");
    setShowNameInput(true);
  };

  const handleCancelNameEntry = () => {
    if (window.history.state?.screen === "name-entry") {
      window.history.back();
      return;
    }

    setShowNameInput(false);
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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/backgrounds/main_menu.jpeg")` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Title */}
      <div
        className={`relative z-10 text-center animate-fade-in ${
          isNativeMobile ? "mb-6" : "mb-12"
        }`}
      >
        <h1
          className={`font-bold text-gray-100 tracking-tight leading-tight ${
            isNativeMobile
              ? "text-3xl sm:text-4xl"
              : "text-4xl sm:text-5xl md:text-6xl"
          }`}
          style={{
            textShadow:
              "0 0 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7), 2px 2px 0 rgba(220,38,38,0.4), -2px -1px 0 rgba(236,72,153,0.3), 4px 0 8px rgba(220,38,38,0.2)",
          }}
        >
          <span className="text-red-400">System</span>
          <span className="text-gray-500">.Override(</span>
          <span className="text-pink-400">Love</span>
          <span className="text-gray-500">)</span>
        </h1>
        <p
          className={`text-gray-400 tracking-widest uppercase ${
            isNativeMobile
              ? "mt-2 text-[11px] sm:text-xs"
              : "mt-3 text-sm sm:text-base"
          }`}
          style={{
            textShadow: "0 0 20px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          A Psychological Horror Visual Novel
        </p>
      </div>

      {/* Name Input */}
      {showNameInput && (
        <MainMenuNameEntry
          initialName={state.playerName}
          onSubmit={handleStartGame}
          onCancel={handleCancelNameEntry}
        />
      )}

      {/* Menu buttons */}
      {!showNameInput && (
        <div
          className={`relative z-10 flex flex-col animate-slide-up ${
            isNativeMobile
              ? "gap-3 w-[78%] max-w-[17rem]"
              : "gap-4 w-[70%] max-w-xs"
          }`}
        >
          {menuActions.map((action, index) => (
            <button
              key={action.label}
              onClick={action.onSelect}
              className={`text-gray-200 bg-gray-900/60 hover:bg-gray-800/70 border border-gray-600/40 rounded transition-all active:scale-95 ${
                isNativeMobile ? "py-3 text-base" : "py-4 text-lg"
              } ${clampedSelectedMenuIndex === index ? "ring-2 ring-red-400/60" : ""}`}
            >
              {action.label}
            </button>
          ))}
          {isTauri && (
            <button
              key={"exit-btn"}
              onClick={handleExit}
              className={`font-medium text-gray-200 bg-gray-900/60 hover:bg-gray-800/70 border border-gray-600/40 rounded transition-all active:scale-95 ${
                isNativeMobile ? "py-3 text-base" : "py-4 text-lg"
              }`}
            >
              Exit
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        className={`absolute text-xs text-gray-700 z-10 ${
          isNativeMobile ? "bottom-3" : "bottom-6"
        }`}
      >
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
        className={`absolute right-4 ${isNativeMobile ? "bottom-9" : "bottom-14"}`}
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
