import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useGame } from "../useGame";
import { getSceneById } from "../script";
import { BackgroundLayer } from "./BackgroundLayer";
import { SpriteLayer } from "./SpriteLayer";
import { DialogueBox } from "./DialogueBox";
import type { DialogueBoxHandle } from "./DialogueBox";
import { SettingsMenu } from "./SettingsMenu";
import {
  AudioManager,
  playBGM,
  pauseBGM,
  resumeBGM,
  stopBGM,
  playSFX,
  playVoice,
  stopVoice,
} from "./AudioManager";
import type { Choice, DialogueLine } from "../types";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";
import { appStorage } from "../platform/storage";

interface GameScreenProps {
  onMainMenu: () => void;
}

// Walk backward through lines to find the last set background/sprites
function resolveFromHistory(
  scene: { vrMode?: boolean; lines: DialogueLine[] } | undefined,
  index: number,
) {
  let bg = "";
  let sprites: DialogueLine["sprites"] = [];
  let vrMode = scene?.vrMode ?? false;
  if (!scene) return { bg, sprites, vrMode };
  for (let i = 0; i <= index; i++) {
    const l = scene.lines[i];
    if (l.background) bg = l.background;
    if (l.sprites) sprites = l.sprites;
    if (l.vrMode !== undefined) vrMode = l.vrMode;
  }
  return { bg, sprites, vrMode };
}

