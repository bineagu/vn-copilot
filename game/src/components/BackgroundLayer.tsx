import { useState, useEffect } from "react";

interface BackgroundLayerProps {
  src: string;
  isVRMode: boolean;
}

export function BackgroundLayer({ src, isVRMode }: BackgroundLayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (src !== currentSrc) {
      setLoaded(false);
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setLoaded(true);
      };
      img.src = src;
    }
  }, [src, currentSrc]);

  useEffect(() => {
    // Preload initial image
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 animate-bg-pan ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url("${currentSrc}")` }}
      />

      {/* Theme overlay */}
      {isVRMode ? (
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-cyan-500/10 mix-blend-overlay" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
