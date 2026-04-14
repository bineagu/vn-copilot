import { useReducer, type ReactNode } from "react";
import type { GameState, GameAction } from "./types";
import { getSceneById } from "./script";
import { GameContext, TOTAL_SLOTS } from "./useGame";
import type { SaveSlotData } from "./useGame";

const SAVE_PREFIX = "sol_slot_";

function meetsRequirements(
  variables: Record<string, number>,
  requirements?: Record<string, number>,
) {
  if (!requirements) return true;
  return Object.entries(requirements).every(
    ([key, value]) => (variables[key] || 0) >= value,
  );
}

const initialState: GameState = {
  currentSceneId: "day1_start",
  dialogueIndex: 0,
  isVRMode: false,
  playerName: "Player",
  variables: {
    lucidity: 0,
    irisAffection: 0,
    addiction: 0,
    silverLocket: 0,
  },
  textSpeed: 30,
  masterVolume: 1,
  bgmVolume: 0.5,
  sfxVolume: 0.7,
  voiceVolume: 1,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADVANCE": {
      const scene = getSceneById(state.currentSceneId);
      if (!scene) return state;
      const currentLine = scene.lines[state.dialogueIndex];
      if (currentLine?.choices && currentLine.choices.length > 0) {
        return state; // Don't advance past choices
      }
      if (state.dialogueIndex < scene.lines.length - 1) {
        return { ...state, dialogueIndex: state.dialogueIndex + 1 };
      }
      return state;
    }
    case "CHOOSE": {
      if (!meetsRequirements(state.variables, action.requirements)) {
        return state;
      }

      const newVars = { ...state.variables };
      if (action.stateEffects) {
        for (const [key, val] of Object.entries(action.stateEffects)) {
          newVars[key] = (newVars[key] || 0) + val;
        }
      }
      return {
        ...state,
        currentSceneId: action.nextSceneId,
        dialogueIndex: 0,
        variables: newVars,
      };
    }
    case "SET_SCENE":
      return {
        ...state,
        currentSceneId: action.sceneId,
        dialogueIndex: action.lineIndex ?? 0,
      };
    case "SET_VR_MODE":
      return { ...state, isVRMode: action.value };
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.name };
    case "SET_TEXT_SPEED":
      return { ...state, textSpeed: action.speed };
    case "SET_MASTER_VOLUME":
      return { ...state, masterVolume: action.volume };
    case "SET_BGM_VOLUME":
      return { ...state, bgmVolume: action.volume };
    case "SET_SFX_VOLUME":
      return { ...state, sfxVolume: action.volume };
    case "SET_VOICE_VOLUME":
      return { ...state, voiceVolume: action.volume };
    case "LOAD_STATE":
      return { ...action.state };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const saveToSlot = (slot: number) => {
    const data: SaveSlotData = {
      state,
      timestamp: Date.now(),
      label: `${state.currentSceneId} #${state.dialogueIndex}`,
    };
    localStorage.setItem(SAVE_PREFIX + slot, JSON.stringify(data));
  };

  const getSlot = (slot: number): SaveSlotData | null => {
    const raw = localStorage.getItem(SAVE_PREFIX + slot);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SaveSlotData;
    } catch {
      return null;
    }
  };

  const loadFromSlot = (slot: number): boolean => {
    const data = getSlot(slot);
    if (data) {
      dispatch({ type: "LOAD_STATE", state: data.state });
      return true;
    }
    return false;
  };

  const getAllSlots = (): (SaveSlotData | null)[] => {
    return Array.from({ length: TOTAL_SLOTS }, (_, i) => getSlot(i));
  };

  const deleteSlot = (slot: number) => {
    localStorage.removeItem(SAVE_PREFIX + slot);
  };

  const hasAnySave = (): boolean => {
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      if (localStorage.getItem(SAVE_PREFIX + i)) return true;
    }
    return false;
  };

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        saveToSlot,
        loadFromSlot,
        getSlot,
        getAllSlots,
        deleteSlot,
        hasAnySave,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
