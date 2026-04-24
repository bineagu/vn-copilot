# System.Override(Love)

Psychological horror visual novel built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Targets

- Web: the canonical frontend build.
- Desktop: Tauri 2 wrapper scaffolded in `src-tauri/`.
- Android: Tauri mobile scripts are wired, but Android SDK/NDK setup is still required on the machine.
- iOS: supported by the Tauri architecture, but must be initialized and built from macOS with Xcode.

## Development

```bash
npm install
npm run dev
```

## Web Build

```bash
npm run build
npm run preview
```

## Tauri Desktop

```bash
npm run tauri:info
npm run tauri:dev
npm run tauri:build
```

Prerequisites for desktop builds:

- Rust toolchain via `rustup`
- Windows: MSVC build tools + WebView2
- macOS: Xcode
- Linux: WebKitGTK and related system packages

## Tauri Android

```bash
npm run tauri:android:init
npm run tauri:android:dev
npm run tauri:android:build
```

Prerequisites for Android builds:

- Rust via `rustup`
- Android Studio
- Android SDK Platform + Platform Tools + Build Tools + NDK + Command-line Tools
- `JAVA_HOME`, `ANDROID_HOME`, and `NDK_HOME` configured

## iOS

iOS requires macOS and Xcode. This Windows environment can prepare the shared frontend and Tauri desktop scaffold, but iOS initialization and builds must be done from a Mac.

## Notes

- Frontend persistence now goes through a small storage abstraction instead of hard-coding `localStorage` everywhere.
- Audio playback now uses a lightweight mobile-safe play helper that retries blocked media after first user interaction.
- Vite is configured for Tauri’s fixed dev port and native build targets.
