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
npm run tauri:android:build:debug
```

`tauri:android:build` now targets `arm64` only, which is the right default for physical Android phones and avoids generating a 4-ABI universal APK. Use `npm run tauri:android:build:universal` only if you explicitly need one APK for multiple ABIs.

`tauri:android:build` produces an unsigned release APK/AAB, so it is not directly installable until you sign it. For local device testing, use `npm run tauri:android:build:debug`, which produces a debug APK signed with the debug keystore.

### Signed Play Store AAB

For Play Console uploads, use the repo-level signing command instead of opening Android Studio every time.

Required environment variables:

- `ANDROID_UPLOAD_KEYSTORE`: path to your upload keystore, relative to `game/` or absolute
- `ANDROID_UPLOAD_KEY_ALIAS`: keystore alias name
- `ANDROID_UPLOAD_STORE_PASSWORD`: keystore password
- `ANDROID_UPLOAD_KEY_PASSWORD`: optional key password if it differs from the store password

PowerShell example:

```powershell
$env:ANDROID_UPLOAD_KEYSTORE = "..\upload-keystore.jks"
$env:ANDROID_UPLOAD_KEY_ALIAS = "upload"
$env:ANDROID_UPLOAD_STORE_PASSWORD = "your-keystore-password"
$env:ANDROID_UPLOAD_KEY_PASSWORD = "your-key-password"
npm run tauri:android:build:play
```

If you already built the release bundle and only want to sign the latest release `.aab`, run:

```powershell
npm run tauri:android:sign:aab
```

The command signs the newest release bundle under `src-tauri/gen/android/app/build/outputs/bundle/` and verifies the signature with `jarsigner`.

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