export function GameScreen({ onMainMenu }: GameScreenProps) {
  const { state, dispatch, saveToSlot } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [skipMode, setSkipMode] = useState(false);
  const [choiceSelection, setChoiceSelection] = useState({
    key: "",
    index: 0,
  });
  const [historyDepth, setHistoryDepth] = useState(0);
  const dialogueRef = useRef<DialogueBoxHandle>(null);

  // ── Visited lines (persisted to localStorage) ─────────────────────────────
  const VISITED_KEY = "sol_visited";
  const visitedRef = useRef<Set<string>>(
    (() => {
      try {
        const raw = appStorage.getItem("sol_visited");
        return raw ? new Set(JSON.parse(raw) as string[]) : new Set<string>();
      } catch {
        return new Set<string>();
      }
    })(),
  );

  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Navigation history (in-memory, for back button) ───────────────────────
  const navHistoryRef = useRef<
    Array<{ sceneId: string; dialogueIndex: number }>
  >([]);

  // ── Debug mode (toggled by 5× backtick) ───────────────────────────────────
  const [debugMode, setDebugMode] = useState(false);
  const backtickCountRef = useRef(0);
  const backtickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = getSceneById(state.currentSceneId);
  const line = scene?.lines[state.dialogueIndex];
  const currentLineKey = `${state.currentSceneId}:${state.dialogueIndex}`;
  const hasReadCurrentLine = visitedRef.current.has(currentLineKey);
  const effectiveText =
    line?.textVariants?.find((v) =>
      Object.entries(v.requires).every(
        ([k, val]) => (state.variables[k] ?? 0) >= val,
      ),
    )?.text ??
    line?.text ??
    "";
  const hasChoices = !!(line?.choices && line.choices.length > 0);
  const choiceSelectionKey = currentLineKey;
  const selectedChoiceIndex =
    choiceSelection.key === choiceSelectionKey ? choiceSelection.index : 0;
  const shouldSkipReadLine = skipMode && hasReadCurrentLine && !hasChoices;

  const isEndOfGame =
    scene !== undefined &&
    state.dialogueIndex === scene.lines.length - 1 &&
    !hasChoices &&
    !scene.nextSceneId;

  const gamepadHints = hasChoices
    ? [
        { button: "A", action: "Select" },
        { button: "D-Pad", action: "Move" },
        { button: "Start", action: "Settings" },
      ]
    : [
        { button: "A", action: isEndOfGame ? "Menu" : "Advance" },
        { button: "Start", action: "Settings" },
      ];

  const clearAdvanceTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  // Track visited lines
  useEffect(() => {
    visitedRef.current.add(currentLineKey);
    appStorage.setItem(VISITED_KEY, JSON.stringify([...visitedRef.current]));

    return () => {
      clearAdvanceTimer();
    };
  }, [clearAdvanceTimer, currentLineKey]);

  useEffect(() => {
    if (!skipMode) {
      return;
    }

    if (!hasReadCurrentLine || hasChoices || showSettings || showExitPrompt) {
      setSkipMode(false);
      clearAdvanceTimer();
    }
  }, [
    clearAdvanceTimer,
    hasChoices,
    hasReadCurrentLine,
    showExitPrompt,
    showSettings,
    skipMode,
  ]);

  const {
    bg: currentBg,
    sprites: currentSprites,
    vrMode: activeVrMode,
  } = useMemo(
    () => resolveFromHistory(scene, state.dialogueIndex),
    [scene, state.dialogueIndex],
  );

  // Resolve the active BGM by scanning backwards through the scene
  const activeBgm = useMemo(() => {
    if (!scene) return undefined;
    for (let i = state.dialogueIndex; i >= 0; i--) {
      const l = scene.lines[i];
      if (l.bgm !== undefined) return l.bgm; // null = silence, string = track
    }
    return undefined;
  }, [scene, state.dialogueIndex]);

  const master = state.masterVolume;

  // Handle BGM changes
  useEffect(() => {
    if (activeBgm === null) {
      stopBGM();
    } else if (activeBgm) {
      playBGM(activeBgm, state.bgmVolume * master);
    }
  }, [activeBgm, state.bgmVolume, master]);

  // Handle SFX on line change
  useEffect(() => {
    if (line?.sfx) {
      playSFX(
        line.sfx,
        Math.min((line.sfxVolume ?? 1) * state.sfxVolume * master, 1),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to trigger on line change, not on volume changes
  }, [line]);

  // Handle voice lines on line change
  useEffect(() => {
    if (shouldSkipReadLine) {
      stopVoice();
      return;
    }

    if (line?.voice) {
      playVoice(line.voice, state.voiceVolume * master);
    } else {
      stopVoice();
    }
  }, [line, master, shouldSkipReadLine, state.voiceVolume]);

  const handleAdvance = useCallback(() => {
    if (isEndOfGame) {
      stopBGM();
      onMainMenu();
    } else {
      navHistoryRef.current.push({
        sceneId: state.currentSceneId,
        dialogueIndex: state.dialogueIndex,
      });
      setHistoryDepth(navHistoryRef.current.length);
      dispatch({ type: "ADVANCE" });
    }
  }, [
    dispatch,
    isEndOfGame,
    onMainMenu,
    setHistoryDepth,
    state.currentSceneId,
    state.dialogueIndex,
  ]);

  const handleBack = useCallback(() => {
    const prev = navHistoryRef.current.pop();
    if (prev) {
      setHistoryDepth(navHistoryRef.current.length);
      dispatch({
        type: "SET_SCENE",
        sceneId: prev.sceneId,
        lineIndex: prev.dialogueIndex,
      });
    }
  }, [dispatch]);

  const handleChoice = useCallback(
    (choice: Choice) => {
      navHistoryRef.current.push({
        sceneId: state.currentSceneId,
        dialogueIndex: state.dialogueIndex,
      });
      setHistoryDepth(navHistoryRef.current.length);
      dispatch({
        type: "CHOOSE",
        nextSceneId: choice.nextSceneId,
        stateEffects: choice.stateEffects,
        requirements: choice.requirements,
      });
    },
    [dispatch, state.currentSceneId, state.dialogueIndex],
  );

  const handleExitToMainMenu = useCallback(() => {
    stopBGM();
    stopVoice();
    setShowExitPrompt(false);
    setShowSettings(false);
    onMainMenu();
  }, [onMainMenu]);

  const handleSaveAndExit = useCallback(() => {
    saveToSlot(0);
    handleExitToMainMenu();
  }, [handleExitToMainMenu, saveToSlot]);

  const moveChoiceSelection = useCallback(
    (delta: number) => {
      if (!line?.choices?.length || !dialogueRef.current?.isComplete()) return;
      setChoiceSelection((prev) => {
        const currentIndex = prev.key === choiceSelectionKey ? prev.index : 0;
        const next = currentIndex + delta;
        const total = line.choices!.length;
        return {
          key: choiceSelectionKey,
          index: (next + total) % total,
        };
      });
    },
    [choiceSelectionKey, line?.choices],
  );

  // Skip mode: advances immediately after read lines render complete
  const handleLineComplete = useCallback(() => {
    if (
      !skipMode ||
      !hasReadCurrentLine ||
      hasChoices ||
      isEndOfGame ||
      showSettings ||
      showExitPrompt
    )
      return;

    autoplayTimerRef.current = setTimeout(
      () => {
        handleAdvance();
      },
      skipMode ? 45 : 120,
    );
  }, [
    handleAdvance,
    hasChoices,
    hasReadCurrentLine,
    isEndOfGame,
    showExitPrompt,
    showSettings,
    skipMode,
  ]);

  const stopSkipMode = useCallback(() => {
    setSkipMode(false);
    clearAdvanceTimer();
  }, [clearAdvanceTimer]);

  const toggleSkipMode = useCallback(() => {
    setSkipMode((prev) => {
      if (prev) {
        clearAdvanceTimer();
        return false;
      }

      clearAdvanceTimer();
      return true;
    });
  }, [clearAdvanceTimer]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Esc toggles settings
      if (e.key === "Escape") {
        e.preventDefault();
        stopSkipMode();
        setShowSettings((prev) => !prev);
        return;
      }
      if (showSettings) return;
      if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        toggleSkipMode();
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (skipMode) {
          stopSkipMode();
          return;
        }
        dialogueRef.current?.tap();
      }
      // Backtick 5× → toggle debug mode
      if (e.key === "`") {
        backtickCountRef.current++;
        if (backtickTimerRef.current) clearTimeout(backtickTimerRef.current);
        backtickTimerRef.current = setTimeout(() => {
          backtickCountRef.current = 0;
        }, 2000);
        if (backtickCountRef.current >= 5) {
          backtickCountRef.current = 0;
          setDebugMode((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSettings, skipMode, stopSkipMode, toggleSkipMode]);

  useEffect(() => {
    const handleRequestExit = () => {
      stopSkipMode();
      setShowSettings(false);
      setShowExitPrompt(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseBGM();
        stopVoice();
      } else {
        resumeBGM();
      }
    };

    window.addEventListener(
      "sol:request-exit-to-menu",
      handleRequestExit as EventListener,
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener(
        "sol:request-exit-to-menu",
        handleRequestExit as EventListener,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [stopSkipMode]);

  useGamepadControls({
    enabled: !showSettings,
    onMenu: () => {
      stopSkipMode();
      setShowSettings((prev) => !prev);
    },
    onBack: () => {
      if (skipMode) {
        stopSkipMode();
        return;
      }
      if (debugMode && navHistoryRef.current.length > 0) {
        handleBack();
      }
    },
    onUp: () => moveChoiceSelection(-1),
    onDown: () => moveChoiceSelection(1),
    onConfirm: () => {
      if (skipMode) {
        stopSkipMode();
        return;
      }
      if (hasChoices && dialogueRef.current?.isComplete()) {
        const choice = line.choices?.[selectedChoiceIndex];
        if (choice) handleChoice(choice);
        return;
      }
      dialogueRef.current?.tap();
    },
  });

  if (!scene || !line) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black text-gray-400 text-lg">
        Scene not found.
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AudioManager />

      {/* Background */}
      {currentBg && (
        <BackgroundLayer
          src={currentBg}
          isVRMode={activeVrMode}
          rotate={line?.screenEffect === "tilt" ? 90 : undefined}
        />
      )}

      {/* Sprites */}
      <SpriteLayer sprites={currentSprites || []} isVRMode={activeVrMode} />

      {/* Pain screen effect */}
      {line?.screenEffect === "pain" && (
        <div
          className="absolute inset-0 pointer-events-none z-20 animate-pain-flash"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(255,40,40,0.95) 0%, rgba(180,0,0,0.85) 60%, rgba(100,0,0,0.9) 100%)",
          }}
        />
      )}

      {/* Settings gear button */}
      <button
        onClick={() => setShowSettings(true)}
        className={`absolute top-3 right-3 z-30 w-10 h-10 flex items-center justify-center text-xl rounded-full transition-all active:scale-90 ${
          activeVrMode
            ? "bg-pink-900/50 text-pink-300 border border-pink-400/30 hover:bg-pink-800/60"
            : "bg-black/40 text-gray-400 border border-gray-600/30 hover:bg-black/60"
        }`}
      >
        ⚙
      </button>

      <div className="absolute top-3 right-16 z-30 flex gap-2">
        <button
          onClick={toggleSkipMode}
          className={`rounded px-2 py-1 text-[10px] font-mono transition-all active:scale-95 ${
            skipMode
              ? activeVrMode
                ? "bg-cyan-500/25 text-cyan-100 border border-cyan-300/40"
                : "bg-amber-500/25 text-amber-100 border border-amber-400/50"
              : activeVrMode
                ? "bg-black/35 text-pink-200 border border-pink-400/25"
                : "bg-black/35 text-gray-200 border border-gray-500/35"
          }`}
        >
          {skipMode ? "STOP" : "SKIP"}
        </button>
      </div>

      {/* Debug back button (visible in debug mode) */}
      {debugMode && historyDepth > 0 && (
        <button
          onClick={handleBack}
          className={`absolute top-14 right-3 z-30 px-3 h-8 text-xs rounded transition-all active:scale-90 ${
            activeVrMode
              ? "bg-pink-900/60 text-pink-200 border border-pink-400/30 hover:bg-pink-800/70"
              : "bg-black/50 text-gray-300 border border-gray-500/40 hover:bg-black/70"
          }`}
        >
          ← Back
        </button>
      )}

      {/* Stats debug (small) */}
      {debugMode && (
        <div
          className={`absolute top-3 left-3 z-30 text-[10px] px-2 py-1 rounded ${
            activeVrMode
              ? "bg-pink-900/40 text-pink-400/60"
              : "bg-black/30 text-gray-600"
          }`}
        >
          LUC:{state.variables.lucidity || 0} AFF:
          {state.variables.irisAffection || 0} ADD:
          {state.variables.addiction || 0}
        </div>
      )}

      <ControllerHints
        hints={
          debugMode && historyDepth > 0
            ? [...gamepadHints, { button: "B", action: "Back" }]
            : gamepadHints
        }
        isVRMode={activeVrMode}
        className="absolute right-3 bottom-36"
      />

      {/* Tap area — first tap fills text, second advances */}
      <div
        className="absolute inset-0 z-10"
        onClick={() => {
          if (showSettings) return;
          if (skipMode) {
            stopSkipMode();
            return;
          }
          dialogueRef.current?.tap();
        }}
        style={{ bottom: "30%" }}
      />

      {/* Dialogue */}
      <DialogueBox
        ref={dialogueRef}
        speaker={line.speaker}
        text={effectiveText}
        isInternal={line.isInternal}
        isVRMode={activeVrMode}
        choices={line.choices}
        selectedChoiceIndex={selectedChoiceIndex}
        variables={state.variables}
        textSpeed={state.textSpeed}
        playerName={state.playerName}
        systemGraphic={line.systemGraphic}
        isEnding={isEndOfGame}
        debugMode={debugMode}
        instantComplete={shouldSkipReadLine}
        onAdvance={handleAdvance}
        onChoice={handleChoice}
        onComplete={handleLineComplete}
      />

      {/* Settings Overlay */}
      {showSettings && (
        <SettingsMenu
          isVRMode={activeVrMode}
          onClose={() => setShowSettings(false)}
          onMainMenu={() => {
            setShowExitPrompt(true);
          }}
        />
      )}

      {showExitPrompt && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-sm rounded-2xl border p-5 shadow-2xl ${
              activeVrMode
                ? "border-pink-400/30 bg-gradient-to-b from-purple-900/95 to-pink-900/95"
                : "border-gray-600/50 bg-gray-900/95"
            }`}
          >
            <h2
              className={`text-lg font-bold ${
                activeVrMode ? "text-pink-100" : "text-gray-100"
              }`}
            >
              Return to Main Menu?
            </h2>
            <p
              className={`mt-2 text-sm ${
                activeVrMode ? "text-pink-200/80" : "text-gray-300"
              }`}
            >
              Save before leaving this run?
            </p>
            <p
              className={`mt-2 text-xs ${
                activeVrMode ? "text-pink-300/60" : "text-gray-500"
              }`}
            >
              Save uses slot 1 as a quick exit save.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={handleSaveAndExit}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  activeVrMode
                    ? "border border-cyan-300/40 bg-cyan-500/30 text-cyan-50"
                    : "border border-green-500/40 bg-green-700/40 text-green-50"
                }`}
              >
                Save and Return
              </button>
              <button
                onClick={handleExitToMainMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  activeVrMode
                    ? "border border-pink-300/30 bg-pink-700/30 text-pink-50"
                    : "border border-gray-500/40 bg-gray-700/50 text-gray-100"
                }`}
              >
                Return Without Saving
              </button>
              <button
                onClick={() => setShowExitPrompt(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  activeVrMode
                    ? "border border-red-300/30 bg-red-800/30 text-red-100"
                    : "border border-red-500/40 bg-red-900/40 text-red-100"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
