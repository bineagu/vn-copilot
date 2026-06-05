import { useState } from "react";
import { useGamepadConnected, useGamepadControls } from "../useGamepadControls";
import { isNativeMobileRuntime } from "../platform/runtime";

interface MainMenuNameEntryProps {
  initialName: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const NAME_LETTER_PATTERN = /\p{L}/u;
const MAX_NAME_LENGTH = 20;
const NAME_KEYBOARD_ROWS = [
  ["A", "B", "C", "D", "E", "F", "G"],
  ["H", "I", "J", "K", "L", "M", "N"],
  ["O", "P", "Q", "R", "S", "T", "U"],
  ["V", "W", "X", "Y", "Z", "'", "-"],
  ["Space", "Del", "Clear", "Begin"],
] as const;

export function MainMenuNameEntry({
  initialName,
  onSubmit,
  onCancel,
}: MainMenuNameEntryProps) {
  const isNativeMobile = isNativeMobileRuntime();
  const [nameValue, setNameValue] = useState(
    initialName === "Player" ? "" : initialName,
  );
  const [didAttemptNameSubmit, setDidAttemptNameSubmit] = useState(false);
  const [selectedKeyboardCell, setSelectedKeyboardCell] = useState({
    row: 0,
    col: 0,
  });
  const hasGamepad = useGamepadConnected();

  const trimmedName = nameValue.trim();
  const isNameValid = NAME_LETTER_PATTERN.test(trimmedName);
  const showNameError = didAttemptNameSubmit && !isNameValid;

  const moveKeyboardSelection = (rowDelta: number, colDelta: number) => {
    setSelectedKeyboardCell((currentCell) => {
      const nextRow = Math.max(
        0,
        Math.min(NAME_KEYBOARD_ROWS.length - 1, currentCell.row + rowDelta),
      );
      const currentRowLength = NAME_KEYBOARD_ROWS[nextRow].length;
      const nextCol =
        colDelta !== 0
          ? (currentCell.col + colDelta + currentRowLength) % currentRowLength
          : Math.min(currentCell.col, currentRowLength - 1);

      return { row: nextRow, col: nextCol };
    });
  };

  const appendToName = (value: string) => {
    setNameValue((currentValue) => {
      if (currentValue.length >= MAX_NAME_LENGTH) return currentValue;

      if (value === " ") {
        if (currentValue.length === 0 || currentValue.endsWith(" ")) {
          return currentValue;
        }

        return `${currentValue} `;
      }

      const nextValue = NAME_LETTER_PATTERN.test(value)
        ? currentValue.length === 0 || currentValue.endsWith(" ")
          ? value.toUpperCase()
          : value.toLowerCase()
        : value;

      return `${currentValue}${nextValue}`.slice(0, MAX_NAME_LENGTH);
    });
    setDidAttemptNameSubmit(false);
  };

  const handleStartGame = () => {
    setDidAttemptNameSubmit(true);

    if (!isNameValid) {
      return;
    }

    onSubmit(trimmedName);
  };

  const handleDelete = () => {
    setNameValue((currentValue) => currentValue.slice(0, -1));
    setDidAttemptNameSubmit(false);
  };

  const handleKeyboardAction = (
    key: (typeof NAME_KEYBOARD_ROWS)[number][number],
  ) => {
    switch (key) {
      case "Space":
        appendToName(" ");
        return;
      case "Del":
        handleDelete();
        return;
      case "Clear":
        setNameValue("");
        setDidAttemptNameSubmit(false);
        return;
      case "Begin":
        handleStartGame();
        return;
      default:
        appendToName(key);
    }
  };

  useGamepadControls({
    onBack: onCancel,
    onUp: () => moveKeyboardSelection(-1, 0),
    onDown: () => moveKeyboardSelection(1, 0),
    onLeft: () => moveKeyboardSelection(0, -1),
    onRight: () => moveKeyboardSelection(0, 1),
    onSecondary: handleDelete,
    onConfirm: () => {
      handleKeyboardAction(
        NAME_KEYBOARD_ROWS[selectedKeyboardCell.row][selectedKeyboardCell.col],
      );
    },
  });

  return (
    <div
      className={`relative z-10 w-[85%] max-w-sm animate-slide-up ${
        isNativeMobile ? "mb-4" : "mb-8"
      }`}
    >
      <label className="block text-gray-400 text-sm mb-2 text-center">
        Enter your name
      </label>
      <input
        type="text"
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value.slice(0, MAX_NAME_LENGTH));
          setDidAttemptNameSubmit(false);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
        maxLength={MAX_NAME_LENGTH}
        className={`w-full bg-gray-900/80 border text-gray-100 text-center rounded focus:outline-none transition-colors ${
          isNativeMobile ? "text-base py-2.5 px-3" : "text-lg py-3 px-4"
        } ${
          showNameError
            ? "border-red-500/70 focus:border-red-400"
            : "border-gray-600 focus:border-red-400/60"
        }`}
        autoFocus
        placeholder="Your name..."
      />
      <p
        className={`mt-2 min-h-5 text-center text-sm ${
          showNameError ? "text-red-300" : "text-gray-500"
        }`}
      >
        {showNameError
          ? "Enter a name with at least one letter."
          : "At least one letter is required."}
      </p>
      <button
        onClick={handleStartGame}
        disabled={!isNameValid}
        className={`w-full mt-3 text-gray-100 border rounded transition-all font-medium ring-2 ring-red-400/60 ${
          isNativeMobile ? "py-2.5 text-sm" : "py-3 text-base"
        } ${
          isNameValid
            ? "bg-red-900/60 hover:bg-red-800/70 border-red-700/40 active:scale-95"
            : "bg-gray-800/70 border-gray-700/40 opacity-60 cursor-not-allowed"
        }`}
      >
        Begin
      </button>

      {hasGamepad && (
        <div
          className={`rounded-xl border border-gray-700/60 bg-black/45 backdrop-blur-sm ${
            isNativeMobile ? "mt-3 p-2.5" : "mt-4 p-3"
          }`}
        >
          <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-gray-500">
            Controller Keyboard
          </p>
          <div className="space-y-2">
            {NAME_KEYBOARD_ROWS.map((row, rowIndex) => (
              <div
                key={row.join("-")}
                className={`grid ${isNativeMobile ? "gap-1.5" : "gap-2"}`}
                style={{
                  gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                }}
              >
                {row.map((key, colIndex) => {
                  const isSelected =
                    selectedKeyboardCell.row === rowIndex &&
                    selectedKeyboardCell.col === colIndex;
                  const isActionKey =
                    key === "Space" ||
                    key === "Del" ||
                    key === "Clear" ||
                    key === "Begin";
                  const isDisabled = key === "Begin" && !isNameValid;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyboardAction(key)}
                      disabled={isDisabled}
                      className={`rounded font-medium transition-all ${
                        isNativeMobile ? "min-h-10 text-xs" : "min-h-11 text-sm"
                      } ${
                        isActionKey
                          ? "bg-red-950/40 border-red-800/40 text-red-100"
                          : "bg-gray-900/70 border-gray-700/50 text-gray-100"
                      } ${
                        isSelected
                          ? "ring-2 ring-red-400/70 border-red-500/60"
                          : "hover:bg-gray-800/80"
                      } ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "active:scale-95"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
