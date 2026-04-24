import { isClientRuntime } from "./runtime";

const pendingMedia = new Set<HTMLMediaElement>();
let unlockListenersBound = false;

function retryPendingMedia() {
  for (const media of [...pendingMedia]) {
    void media
      .play()
      .then(() => {
        pendingMedia.delete(media);
      })
      .catch(() => {
        // Leave it pending until the next interaction.
      });
  }
}

function bindUnlockListeners() {
  if (!isClientRuntime() || unlockListenersBound) return;

  const handleUnlock = () => {
    retryPendingMedia();

    if (pendingMedia.size === 0) {
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
      unlockListenersBound = false;
    }
  };

  window.addEventListener("pointerdown", handleUnlock, { passive: true });
  window.addEventListener("keydown", handleUnlock);
  window.addEventListener("touchstart", handleUnlock, { passive: true });
  unlockListenersBound = true;
}

export function primeAudioPlayback() {
  bindUnlockListeners();
}

export function playManagedMedia(media: HTMLMediaElement) {
  bindUnlockListeners();
  void media
    .play()
    .then(() => {
      pendingMedia.delete(media);
    })
    .catch(() => {
      pendingMedia.add(media);
    });
}
