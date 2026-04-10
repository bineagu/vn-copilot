export interface Sprite {
  character: string;
  expression: string;
  position?: "left" | "center" | "right";
}

export interface Choice {
  text: string;
  nextSceneId: string;
  stateEffects?: Record<string, number>;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  isInternal?: boolean;
  background?: string;
  sprites?: Sprite[];
  bgm?: string | null;
  sfx?: string;
  choices?: Choice[];
  systemGraphic?: string;
}

export interface Scene {
  id: string;
  lines: DialogueLine[];
}

export interface GameState {
  currentSceneId: string;
  dialogueIndex: number;
  isVRMode: boolean;
  playerName: string;
  variables: Record<string, number>;
  textSpeed: number;
  bgmVolume: number;
  sfxVolume: number;
}

export type GameAction =
  | { type: "ADVANCE" }
  | {
      type: "CHOOSE";
      nextSceneId: string;
      stateEffects?: Record<string, number>;
    }
  | { type: "SET_SCENE"; sceneId: string; lineIndex?: number }
  | { type: "SET_VR_MODE"; value: boolean }
  | { type: "SET_PLAYER_NAME"; name: string }
  | { type: "SET_TEXT_SPEED"; speed: number }
  | { type: "SET_BGM_VOLUME"; volume: number }
  | { type: "SET_SFX_VOLUME"; volume: number }
  | { type: "LOAD_STATE"; state: GameState };
