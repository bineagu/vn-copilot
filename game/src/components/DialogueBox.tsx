import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import type { Choice } from "../types";

export interface DialogueBoxHandle {
  tap: () => void;
}

interface DialogueBoxProps {
  speaker: string;
  text: string;
  isInternal?: boolean;
  isVRMode: boolean;
  choices?: Choice[];
  textSpeed: number;
  playerName: string;
  systemGraphic?: string;
  onAdvance: () => void;
  onChoice: (choice: Choice) => void;
}

export const DialogueBox = forwardRef<DialogueBoxHandle, DialogueBoxProps>(
  function DialogueBox(
    {
      speaker,
      text,
      isInternal,
      isVRMode,
      choices,
      textSpeed,
      playerName,
      systemGraphic,
      onAdvance,
      onChoice,
    },
    ref,
  ) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Replace {playerName} placeholder
    const processedText = text.replace(/\{playerName\}/g, playerName);

    useEffect(() => {
      setDisplayedText("");
      setIsComplete(false);
      let index = 0;
      intervalRef.current = setInterval(() => {
        if (index < processedText.length) {
          setDisplayedText(processedText.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, textSpeed);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    }, [processedText, textSpeed]);

    const handleTap = useCallback(() => {
      if (!isComplete) {
        // Stop the typewriter interval immediately
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayedText(processedText);
        setIsComplete(true);
      } else if (!choices || choices.length === 0) {
        onAdvance();
      }
    }, [isComplete, processedText, choices, onAdvance]);

    useImperativeHandle(ref, () => ({ tap: handleTap }), [handleTap]);

    const hasChoices = choices && choices.length > 0 && isComplete;
    const isTitleCard = speaker === "";

    // Theme classes
    const boxBg = isVRMode
      ? "bg-gradient-to-r from-pink-900/80 to-purple-900/80 backdrop-blur-md border border-pink-400/30 rounded-2xl"
      : "bg-black/75 backdrop-blur-sm border-t border-gray-600/50";

    const speakerBg = isVRMode
      ? "bg-gradient-to-r from-vr-pink to-vr-cyan text-white rounded-full px-4 py-1"
      : "bg-gray-800 text-gray-200 border border-gray-600 rounded-sm px-3 py-1";

    const textColor = isInternal
      ? isVRMode
        ? "text-pink-200 italic"
        : "text-gray-400 italic"
      : isVRMode
        ? "text-white"
        : "text-gray-100";

    return (
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center px-2 sm:px-4 md:px-8">
        {/* System Graphic overlay */}
        {systemGraphic && isComplete && (
          <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
            {/^[A-Z]:[\\/]/.test(systemGraphic) ? (
              /* ── File Explorer window ── */
              <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-gray-600/60">
                {/* Title bar */}
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2">
                  <div className="flex gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-gray-400 font-mono truncate ml-2">
                    File Explorer
                  </span>
                </div>
                {/* Address bar */}
                <div className="bg-gray-900 px-4 py-2 border-b border-gray-700/50 flex items-center gap-2">
                  <span className="text-gray-500 text-sm">📁</span>
                  <div className="flex-1 bg-gray-800 rounded px-3 py-1">
                    <span className="text-green-400 text-sm sm:text-base font-mono truncate block">
                      {systemGraphic}
                    </span>
                  </div>
                </div>
                {/* Content area */}
                <div className="bg-gray-950/95 px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>📂</span>
                    <span className="font-mono">
                      {systemGraphic.split(/[\\/]/).pop()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Phone text message notification ── */
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-600/40 bg-gray-900/95 backdrop-blur-md">
                {/* Phone status bar */}
                <div className="flex items-center justify-between px-5 py-1.5 bg-black/60">
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <span className="text-xs text-gray-500">📶</span>
                    <span className="text-xs text-gray-500">🔋</span>
                  </div>
                </div>
                {/* Notification header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-800/60">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-base font-bold">
                    ?
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-200">
                      Unknown Number
                    </div>
                    <div className="text-xs text-gray-500">iMessage</div>
                  </div>
                  <span className="text-xs text-gray-600">now</span>
                </div>
                {/* Message bubble */}
                <div className="px-5 py-4">
                  <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-3 inline-block max-w-[90%]">
                    <p className="text-base sm:text-lg text-gray-100 leading-relaxed">
                      {systemGraphic}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Choice menu */}
        {hasChoices && (
          <div className="flex flex-col items-center gap-3 px-6 mb-4 animate-slide-up">
            {choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => onChoice(choice)}
                className={`w-full max-w-lg py-3 px-6 text-base sm:text-lg font-medium transition-all duration-200 active:scale-95 ${
                  isVRMode
                    ? "bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl border border-pink-400/40 shadow-lg shadow-pink-500/20"
                    : "bg-gray-800/90 hover:bg-gray-700/90 text-gray-100 border border-gray-500/50 rounded-sm"
                }`}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {/* Dialogue Box */}
        <div
          className={`w-full max-w-4xl p-4 pb-6 sm:p-5 sm:pb-8 cursor-pointer rounded-xl ${boxBg}`}
          onClick={handleTap}
        >
          {/* Speaker name badge */}
          {speaker && !isTitleCard && (
            <div className="mb-2 -mt-8 sm:-mt-9">
              <span
                className={`text-sm sm:text-base font-semibold ${speakerBg}`}
              >
                {speaker === "Protagonist"
                  ? isInternal
                    ? `${playerName} (thoughts)`
                    : playerName
                  : speaker}
              </span>
            </div>
          )}

          {/* Text */}
          <div
            className={`text-lg sm:text-xl md:text-2xl leading-relaxed min-h-[5rem] whitespace-pre-line ${textColor} ${
              isTitleCard
                ? "text-center text-2xl sm:text-3xl font-bold py-4"
                : ""
            }`}
          >
            {displayedText}
          </div>

          {/* Advance indicator */}
          {isComplete && !hasChoices && (
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs animate-pulse ${
                  isVRMode ? "text-pink-300" : "text-gray-500"
                }`}
              >
                ▼
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
