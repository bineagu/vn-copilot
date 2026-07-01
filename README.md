# System.Override(Love)

System.Override(Love) is a psychological horror visual novel built with React 19, TypeScript, Vite, Tailwind CSS v4, and Tauri 2.

The game follows an isolated high school student whose ordinary routine starts to fracture after a quiet classmate begins appearing exactly where she should not be. What starts as discomfort turns into obsession, surveillance, and a reality-warping descent into a love story gone wrong.

## Important Stuff

### Project Overview

- Genre: Psychological horror visual novel
- Platforms: Web, Windows desktop via Tauri, Android via Tauri mobile
- Current native app identity: `system.override.love.com.homelabed`
- Frontend code lives in `game/`
- Story content is authored in typed scene data inside `game/src/script.ts`

### Core Features

- Branching dialogue choices with route-dependent progression
- 50 save slots with persistent storage across sessions
- Background music, sound effects, and voiced dialogue support
- Character sprite layering and expression-based scene presentation
- In-universe UI overlays such as file windows, phone messages, notes, calls, terminal prompts, and CG-style cards
- Mobile-first UI with desktop and Android packaging support

### Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Tauri 2

### Repository Layout

- `game/`: Main game app, assets, frontend code, and Tauri wrapper
- `game/src/`: React app source, story logic, state, and UI components
- `game/public/`: Backgrounds, sprites, music, SFX, and voice assets used at runtime
- `src-tauri/`: Native desktop and Android packaging layer for the Tauri app
- Root Python and Node scripts: Asset processing, voice tooling, and content pipeline helpers

## Development

Run all frontend and Tauri commands from `game/`.

### Local Development

```bash
cd game
npm install
npm run dev
```

### Web Build

```bash
cd game
npm run build
npm run preview
```

### Desktop Build

```bash
cd game
npm run tauri:info
npm run tauri:dev
npm run tauri:build
```

Desktop prerequisites:

- Rust toolchain via `rustup`
- Windows: MSVC build tools and WebView2
- macOS: Xcode
- Linux: WebKitGTK and related system packages

### Android Build

```bash
cd game
npm run tauri:android:init
npm run tauri:android:dev
npm run tauri:android:build
npm run tauri:android:build:debug
```

Android notes:

- Release builds target `arm64` by default
- `tauri:android:build:debug` is the easiest route for local device testing
- Release APK/AAB output must be signed before Play Store submission
- You need Android Studio, SDK, Platform Tools, Build Tools, NDK, and Command-line Tools installed
- Environment variables should include `JAVA_HOME`, `ANDROID_HOME`, and `NDK_HOME`

### iOS

iOS packaging is possible through the Tauri architecture, but initialization and builds must be done on macOS with Xcode.

## Content Notes

This project is a psychological horror title. Store pages and marketing copy should make that clear. Depending on your final build, you may want to disclose themes such as stalking, obsession, manipulation, distorted reality, and intense emotional distress.

## Play Store Publishing Copy

Use and adapt the text below when you prepare the Play Store listing.

### App Title

System.Override(Love)

### Short Description

A psychological horror visual novel about obsession, control, and broken reality.

### Full Description

System.Override(Love) is a psychological horror visual novel where an ordinary school routine unravels into obsession, surveillance, and a reality that refuses to stay stable.

You play as a withdrawn student living through the same quiet days until Iris, a classmate who should have remained background noise, starts appearing with impossible timing and unsettling intimacy. Small encounters become invasive patterns. Private spaces stop feeling private. The line between affection and possession disappears.

As the story escalates, you will move through branching conversations, disturbing discoveries, fractured environments, and system-like intrusions that push the world beyond a normal romance story. What begins as unease becomes a deeper descent into psychological horror, emotional dependency, and warped perception.

Features:

- Branching visual novel progression
- Atmospheric psychological horror storytelling
- Multiple scene transitions, character sprites, and cinematic presentation
- Music, sound effects, and voiced lines
- Save system with multiple slots
- Mobile-friendly interface built for immersive reading

If you enjoy dark visual novels, unsettling romance, and narrative horror with a digital edge, System.Override(Love) is built to make every interaction feel personal in the worst possible way.

### Suggested Tags or Keywords

- visual novel
- psychological horror
- horror story game
- narrative game
- anime horror
- dark romance
- interactive story
- choice-based story

### Content Warning Suggestion

Psychological horror, stalking themes, obsessive behavior, emotional manipulation, and disturbing scenes.

### Store Listing Notes

- Prepare screenshots that show the dialogue presentation, character art, and in-universe system overlays
- If you add achievements, endings, or route counts later, update the description with specific numbers
- Keep the age rating answers aligned with the final script, not just the current build snapshot

## Website Description

### Short Website Blurb

System.Override(Love) is a psychological horror visual novel where a quiet school life collapses into obsession, surveillance, and reality distortion. What starts as an unsettling encounter with a classmate becomes a branching descent into control, dread, and intimacy gone wrong.

### Longer Website Description

System.Override(Love) is a story-driven psychological horror visual novel about loneliness, fixation, and the terrifying moment when attention stops feeling flattering and starts feeling inescapable.

Set against an ordinary school routine that gradually slips out of alignment, the game follows a protagonist pulled into a relationship that becomes increasingly invasive, uncanny, and impossible to explain. Through branching dialogue, layered presentation, music, voice, and in-world interface effects, the story turns familiar spaces into something unstable and threatening.

This is a horror romance built around tension, atmosphere, and the feeling that the system around you already knows what you are going to do next.

## AI Disclosure

This project was built with heavy AI assistance and is approximately 95% AI-generated or AI-assisted across code, production support, and content pipeline work.