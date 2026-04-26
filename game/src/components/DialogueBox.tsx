import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import type { Choice } from "../types";

function meetsRequirements(
  variables: Record<string, number>,
  requirements?: Record<string, number>,
) {
  if (!requirements) return true;
  return Object.entries(requirements).every(
    ([key, value]) => (variables[key] || 0) >= value,
  );
}

export interface DialogueBoxHandle {
  tap: () => void;
  isComplete: () => boolean;
}

interface DialogueBoxProps {
  speaker: string;
  text: string;
  isInternal?: boolean;
  isVRMode: boolean;
  choices?: Choice[];
  selectedChoiceIndex?: number;
  variables: Record<string, number>;
  textSpeed: number;
  playerName: string;
  systemGraphic?: string;
  isEnding?: boolean;
  debugMode?: boolean;
  onAdvance: () => void;
  onChoice: (choice: Choice) => void;
  onComplete?: () => void;
}

export const DialogueBox = forwardRef<DialogueBoxHandle, DialogueBoxProps>(
  function DialogueBox(
    {
      speaker,
      text,
      isInternal,
      isVRMode,
      choices,
      selectedChoiceIndex,
      variables,
      textSpeed,
      playerName,
      systemGraphic,
      isEnding,
      debugMode,
      onAdvance,
      onChoice,
      onComplete,
    },
    ref,
  ) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    // Keep onComplete in a ref so the interval closure always sees the latest version
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

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
          onCompleteRef.current?.();
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
        onCompleteRef.current?.();
      } else if (!choices || choices.length === 0) {
        onAdvance();
      }
    }, [isComplete, processedText, choices, onAdvance]);

    useImperativeHandle(
      ref,
      () => ({ tap: handleTap, isComplete: () => isComplete }),
      [handleTap, isComplete],
    );

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
        {systemGraphic &&
          isComplete &&
          (() => {
            const colonIdx = systemGraphic.indexOf(":");
            const tag = colonIdx > 0 ? systemGraphic.slice(0, colonIdx) : "";
            const content =
              colonIdx > 0 ? systemGraphic.slice(colonIdx + 1) : systemGraphic;

            if (tag === "file") {
              /* ── File Explorer window ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-gray-600/60">
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
                    <div className="bg-gray-900 px-4 py-2 border-b border-gray-700/50 flex items-center gap-2">
                      <span className="text-gray-500 text-sm">📁</span>
                      <div className="flex-1 bg-gray-800 rounded px-3 py-1">
                        <span className="text-green-400 text-sm sm:text-base font-mono truncate block">
                          {content}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-950/95 px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>📂</span>
                        <span className="font-mono">
                          {content.split(/[\\/]/).pop()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "sms") {
              /* ── Phone text message notification ── */
              const recipientMatch = content.match(/^\[([^\]]+)\](.+)$/s);
              const recipient = recipientMatch ? recipientMatch[1] : null;
              const smsBody = recipientMatch ? recipientMatch[2] : content;
              const initial = recipient ? recipient[0].toUpperCase() : "?";
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-600/40 bg-gray-900/95 backdrop-blur-md">
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
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-800/60">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold ${recipient ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-purple-500 to-pink-500"}`}
                      >
                        {initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-200">
                          {recipient ?? "Unknown Number"}
                        </div>
                        <div className="text-xs text-gray-500">iMessage</div>
                      </div>
                      <span className="text-xs text-gray-600">now</span>
                    </div>
                    <div className="px-5 py-4">
                      <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-3 inline-block max-w-[90%]">
                        <p className="text-base sm:text-lg text-gray-100 leading-relaxed whitespace-pre-line">
                          {smsBody}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "note") {
              /* ── Handwritten paper note ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-sm overflow-hidden shadow-2xl bg-amber-50 border border-amber-200/80 rotate-[-0.5deg]">
                    <div
                      className="px-6 py-5 relative"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(transparent, transparent 27px, #c8b8a0 28px)",
                        backgroundPositionY: "4px",
                      }}
                    >
                      <div className="absolute left-10 top-0 bottom-0 w-px bg-red-300/60" />
                      <p className="text-base sm:text-lg text-gray-800 leading-[28px] font-serif whitespace-pre-line pl-4">
                        {content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "call") {
              /* ── Incoming phone call screen ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-600/40 bg-gradient-to-b from-gray-900 to-gray-950 backdrop-blur-md">
                    <div className="flex flex-col items-center py-8 gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl animate-pulse shadow-lg shadow-green-500/30">
                        📞
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">
                        Incoming Call
                      </div>
                      {content.split("\n").map((line, i) => (
                        <div
                          key={i}
                          className={`text-center ${i === 0 ? "text-lg font-bold text-white" : "text-sm text-gray-400"}`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "terminal") {
              /* ── VR system terminal / command ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-red-500/40 bg-black/95">
                    <div className="flex items-center gap-2 bg-red-950/80 px-4 py-2 border-b border-red-500/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs text-red-400 font-mono uppercase tracking-wider">
                        System Admin
                      </span>
                    </div>
                    <div className="px-5 py-4 font-mono">
                      {content.split("\n").map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-red-500 select-none">&gt;</span>
                          <span className="text-red-300 text-sm sm:text-base">
                            {line}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "item") {
              /* ── Item received popup ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-yellow-500/40 bg-gradient-to-b from-gray-900 to-gray-950">
                    <div className="flex items-center gap-2 bg-yellow-900/40 px-4 py-2 border-b border-yellow-500/20">
                      <span className="text-yellow-400">✦</span>
                      <span className="text-sm text-yellow-300 font-semibold">
                        Item Obtained
                      </span>
                    </div>
                    <div className="px-5 py-4 text-center">
                      {content.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={`${i === 0 ? "text-lg font-bold text-yellow-200" : "text-sm text-gray-400 mt-1"}`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "phone") {
              /* ── Phone screen (unlocked device view) ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-500/40 bg-gray-900/95 backdrop-blur-md">
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
                    <div className="px-5 py-4 text-center">
                      {content.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={`${i === 0 ? "text-base font-semibold text-white" : "text-sm text-gray-400 mt-1"}`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (tag === "cg") {
              /* ── CG / scene description card ── */
              return (
                <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                  <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-gray-500/30 bg-black/90">
                    <div className="px-5 py-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                        ◈ Scene ◈
                      </div>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed italic whitespace-pre-line">
                        {content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            /* ── Fallback: simple card ── */
            return (
              <div className="flex justify-center mb-3 px-4 w-full max-w-xl animate-fade-in">
                <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-gray-600/40 bg-gray-900/95 backdrop-blur-md px-5 py-4">
                  <p className="text-base sm:text-lg text-gray-100 leading-relaxed whitespace-pre-line">
                    {systemGraphic}
                  </p>
                </div>
              </div>
            );
          })()}

        {/* Choice menu */}
        {hasChoices && (
          <div className="flex flex-col items-center gap-3 px-6 mb-4 animate-slide-up">
            {choices.map((choice, i) => {
              const unlocked = meetsRequirements(
                variables,
                choice.requirements,
              );
              const isSelected = selectedChoiceIndex === i;

              // Hide locked choices unless debug mode is active
              if (!unlocked && !debugMode) return null;

              return (
                <button
                  key={i}
                  onClick={() => unlocked && onChoice(choice)}
                  disabled={!unlocked}
                  className={`w-full max-w-lg py-3 px-6 text-base sm:text-lg font-medium transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? isVRMode
                        ? "ring-2 ring-cyan-300/80 scale-[1.01]"
                        : "ring-2 ring-green-400/70 scale-[1.01]"
                      : ""
                  } ${
                    !unlocked
                      ? isVRMode
                        ? "bg-pink-950/50 text-pink-200/50 rounded-xl border border-pink-400/20 cursor-not-allowed"
                        : "bg-gray-900/70 text-gray-500 border border-gray-700/40 rounded-sm cursor-not-allowed"
                      : isVRMode
                        ? "bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl border border-pink-400/40 shadow-lg shadow-pink-500/20"
                        : "bg-gray-800/90 hover:bg-gray-700/90 text-gray-100 border border-gray-500/50 rounded-sm"
                  }`}
                >
                  <div>{choice.text}</div>
                  {!unlocked && choice.lockReason && (
                    <div
                      className={`mt-1 text-xs ${
                        isVRMode ? "text-pink-300/70" : "text-gray-500"
                      }`}
                    >
                      {choice.lockReason}
                    </div>
                  )}
                </button>
              );
            })}
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

          {/* Advance indicator / ending button */}
          {isComplete && !hasChoices && (
            <div className="flex justify-end mt-1">
              {isEnding ? (
                <button
                  onClick={onAdvance}
                  className={`text-sm font-semibold px-4 py-1.5 rounded transition-all active:scale-95 ${
                    isVRMode
                      ? "bg-pink-700/70 hover:bg-pink-600/80 text-white border border-pink-400/40"
                      : "bg-gray-700/80 hover:bg-gray-600/80 text-gray-200 border border-gray-500/50"
                  }`}
                >
                  ↩ Return to Main Menu
                </button>
              ) : (
                <span
                  className={`text-xs animate-pulse ${
                    isVRMode ? "text-pink-300" : "text-gray-500"
                  }`}
                >
                  ▼
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
