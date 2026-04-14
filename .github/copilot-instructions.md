# Copilot Instructions — System.Override(Love)

## Project
Psychological horror visual novel engine built with React 19 + TypeScript + Vite + Tailwind CSS v4. Mobile-first. Code lives in `game/`.

## Stack & Conventions
- **Tailwind v4**: Uses `@theme` directive in CSS, NOT `tailwind.config.js`.
- **State management**: `useReducer` + `useContext` via `GameContext.tsx`. Access with `useGame()` hook.
- **Save system**: 50 localStorage slots with `sol_slot_` prefix. `SaveLoadModal` handles UI.
- **Audio**: `AudioManager.tsx` — `playBGM(src, vol)`, `stopBGM()`, `setBGMVolume(vol)`. BGM always loops.
- **Script format**: Scenes are arrays of `DialogueLine` objects in `script.ts`. Properties like `background`, `bgm`, `sprites` are set on specific lines and carry forward — most lines omit them.

## Architecture Rules

### BGM / Background / Sprite Resolution
These properties are sparse — only set when they change. Always scan **backwards** through `scene.lines[0..currentIndex]` to find the most recent value. Never assume the current line has the value.

### DialogueBox Typewriter
- Uses `forwardRef` + `useImperativeHandle` to expose `tap()` method.
- The `setInterval` ID is stored in a `useRef`. On tap, **always clear the interval** before setting text to prevent the interval from overwriting filled text.

### System Graphics
- `systemGraphic` field on a `DialogueLine` renders as an overlay above the dialogue box.
- Values use a `tag:content` prefix convention to select the visual style:
  - `file:` — PC file explorer window (e.g. `file:C:/Users/Iris/Archive/...`)
  - `sms:` — Phone text message notification
  - `note:` — Handwritten paper note (torn notebook, lined paper)
  - `call:` — Incoming phone call screen
  - `terminal:` — VR system terminal / admin command (red-on-black)
  - `item:` — Item received popup (gold accent)
  - `phone:` — Phone screen (unlocked device)
  - `cg:` — CG / scene description card (italic, cinematic)
- Fallback: unprefixed strings render as a plain card.

### Save/Load
- When loading a save, call `stopBGM()` before closing the settings menu so the BGM effect can restart cleanly for the new scene position.
- The BGM `useEffect` in `GameScreen` depends on `activeBgm` (resolved by backward scan), not the raw `line.bgm`.

## File Structure
```
game/src/
├── types.ts          # All TypeScript interfaces
├── script.ts         # Asset paths + scene data + getSceneById()
├── GameContext.tsx    # Provider, reducer, save/load
├── useGame.ts        # Context hook, TOTAL_SLOTS
├── App.tsx           # MainMenu ↔ GameScreen routing
├── components/
│   ├── GameScreen.tsx      # Main orchestrator
│   ├── DialogueBox.tsx     # Typewriter, choices, system graphics
│   ├── SpriteLayer.tsx     # Character sprites (h-[92vh])
│   ├── BackgroundLayer.tsx # Fullscreen bg with crossfade
│   ├── AudioManager.tsx    # BGM play/stop/volume
│   ├── SaveLoadModal.tsx   # 50-slot save/load UI
│   ├── SettingsMenu.tsx    # Settings panel
│   └── MainMenu.tsx        # Title screen
```

## Assets
- Backgrounds: `game/public/backgrounds/`
- Characters: `game/public/characters/`
- Music: `game/public/music/`
- Original character PNGs: `CHARACTERS/` (root)
- Processed (bg removed): `CHARACTERS_processed/` (root)

## Python Tools (project root)
- `remove_bg.py` — Flood-fill white background removal. Reads from `CHARACTERS/`, outputs to `CHARACTERS_processed/` and `game/public/characters/`. Never overwrites originals.

## Common Pitfalls
1. **BGM not playing after load/reload**: Must resolve BGM by backward scan, not just current line.
2. **Typewriter text resetting on click**: Interval must be cleared via ref before setting full text.
3. **stopBGM on save load**: Required to reset audio state before the new scene's BGM effect fires.
4. **Sprite sizing**: Use viewport-height only (`h-[92vh]`), no responsive breakpoints — prevents shrinking on square aspect ratios.
