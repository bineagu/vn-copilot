import { useGamepadConnected } from "../useGamepadControls";

interface ControllerHintItem {
  button: string;
  action: string;
}

interface ControllerHintsProps {
  hints: ControllerHintItem[];
  isVRMode: boolean;
  className?: string;
}

export function ControllerHints({
  hints,
  isVRMode,
  className = "",
}: ControllerHintsProps) {
  const hasGamepad = useGamepadConnected();

  if (!hasGamepad || hints.length === 0) return null;

  return (
    <div
      className={`z-40 flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-[11px] backdrop-blur-sm ${
        isVRMode
          ? "border-pink-400/30 bg-pink-950/45 text-pink-100"
          : "border-gray-500/30 bg-black/45 text-gray-100"
      } ${className}`}
    >
      {hints.map((hint) => (
        <div
          key={`${hint.button}:${hint.action}`}
          className="flex items-center gap-1.5"
        >
          <span
            className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
              isVRMode
                ? "bg-cyan-400/20 text-cyan-100"
                : "bg-gray-200/15 text-gray-100"
            }`}
          >
            {hint.button}
          </span>
          <span className={isVRMode ? "text-pink-100/90" : "text-gray-200/90"}>
            {hint.action}
          </span>
        </div>
      ))}
    </div>
  );
}
