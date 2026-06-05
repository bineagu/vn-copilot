declare global {
  interface Window {
    __TAURI__?: unknown;
    __TAURI_INTERNALS__?: unknown;
  }

  interface ImportMetaEnv {
    readonly TAURI_ENV_PLATFORM?: string;
    readonly TAURI_ENV_DEBUG?: string;
  }
}

export function isClientRuntime(): boolean {
  return typeof window !== "undefined";
}

export function isTauriRuntime(): boolean {
  if (!isClientRuntime()) return false;
  return "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
}

export function getTauriPlatform(): string | undefined {
  return import.meta.env.TAURI_ENV_PLATFORM || undefined;
}

export function isNativeMobileRuntime(): boolean {
  const platform = getTauriPlatform();
  if (platform === "android" || platform === "ios") {
    return true;
  }

  if (!isTauriRuntime() || typeof navigator === "undefined") {
    return false;
  }

  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function canUseDomStorage(): boolean {
  if (!isClientRuntime()) return false;

  try {
    const probeKey = "sol_storage_probe";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

export async function requestAppFullscreen(
  element: HTMLElement = document.documentElement,
): Promise<boolean> {
  if (!isClientRuntime() || !document.fullscreenEnabled) return false;

  try {
    await element.requestFullscreen();
    return true;
  } catch {
    return false;
  }
}

export async function exitAppFullscreen(): Promise<boolean> {
  if (!isClientRuntime() || !document.fullscreenElement) return false;

  try {
    await document.exitFullscreen();
    return true;
  } catch {
    return false;
  }
}

export function isAppFullscreen(): boolean {
  return isClientRuntime() && !!document.fullscreenElement;
}
