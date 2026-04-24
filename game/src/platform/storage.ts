import { canUseDomStorage, isTauriRuntime } from "./runtime";

const STORAGE_FILE = "system-override-love.json";
const APP_KEY_PREFIX = "sol_";

type NativeStore = {
  init(): Promise<void>;
  entries<T>(): Promise<Array<[string, T]>>;
  set(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<boolean>;
};

const memoryStorage = new Map<string, string>();

let isInitialized = false;
let nativeStore: NativeStore | null = null;
let writeQueue = Promise.resolve();

function getDomStorageBackend(): Storage | null {
  return canUseDomStorage() ? window.localStorage : null;
}

function readDomEntries(prefix?: string): Array<[string, string]> {
  const backend = getDomStorageBackend();
  if (!backend) return [];

  const entries: Array<[string, string]> = [];
  for (let index = 0; index < backend.length; index++) {
    const key = backend.key(index);
    if (!key) continue;
    if (prefix && !key.startsWith(prefix)) continue;
    const value = backend.getItem(key);
    if (value !== null) entries.push([key, value]);
  }

  return entries;
}

function primeMemoryFromDomStorage() {
  if (memoryStorage.size > 0) return;
  for (const [key, value] of readDomEntries()) {
    memoryStorage.set(key, value);
  }
}

function queueNativeWrite(task: () => Promise<void>) {
  writeQueue = writeQueue.then(task).catch((error) => {
    console.warn("Failed to persist app storage", error);
  });
}

async function initializeNativeStorage() {
  const { LazyStore } = await import("@tauri-apps/plugin-store");
  const store = new LazyStore(STORAGE_FILE, {
    autoSave: 100,
    defaults: {},
  });
  await store.init();

  memoryStorage.clear();
  const entries = await store.entries<string>();
  for (const [key, value] of entries) {
    if (typeof value === "string") {
      memoryStorage.set(key, value);
    }
  }

  const hasAppData = entries.some(([key]) => key.startsWith(APP_KEY_PREFIX));
  if (!hasAppData) {
    const migratedEntries = readDomEntries(APP_KEY_PREFIX);
    for (const [key, value] of migratedEntries) {
      memoryStorage.set(key, value);
      await store.set(key, value);
    }
  }

  nativeStore = store;
}

export async function initializeAppStorage() {
  if (isInitialized) return;

  try {
    if (isTauriRuntime()) {
      await initializeNativeStorage();
    } else {
      primeMemoryFromDomStorage();
    }
  } catch (error) {
    console.warn("Falling back to browser storage", error);
    primeMemoryFromDomStorage();
  }

  isInitialized = true;
}

export const appStorage = {
  getItem(key: string): string | null {
    if (!isInitialized && !nativeStore) {
      primeMemoryFromDomStorage();
    }

    return memoryStorage.get(key) ?? null;
  },

  setItem(key: string, value: string) {
    memoryStorage.set(key, value);

    if (nativeStore) {
      queueNativeWrite(() => nativeStore!.set(key, value));
      return;
    }

    const backend = getDomStorageBackend();
    if (backend) backend.setItem(key, value);
  },

  removeItem(key: string) {
    memoryStorage.delete(key);

    if (nativeStore) {
      queueNativeWrite(async () => {
        await nativeStore!.delete(key);
      });
      return;
    }

    const backend = getDomStorageBackend();
    if (backend) backend.removeItem(key);
  },

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  },

  getKeysWithPrefix(prefix: string): string[] {
    if (!isInitialized && !nativeStore) {
      primeMemoryFromDomStorage();
    }

    return [...memoryStorage.keys()].filter((key) => key.startsWith(prefix));
  },
};
