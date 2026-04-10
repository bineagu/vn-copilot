import { useState } from "react";
import { GameProvider } from "./GameContext";
import { MainMenu } from "./components/MainMenu";
import { GameScreen } from "./components/GameScreen";

type Screen = "menu" | "game";

function AppInner() {
  const [screen, setScreen] = useState<Screen>("menu");

  return (
    <div className="w-full h-full relative font-sans">
      {screen === "menu" && <MainMenu onStart={() => setScreen("game")} />}
      {screen === "game" && <GameScreen onMainMenu={() => setScreen("menu")} />}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  );
}
