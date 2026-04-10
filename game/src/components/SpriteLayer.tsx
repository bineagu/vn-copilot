import { CHARACTERS, getExpressionSprite } from "../script";

interface SpriteLayerProps {
  sprites: Array<{
    character: string;
    expression: string;
    position?: "left" | "center" | "right";
  }>;
  isVRMode: boolean;
}

function getCharacterImage(
  character: string,
  expression: string,
  isVRMode: boolean,
): string {
  // If expression is a number, use the numbered expression sprite
  const num = parseInt(expression, 10);
  if (!isNaN(num)) {
    return getExpressionSprite(num);
  }

  // Fallback to legacy character images
  const name = character.toLowerCase();
  if (name === "iris") {
    return isVRMode ? CHARACTERS.irisVR : CHARACTERS.irisReal;
  }
  if (name === "chloe") return CHARACTERS.chloe;
  if (name === "maya") return CHARACTERS.maya;
  return CHARACTERS.irisReal;
}

function getPositionClass(position?: "left" | "center" | "right"): string {
  switch (position) {
    case "left":
      return "left-[5%]";
    case "right":
      return "right-[5%]";
    case "center":
    default:
      return "left-1/2 -translate-x-1/2";
  }
}

export function SpriteLayer({ sprites, isVRMode }: SpriteLayerProps) {
  if (!sprites || sprites.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sprites.map((sprite, i) => (
        <div
          key={`${sprite.character}-${i}`}
          className={`absolute bottom-0 ${getPositionClass(sprite.position)} animate-fade-in`}
        >
          <img
            src={getCharacterImage(
              sprite.character,
              sprite.expression,
              isVRMode,
            )}
            alt={sprite.character}
            className="h-[92vh] w-auto object-contain drop-shadow-2xl"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
