import { useEffect, useRef, useState } from "react";

interface GamepadControlHandlers {
  enabled?: boolean;
  onConfirm?: () => void;
  onBack?: () => void;
  onMenu?: () => void;
  onSecondary?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
}

const AXIS_THRESHOLD = 0.5;
const INITIAL_REPEAT_DELAY = 240;
const REPEAT_INTERVAL = 140;

type Direction = "up" | "down" | "left" | "right";

function getActiveGamepad(): Gamepad | null {
  if (typeof navigator === "undefined" || !navigator.getGamepads) return null;
  for (const gamepad of navigator.getGamepads()) {
    if (gamepad?.connected) return gamepad;
  }
  return null;
}

export function hasConnectedGamepad(): boolean {
  return getActiveGamepad() !== null;
}

function isPressed(button?: GamepadButton): boolean {
  return !!button?.pressed;
}

export function useGamepadControls({
  enabled = true,
  ...handlers
}: GamepadControlHandlers) {
  const handlersRef = useRef(handlers);
  const previousButtonsRef = useRef<Record<string, boolean>>({});
  const repeatStateRef = useRef<
    Record<Direction, { active: boolean; nextFireAt: number }>
  >({
    up: { active: false, nextFireAt: 0 },
    down: { active: false, nextFireAt: 0 },
    left: { active: false, nextFireAt: 0 },
    right: { active: false, nextFireAt: 0 },
  });

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    if (!enabled) {
      previousButtonsRef.current = {};
      repeatStateRef.current = {
        up: { active: false, nextFireAt: 0 },
        down: { active: false, nextFireAt: 0 },
        left: { active: false, nextFireAt: 0 },
        right: { active: false, nextFireAt: 0 },
      };
      return;
    }

    let animationFrameId = 0;

    const fireEdge = (key: string, pressed: boolean, callback?: () => void) => {
      const wasPressed = previousButtonsRef.current[key] ?? false;
      if (pressed && !wasPressed) {
        callback?.();
      }
      previousButtonsRef.current[key] = pressed;
    };

    const fireDirectional = (
      key: Direction,
      pressed: boolean,
      time: number,
      callback?: () => void,
    ) => {
      const state = repeatStateRef.current[key];
      if (!pressed) {
        state.active = false;
        state.nextFireAt = 0;
        return;
      }

      if (!state.active) {
        state.active = true;
        state.nextFireAt = time + INITIAL_REPEAT_DELAY;
        callback?.();
        return;
      }

      if (time >= state.nextFireAt) {
        state.nextFireAt = time + REPEAT_INTERVAL;
        callback?.();
      }
    };

    const loop = (time: number) => {
      const gamepad = getActiveGamepad();

      if (gamepad) {
        const verticalAxis = gamepad.axes[1] ?? 0;
        const horizontalAxis = gamepad.axes[0] ?? 0;

        const up =
          isPressed(gamepad.buttons[12]) || verticalAxis <= -AXIS_THRESHOLD;
        const down =
          isPressed(gamepad.buttons[13]) || verticalAxis >= AXIS_THRESHOLD;
        const left =
          isPressed(gamepad.buttons[14]) || horizontalAxis <= -AXIS_THRESHOLD;
        const right =
          isPressed(gamepad.buttons[15]) || horizontalAxis >= AXIS_THRESHOLD;

        fireEdge(
          "confirm",
          isPressed(gamepad.buttons[0]),
          handlersRef.current.onConfirm,
        );
        fireEdge(
          "back",
          isPressed(gamepad.buttons[1]),
          handlersRef.current.onBack,
        );
        fireEdge(
          "secondary",
          isPressed(gamepad.buttons[3]),
          handlersRef.current.onSecondary,
        );
        fireEdge(
          "menu",
          isPressed(gamepad.buttons[9]) || isPressed(gamepad.buttons[16]),
          handlersRef.current.onMenu,
        );

        fireDirectional("up", up, time, handlersRef.current.onUp);
        fireDirectional("down", down, time, handlersRef.current.onDown);
        fireDirectional("left", left, time, handlersRef.current.onLeft);
        fireDirectional("right", right, time, handlersRef.current.onRight);
      } else {
        previousButtonsRef.current = {};
        repeatStateRef.current = {
          up: { active: false, nextFireAt: 0 },
          down: { active: false, nextFireAt: 0 },
          left: { active: false, nextFireAt: 0 },
          right: { active: false, nextFireAt: 0 },
        };
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);
}

export function useGamepadConnected() {
  const [connected, setConnected] = useState(hasConnectedGamepad());

  useEffect(() => {
    const syncConnection = () => setConnected(hasConnectedGamepad());

    syncConnection();
    window.addEventListener("gamepadconnected", syncConnection);
    window.addEventListener("gamepaddisconnected", syncConnection);

    return () => {
      window.removeEventListener("gamepadconnected", syncConnection);
      window.removeEventListener("gamepaddisconnected", syncConnection);
    };
  }, []);

  return connected;
}
