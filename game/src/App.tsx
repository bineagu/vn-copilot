import { useEffect, useState } from "react";
import { GameProvider } from "./GameContext";
import { MainMenu } from "./components/MainMenu";
import { GameScreen } from "./components/GameScreen";

type Screen = "menu" | "game";

function AppInner() {
  const [screen, setScreen] = useState<Screen>("menu");

  useEffect(() => {
    window.history.replaceState({ screen: "menu" }, "");

    const handlePopState = () => {
      if (screen === "game") {
        window.dispatchEvent(new CustomEvent("sol:request-exit-to-menu"));
        window.history.pushState({ screen: "game" }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [screen]);

  return (
    <div className="w-full h-full relative font-sans">
      {screen === "menu" && (
        <MainMenu
          onStart={() => {
            window.history.pushState({ screen: "game" }, "");
            setScreen("game");
          }}
        />
      )}
      {screen === "game" && (
        <GameScreen
          onMainMenu={() => {
            window.history.replaceState({ screen: "menu" }, "");
            setScreen("menu");
          }}
        />
      )}
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
