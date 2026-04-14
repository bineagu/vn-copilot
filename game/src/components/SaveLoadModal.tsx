import { useState, useCallback, useEffect } from "react";
import { useGame, TOTAL_SLOTS } from "../useGame";
import type { SaveSlotData } from "../useGame";
import { useGamepadControls } from "../useGamepadControls";
import { ControllerHints } from "./ControllerHints";

const SLOTS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(TOTAL_SLOTS / SLOTS_PER_PAGE);

interface SaveLoadModalProps {
  mode: "save" | "load";
  isVRMode: boolean;
  onClose: () => void;
  onLoadComplete?: () => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSceneLabel(label: string): string {
  return label
    .replace("day1_5_start", "Day 1.5")
    .replace("day1_branch_a", "Day 1 — Branch A")
    .replace("day1_branch_b", "Day 1 — Branch B")
    .replace("day1_start", "Day 1");
}

export function SaveLoadModal({
  mode,
  isVRMode,
  onClose,
  onLoadComplete,
}: SaveLoadModalProps) {
  const { saveToSlot, loadFromSlot, getSlot, deleteSlot } = useGame();
  const [page, setPage] = useState(0);
  const [confirmSlot, setConfirmSlot] = useState<number | null>(null);
  const [flashSlot, setFlashSlot] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(0);
  // Force re-render after save/delete
  const [, setTick] = useState(0);

  const startIdx = page * SLOTS_PER_PAGE;
  const slots: (SaveSlotData | null)[] = [];
  for (
    let i = startIdx;
    i < startIdx + SLOTS_PER_PAGE && i < TOTAL_SLOTS;
    i++
  ) {
    slots.push(getSlot(i));
  }

  useEffect(() => {
    setSelectedSlot((prev) => Math.min(prev, Math.max(0, slots.length - 1)));
  }, [page, slots.length]);

  const handleSlotClick = useCallback(
    (slotIndex: number) => {
      const globalIdx = page * SLOTS_PER_PAGE + slotIndex;
      const existing = getSlot(globalIdx);

      if (mode === "save") {
        if (existing && confirmSlot !== globalIdx) {
          setConfirmSlot(globalIdx);
          return;
        }
        saveToSlot(globalIdx);
        setConfirmSlot(null);
        setFlashSlot(globalIdx);
        setTick((t) => t + 1);
        setTimeout(() => setFlashSlot(null), 1500);
      } else {
        if (!existing) return;
        loadFromSlot(globalIdx);
        setFlashSlot(globalIdx);
        setTimeout(() => {
          setFlashSlot(null);
          onLoadComplete?.();
          onClose();
        }, 600);
      }
    },
    [
      mode,
      page,
      confirmSlot,
      saveToSlot,
      loadFromSlot,
      getSlot,
      onClose,
      onLoadComplete,
    ],
  );

  const handleDelete = useCallback(
    (globalIdx: number, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteSlot(globalIdx);
      setConfirmSlot(null);
      setTick((t) => t + 1);
    },
    [deleteSlot],
  );

  const handleDeleteSlot = useCallback(
    (globalIdx: number) => {
      deleteSlot(globalIdx);
      setConfirmSlot(null);
      setTick((t) => t + 1);
    },
    [deleteSlot],
  );

  // Theme
  const panelBg = isVRMode
    ? "bg-gradient-to-b from-purple-900/95 to-pink-900/95 border border-pink-400/30 rounded-2xl"
    : "bg-gray-900/95 border border-gray-600/50 rounded";

  const headerColor = isVRMode ? "text-pink-200" : "text-gray-200";

  const closeBtnClass = isVRMode
    ? "bg-pink-600/60 hover:bg-pink-500/80 text-white rounded-xl border border-pink-400/30"
    : "bg-gray-700/80 hover:bg-gray-600/80 text-gray-100 border border-gray-500/50 rounded-sm";

  const pageBtn = (active: boolean) =>
    isVRMode
      ? active
        ? "bg-pink-500/80 text-white border-pink-400/50"
        : "bg-pink-900/40 text-pink-300/60 hover:bg-pink-800/50 border-pink-600/20"
      : active
        ? "bg-gray-600 text-white border-gray-400/50"
        : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 border-gray-600/30";

  useGamepadControls({
    onMenu: onClose,
    onBack: onClose,
    onUp: () => setSelectedSlot((prev) => Math.max(0, prev - 1)),
    onDown: () =>
      setSelectedSlot((prev) => Math.min(slots.length - 1, prev + 1)),
    onLeft: () => {
      if (page > 0) {
        setPage((prev) => prev - 1);
        setConfirmSlot(null);
      }
    },
    onRight: () => {
      if (page < TOTAL_PAGES - 1) {
        setPage((prev) => prev + 1);
        setConfirmSlot(null);
      }
    },
    onConfirm: () => {
      const slot = slots[selectedSlot];
      if (mode === "load" && !slot) return;
      handleSlotClick(selectedSlot);
    },
    onSecondary: () => {
      const globalIdx = startIdx + selectedSlot;
      if (slots[selectedSlot] && flashSlot !== globalIdx) {
        handleDeleteSlot(globalIdx);
      }
    },
  });

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-[95%] max-w-lg max-h-[90vh] flex flex-col ${panelBg} animate-slide-up overflow-hidden`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 pb-2 shrink-0">
          <h2 className={`text-lg font-bold ${headerColor}`}>
            {mode === "save" ? "💾 Save Game" : "📂 Load Game"}
          </h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center text-lg ${closeBtnClass}`}
          >
            ✕
          </button>
        </div>

