import { useContext, createContext } from "react";
import type { GameState, GameAction } from "./types";

export interface SaveSlotData {
  state: GameState;
  timestamp: number;
  label: string;
}

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  saveToSlot: (slot: number) => void;
  loadFromSlot: (slot: number) => boolean;
  getSlot: (slot: number) => SaveSlotData | null;
  getAllSlots: () => (SaveSlotData | null)[];
  deleteSlot: (slot: number) => void;
  hasAnySave: () => boolean;
}

export const TOTAL_SLOTS = 50;

export const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
