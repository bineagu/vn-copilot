import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useGame } from "../useGame";
import { getSceneById } from "../script";
import { BackgroundLayer } from "./BackgroundLayer";
import { SpriteLayer } from "./SpriteLayer";
import { DialogueBox } from "./DialogueBox";
import type { DialogueBoxHandle } from "./DialogueBox";
import { SettingsMenu } from "./SettingsMenu";
import { AudioManager, playBGM, stopBGM } from "./AudioManager";
import type { Choice, DialogueLine } from "../types";

interface GameScreenProps {
  onMainMenu: () => void;
}

// Walk backward through lines to find the last set background/sprites
function resolveFromHistory(
  scene: { lines: DialogueLine[] } | undefined,
  index: number,
) {
  let bg = "";
  let sprites: DialogueLine["sprites"] = [];
  if (!scene) return { bg, sprites };
  for (let i = 0; i <= index; i++) {
    const l = scene.lines[i];
    if (l.background) bg = l.background;
    if (l.sprites) sprites = l.sprites;
  }
  return { bg, sprites };
}

export function GameScreen({ onMainMenu }: GameScreenProps) {
  const { state, dispatch } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const dialogueRef = useRef<DialogueBoxHandle>(null);

  const scene = getSceneById(state.currentSceneId);
  const line = scene?.lines[state.dialogueIndex];

  const { bg: currentBg, sprites: currentSprites } = useMemo(
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

  // Handle BGM changes
  useEffect(() => {
    if (activeBgm === null) {
      stopBGM();
    } else if (activeBgm) {
      playBGM(activeBgm, state.bgmVolume);
    }
  }, [activeBgm, state.bgmVolume]);

  const handleAdvance = useCallback(() => {
    dispatch({ type: "ADVANCE" });
  }, [dispatch]);

  const handleChoice = useCallback(
    (choice: Choice) => {
      dispatch({
        type: "CHOOSE",
        nextSceneId: choice.nextSceneId,
        stateEffects: choice.stateEffects,
      });
    },
    [dispatch],
  );

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showSettings) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dialogueRef.current?.tap();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSettings]);

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
        <BackgroundLayer src={currentBg} isVRMode={state.isVRMode} />
      )}

      {/* Sprites */}
      <SpriteLayer sprites={currentSprites || []} isVRMode={state.isVRMode} />

      {/* Settings gear button */}
      <button
        onClick={() => setShowSettings(true)}
        className={`absolute top-3 right-3 z-30 w-10 h-10 flex items-center justify-center text-xl rounded-full transition-all active:scale-90 ${
          state.isVRMode
            ? "bg-pink-900/50 text-pink-300 border border-pink-400/30 hover:bg-pink-800/60"
            : "bg-black/40 text-gray-400 border border-gray-600/30 hover:bg-black/60"
        }`}
      >
        ⚙
      </button>

      {/* Stats debug (small) */}
      <div
        className={`absolute top-3 left-3 z-30 text-[10px] px-2 py-1 rounded ${
          state.isVRMode
            ? "bg-pink-900/40 text-pink-400/60"
            : "bg-black/30 text-gray-600"
        }`}
      >
        LUC:{state.variables.lucidity || 0} AFF:
        {state.variables.irisAffection || 0}
      </div>

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
        text={line.text}
        isInternal={line.isInternal}
        isVRMode={state.isVRMode}
        choices={line.choices}
        textSpeed={state.textSpeed}
        playerName={state.playerName}
        systemGraphic={line.systemGraphic}
        onAdvance={handleAdvance}
        onChoice={handleChoice}
      />

      {/* Settings Overlay */}
      {showSettings && (
        <SettingsMenu
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