        {/* Page tabs */}
        <div className="flex gap-1.5 px-4 pb-2 shrink-0 overflow-x-auto">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage(i);
                setConfirmSlot(null);
              }}
              className={`px-3 py-1 text-xs font-medium border rounded transition-all shrink-0 ${pageBtn(page === i)}`}
            >
              {i * SLOTS_PER_PAGE + 1}-
              {Math.min((i + 1) * SLOTS_PER_PAGE, TOTAL_SLOTS)}
            </button>
          ))}
        </div>

        {/* Slot list */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {slots.map((slot, i) => {
            const globalIdx = startIdx + i;
            const isEmpty = !slot;
            const isFlashing = flashSlot === globalIdx;
            const isConfirming = confirmSlot === globalIdx;

            const slotBg = isFlashing
              ? isVRMode
                ? "bg-cyan-500/30 border-cyan-400/60"
                : "bg-green-800/40 border-green-500/60"
              : isConfirming
                ? isVRMode
                  ? "bg-red-800/40 border-red-400/50"
                  : "bg-red-900/40 border-red-600/50"
                : isEmpty
                  ? isVRMode
                    ? "bg-pink-950/30 border-pink-800/20 hover:bg-pink-900/30"
                    : "bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50"
                  : isVRMode
                    ? "bg-pink-800/40 border-pink-500/30 hover:bg-pink-700/40"
                    : "bg-gray-800/60 border-gray-500/30 hover:bg-gray-700/50";
            const isSelected = selectedSlot === i;

            const disabled = mode === "load" && isEmpty;

            return (
              <button
                key={globalIdx}
                onClick={() => !disabled && handleSlotClick(i)}
                disabled={disabled}
                className={`w-full flex items-center gap-3 p-3 border rounded-lg transition-all text-left ${slotBg} ${
                  isSelected
                    ? isVRMode
                      ? "ring-2 ring-cyan-300/80"
                      : "ring-2 ring-green-400/70"
                    : ""
                } ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer active:scale-[0.98]"
                }`}
              >
                {/* Slot number */}
                <div
                  className={`shrink-0 w-9 h-9 flex items-center justify-center rounded font-mono text-sm font-bold ${
                    isVRMode
                      ? "bg-pink-700/50 text-pink-200"
                      : "bg-gray-700/60 text-gray-300"
                  }`}
                >
                  {globalIdx + 1}
                </div>

                {/* Slot content */}
                <div className="flex-1 min-w-0">
                  {isEmpty ? (
                    <span
                      className={`text-sm ${isVRMode ? "text-pink-400/40" : "text-gray-600"}`}
                    >
                      — Empty —
                    </span>
                  ) : isConfirming ? (
                    <span className="text-sm text-red-300 font-medium">
                      Tap again to overwrite
                    </span>
                  ) : isFlashing ? (
                    <span
                      className={`text-sm font-medium ${
                        isVRMode ? "text-cyan-200" : "text-green-300"
                      }`}
                    >
                      {mode === "save" ? "✓ Saved!" : "✓ Loading..."}
                    </span>
                  ) : (
                    <>
                      <div
                        className={`text-sm font-medium truncate ${
                          isVRMode ? "text-pink-100" : "text-gray-200"
                        }`}
                      >
                        {formatSceneLabel(slot.label)}
                      </div>
                      <div
                        className={`text-xs ${isVRMode ? "text-pink-300/60" : "text-gray-500"}`}
                      >
                        {formatDate(slot.timestamp)}
                      </div>
                    </>
                  )}
                </div>

                {/* Delete button (only on non-empty slots) */}
                {!isEmpty && !isFlashing && (
                  <button
                    onClick={(e) => handleDelete(globalIdx, e)}
                    className={`shrink-0 w-7 h-7 flex items-center justify-center rounded text-xs transition-all ${
                      isVRMode
                        ? "text-pink-400/50 hover:text-red-300 hover:bg-red-800/40"
                        : "text-gray-600 hover:text-red-400 hover:bg-red-900/30"
                    }`}
                    title="Delete save"
                  >
                    🗑
                  </button>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-4 shrink-0">
          <ControllerHints
            hints={[
              { button: "D-Pad", action: "Select" },
              { button: "Left/Right", action: "Page" },
              { button: "A", action: mode === "save" ? "Save" : "Load" },
              { button: "Y", action: "Delete" },
              { button: "B", action: "Close" },
            ]}
            isVRMode={isVRMode}
          />
        </div>
      </div>
    </div>
  );
}
