import { useEffect, useState } from "react";

interface BackgroundLayerProps {
  src: string;
  isVRMode: boolean;
  rotate?: number;
}

function isVideoBackground(src: string): boolean {
  return /\.(mp4|webm|ogg)(?:\?.*)?$/i.test(src);
}

export function BackgroundLayer({
  src,
  isVRMode,
  rotate,
}: BackgroundLayerProps) {
  const [loaded, setLoaded] = useState(false);
  const isVideo = isVideoBackground(src);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);

    if (isVideo) {
      return () => {
        cancelled = true;
      };
    }

    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setLoaded(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [isVideo, src]);

  const handleVideoEnded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(0, video.duration - 0.05);
    }
    video.pause();
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background media */}
      {isVideo ? (
        <video
          key={src}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={() => setLoaded(true)}
          onEnded={handleVideoEnded}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            rotate ? "animate-bg-tilt" : "animate-bg-pan"
          } ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url("${src}")` }}
        />
      )}

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
