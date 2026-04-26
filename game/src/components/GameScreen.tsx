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
  const { state, dispatch } = useGame();
  const [showSettings, setShowSettings] = useState(false);
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

  // ── Autoplay (persisted) ───────────────────────────────────────────────────
  const [autoplay, setAutoplay] = useState(
    () => appStorage.getItem("sol_autoplay") === "true",
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
  const effectiveText =
    line?.textVariants?.find((v) =>
      Object.entries(v.requires).every(
        ([k, val]) => (state.variables[k] ?? 0) >= val,
      ),
    )?.text ??
    line?.text ??
    "";
  const hasChoices = !!(line?.choices && line.choices.length > 0);
  const choiceSelectionKey = `${state.currentSceneId}:${state.dialogueIndex}`;
  const selectedChoiceIndex =
    choiceSelection.key === choiceSelectionKey ? choiceSelection.index : 0;

  const isEndOfGame =
    scene !== undefined &&
    state.dialogueIndex === scene.lines.length - 1 &&
    !hasChoices;

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

  // Track visited and whether this is a first-time visit
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  useEffect(() => {
    const key = `${state.currentSceneId}:${state.dialogueIndex}`;
    const alreadySeen = visitedRef.current.has(key);
    setIsFirstVisit(!alreadySeen);
    visitedRef.current.add(key);
    appStorage.setItem(VISITED_KEY, JSON.stringify([...visitedRef.current]));
    // Cancel any pending autoplay timer when line changes
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, [state.currentSceneId, state.dialogueIndex]);

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
      playSFX(line.sfx, (line.sfxVolume ?? 1) * state.sfxVolume * master);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to trigger on line change, not on volume changes
  }, [line]);

  // Handle voice lines on line change
  useEffect(() => {
    if (line?.voice) {
      playVoice(line.voice, state.voiceVolume * master);
    } else {
      stopVoice();
    }
  }, [line, state.voiceVolume, master]);

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

  // Autoplay: fires when DialogueBox typewriter completes
  const handleLineComplete = useCallback(() => {
    if (!autoplay || isFirstVisit || hasChoices || isEndOfGame || showSettings)
      return;
    autoplayTimerRef.current = setTimeout(() => {
      handleAdvance();
    }, 400);
  }, [
    autoplay,
    isFirstVisit,
    hasChoices,
    isEndOfGame,
    showSettings,
    handleAdvance,
  ]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Esc toggles settings
      if (e.key === "Escape") {
        e.preventDefault();
        setShowSettings((prev) => !prev);
        return;
      }
      if (showSettings) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
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
  }, [showSettings]);

  useGamepadControls({
    enabled: !showSettings,
    onMenu: () => setShowSettings((prev) => !prev),
    onBack: () => {
      if (debugMode && navHistoryRef.current.length > 0) {
        handleBack();
      }
    },
    onUp: () => moveChoiceSelection(-1),
    onDown: () => moveChoiceSelection(1),
    onConfirm: () => {
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

      {/* Autoplay indicator */}
      {autoplay && (
        <div
          className={`absolute top-3 right-16 z-30 text-[10px] px-2 py-1 rounded font-mono ${
            activeVrMode
              ? "bg-pink-900/60 text-pink-300 border border-pink-400/30"
              : "bg-black/40 text-green-400 border border-green-600/30"
          }`}
        >
          AUTO
        </div>
      )}

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
          if (!showSettings) dialogueRef.current?.tap();
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
        onAdvance={handleAdvance}
        onChoice={handleChoice}
        onComplete={handleLineComplete}
      />

      {/* Settings Overlay */}
      {showSettings && (
        <SettingsMenu
          isVRMode={activeVrMode}
          autoplay={autoplay}
          onAutoplayChange={(v) => {
            setAutoplay(v);
            appStorage.setItem("sol_autoplay", String(v));
          }}
          onClose={() => setShowSettings(false)}
          onMainMenu={() => {
            stopBGM();
            onMainMenu();
          }}
        />
      )}
    </div>
  );
}
