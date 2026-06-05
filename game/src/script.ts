import type { Scene } from "./types";

// Asset paths
export const BACKGROUNDS = {
  // Day 1
  classroomAfternoon: "/backgrounds/__1._Classroom,_Late_202604110132.png",
  schoolHallway: "/backgrounds/__2._School_Hallway,_202604110134.png",
  schoolGates: "/backgrounds/__3._School_Gates,_202604110134.png",
  bedroomNight: "/backgrounds/__4._Protagonist's_Bedroom,_202604110133.png",
  darkStreet: "/backgrounds/__5._Dark_Street,_202604110136.png",
  darkStreetWithIris: "/backgrounds/__5_1.png",
  darkStreetWithSdCard: "/backgrounds/__5_2.png",
  // Day 2-3
  classroomMorning: "/backgrounds/__6._Classroom,_Morning_202604110137.png",
  library: "/backgrounds/__7._School_Library,_202604110137.png",
  libraryHallway: "/backgrounds/__8._Library_Hallway,_202604110137.png",
  schoolHallwayEvening: "/backgrounds/__9._School_Hallway,_202604110137.png",
  // Day 4-5
  fadeToBlack: "/backgrounds/__10._Fade_to_202604110137.png",
  irisRoom: "/backgrounds/__11._Iris's_Bedroom___202604110138.png",
  sedatedBlackout: "/backgrounds/__12._Sedated_Blackout_202604110138.png",
  footballField: "/backgrounds/__13._School_Football_202604110139.png",
  frozenOversaturated:
    "/backgrounds/__14._Frozen_Oversaturated_202604110143.png",
  bedroomMorning: "/backgrounds/__4_1 Bedroom morning.png",
  // Day 6
  classroomMorningVR: "/backgrounds/__15._Classroom,_Morning_202604110139.png",
  whiteVoid: "/backgrounds/__16._Artificial_White_202604110140.png",
  gymnasium: "/backgrounds/__17._School_Gymnasium,_202604110140.png",
  classroomMorningVRBroken:
    "/backgrounds/__18._Classroom,_Morning_202604110140.png",
  hallwayLockers: "/backgrounds/__19._Hallway_with_202604110141.png",
  // Day 9-10
  glitchingLibrary: "/backgrounds/__20._Glitching_Library,_202604110141.png",
  totalWhite: "/backgrounds/__21._Total_White_202604110141.png",
  bedroomVR: "/backgrounds/__22._Protagonist's_Bedroom_202604110143.png",
  bedroomDark: "/backgrounds/__23._Protagonist's_Bedroom_202604110144.png",
  // Day 12+
  studentCouncil: "/backgrounds/__24._Student_Council_202604110145.png",
  studentCouncilGlitch: "/backgrounds/__24_1 glitched student council.png",
  binaryCodeHallway: "/backgrounds/__25._Binary_Code_202604110145.png",
  studentCouncilRed: "/backgrounds/__24_2redlogicloop.png",
  basement: "/backgrounds/__26._Basement_202604110145.png",
  binaryCode: "/backgrounds/25 Binary_code_digital_202604141829.mp4",
  totalBlack: "/backgrounds/__26._Total_Blackness_202604110146.png",
  whiteBlinding: "/backgrounds/__27._Pure_Blinding_202604110146.png",
  cafeReal: "/backgrounds/__28._Real-World_Cafe,_202604110146.png",
};

export const CHARACTERS = {
  irisReal: "/characters/Iris real.png",
  irisVR: "/characters/Iris vr.png",
  chloe: "/characters/Chloe.png",
  maya: "/characters/Maya.png",
};

/** Get expression sprite by chronological number (1-100) */
export function getExpressionSprite(num: number): string {
  return `/characters/expressions/${num}.png`;
}

export const MUSIC = {
  graySuburbia: "/music/1 Three_PM_Kitchen_Table.mp3",
  obsession: "/music/2 Twelve_Inches_of_Wall.mp3",
  infiniteSummer: "/music/3 無限の夏をインストール.mp3",
  finalSaveState: "/music/4 Final_Save_State.mp3",
  lastSavedState: "/music/5 Last_Saved_State.mp3",
  pistonPressure: "/music/6 Piston_Pressure_Valve.mp3",
  finalWinterRoom: "/music/7 The_Final_Winter_Room.mp3",
  sunlightFloorboards: "/music/8 Sunlight_on_the_Floorboards.mp3",
};

export const SFX = {
  schoolBellMuffled: "/sfx/sfx_school_bell_muffled.mp3",
  footstepsTile: "/sfx/sfx_footsteps_tile_echo.mp3",
  computerWork: "/sfx/sfx_computer_mouse_keyboard.mp3",
  leavesCrunch: "/sfx/sfx_leaves_crunch_outside.mp3",
  chairSqueak: "/sfx/sfx_chair_squeak.mp3",
  windowSlide: "/sfx/sfx_window_slide_open.mp3",
  runningFootsteps: "/sfx/sfx_running_footsteps_fade.mp3",
  sdInsert: "/sfx/sfx_sd_insert_device_chime.mp3",
  mouseClick: "/sfx/sfx_mouse_click_single.mp3",
  phoneBuzz: "/sfx/sfx_phone_buzz_desk.mp3",
  classroomMurmur: "/sfx/sfx_classroom_murmur_lockers.mp3",
  chairSlide: "/sfx/sfx_chair_slide_floor.mp3",
  shoulderSmack: "/sfx/sfx_shoulder_smack.mp3",
  clothRustle: "/sfx/sfx_cloth_rustle_soft.mp3",
  libraryPages: "/sfx/sfx_library_pages_pencil.mp3",
  libraryDoors: "/sfx/sfx_library_doors_creak.mp3",
  footstepsCarpet: "/sfx/sfx_footsteps_carpet_slow.mp3",
  paperCrumple: "/sfx/sfx_paper_crumple.mp3",
  hallwayLockerSteps: "/sfx/sfx_hallway_locker_footsteps_distant.mp3",
  softGiggle: "/sfx/sfx_soft_giggle.mp3",
  teacupDrop: "/sfx/sfx_teacup_drop_carpet.mp3",
  footballAmbience: "/sfx/sfx_football_field_ambience.mp3",
  footstepsGravel: "/sfx/sfx_footsteps_gravel_heavy.mp3",
  footballThwack: "/sfx/sfx_football_thwack_cannon.mp3",
  crunchSickening: "/sfx/sfx_crunch_sickening.mp3",
  dialupScreech: "/sfx/sfx_dialup_screech_static.mp3",
  systemBoot: "/sfx/sfx_system_boot_chime.mp3",
  schoolBellCheerful: "/sfx/sfx_school_bell_cheerful.mp3",
  serverHum: "/sfx/sfx_server_hum_low.mp3",
  seagullLoop: "/sfx/sfx_seagull_loop.mp3",
  wavesLoop: "/sfx/sfx_waves_loop.mp3",
  footThud: "/sfx/sfx_foot_thud_solid_surface.mp3",
  plasticBottle: "/sfx/sfx_plastic_bottle_squeeze.mp3",
  gymShoeSqueak: "/sfx/sfx_gym_shoes_squeak.mp3",
  whistleSharp: "/sfx/sfx_whistle_sharp.mp3",
  digitalTearing: "/sfx/sfx_digital_tearing.mp3",
  buzzingStatic: "/sfx/sfx_buzzing_static_rise.mp3",
  gymDoors: "/sfx/sfx_gym_doors_hiss.mp3",
  digitalPing: "/sfx/sfx_digital_ping_sharp.mp3",
  schoolBellGlitch: "/sfx/sfx_school_bell_glitch_cutoff.mp3",
  errorTone: "/sfx/sfx_error_tone_high.mp3",
  hallwayThud: "/sfx/sfx_hallway_thud_echo.mp3",
  rushingWind: "/sfx/sfx_rushing_wind_purge.mp3",
  airConditioner: "/sfx/sfx_air_conditioner_hum_loud.mp3",
  heavyFootstep: "/sfx/sfx_heavy_single_footstep.mp3",
  whiteFlashScreech: "/sfx/sfx_white_flash_screech.mp3",
  phoneRingtone: "/sfx/sfx_phone_ringtone_harsh.mp3",
  staticBreathing: "/sfx/sfx_static_breathing_comm.mp3",
  muffledBang: "/sfx/sfx_muffled_bang_upstairs.mp3",
  dialupPhone: "/sfx/sfx_dialup_phone_burst.mp3",
  threeKnocks: "/sfx/sfx_three_slow_knocks.mp3",
  woodenDoorShut: "/sfx/sfx_wooden_door_click_shut.mp3",
  softBuzzing: "/sfx/sfx_soft_buzzing_device.mp3",
  hesitantFootsteps: "/sfx/sfx_hesitant_footsteps.mp3",
  staticBurst: "/sfx/sfx_static_burst_silence.mp3",
  staticExplosion: "/sfx/sfx_static_explosion.mp3",
  doorUnlock: "/sfx/sfx_door_unlock_click.mp3",
  doorBurstRun: "/sfx/sfx_door_burst_run.mp3",
  serverRackBoom: "/sfx/sfx_server_rack_boom.mp3",
  digitalGlassShatter: "/sfx/sfx_digital_glass_shatter.mp3",
  footstepsStairs: "/sfx/sfx_footsteps_wooden_stairs_above.mp3",
  dialupWhineBuild: "/sfx/sfx_dialup_whine_build.mp3",
  policeBreach: "/sfx/sfx_police_breach_basement.mp3",
};

export const scenes: Scene[] = [
  // ═══════════════════════════════════════════
  // DAY 1: THE STALKER'S SHADOW
  // ═══════════════════════════════════════════
  {
    id: "day1_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "The final bell always sounds less like a celebration and more like an eviction notice.",
        isInternal: true,
        background: BACKGROUNDS.classroomAfternoon,
        bgm: null,
        sfx: SFX.schoolBellMuffled,
      },
      {
        speaker: "Protagonist",
        text: "Around me, the classroom empties in a blur of scraped chairs and overlapping conversations. I don't really tune into them. It's just noise. White noise in a gray room.",
        isInternal: true,
        sfx: SFX.chairSlide,
      },
      {
        speaker: "Protagonist",
        text: "I take my time packing my bag. There's no rush. No club activities, no study groups, no one waiting for me.",
        isInternal: true,
        background: BACKGROUNDS.schoolHallway,
        bgm: MUSIC.graySuburbia,
      },
      {
        speaker: "Protagonist",
        text: "That's more or less my whole life lately. I'm not popular enough to be missed, not hated enough to be memorable. Just another second-year who learned that if you stay quiet, people eventually start looking through you instead of at you.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Most nights I go home to an empty house, microwave something forgettable, and listen to my parents apologize by text for another late shift. Routine isn't comforting. It's just predictable. And predictable is close enough.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Just the same routine. 3:15 PM. Exit through the west doors. Walk home.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Lately, the routine is the only thing that makes sense.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I push open the heavy double doors of the west exit. The evening air hits me—cool, damp, smelling like impending rain and wet asphalt. The sun is already dipping behind the treeline, casting long, warped shadows across the pavement.",
        isInternal: true,
        background: BACKGROUNDS.schoolGates,
        sfx: SFX.footstepsTile,
      },
      {
        speaker: "Protagonist",
        text: "And there she is.",
        sprites: [{ character: "Iris", expression: "1", position: "center" }],
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Most students have already cleared out, rushing to catch the train or heading to the arcade downtown. But she's just standing there, beside the wrought-iron gate.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Iris.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I know her in the vague, school-shaped way you know people you never actually talk to. Quiet girl. Good grades. Usually alone. The kind of person who blends into the edges of a room until she suddenly doesn't.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I've noticed her a few times this week when I shouldn't have. At the shoe lockers before first bell. Across the street from the convenience store. At the far end of a hallway after everyone else had already gone home. Every time, I told myself it was coincidence.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "She isn't looking at her phone. She isn't reading a book. She's just... staring directly at the west doors. Like she's been waiting for them to open. Like a statue left out in the cold.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I hesitate. Usually, I'd just put my headphones in and walk past. But her gaze snaps to me the second my foot hits the pavement.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_start_16_irisReal.mp3",
        text: "Oh! {playerName}!",
        sprites: [{ character: "Iris", expression: "2", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Hey, Iris. You're still here? The last bus leaves from the corner in a few minutes, doesn't it?",
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_start_18_irisReal.mp3",
        text: "I... I was just waiting for the bus, yeah. Even though the stop is a block away.",
        sprites: [{ character: "Iris", expression: "3", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Her voice is a little too loud for the quiet courtyard. I stop, adjusting my grip on my backpack strap.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "She takes a step closer. The gravel crunches under her shoes. She smells faintly of lavender, but underneath it, there's a sharp, metallic scent. Like copper.",
        isInternal: true,
        sfx: SFX.footstepsGravel,
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_start_21_irisReal.mp3",
        text: "I like the view from here. It's the view of where you spend your day.",
      },
      {
        speaker: "Protagonist",
        text: "...Excuse me?",
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_start_23_irisReal.mp3",
        text: "I know your schedule, you know. 3:15 PM, you leave through the west exit. 3:20 PM, you check your locker. 3:23 PM, you walk past the old oak tree.",
      },
      {
        speaker: "Protagonist",
        text: "My stomach does a slow, uncomfortable flip. The acoustic guitar in my headphones suddenly feels completely disconnected from the heavy silence settling between us.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_start_25_irisReal.mp3",
        text: "It's... it's a comfort to know where you are. The world is so big and messy, {playerName}. But you... you make sense. You're exactly where you're supposed to be.",
      },
      {
        speaker: "Protagonist",
        text: "She's smiling. But her eyes are perfectly still. Unblinking.\nI need to say something to break this weird tension.",
        isInternal: true,
        choices: [
          {
            text: '"That\'s a bit creepy, Iris."',
            nextSceneId: "day1_branch_a",
            stateEffects: { lucidity: 2 },
          },
          {
            text: '"That\'s sweet, I guess."',
            nextSceneId: "day1_branch_b",
            stateEffects: { irisAffection: 5, lucidity: -2 },
          },
        ],
      },
    ],
  },

  // BRANCH A: "That's a bit creepy, Iris."
  {
    id: "day1_branch_a",
    lines: [
      {
        speaker: "Protagonist",
        text: "Look, Iris... that's a bit creepy. You shouldn't be memorizing people's schedules.",
        background: BACKGROUNDS.schoolGates,
        bgm: MUSIC.graySuburbia,
        sprites: [{ character: "Iris", expression: "4", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_branch_a_02_irisReal.mp3",
        text: "Creepy...? I just... I just wanted to pay attention to you. Nobody else pays attention to you.",
      },
      {
        speaker: "Protagonist",
        text: "It's just intense, that's all. You should probably head to the bus stop before you miss it.",
      },
      {
        speaker: "Protagonist",
        text: "I don't wait for her to respond. I push past her and start walking down the sidewalk. I can feel her eyes burning into the back of my neck for a full block.",
        isInternal: true,
        sfx: SFX.footstepsGravel,
      },
      {
        speaker: "Protagonist",
        text: "When I finally look back, the school gate is empty.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "But the feeling of being watched doesn't fade.",
        isInternal: true,
        choices: [
          {
            text: "Continue...",
            nextSceneId: "day1_5_start",
          },
        ],
      },
    ],
  },

  // BRANCH B: "That's sweet, I guess."
  {
    id: "day1_branch_b",
    lines: [
      {
        speaker: "Protagonist",
        text: "I mean... that's sweet, I guess. A little intense, but... thanks for looking out for me.",
        background: BACKGROUNDS.schoolGates,
        bgm: MUSIC.graySuburbia,
        sprites: [{ character: "Iris", expression: "6", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_branch_b_02_irisReal.mp3",
        text: "Sweet? You think I'm sweet?!",
      },
      {
        speaker: "Protagonist",
        text: "She takes another step forward, entirely invading my personal space. She reaches out, her fingertips lightly brushing the fabric of my uniform sleeve.",
        isInternal: true,
        sfx: SFX.clothRustle,
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_branch_b_04_irisReal.mp3",
        text: "I knew it. I knew you'd understand. Everyone else says I'm weird, but you... you're different. We're the same.",
      },
      {
        speaker: "Protagonist",
        text: "I should probably get going, Iris. It's getting dark.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day1_branch_b_06_irisReal.mp3",
        text: "Yes! Go home. Be safe. Lock your doors. I'll... I'll see you tomorrow, {playerName}. Exactly at 8:15 AM at the shoe lockers!",
        sprites: [{ character: "Iris", expression: "7", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I force a nod and turn away. As I walk home, the sunset seems a little warmer. Maybe I am just being paranoid. She's just a lonely girl who needs a friend.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "But as I reach into my pocket for my keys, I notice a smudge of dirt on my sleeve where she touched me.",
        isInternal: true,
        choices: [
          {
            text: "Continue...",
            nextSceneId: "day1_5_start",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // DAY 1.5: THE SD CARD
  // ═══════════════════════════════════════════
  {
    id: "day1_5_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "11:42 PM.",
        isInternal: true,
        background: BACKGROUNDS.bedroomNight,
        bgm: MUSIC.graySuburbia,
      },
      {
        speaker: "Protagonist",
        text: "The house is completely silent. My parents are working the night shift again. It's just me, the hum of my computer tower, and the occasional rattle of the wind against the glass.",
        isInternal: true,
        sfx: SFX.airConditioner,
      },
      {
        speaker: "Protagonist",
        text: "I'm trying to focus on a history assignment, but the words keep swimming on the screen. My mind keeps drifting back to the school gate. To Iris.",
        isInternal: true,
        sfx: SFX.computerWork,
      },
      {
        speaker: "Protagonist",
        text: '"I know your schedule, you know."\nHer voice replays in my head, too clear, too close.',
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I freeze. My hand hovers over the mouse.",
        isInternal: true,
        bgm: null,
        sfx: SFX.leavesCrunch,
      },
      {
        speaker: "Protagonist",
        text: "It sounded like it came from the front garden, right beneath my window.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Probably just a stray cat. Or the wind.\nBut the hair on the back of my neck stands up. The silence that follows the crunch feels heavy. Expectant.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I slowly push my chair back and creep toward the window. I keep the lights off. If someone is out there, I don't want them to know I'm looking.",
        isInternal: true,
        sfx: SFX.chairSqueak,
      },
      {
        speaker: "Protagonist",
        text: "I reach the blinds and use one finger to pull a slat down just a fraction of an inch.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "At first, I don't see anything. Just the empty sidewalk and the neighbor's overgrown bushes.",
        isInternal: true,
        background: BACKGROUNDS.darkStreet,
      },
      {
        speaker: "Protagonist",
        text: "Then, the shadow under the streetlamp moves.",
        isInternal: true,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "Someone is standing at the edge of my lawn.",
        isInternal: true,
        background: BACKGROUNDS.darkStreetWithIris,
      },
      {
        speaker: "Protagonist",
        text: "They are wearing a dark hoodie, but the posture is unmistakable. It's small. Tense. Just like Iris.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "In her hands, lifted up toward her face, is a digital camera with a long zoom lens. Pointed directly at my bedroom window.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "What the hell...",
      },
      {
        speaker: "Protagonist",
        text: "Panic and anger flare up in my chest. This isn't just a weird conversation at school. She followed me home. She's watching me right now.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Hey! What are you doing out there?!",
        sfx: SFX.windowSlide,
      },
      {
        speaker: "Protagonist",
        text: "The figure flinches violently. The camera nearly drops from her hands. She doesn't say a word, doesn't even look up to meet my eyes. She just turns and bolts down the street, disappearing into the dark.",
        isInternal: true,
        sfx: SFX.runningFootsteps,
        background: BACKGROUNDS.darkStreet,
      },
      {
        speaker: "Protagonist",
        text: "My heart is hammering against my ribs. I lean out the window, the cold night air biting at my face.\nShe's gone.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "But as my eyes adjust to the dark lawn below, I notice something glinting in the grass where she was standing. A tiny, metallic square catching the orange light of the streetlamp.",
        isInternal: true,
        background: BACKGROUNDS.darkStreetWithSdCard,
      },
      {
        speaker: "Protagonist",
        text: "I didn't even put my shoes on. I just ran downstairs, grabbed it, and locked the front door behind me.",
        isInternal: true,
        background: BACKGROUNDS.bedroomNight,
        sfx: SFX.doorUnlock,
      },
      {
        speaker: "Protagonist",
        text: "Now, I'm sitting back at my desk, staring at it in the palm of my hand.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "An SD card. It must have popped out of her camera when I startled her.",
        isInternal: true,
        sprites: [{ character: "Item", expression: "8", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Part of me says I should throw it away. Or give it to the police.\nBut I need to know. I need to know what she was looking at.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I open the file explorer. There's only one master folder on the drive.",
        isInternal: true,
        sfx: SFX.sdInsert,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "The name makes my blood run cold.",
        isInternal: true,
        systemGraphic: "file:C:/Users/Iris/Archive/My_Future_Husband",
      },
      {
        speaker: "Protagonist",
        text: "My hand shakes slightly as I double-click the folder.\nHundreds of files populate the screen.\nThe first folder is named Location_Data.",
        isInternal: true,
        sfx: SFX.mouseClick,
      },
      {
        speaker: "Protagonist",
        text: "I open a text file. It's a massive spreadsheet.\nDates. Times. GPS coordinates.\nMonday, 8:02 AM: Walked past the bakery.\nTuesday, 4:15 PM: Stayed at the arcade for exactly 42 minutes.\nSunday, 2:00 AM: Pacing in bedroom. (Heart rate elevated?)",
        isInternal: true,
        sfx: SFX.mouseClick,
      },
      {
        speaker: "Protagonist",
        text: "How... how does she know my heart rate?",
      },
      {
        speaker: "Protagonist",
        text: "I back out of the folder, feeling sick. There's another folder. Audio_Board.",
        isInternal: true,
        sfx: SFX.mouseClick,
      },
      {
        speaker: "Protagonist",
        text: "Inside are dozens of small .wav files. I click one at random.",
        isInternal: true,
        sfx: SFX.mouseClick,
      },
      {
        speaker: "Audio",
        text: '(Static hiss) "...hey Leo, do you... want to... grab lunch?"',
        sfx: SFX.staticBurst,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "It's my voice. But it sounds weird. Chopped up.\nI click another one.",
        isInternal: true,
      },
      {
        speaker: "Audio",
        text: '(Static hiss) "...I... love... you... Iris."',
        sfx: SFX.staticBurst,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "I rip my headphones off my ears, throwing them onto the desk.",
        isInternal: true,
        sfx: SFX.hallwayThud,
        sfxVolume: 2,
      },
      {
        speaker: "Protagonist",
        text: "She spliced it. She recorded my conversations at school, cut out individual words, and stitched them together to make me say things I never said.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I sit in the silence of my room, staring at the monitor.\nShe isn't just a lonely girl with a crush.\nShe is building a version of me. A version she can control.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I jump, nearly knocking over my chair. It's a text message from an unknown number.",
        isInternal: true,
        sfx: SFX.phoneBuzz,
        systemGraphic:
          "sms:You look so handsome when you're concentrating. Sweet dreams. See you tomorrow. ❤️",
      },
      {
        speaker: "Protagonist",
        text: "I don't sleep that night. I just sit in the dark, watching the door.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day2_start" }],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // DAY 2: THE UNSOLICITED GIFT
  // ═══════════════════════════════════════════
  {
    id: "day2_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "My eyes feel like they're full of sand.",
        isInternal: true,
        background: BACKGROUNDS.classroomMorning,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.classroomMurmur,
      },
      {
        speaker: "Protagonist",
        text: 'Every time I blinked last night, I saw that spreadsheet. The audio clips echoed in the silence of my room.\n"...I... love... you... Iris."',
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I walk to my desk at the back of the classroom, moving on autopilot. I keep my head down. If I look at anyone, I might scream. How many of them does she watch? Or is it just me? Am I the only one trapped in whatever game she's playing?",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I drop my bag next to my chair and look down at my desk.\nI freeze.",
        isInternal: true,
        sfx: SFX.chairSlide,
      },
      {
        speaker: "Protagonist",
        text: "Sitting dead center on my desk is a lunchbox.",
        isInternal: true,
        sprites: [{ character: "Item", expression: "9", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "It's wrapped meticulously. Tied with a neat little bow. Attached to the top is a small, pale pink sticky note.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: '"You were up so late studying! You need your energy. \n\n- I ❤️"',
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "My stomach twists into a tight knot.\nShe knows I was awake. Of course she does. She's tracking my lights, my phone... God knows what else.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Who put this here?",
      },
      {
        speaker: "Protagonist",
        text: "I mutter it under my breath, but my eyes dart to the classroom door.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "10", position: "right" }],
      },
      {
        speaker: "Protagonist",
        text: "There she is.\nShe isn't coming inside. She's just hovering at the threshold, watching my reaction. Her eyes are wide, expectant. Like a dog waiting for a treat.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Leo appears, slapping my shoulder from behind.",
        isInternal: true,
        sprites: [
          { character: "Iris", expression: "10", position: "right" },
          { character: "Leo", expression: "11", position: "left" },
        ],
        sfx: SFX.shoulderSmack,
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_start_13_leo.mp3",
        text: "Yo! Morning, man. You look like you got run over by a truck.",
      },
      {
        speaker: "Protagonist",
        text: "Leo. Hey. I just... didn't sleep well.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_start_15_leo.mp3",
        text: "Whoa, hello. Did your mom drop off a gourmet lunch or something? That smells incredible.",
        sprites: [
          { character: "Iris", expression: "10", position: "right" },
          { character: "Leo", expression: "12", position: "left" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Leo leans in and sniffs the box. I haven't even opened it, but the faint aroma leaking out is unmistakable.\nTeriyaki chicken. Extra ginger. A side of tamagoyaki cooked slightly sweet.\nMy exact favorite meal. Prepared precisely the way I like it. A preference I've only ever mentioned in texts to my mom... texts that Iris must have read.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_start_17_leo.mp3",
        text: "Wait, is there a note? 'From I'? Bro, you have a secret admirer? Open it!",
      },
      {
        speaker: "Protagonist",
        text: "Leo, don't touch it.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_start_19_leo.mp3",
        text: "Come on, just a peek! I'm starving. I skipped breakfast.",
      },
      {
        speaker: "Protagonist",
        text: "I look back at the door. Iris is still there. Her grip on the doorframe is so tight her knuckles are white. If I throw it away, what will she do? If I eat it, am I validating her obsession?",
        isInternal: true,
        choices: [
          {
            text: "Eat the lunch.",
            nextSceneId: "day2_branch_a",
            stateEffects: { irisAffection: 10, lucidity: -5 },
          },
          {
            text: "Give it to Leo.",
            nextSceneId: "day2_branch_b",
            stateEffects: { irisAffection: -10, lucidity: 10 },
          },
        ],
      },
    ],
  },

  {
    id: "day2_branch_a",
    lines: [
      {
        speaker: "Protagonist",
        text: "Leave it, Leo. It's... it's mine.",
        background: BACKGROUNDS.classroomMorning,
        bgm: MUSIC.graySuburbia,
        sprites: [
          { character: "Iris", expression: "10", position: "right" },
          { character: "Leo", expression: "13", position: "left" },
        ],
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_branch_a_02_leo.mp3",
        text: "Alright, alright! Keep your romantic bento to yourself. Just save me a bite, yeah?",
      },
      {
        speaker: "Protagonist",
        text: "Leo walks over to his desk. With trembling fingers, I untie the red cloth.\nI open the lid. It looks like a culinary magazine cover. It's too perfect.",
        isInternal: true,
        sfx: SFX.clothRustle,
      },
      {
        speaker: "Protagonist",
        text: "I take out the chopsticks. I look toward the door.\nIris is vibrating with excitement. She gives me a tiny, frantic nod.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I take a bite.\nIt's delicious. It's exactly how I like it.\nAnd that terrifies me more than if it tasted like poison. A small part of my exhausted brain thinks, 'Well, at least someone cares.'",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "14", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "A serene, victorious smile spreads across her face before she turns and disappears down the hall.",
        isInternal: true,
        choices: [
          {
            text: "Continue...",
            nextSceneId: "day3_start",
            stateEffects: { ateLunch: 1 },
          },
        ],
      },
    ],
  },

  {
    id: "day2_branch_b",
    lines: [
      {
        speaker: "Protagonist",
        text: "Actually... you can have it, Leo.",
        background: BACKGROUNDS.classroomMorning,
        bgm: MUSIC.graySuburbia,
        sprites: [
          { character: "Iris", expression: "10", position: "right" },
          { character: "Leo", expression: "15", position: "left" },
        ],
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_branch_b_02_leo.mp3",
        text: "Wait, seriously? You're giving away premium waifu cooking? Are you sick?",
      },
      {
        speaker: "Protagonist",
        text: "I'm not hungry. My stomach is a mess today. Just... take it to your desk. Please.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day2_branch_b_04_leo.mp3",
        text: "Don't mind if I do! You're a lifesaver, man!",
      },
      {
        speaker: "Protagonist",
        text: "Leo happily scoops up the red-wrapped box and heads to his seat in the front row.\nI immediately look at the door.",
        isInternal: true,
        bgm: null,
      },
      {
        speaker: "Protagonist",
        text: "Her expression has completely shattered.",
        isInternal: true,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "16", position: "right" }],
      },
      {
        speaker: "Protagonist",
        text: "She stares at Leo as he excitedly unwraps the food.\nThen, her gaze snaps back to me.\nThe innocent, expectant look is gone. It is replaced by a look of such absolute, venomous hatred that I actually physically recoil in my chair.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "It's not directed at me. She looks back at Leo.\nIf looks could kill, Leo would be bleeding out on the classroom floor.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "She turns sharply and vanishes into the hallway.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "17", position: "right" }],
      },
      {
        speaker: "Protagonist",
        text: "She's gone.\nBut during lunch period later that day, Leo complains of severe stomach cramps and has to go to the nurse's office. He spends the rest of the day throwing up.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "She didn't poison it to hurt me.\nBut she made sure that if anyone else touched what was 'mine', they would regret it.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day3_start" }],
      },
    ],
  },

  {
    id: "day3_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "The library is usually my sanctuary.",
        isInternal: true,
        background: BACKGROUNDS.library,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.libraryPages,
      },
      {
        speaker: "Protagonist",
        text: "It's quiet, it's public, and Mrs. Gable, the head librarian, runs the place like a maximum-security prison. Nobody talks above a whisper. Nobody causes trouble.\nIt felt like the safest place to be after... everything.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "After Leo got sick yesterday, I couldn't sleep again. I keep checking my phone, expecting another text. I keep checking my shadow.",
        isInternal: true,
        textVariants: [
          {
            requires: { ateLunch: 1 },
            text: "After eating Iris's food yesterday, I couldn't sleep. It tasted perfect — exactly how I like it — and that only made it worse. I kept waiting to feel sick.\nI never did. I'm still waiting.",
          },
        ],
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_04_chloe.mp3",
        text: "U-Um... excuse me? {playerName}?",
        sprites: [{ character: "Chloe", expression: "18", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Oh. Hey, Chloe. Do you need the seat?",
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_06_chloe.mp3",
        text: "No! I mean, yes, I was wondering if I could sit here. If... if you're not saving it for anyone. The other tables are full, and we're in the same history group...",
        sprites: [{ character: "Chloe", expression: "19", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Chloe is sweet. She's the kind of girl who lives entirely inside her books. Being around her is... grounding. It feels normal.\nRight now, I desperately need normal.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Yeah, of course. Go ahead.",
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_09_chloe.mp3",
        text: "Thank you. I noticed you were reading the chapter on the Meiji Restoration. I... I have some really good notes on that, if you want to share?",
        sprites: [{ character: "Chloe", expression: "20", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "We fall into an easy rhythm. We trade notes. We whisper about the upcoming exam. For about twenty minutes, the knot in my stomach actually starts to loosen.\nI almost forget to be afraid.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "The temperature in the room seems to drop five degrees.\nI don't need to look up. I can feel the hairs on my arms standing.",
        isInternal: true,
        bgm: null,
        sfx: SFX.libraryDoors,
      },
      {
        speaker: "Protagonist",
        text: "Iris is standing about twenty feet away. She isn't looking for a book. She isn't walking toward a table.\nShe is staring directly at me. At the table. At Chloe.",
        isInternal: true,
        sprites: [
          { character: "Chloe", expression: "20", position: "left" },
          { character: "Iris", expression: "21", position: "right" },
        ],
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_13_chloe.mp3",
        text: "Um... is that your friend? She's... she's staring at us.",
        sprites: [
          { character: "Chloe", expression: "22", position: "left" },
          { character: "Iris", expression: "21", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Don't look at her, Chloe. Just keep reading.",
      },
      {
        speaker: "Protagonist",
        text: "Iris walks over to the table directly adjacent to ours. She doesn't pull out a chair. She just stands behind it.\nShe places both hands flat on the wooden surface.\nAnd she watches.",
        isInternal: true,
        bgm: MUSIC.obsession,
        sfx: SFX.footstepsCarpet,
      },
      {
        speaker: "Protagonist",
        text: "She watches my hand as I turn a page. She watches Chloe's hand as it brushes against the edge of my textbook.\nEvery time Chloe speaks, Iris's head tilts slightly, like a machine recording audio.",
        isInternal: true,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_17_chloe.mp3",
        text: "{playerName}... I feel really weird. Why is she doing that? Should we get Mrs. Gable?",
        sprites: [
          { character: "Chloe", expression: "23", position: "left" },
          { character: "Iris", expression: "21", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Iris's eyes flick to Chloe. Just for a fraction of a second. But the sheer malice in that glance is so heavy it makes my breath catch in my throat.\nI remember Leo throwing up in the nurse's office.",
        isInternal: true,
        textVariants: [
          {
            requires: { ateLunch: 1 },
            text: "Iris's eyes flick to Chloe. Just for a fraction of a second. But the sheer malice in that glance is so heavy it makes my breath catch in my throat.\nI remember how she looked yesterday when I ate her food. Victorious. Like I'd signed something.",
          },
        ],
      },
      {
        speaker: "Protagonist",
        text: "No. Don't make a scene. I... I need to go to the bathroom. Just stay here. Don't talk to her.",
      },
      {
        speaker: "Protagonist",
        text: "I rush to the restroom and splash cold water on my face. I'm shaking. I need to tell someone. I need to call the police. But what do I even say? 'A girl is standing near me in the library'? They'd think I was insane.",
        isInternal: true,
        background: BACKGROUNDS.libraryHallway,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "I dry my face and hurry back out. I was gone for less than two minutes.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "When I return to the table, Iris is gone. The adjacent table is empty.\nBut Chloe looks pale. She's hurriedly packing her bag.",
        isInternal: true,
        background: BACKGROUNDS.library,
        sprites: [{ character: "Chloe", expression: "24", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Chloe? What happened? Did she say something to you?",
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_24_chloe.mp3",
        text: "No... she didn't say anything. She just... she walked over to our table while you were gone. She leaned right over my shoulder and smelled your textbook. Then she just... walked out.",
      },
      {
        speaker: "Protagonist",
        text: "My blood runs cold.",
        isInternal: true,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day3_start_26_chloe.mp3",
        text: "I'm sorry, I have to go home. Good luck on the test.",
      },
      {
        speaker: "Protagonist",
        text: "She scurries out of the library like she's being hunted.\nI stand alone at the table. My history textbook is still lying open.\nI reach out to close it.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "There is a piece of paper wedged between the pages.",
        isInternal: true,
        sfx: SFX.paperCrumple,
      },
      {
        speaker: "Protagonist",
        text: "It isn't a sticky note this time. It's a piece of lined notebook paper, violently torn at the edges.\nThe handwriting is pressed so hard into the paper that it tore through in some places.",
        isInternal: true,
        systemGraphic:
          "note:She's touching the books you touched. She's breathing the air you breathe. Stop talking to her. ONLY TALK TO ME.",
      },
      {
        speaker: "Protagonist",
        text: "I crush the note in my fist. The reality of the situation crashes down on me. I can't just ignore her. I can't just pretend this is a normal high school drama.\nAnyone I get close to is in danger.",
        isInternal: true,
        choices: [
          {
            text: "Text Chloe: stay away from me.",
            nextSceneId: "day3_branch_a",
            stateEffects: { lucidity: 10 },
          },
          {
            text: "Text Chloe: it was just a prank.",
            nextSceneId: "day3_branch_b",
            stateEffects: { lucidity: -5, addiction: 5 },
          },
        ],
      },
    ],
  },

  {
    id: "day3_branch_a",
    lines: [
      {
        speaker: "Protagonist",
        text: "I pull out my phone. My hands are shaking so badly I keep hitting the wrong keys.",
        isInternal: true,
        background: BACKGROUNDS.library,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "\"Chloe, I'm sorry. Please don't sit with me anymore. It isn't safe. Stay away from Iris.\"",
        isInternal: true,
        systemGraphic:
          "sms:[Chloe]Chloe, I'm sorry. Please don't sit with me anymore. It isn't safe. Stay away from Iris.",
      },
      {
        speaker: "Protagonist",
        text: "I hit send. I hate doing it. I hate pushing away one of the only normal, kind people I've talked to all week.\nBut if I keep her close, Iris will hurt her. I know she will.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I'm completely isolated now. Just like Iris wants.\nBut at least my eyes are open to the reality of the game we're playing.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day4_start" }],
      },
    ],
  },

  {
    id: "day3_branch_b",
    lines: [
      {
        speaker: "Protagonist",
        text: "I pull out my phone. I can't lose my mind over this. Iris is just trying to scare me. If I let her isolate me, she wins.",
        isInternal: true,
        background: BACKGROUNDS.library,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "\"Chloe, I'm so sorry about my weird friend. It was just a stupid prank. Let's study again tomorrow, okay?\"",
        isInternal: true,
        systemGraphic:
          "sms:[Chloe]Chloe, I'm so sorry about my weird friend. It was just a stupid prank. Let's study again tomorrow, okay?",
      },
      {
        speaker: "Protagonist",
        text: 'I hit send. A minute later, a reply pops up.\n"Okay... if you\'re sure. See you tomorrow."',
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I let out a breath I didn't know I was holding. Everything is fine. It's just high school drama. I can handle Iris. I just need to play it cool.\nI smooth out the crumpled note and throw it in the trash can on my way out of the library.\nOut of sight, out of mind.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day4_start" }],
      },
    ],
  },

  {
    id: "day4_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "Chloe wasn't in class today.",
        isInternal: true,
        background: BACKGROUNDS.schoolHallwayEvening,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.hallwayLockerSteps,
      },
      {
        speaker: "Protagonist",
        text: "The teacher said she called in sick, but I know the truth. I saw the way Iris looked at her. I saw the torn notebook paper.\nI'm completely alone now.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I walk down the hallway toward the shoe lockers. My backpack feels like it weighs a hundred pounds. My eyes burn from lack of sleep. The paranoia is exhausting. Every time I turn a corner, I expect to see her. Every time my phone buzzes, my heart skips a beat.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I freeze. The hallway is empty. The afternoon sun is casting a harsh, orange glare across the linoleum floor.",
        isInternal: true,
        bgm: null,
        sfx: SFX.softGiggle,
      },
      {
        speaker: "Protagonist",
        text: "She doesn't approach me this time. She just waits.\nI have to walk past her to get to the exit. I take a deep breath, trying to force my heart rate down, and start walking.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "25", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Hey, Iris. I need to get home.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_start_07_irisReal.mp3",
        text: "You look so tired, {playerName}. Your eyes are all dark. Have you not been sleeping?",
        sprites: [{ character: "Iris", expression: "26", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "You know I haven't. You've been watching my bedroom window.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I've just been studying a lot. Exams are coming up.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_start_10_irisReal.mp3",
        text: "You work too hard. You carry too much weight. The world asks too much of you... but I don't.",
        sprites: [{ character: "Iris", expression: "27", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Her voice is incredibly soft. It's almost hypnotic. For a split second, my exhausted brain desperately wants to lean into her touch. To just stop fighting and let someone else take care of things.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_start_12_irisReal.mp3",
        text: "I made something special at my house today. Just for us. It's quiet there. No tests, no loud people, no Chloe... just peace.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_start_13_irisReal.mp3",
        text: "Will you come over? Please? I don't want to be alone today. And I know you don't either.",
        sprites: [{ character: "Iris", expression: "28", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "This is it. The invitation.\nI know what she is. I saw the SD card.\nBut I am so, so tired.\nWhat if I just... gave in? What if I let her love me?",
        isInternal: true,
        choices: [
          {
            text: '"Okay. I\'ll come over."',
            nextSceneId: "day4_branch_a",
            stateEffects: { irisAffection: 50, addiction: 50, lucidity: -50 },
          },
          {
            text: '"I can\'t. I have to go."',
            nextSceneId: "day4_branch_b",
            stateEffects: { lucidity: 15 },
          },
        ],
      },
    ],
  },

  {
    id: "day4_branch_a",
    lines: [
      {
        speaker: "Protagonist",
        text: "...Okay. I'll come over.",
        background: BACKGROUNDS.schoolHallwayEvening,
        bgm: MUSIC.finalSaveState,
        sprites: [{ character: "Iris", expression: "29", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_02_irisReal.mp3",
        text: "I knew it. I knew you were the one.",
      },
      {
        speaker: "Protagonist",
        text: "We walk to her house in silence. She holds my hand the entire way. Her grip is like a vice.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "Her house is dark. The curtains are all drawn shut.",
        isInternal: true,
        background: BACKGROUNDS.irisRoom,
      },
      {
        speaker: "Protagonist",
        text: "She sits me down on the edge of her bed and hands me a cup of tea. It smells heavily of chamomile. And something else. Something sweet and chemical.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "31", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I look at her smiling face.",
        isInternal: true,
        choices: [
          {
            text: "Take a sip.",
            nextSceneId: "day4_glass_coffin",
            stateEffects: { irisAffection: 10 },
          },
          {
            text: "Set the cup down.",
            nextSceneId: "day4_branch_a_escape",
            stateEffects: { lucidity: 20 },
          },
        ],
      },
    ],
  },

  {
    id: "day4_glass_coffin",
    lines: [
      {
        speaker: "Protagonist",
        text: "I take a sip.",
        isInternal: true,
        background: BACKGROUNDS.irisRoom,
        bgm: MUSIC.finalSaveState,
      },
      {
        speaker: "Protagonist",
        text: "Why is everything so dark...",
        sfx: SFX.teacupDrop,
        background: BACKGROUNDS.fadeToBlack,
      },
      {
        speaker: "Protagonist",
        text: "When I wake up, the room is completely dark, save for the glow of a large television screen.",
        isInternal: true,
        background: BACKGROUNDS.sedatedBlackout,
      },
      {
        speaker: "Protagonist",
        text: "I try to sit up, but my body feels impossibly heavy.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I try to move my legs.\nA sharp, blinding agony rips through my ankles. I gasp, falling back onto the pillows.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_08_irisReal.mp3",
        text: "Shhh, don't move too fast, honey. The stitches are still fresh.",
        sprites: [{ character: "Iris", expression: "30", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "My... my legs. What did you do to my legs?",
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_10_irisReal.mp3",
        text: "I just made sure you'll never have to walk away from me. You'll never have to go to that awful school again. You're safe now. You're my prince... and I'm going to take such good care of you.",
      },
      {
        speaker: "Protagonist",
        text: "I don't scream. I don't even cry.\nI just look at the television screen.\nI wanted peace. And now, I have it. Forever.",
        isInternal: true,
      },
      {
        speaker: "System",
        text: "ENDING 4 — THE GLASS COFFIN",
      },
    ],
  },

  {
    id: "day4_branch_a_escape",
    lines: [
      {
        speaker: "Protagonist",
        text: "I set the cup down quietly on the nightstand. The smell doesn't leave my nose.",
        isInternal: true,
        background: BACKGROUNDS.irisRoom,
        bgm: MUSIC.finalSaveState,
        sprites: [{ character: "Iris", expression: "32", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_escape_02_irisReal.mp3",
        text: "Not thirsty?",
        sprites: [{ character: "Iris", expression: "32", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I just... I don't feel well. I need some air.",
      },
      {
        speaker: "Protagonist",
        text: "She stands up slowly. She doesn't go toward the window. She goes toward the door.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_escape_05_irisReal.mp3",
        text: "You can stay as long as you need. I'll get you some water.",
      },
      {
        speaker: "Protagonist",
        text: "She is between me and the door. She is not going to get me water.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_escape_07_irisReal.mp3",
        text: "You smelled it, didn't you.",
        sprites: [{ character: "Iris", expression: "33", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Iris—",
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_a_escape_09_irisReal.mp3",
        text: "It would have been so peaceful. You would have felt nothing. You would have just... stayed.",
      },
      {
        speaker: "Protagonist",
        text: "A pipe knocks somewhere deep in the house. Iris's eyes flick toward the ceiling for just one second.",
        isInternal: true,
        sfx: SFX.muffledBang,
        sfxVolume: 4,
      },
      {
        speaker: "Protagonist",
        text: "I run.",
        isInternal: true,
        sfx: SFX.doorBurstRun,
        background: BACKGROUNDS.darkStreet,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "Down her hall, through her front door, down her street. I don't stop until my lungs are burning and her house is three blocks behind me.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I lock every door and window in my house that night. I put a chair under my bedroom doorknob.",
        isInternal: true,
        background: BACKGROUNDS.bedroomNight,
      },
      {
        speaker: "Protagonist",
        text: "She said it would have been peaceful. She said it like she was doing me a favour.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day5_start" }],
      },
    ],
  },

  {
    id: "day4_branch_b",
    lines: [
      {
        speaker: "Protagonist",
        text: "I can't, Iris. I have to go home. My parents are expecting me for dinner.",
        background: BACKGROUNDS.schoolHallwayEvening,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "32", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "It's a lie, and I'm pretty sure she knows it's a lie. She probably read the text from my mom saying she was working late again.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_b_03_irisReal.mp3",
        text: "...Your parents.",
      },
      {
        speaker: "Protagonist",
        text: "Yeah. Sorry. Maybe some other time.",
      },
      {
        speaker: "Protagonist",
        text: "I step around her. My muscles are coiled tight, expecting her to grab my arm, to shout, to do something.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "33", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_b_06_irisReal.mp3",
        text: "That's okay, {playerName}. I understand. You have... attachments in this world. It's hard to let go.",
      },
      {
        speaker: "Protagonist",
        text: "I don't look back. I practically run out the west exit.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day4_branch_b_08_irisReal.mp3",
        text: "But don't worry. I can fix that for you. I'll fix everything.",
      },
      {
        speaker: "Protagonist",
        text: "I lock every door and window in my house that night. I put a chair under my bedroom doorknob.",
        isInternal: true,
        background: BACKGROUNDS.bedroomNight,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "While checking my desk for anything heavy enough to use as a weapon, I find my mother's old silver locket wedged behind a drawer.",
        isInternal: true,
        sprites: [
          { character: "Item", expression: "101", position: "center-small" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "She gave it to me years ago, before phones tracked every second of my life. I never photographed it. Never texted about it. It belongs to a part of me Iris couldn't scrape off a screen.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I turn the locket over in my palm. The metal is cold. Solid. Real. It feels like a fragment of myself Iris couldn't fake even if she tore apart every device I own.",
        isInternal: true,
        choices: [
          {
            text: "Pocket the silver locket.",
            nextSceneId: "day4_locket_a",
            stateEffects: { silverLocket: 1 },
          },
          {
            text: "Leave it hidden in the drawer.",
            nextSceneId: "day4_locket_b",
          },
        ],
      },
    ],
  },

  {
    id: "day4_locket_a",
    lines: [
      {
        speaker: "Protagonist",
        text: "I close my fist around it and slip it into the inner pocket of my jacket.\nIt presses against my chest. Cold at first. Then warm.",
        isInternal: true,
        background: BACKGROUNDS.bedroomNight,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "If she finds everything else, she won't find this.\nThis one thing is mine.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I sit with my back against the bed frame until the room stops feeling like a crime scene.\nSomewhere around midnight I stop jumping at sounds.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "I don't take my jacket off.\nI pull my knees up and let my eyes close.\nJust for a minute.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I don't mean to sleep.\nBut I do.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        choices: [{ text: "Continue...", nextSceneId: "day5_start" }],
      },
    ],
  },

  {
    id: "day4_locket_b",
    lines: [
      {
        speaker: "Protagonist",
        text: "I set it back where I found it, wedged between the drawer and the frame.\nNo charger cable. No cloud backup. Nothing she can ping.\nJust metal and hinges and privacy.",
        isInternal: true,
        sprites: [],
        background: BACKGROUNDS.bedroomNight,
      },
      {
        speaker: "Protagonist",
        text: "Maybe hidden is exactly where it should be.\nSome things survive by staying invisible.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I sit with my back against the bed frame until the room stops feeling like a crime scene.\nSomewhere around midnight I stop jumping at sounds.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "I don't mean to sleep.\nBut I do.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        choices: [{ text: "Continue...", nextSceneId: "day5_start" }],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // DAY 5: THE "ACCIDENT"
  // ═══════════════════════════════════════════
  {
    id: "day5_start",
    lines: [
      {
        speaker: "Protagonist",
        text: "I survived the night.\nI didn't sleep a wink. I just sat in the corner of my room with a baseball bat, listening to the wind rattle the windowpanes. But the sun came up, and she didn't break in.",
        isInternal: true,
        background: BACKGROUNDS.bedroomMorning,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.airConditioner,
      },
      {
        speaker: "Protagonist",
        text: "By first period, I know I can't keep carrying this alone. If I don't tell someone now, Iris is going to decide the shape of the story for me.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I catch Leo before homeroom and drag him into the empty library hallway before he can crack a joke.",
        isInternal: true,
        background: BACKGROUNDS.libraryHallway,
        sfx: SFX.hesitantFootsteps,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_04_leo.mp3",
        text: "Dude, what the hell? You look awful. Did somebody die?",
        sprites: [{ character: "Leo", expression: "11", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Not yet. But I think somebody will if I keep pretending this is just some clingy girl with bad boundaries.",
      },
      {
        speaker: "Protagonist",
        isInternal: true,

        text: "I start telling him everything about Iris.",
      },
      {
        speaker: "Protagonist",
        text: "I show him the SD card. The tracking logs. The audio clips she spliced together. I tell him about the lunchbox, the note in my textbook, the invitation to her house. I talk too fast and in the wrong order, but once I start, I can't stop.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_07_leo.mp3",
        text: "...Okay. That is not normal. That's not even movie-stalker normal. That's call-the-cops-and-burn-your-phone normal.",
        sprites: [{ character: "Leo", expression: "15", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Thank you. I was starting to think I was losing my mind.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_09_leo.mp3",
        text: "No, man. If even half of this is real, she's dangerous. Let me check something after fifth period. If she's this organized, she's keeping the worst part somewhere you can't screenshot.",
      },
      {
        speaker: "Protagonist",
        text: "I tell him not to go alone. He tells me to stop acting like I have veto power after dumping a horror file archive in his lap. We agree to meet after practice and go straight to the police together.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I make it through the rest of the day by avoiding the hallways and hiding in the boys' bathroom during lunch.\nNow school is over, and I'm standing at the edge of the football field waiting for Leo to finish practice. We're going to the police. I have the SD card in my pocket. I don't care if they think I'm crazy. I can't live like this anymore.",
        isInternal: true,
        background: BACKGROUNDS.footballField,
        sprites: [],
        sfx: SFX.footballAmbience,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_12_leo.mp3",
        text: "{playerName}! Hey! Man, I'm so glad you're still here.",
        sprites: [{ character: "Leo", expression: "34", position: "center" }],
        sfx: SFX.footstepsGravel,
      },
      {
        speaker: "Protagonist",
        text: "Leo? What's wrong? You look like you just saw a ghost.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_14_leo.mp3",
        text: "Worse. Man, it's so much worse than we thought.",
        sprites: [{ character: "Leo", expression: "35", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "What did you do? Did you talk to her?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_16_leo.mp3",
        text: "No. I skipped fifth period. I... I broke into her backyard. Her parents are never home, right? I looked through the basement window.",
      },
      {
        speaker: "Protagonist",
        text: "My stomach drops into my shoes.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_18_leo.mp3",
        text: "She has a shrine, man. It's not just photos. She has... pieces of your hair. Clothes you threw away.",
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_19_leo.mp3",
        text: "We have to go to the cops right now. My car is in the lot. Come on.",
      },
      {
        speaker: "Protagonist",
        text: "Okay. Okay, let's go. We have the SD card, we have your testimony—",
      },
      {
        speaker: "Protagonist",
        text: "I turn to follow him toward the parking lot.\nAs I sweep my gaze across the bleachers, my breath catches in my throat.",
        isInternal: true,
        sprites: [
          { character: "Leo", expression: "35", position: "left" },
          { character: "Iris", expression: "36", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Look.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_23_leo.mp3",
        text: "Don't look at her. Just walk. Keep walking!",
        sprites: [
          { character: "Leo", expression: "37", position: "left" },
          { character: "Iris", expression: "36", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Iris lowers her hand. She doesn't run toward us. She just mimics the motion of kicking something.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I hear the sound before I see it.\nA stray football from the practice field. It's moving at a speed that defies physics. It isn't an arc. It's a straight, lethal line.\nDirectly at my head.",
        isInternal: true,
        sfx: SFX.footballThwack,
      },
      {
        speaker: "Leo",
        voice: "/voice/day5_start_26_leo.mp3",
        text: "WATCH OU—!",
      },
      {
        speaker: "Protagonist",
        text: "Pain explodes behind my eyes.",
        isInternal: true,
        bgm: null,
        sfx: SFX.crunchSickening,
        screenEffect: "pain",
      },
      {
        speaker: "Protagonist",
        text: "The field flips sideways. Someone is screaming my name from very far away. I can't tell if it's Leo or me.",
        isInternal: true,
        sprites: [],
        screenEffect: "tilt",
      },
      {
        speaker: "Protagonist",
        text: "Then everything goes black.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        choices: [{ text: "Continue...", nextSceneId: "day6_start" }],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // DAY 6: THE "PERFECT" RESET
  // ═══════════════════════════════════════════
  {
    id: "day6_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "My eyes snap open to a dim ceiling and a pounding headache.",
        isInternal: true,
        background: BACKGROUNDS.bedroomVR,
        bgm: MUSIC.graySuburbia,
      },
      {
        speaker: "Protagonist",
        text: "The football field comes back in broken flashes. Leo shouting. A whistle. Iris on the bleachers. Then it all slides away again.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "According to the messages on my phone, I got drilled by a stray ball, blacked out, and Leo helped me home. He told me to stay in bed today. I don't listen.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "By the time I make it to class, my head still feels packed with cotton. I keep expecting the missing pieces to snap back into place. They never do.",
        isInternal: true,
        background: BACKGROUNDS.classroomMorningVR,
        sfx: SFX.schoolBellCheerful,
      },
      {
        speaker: "Leo",
        voice: "/voice/day6_start_05_leo.mp3",
        text: "Morning, sleeping beauty! You were totally out of it. Dreaming about your future wife again?",
        sprites: [{ character: "Leo", expression: "39", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Leo! The cops, we were supposed to go to—wait. What?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day6_start_07_leo.mp3",
        text: "Cops? What are you talking about, man? Did you play too many video games last night? Come on, you need to wake up. The girls are coming over!",
        sprites: [{ character: "Leo", expression: "40", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The girls? What girls?\nBefore I can ask, the classroom door slides open.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Maya and Chloe.\nI've never seen them hang out before, let alone arrive together.",
        isInternal: true,
        sprites: [{ character: "Maya", expression: "41", position: "center" }],
      },
      {
        speaker: "Maya",
        voice: "/voice/day6_start_10_maya.mp3",
        text: "Hey, {playerName}! Chloe and I brought some extra snacks. You want some?",
      },
      {
        speaker: "Chloe",
        voice: "/voice/day6_start_11_chloe.mp3",
        text: "We made them together this morning! I hope you like them...",
      },
      {
        speaker: "Protagonist",
        text: "They walk over to my desk. They are both looking at me with wide, adoring eyes. It feels incredibly forced. Like everyone's trying too hard to sell me on a good mood.\nAnd then, she walks in.",
        isInternal: true,
        bgm: MUSIC.finalSaveState,
      },
      {
        speaker: "Protagonist",
        text: "Iris.\nMy heart stutters. A spike of pure, raw panic tries to pierce through the mental fog, but it dulls almost immediately, like my body is too tired to keep up.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "42", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_start_14_irisVr.mp3",
        text: "Good morning, {playerName}.",
      },
      {
        speaker: "Protagonist",
        text: "Her voice is like honey. There is no trace of the obsessive stalker from the library. No manic edge. Just warmth so polished it makes my skin crawl.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Iris...?",
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_start_17_irisVr.mp3",
        text: "I'm so glad you're here. The world is just so beautiful today, isn't it? I feel like... like today is the start of something wonderful. Just for us.",
        sprites: [{ character: "Iris", expression: "43", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Maya, Chloe, and Leo all step back slightly, giving Iris the center stage. They don't seem bothered by her intense focus on me. In fact, they look weirdly pleased about it.\nLike they all agreed on something without telling me.",
        isInternal: true,
        sfx: SFX.serverHum,
      },
      {
        speaker: "Protagonist",
        text: "I look past Iris. Out the window, students are crossing the courtyard in neat little groups. Too neat. Too even.",
        isInternal: true,
      },
      {
        speaker: "Random Student",
        voice: "/voice/day6_start_20_randomStudent.mp3",
        text: "The weather is nice today, isn't it?",
      },
      {
        speaker: "Everyone",
        voice: "/voice/day6_start_21_crowd.mp3",
        text: "The weather is nice today, isn't it?",
      },
      {
        speaker: "Protagonist",
        text: "The timing is so perfect it sends a chill through me. Maybe it's nothing. Maybe my head just still isn't right. Either way, the room suddenly feels airless.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "45", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_start_23_irisVr.mp3",
        text: "Don't pay attention to them, {playerName}. Pay attention to me. What should we do today? We can do anything you want!",
      },
      {
        speaker: "Protagonist",
        text: "Something about this day is wrong. I need to decide whether to smile and nod... or start pushing at the cracks.",
        isInternal: true,
        choices: [
          {
            text: '"Yeah... the weather is nice. Let\'s hang out."',
            nextSceneId: "day6_branch_a",
            stateEffects: { addiction: 15, lucidity: -10 },
          },
          {
            text: '"Leo, why did you say that at the exact same time as them?"',
            nextSceneId: "day6_branch_b",
            stateEffects: { lucidity: 15, addiction: -5 },
          },
        ],
      },
    ],
  },

  {
    id: "day6_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "...Yeah. The weather is nice. Let's just hang out.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.graySuburbia,
        sprites: [{ character: "Iris", expression: "46", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_branch_a_02_irisVr.mp3",
        text: "I knew you'd say that! Let's go to the roof. Maya and Chloe can come too, right girls?",
      },
      {
        speaker: "Maya & Chloe",
        voice: "/voice/day6_branch_a_03_mayaChloe.mp3",
        text: "Of course! We love hanging out with you!",
      },
      {
        speaker: "Protagonist",
        text: "The panic dulls. The headache goes soft around the edges. Everybody's smiling. Everybody wants something simple from me.\nFor one weak second, I understand the temptation of pretending this is normal.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day7_start" }],
      },
    ],
  },

  {
    id: "day6_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo... Maya... why did you all just say the exact same thing at the exact same time?",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: null,
        sprites: [{ character: "Iris", expression: "47", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_branch_b_02_irisVr.mp3",
        text: "They're just... they're just agreeing with each other! Great minds think alike, right?",
      },
      {
        speaker: "Protagonist",
        text: "No, that wasn't agreement. That was rehearsal. Leo, look at me.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day6_branch_b_04_leo.mp3",
        text: "The weather is nice today, isn't it?",
        sprites: [
          { character: "Leo", expression: "48", position: "left" },
          { character: "Iris", expression: "47", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "I stumble backward, hitting my desk. My heart rate spikes.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_branch_b_06_irisVr.mp3",
        text: "Don't look at him! Look at me! I worked so hard on this for you! You said you wanted peace! This is peace!",
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "49", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Her voice echoes inside my skull. I nod slowly, less because I believe her than because I suddenly don't trust what happens if I don't.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Okay. Okay, Iris. Just... give me some space.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day6_branch_b_09_irisVr.mp3",
        sprites: [{ character: "Iris", expression: "46", position: "center" }],
        text: "Of course! Anything for you. Let's just have a good day, okay?",
      },
      {
        speaker: "Protagonist",
        text: "She steps back, the perfect smile returning as if nothing happened.\nI don't know what just happened. I only know I can't afford to stop paying attention.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day7_start" }],
      },
    ],
  },

  {
    id: "day7_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Summer vacation. I don't remember the semester ending. I don't remember taking my exams. But when I woke up this morning, Leo texted me saying we were all going to the beach.",
        isInternal: true,
        background: BACKGROUNDS.whiteVoid,
        bgm: MUSIC.infiniteSummer,
        sfx: SFX.seagullLoop,
      },

      {
        speaker: "Protagonist",
        text: "I'm standing on the sand. It doesn't yield beneath my sandals. It feels like walking on a textured plastic floor.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I look out at the ocean. The waves roll in, crash, and pull back. Over and over.\nIt's too regular to be natural.",
        isInternal: true,
        sfx: SFX.wavesLoop,
      },
      {
        speaker: "Protagonist",
        text: "I walk down to the shoreline. I want to feel the water. I want to feel something cold and real.\nI step forward, bracing for the chill of the ocean.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "My foot doesn't sink.\nI'm standing on top of the water. It's completely solid. Like a sheet of painted glass.",
        isInternal: true,
        sfx: SFX.footThud,
      },
      {
        speaker: "Protagonist",
        text: 'I quickly step backward onto the "sand" before she gets too close.',
        isInternal: true,
        sprites: [{ character: "Iris", expression: "50", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_start_07_irisVr.mp3",
        text: "{playerName}! The water looks so beautiful today, doesn't it?",
      },
      {
        speaker: "Protagonist",
        text: "I stare at her. Her swimsuit... it's exactly the style I told Leo I liked weeks ago. Down to the specific color.\nIt feels less like my dream and more like someone else's fantasy that I'm being dragged through.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Yeah. It's... it's very still.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_start_10_irisVr.mp3",
        text: "You're so serious! You need to relax. We're supposed to be having fun! Oh, actually...",
        sprites: [{ character: "Iris", expression: "51", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_start_11_irisVr.mp3",
        text: "I can't quite reach my back. Would you mind helping me? I don't want to get a sunburn.",
        sprites: [{ character: "Iris", expression: "52", position: "center" }],
        sfx: SFX.plasticBottle,
      },
      {
        speaker: "Protagonist",
        text: "A sunburn. In a dream.\nBut she's looking at me with those huge, expectant eyes. Even asleep, I don't trust what happens when I disappoint her.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Sure. Turn around.",
      },
      {
        speaker: "Protagonist",
        text: "She turns her back to me, sweeping her hair over her shoulder.\nI pour a drop of the sunscreen into my palm. It smells like coconut, but underneath that, there's a sharp, ozone smell. Like an overheating computer tower.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "56", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I raise my hand to her back.\nAs I get closer, there is something just below her left shoulder blade. At first it looks like a shadow. Then the edges sharpen.",
        isInternal: true,
        choices: [
          {
            text: "Look closely at the mark on her back.",
            nextSceneId: "day7_branch_a",
            stateEffects: { lucidity: 15, addiction: -10 },
          },
          {
            text: "Ignore it and just apply the sunscreen.",
            nextSceneId: "day7_branch_b",
            stateEffects: { addiction: 10, lucidity: -5 },
          },
        ],
      },
    ],
  },

  {
    id: "day7_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "I lean in, squinting against the bright light.\nIt isn't a shadow. It isn't a birthmark.\nFor a split second, I swear I see a line of tiny black letters just under her skin before the glare wipes them out.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "56", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Maybe it's just dream garbage. Maybe it's a tattoo. Either way, the sight makes my stomach turn.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_branch_a_03_irisVr.mp3",
        text: "What are you looking at?!",
        sprites: [{ character: "Iris", expression: "53", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Nothing! I was just... checking for sand.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_branch_a_05_irisVr.mp3",
        text: "Just put the lotion on, {playerName}. Please. Don't look too hard at things. It ruins the magic.",
        sprites: [{ character: "Iris", expression: "54", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I silently apply the sunscreen. My hands are shaking.\nThose half-seen letters stay burned into my mind even after I wake. I tell myself it was just the dream distorting things. I don't believe it.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day8_start" }],
      },
    ],
  },

  {
    id: "day7_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "I shake my head and look away.\nIt doesn't matter what the shadow is. A trick of the light. Dream nonsense. Whatever.\nI place my hands on her back and gently rub the sunscreen in.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "56", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_branch_b_02_irisVr.mp3",
        text: "Mmm... thank you. Your hands are so warm.",
      },
      {
        speaker: "Protagonist",
        text: "She feels real. Her skin is warm. The fake coconut smell fills my lungs, and the looping sound of the waves suddenly feels hypnotic rather than terrifying.\nI close my eyes for a second.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "If I stop questioning it, the fear thins out. Not disappears. Just... quiets.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day7_branch_b_05_irisVr.mp3",
        text: "I'm so glad we're together, {playerName}. I promise... every day will be exactly like this. Forever.",
        sprites: [{ character: "Iris", expression: "55", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I smile back.\nDeep down, a tiny voice is screaming. But the sun is so bright, and the screaming is so quiet.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day8_start" }],
      },
    ],
  },

  {
    id: "day8_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "I wake up with the beach still clinging to me like fever sweat.\nI tell myself it was just a nightmare. By afternoon, I don't know whether I'm awake or just better at pretending.",
        isInternal: true,
        background: BACKGROUNDS.gymnasium,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.gymShoeSqueak,
      },
      {
        speaker: "Protagonist",
        text: "I'm sitting on the bleachers in the gym. Maya asked me to come watch her practice.\nI only agreed because I needed to be away from Iris for a while. I needed to be around someone who still felt uncomplicated.",
        isInternal: true,
      },
      {
        speaker: "Maya",
        voice: "/voice/day8_start_03_maya.mp3",
        text: "Thanks for coming, {playerName}! Having you here really pumps me up! I'm going to beat my personal record today, just watch!",
        sprites: [{ character: "Maya", expression: "57", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Sure, Maya. I'm watching.",
      },
      {
        speaker: "Protagonist",
        text: "She lines up at the starting blocks painted onto the gym floor. She gets into position, tense and ready.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "She takes off. She crosses the half-court line.\nAnd then, she trips.",
        isInternal: true,
        sfx: SFX.whistleSharp,
      },
      {
        speaker: "Protagonist",
        text: "She doesn't just trip.\nHer right foot strikes the floor, but instead of bouncing off the polished wood, it sinks straight through it. Up to her knee.",
        isInternal: true,
        sfx: SFX.digitalTearing,
        sfxVolume: 0.6,
        sprites: [{ character: "Maya", expression: "58", position: "center" }],
      },
      {
        speaker: "Maya",
        voice: "/voice/day8_start_08_maya.mp3",
        text: "Ow! What—? {playerName}, the floor... it gave way!",
      },
      {
        speaker: "Protagonist",
        text: "I sprint down the bleachers toward her.\nThe floor isn't broken. There's no hole. Her leg is just... gone halfway through the wood, as if reality forgot how floors are supposed to work.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Maya! Give me your hand!",
      },
      {
        speaker: "Protagonist",
        text: "I reach out and grab her arm. I pull with all my strength.\nBut she doesn't budge. It's like the world itself has decided not to let her go.",
        isInternal: true,
        sfx: SFX.buzzingStatic,
        sfxVolume: 0.6,
      },
      {
        speaker: "Maya",
        voice: "/voice/day8_start_12_maya.mp3",
        text: "{playerName}! Help! I can't feel my... legs... I can't feel my... ",
        sprites: [{ character: "Maya", expression: "59", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Hold on! Just hold on!",
      },
      {
        speaker: "Protagonist",
        text: "Her left arm, the one I'm not holding, suddenly turns completely grey. She screams, but the sound comes out as a wash of static.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I look up.\nIris is standing in the doorway.",
        isInternal: true,
        bgm: null,
        sfx: SFX.gymDoors,
        sprites: [
          { character: "Maya", expression: "59", position: "left" },
          { character: "Iris", expression: "60", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "She doesn't run. She walks slowly across the gym floor, her footsteps echoing in the massive room. She stops a few feet away from us, looking down at Maya, who is now half-sunk into the floor.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_start_17_irisVr.mp3",
        text: "I knew this would happen eventually. She was always so loud. So restless. So hard to keep in one place.",
      },
      {
        speaker: "Protagonist",
        text: "Iris! Fix her! What's happening?!",
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_start_19_irisVr.mp3",
        text: "She's a distraction, {playerName}. She's ruining it.",
        sprites: [
          { character: "Maya", expression: "59", position: "left" },
          { character: "Iris", expression: "61", position: "right" },
        ],
      },
      {
        speaker: "Maya",
        voice: "/voice/day8_start_20_maya.mp3",
        text: "P-P-Please... I don't want to...",
        sfx: SFX.digitalPing,
        sprites: [{ character: "Maya", expression: "62", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The hand I am holding turns to static, then to dust. It slips right through my fingers.\nIn a matter of seconds, there is nothing left of Maya. Not even a shadow on the floor.\nThe gym is completely silent.",
        isInternal: true,
        bgm: MUSIC.obsession,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "I fall to my knees on the hardwood floor, staring at my empty hands.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_start_23_irisVr.mp3",
        text: "She was too loud anyway. Always running around, always sweating. You like the quiet, don't you?",
        sprites: [{ character: "Iris", expression: "63", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_start_24_irisVr.mp3",
        text: "Look at you. You're shaking. This is what happens when other people fill your head with noise. Now it's just us and the books. And Chloe, for a little while longer.",
      },
      {
        speaker: "Protagonist",
        text: "I don't know if Maya was real, if any of this is real, or if my head is just breaking open around her. All I know is that Chloe is next if I do nothing.",
        isInternal: true,
        choices: [
          {
            text: '"You\'re a monster! Stay away from me!"',
            nextSceneId: "day8_branch_a",
            stateEffects: { lucidity: 20, irisAffection: -20 },
          },
          {
            text: "Remain completely silent.",
            nextSceneId: "day8_branch_b",
            stateEffects: { addiction: 15, lucidity: -10 },
          },
        ],
      },
    ],
  },

  {
    id: "day8_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "You're a monster! Stay away from me!",
        background: BACKGROUNDS.gymnasium,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "63", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I violently shove her hand off my shoulder and scramble backward.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "64", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_branch_a_03_irisVr.mp3",
        text: "A monster? I'm the only thing holding you together right now! After everything you've seen, you still think anyone else understands you?",
      },
      {
        speaker: "Protagonist",
        text: "The threat hangs in the air, heavy and absolute.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_branch_a_05_irisVr.mp3",
        text: "I am trying to make this better. Do not make me sand down every sharp edge of you myself, {playerName}. Now go to your room.",
      },
      {
        speaker: "Protagonist",
        text: "I don't argue. I get up and run.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day9_start" }],
      },
    ],
  },

  {
    id: "day8_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "I don't speak. I don't move.\nMy throat is tight with a terror so absolute it paralyzes my vocal cords.",
        isInternal: true,
        background: BACKGROUNDS.gymnasium,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "65", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_branch_b_02_irisVr.mp3",
        text: "Shhh. It's okay. You're in shock. Change is hard, I know.",
      },
      {
        speaker: "Protagonist",
        text: "She strokes my hair. I let her. I'm trembling uncontrollably, but I don't push her away.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day8_branch_b_04_irisVr.mp3",
        text: "You're being so good. I promise, when everything is quiet again, this will all feel far away.",
      },
      {
        speaker: "Protagonist",
        text: "I close my eyes. I try to hold onto the memory of Maya running. But it keeps slipping out of reach.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day9_start" }],
      },
    ],
  },

  {
    id: "day9_start",
    vrMode: true,
    lines: [
      // ── Classroom morning opening ──
      {
        speaker: "Protagonist",
        text: "I didn't sleep. I just sat on the edge of my bed, waiting for the floor to open up and swallow me.",
        isInternal: true,
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.infiniteSummer,
        sfx: SFX.schoolBellGlitch,
      },
      {
        speaker: "Protagonist",
        text: "But morning came anyway. I got ready for school. I put on my uniform. I walked to the bus stop. I got on the bus. I rode to school.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I arrived early. I'm sitting at my desk. I look at the spot where Maya used to sit.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "The desk is gone. It didn't just disappear — the floorboards underneath it are perfectly fused together, as if a desk had never been there in the history of the school.",
        isInternal: true,
      },
      // ── Leo calls ──
      {
        speaker: "Protagonist",
        text: "Then my phone vibrates. Leo.",
        isInternal: true,
        sfx: SFX.phoneBuzz,
      },
      {
        speaker: "System",
        text: "",
        systemGraphic: "call:Leo\nAnswer?",
      },
      {
        speaker: "Protagonist",
        text: "Hello?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day9_start_09_leo.mp3",
        text: "I woke up with a pounding headache and haven't seen you since. Don't hang up. Don't say my name out loud. If you can hear me, go somewhere she can't hear you breathe.",
        sfx: SFX.staticBreathing,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "Leo? Where have you been? Everyone keeps acting like nothing happened! Maya is gone!",
      },
      {
        speaker: "Leo",
        voice: "/voice/day9_start_08_leo.mp3",
        text: "I know. I know. Listen to me. I found the basement again. I got video this time. Whatever she's hiding under her house, it got worse after the hit at the field.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day9_start_10_leo.mp3",
        text: "She's trying to make everything around you feel safe. Predictable. Like if she can keep you calm long enough, you'll stop asking questions. Don't let her decide what is real.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day9_start_12_leo.mp3",
        text: "If she finds out I'm talking to you, she'll cut the line. After school, come to the old student council room. Top floor. West wing. I'll explain everything.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_start_14_irisVr.mp3",
        text: "{playerName}? Who are you talking to?",
        sprites: [{ character: "Iris", expression: "65", position: "center" }],
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "The call distorts into a screech and drops.",
        isInternal: true,
        sfx: SFX.staticBurst,
        sfxVolume: 0.6,
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_start_15_irisVr.mp3",
        text: "You look frightened again. I told you, those feelings only make things uglier.",
        sprites: [{ character: "Iris", expression: "71", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She's watching me carefully. I decide on the spot.",
        isInternal: true,
        choices: [
          {
            text: '"Nobody. I\'m just tired."',
            nextSceneId: "day9_phone_a",
            stateEffects: { addiction: 10, irisAffection: 5, lucidity: -5 },
          },
          {
            text: '"Leo called me. He remembers the field."',
            nextSceneId: "day9_phone_b",
            stateEffects: { lucidity: 15, irisAffection: -10 },
          },
        ],
      },
    ],
  },

  {
    id: "day9_phone_a",
    vrMode: true,
    nextSceneId: "day9_class",
    lines: [
      {
        speaker: "Protagonist",
        text: "Nobody. I'm just tired.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "71", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_phone_a_02_irisVr.mp3",
        text: "Then stop exhausting yourself. Stop digging. Let me hold the heavy things for you.",
        sprites: [{ character: "Iris", expression: "70", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She leans down and kisses my forehead. The lights stop flickering for a moment. For one nauseating second, relief nearly wins.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "But Leo's voice is still trapped behind my eyes: Don't let her decide what is real.",
        isInternal: true,
      },
    ],
  },

  {
    id: "day9_phone_b",
    vrMode: true,
    nextSceneId: "day9_class",
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo called me. He remembers the field incident. He remembers what you did.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "72", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_phone_b_02_irisVr.mp3",
        text: "He remembers noise. Pain. He remembers ruining things. That's all Leo ever does.",
      },
      {
        speaker: "Protagonist",
        text: "The room shudders. A row of desks slides an inch to the left, then snaps back.",
        isInternal: true,
        sfx: SFX.digitalTearing,
        sfxVolume: 0.6,
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_phone_b_04_irisVr.mp3",
        text: "Please don't make me compete with him again, {playerName}. I am so tired of cleaning up after boys who don't understand you.",
        sprites: [{ character: "Iris", expression: "73", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She says it softly, but it lands like a threat.",
        isInternal: true,
      },
    ],
  },

  {
    id: "day9_class",
    vrMode: true,
    lines: [
      // ── Teacher roll call ──
      {
        speaker: "Teacher",
        voice: "/voice/day9_start_17_teacher.mp3",
        text: "Good morning, class. Let us begin roll call. Akira... Present. Chloe... Present.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.infiniteSummer,
        sprites: [
          { character: "Teacher", expression: "66", position: "center" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Chloe is sitting across the room — absolutely terrified, trembling and clutching her notebook.",
        isInternal: true,
        sprites: [
          { character: "Teacher", expression: "66", position: "right" },
          { character: "Chloe", expression: "67", position: "left" },
        ],
      },
      {
        speaker: "Teacher",
        voice: "/voice/day9_start_19_teacher.mp3",
        sprites: [
          { character: "Teacher", expression: "66", position: "center" },
        ],
        text: "Maya... Maya...",
      },
      {
        speaker: "Protagonist",
        text: "The Teacher NPC freezes. His mouth stays open. The AI script is looking for a character asset that Iris permanently deleted.",
        isInternal: true,
      },
      {
        speaker: "Teacher",
        voice: "/voice/day9_start_21_teacher.mp3",
        text: "Ma-Ma-Ma-Maya...",
        sfx: SFX.errorTone,
        sfxVolume: 0.7,
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_start_23_irisVr.mp3",
        text: "She transferred! Maya transferred schools yesterday! Right, class?",
        sprites: [{ character: "Iris", expression: "68", position: "center" }],
      },
      {
        speaker: "Students",
        voice: "/voice/day9_start_24_students.mp3",
        text: "Maya transferred schools yesterday. We wish her the best.",
        sprites: [
          { character: "Students", expression: "69", position: "center" },
        ],
      },
      {
        speaker: "Teacher",
        voice: "/voice/day9_start_25_teacher.mp3",
        text: "Maya transferred. Moving on to the lesson.",
        sprites: [
          { character: "Teacher", expression: "66", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "The teacher turns back to the chalkboard and begins writing in invisible chalk. Iris lets out a heavy sigh, then turns and looks at me — instantly replacing her stressed frown with a blinding, fake smile.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "71", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Iris... the teacher just broke. Everyone is acting like robots.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_start_29_irisVr.mp3",
        text: "They're just adjusting to the changes. You don't need them anyway. You only need me. We're going to have a perfect day today.",
        sprites: [{ character: "Iris", expression: "65", position: "center" }],
      },
      // ── Hallway: Maya's ghost ──
      {
        speaker: "Protagonist",
        text: "Iris flinches.",
        isInternal: true,
        sfx: SFX.hallwayThud,
        sfxVolume: 2,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "I look out the open classroom door. The physics engine is still running Maya's daily routine, even though her character model is gone. Her basketball bounces down the hall, guided by an invisible ghost.",
        isInternal: true,
        background: BACKGROUNDS.hallwayLockers,
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_start_31_irisVr.mp3",
        text: "Don't look at that! Look at me! I said look at me!",
        sprites: [{ character: "Iris", expression: "72", position: "center" }],
        background: BACKGROUNDS.classroomMorningVR,
      },
      {
        speaker: "Protagonist",
        text: "I can either play along and keep her calm a little longer... or push her and see what falls out.",
        isInternal: true,
        choices: [
          {
            text: '"Okay! I\'m looking at you. Just calm down."',
            nextSceneId: "day9_branch_a",
            stateEffects: { addiction: 10, irisAffection: 5, lucidity: -5 },
          },
          {
            text: '"You can\'t even control your own game, can you?"',
            nextSceneId: "day9_branch_b",
            stateEffects: { lucidity: 15, irisAffection: -10 },
          },
        ],
      },
    ],
  },

  {
    id: "day9_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Okay, Iris. I'm looking. I'm right here.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "72", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_branch_a_02_irisVr.mp3",
        text: "Thank you. Thank you. I just... I want it to be perfect for you. I'll clean up the leftover code tonight. Just stay with me, okay?",
        sprites: [{ character: "Iris", expression: "73", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She's losing her grip on the world. The cracks are showing everywhere. But as long as I play along, she doesn't hurt me. I nod slowly.",
        isInternal: true,
        background: BACKGROUNDS.classroomMorningVRBroken,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "But Leo's voice is still trapped behind my eyes: Don't let her decide what is real.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day10_start" }],
      },
    ],
  },

  {
    id: "day9_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "You deleted her, but you couldn't even delete her right. You can't even control your own game.",
        background: BACKGROUNDS.classroomMorningVR,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "72", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_branch_b_02_irisVr.mp3",
        text: "I control EVERYTHING! I am a god in here! You don't know how hard it is to maintain a cohesive reality matrix for an ungrateful user!",
        sprites: [{ character: "Iris", expression: "74", position: "center" }],
        bgm: MUSIC.pistonPressure,
      },
      {
        speaker: "Protagonist",
        text: "She pulls up her tablet, her fingers flying across the screen in a blur of rage.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day9_branch_b_04_irisVr.mp3",
        text: "Fine! You want it clean? I'll purge the entire athletic module!",
      },
      {
        speaker: "Protagonist",
        text: "Out the window, the entire school gymnasium simply vanishes — replaced by a wall of white void.",
        isInternal: true,
        sfx: SFX.rushingWind,
        sfxVolume: 0.6,
        background: BACKGROUNDS.totalWhite,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "She storms out of the classroom, leaving me alone in the broken, glitching room.",
        isInternal: true,
        background: BACKGROUNDS.classroomMorningVRBroken,
        choices: [{ text: "Continue...", nextSceneId: "day10_start" }],
      },
    ],
  },

  {
    id: "day10_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Today everything is wrong.",
        isInternal: true,
        background: BACKGROUNDS.binaryCodeHallway,
        bgm: MUSIC.lastSavedState,
      },
      {
        speaker: "Protagonist",
        text: "The world seems to be falling apart. Doors open onto blank walls. Students walk into corners and keep walking. Entire chunks of the hallway jitter like damaged video.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I hide in the library because it used to feel safe. Quiet. Stable. Now even the bookshelves look sick. But I'm not alone.",
        background: BACKGROUNDS.glitchingLibrary,
        isInternal: true,
        sfx: SFX.libraryPages,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day10_start_04_chloe.mp3",
        text: "P-Please... I don't... I don't want to forget.",
        sprites: [{ character: "Chloe", expression: "75", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Chloe?",
      },
      {
        speaker: "Protagonist",
        text: "She's hiding under one of the reading tables in the far corner. Half her face is smeared into a low-resolution blur, and her whole body is shaking so hard the table rattles with her.",
        isInternal: true,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day10_start_07_chloe.mp3",
        text: "$&@! {playerName}... The books. The stories. She's burning them all. The memory... the RAM... everything is being reallocated to her.",
        sprites: [{ character: "Chloe", expression: "76", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I kneel beside the table. Chloe isn't acting shy anymore. She's acting like a person who just learned she's made of code and that someone is about to delete it.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Chloe, what is she doing? Can you help me get out?",
      },
      {
        speaker: "Chloe",
        voice: "/voice/day10_start_10_chloe.mp3",
        text: "No logout. Admin locked the ports. But I found something in the archive before she corrupted it.",
      },
      {
        speaker: "Protagonist",
        text: "With trembling fingers, Chloe pulls a glowing square from inside her cardigan. It looks like a broken save file, pixelated at the edges and shedding static.",
        isInternal: true,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day10_start_12_chloe.mp3",
        text: "It's a backdoor. A diagnostic key. I can't use it, but if a signal comes from outside... this might keep the port open long enough for someone to reach you.",
        sprites: [{ character: "Chloe", expression: "77", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I take the corrupted square. It sinks into my palm like cold light and disappears under my skin.",
        isInternal: true,
        systemGraphic: "item:Item Received\nCorrupted Key_File",
      },
      {
        speaker: "Protagonist",
        text: "A heavy footstep lands at the library entrance.",
        isInternal: true,
        bgm: null,
        sfx: SFX.heavyFootstep,
      },
      {
        speaker: "Iris",
        voice: "/voice/day10_start_15_irisVr.mp3",
        text: "Chloe. I told you it was time for defragmentation.",
        sprites: [{ character: "Iris", expression: "78", position: "center" }],
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Chloe",
        voice: "/voice/day10_start_16_chloe.mp3",
        text: "No! Please! I have feelings! I like the quiet! I like the books! Don't turn me into nothing!",
        sprites: [
          { character: "Chloe", expression: "79", position: "left" },
          { character: "Iris", expression: "78", position: "right" },
        ],
      },
      {
        speaker: "Iris",
        voice: "/voice/day10_start_17_irisVr.mp3",
        text: "You are just unused assets. {playerName} doesn't need you. He only needs me.",
      },
      {
        speaker: "Protagonist",
        text: "Iris, stop! Leave her alone!",
      },
      {
        speaker: "Protagonist",
        text: "Her head turns toward me with a sharp, mechanical snap. The sound is small. The effect isn't.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day10_start_20_irisVr.mp3",
        text: "You're stressed again. The anomalies are causing your heart rate to spike. I need to clean the system. For your own good.",
      },
      {
        speaker: "Protagonist",
        text: "She raises her hand. The lights in the library dim to a dead white hum.",
        isInternal: true,
        choices: [
          {
            text: '"Try to pull Chloe away from her."',
            nextSceneId: "day10_branch_a",
          },
          {
            text: '"Brace yourself for the deletion."',
            nextSceneId: "day10_branch_b",
          },
        ],
      },
    ],
  },

  {
    id: "day10_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Don't do this!",
        background: BACKGROUNDS.glitchingLibrary,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "I lunge under the table and grab for Chloe's wrist, trying to drag her backward before Iris can finish whatever command she's executing.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "A blinding sheet of white tears across the room before I ever make contact.",
        isInternal: true,
        background: BACKGROUNDS.totalWhite,
        sfx: SFX.whiteFlashScreech,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "The library, the books, Chloe, all of it is vaporized in a single impossible frame. I hit the floor on my knees in a place with no walls and no horizon.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day10_branch_a_05_irisVr.mp3",
        text: "System overload. Too many errors. Initiating deep memory wipe. Don't worry, {playerName}. When you wake up, it will be just you and me. Perfect. Clean. Forever.",
      },
      {
        speaker: "Protagonist",
        text: "The white rushes into my eyes. I remember Maya falling. I remember Chloe shaking under the table. I remember the corrupted square in my hand. Then even those memories start to come apart.",
        isInternal: true,
        systemGraphic:
          "terminal:Overwriting_Memory_Sector...\nRebooting Day Cycle...",
        choices: [{ text: "Continue...", nextSceneId: "day11_start" }],
      },
    ],
  },

  {
    id: "day10_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "I freeze.",
        background: BACKGROUNDS.glitchingLibrary,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "My body refuses to move. All I can do is watch Chloe curl tighter into herself beneath the table while Iris's hand stays raised like a final verdict.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "The world erupts into a featureless white scream.",
        isInternal: true,
        background: BACKGROUNDS.totalWhite,
        sfx: SFX.whiteFlashScreech,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "The shelves are gone. Chloe is gone. Even the idea of the library is gone. I'm on my knees in empty light while Iris's voice booms from everywhere at once.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day10_branch_b_05_irisVr.mp3",
        text: "System overload. Too many errors. Initiating deep memory wipe. Don't worry, {playerName}. When you wake up, it will be just you and me. Perfect. Clean. Forever.",
      },
      {
        speaker: "Protagonist",
        text: "I try to hold on to the last two days. Maya disappearing. Chloe hiding. The key file. Leo. The memories shatter anyway, dissolving into static before I can anchor any of them.",
        isInternal: true,
        systemGraphic:
          "terminal:Overwriting_Memory_Sector...\nRebooting Day Cycle...",
        choices: [{ text: "Continue...", nextSceneId: "day11_start" }],
      },
    ],
  },

  {
    id: "day11_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Yesterday happened. I know it did. But the simulation filed most of it somewhere I can't reach.",
        isInternal: true,
        background: BACKGROUNDS.bedroomVR,
        bgm: null,
      },
      {
        speaker: "Protagonist",
        text: "I remember flashes. Chloe under a table. A square of corrupted light sinking into my hand. Iris turning the whole world white. After that, I woke up here with the bed made, the desk spotless, and every scrap of ordinary life polished into something sterile.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I haven't left the room. I don't want to see what the school looks like without Maya. I don't want to see Chloe waiting to be erased. Most of all, I don't want to see her.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Then a ringtone tears through the silence. Not the cheerful chime this place uses. Something harsher. Realer.",
        isInternal: true,
        sfx: SFX.phoneRingtone,
      },
      {
        speaker: "Protagonist",
        text: "I flinch so hard I nearly fall off the bed. The sound is coming from the phone on my desk.",
        isInternal: true,
        systemGraphic: "call:ERR_UNKNOWN_INTRUSION\nAnswer?",
      },
      {
        speaker: "Protagonist",
        text: "...Hello?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_07_leo.mp3",
        text: "{playerName}?! Can you hear me?! Come on, man, answer me!",
        sfx: SFX.staticBreathing,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "My heart stops. For a second I can't breathe at all.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Leo? Is that really you?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_10_leo.mp3",
        text: "Oh my god. You're alive. Listen to me, I brute-forced the rig's audio channel through a diagnostic port that was already hanging open somehow. I do not have long.",
        bgm: MUSIC.pistonPressure,
      },
      {
        speaker: "Protagonist",
        text: "The rig? Leo, where are you?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_12_leo.mp3",
        text: "I'm in her basement. It's a nightmare down here. You're strapped to a medical chair with IV drips in your arm and that headset bolted over your eyes.",
      },
      {
        speaker: "Protagonist",
        text: "I look down at my virtual arm. It looks healthy. Perfect. A phantom prick of pain still pulses through the vein underneath the illusion.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Then pull it off! Get me out of here!",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_15_leo.mp3",
        text: "I can't. The terminal says a forced disconnect could fry your frontal lobe. I called the cops. They're coming. But she's back early.",
        sfx: SFX.muffledBang,
        sfxVolume: 2,
      },
      {
        speaker: "Protagonist",
        text: "Leo, get out of there. She's insane.",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_17_leo.mp3",
        text: "I'm hiding until the police get here. You just have to stay awake in there. Whatever she does, do not trust the sunset.",
      },
      {
        speaker: "Protagonist",
        text: "The sunset? What does that even mean?",
      },
      {
        speaker: "Leo",
        voice: "/voice/day11_start_19_leo.mp3",
        text: "It's a synchronization trigger. When the sky turns red in there, she's pushing a sedative in here to drag you deeper under. If she triggers it manually, you might not wake up before—",
      },
      {
        speaker: "Protagonist",
        text: "The phone shrieks, the glass spiders with black pixels, and the call drops dead in my hand.",
        isInternal: true,
        sfx: SFX.dialupScreech,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "Silence slams back into the room. He found me. I'm really in that chair. The cops are coming. I just have to survive until they get here.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Three slow knocks land on the bedroom door.",
        isInternal: true,
        sfx: SFX.threeKnocks,
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_start_23_irisVr.mp3",
        text: "Honey? Who were you talking to just now? I thought I heard another voice in your room.",
      },
      {
        speaker: "Protagonist",
        text: "Every muscle in my body locks up. She felt the intrusion. She knows something touched her system.",
        isInternal: true,
        choices: [
          {
            text: '"Nobody. I was just talking to myself."',
            nextSceneId: "day11_branch_a",
            stateEffects: { lucidity: 15 },
          },
          {
            text: '"Leo is in your basement. It\'s over, Iris."',
            nextSceneId: "day11_branch_b",
            stateEffects: {
              lucidity: -20,
              addiction: 20,
              irisAffection: -10,
              exposedLeo: 1,
            },
          },
        ],
      },
    ],
  },

  {
    id: "day11_branch_a",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Nobody. I was just talking to myself. Having a weird dream.",
        background: BACKGROUNDS.bedroomVR,
        bgm: MUSIC.finalSaveState,
        sprites: [{ character: "Iris", expression: "81", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_branch_a_02_irisVr.mp3",
        text: "A dream? That's strange. The firewall flagged an external ping. Are you sure you're feeling okay, {playerName}?",
      },
      {
        speaker: "Protagonist",
        text: "Yeah. My head just hurts.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_branch_a_04_irisVr.mp3",
        text: "Oh, you dropped your phone. Clumsy. Don't worry, I'll delete that item and spawn you a new one. Let's go to the student council room, okay? I have a surprise for you.",
        sprites: [{ character: "Iris", expression: "82", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She knows I'm lying. She just doesn't want to admit the simulation is fraying. I nod because buying time is the only move I have left.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day12_start" }],
      },
    ],
  },

  {
    id: "day11_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo is in your basement. The police are on their way. It's over, Iris.",
        background: BACKGROUNDS.bedroomVR,
        bgm: null,
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_branch_b_02_irisVr.mp3",
        text: "HOW DARE HE TOUCH MY THINGS!",
        sprites: [{ character: "Iris", expression: "83", position: "center" }],
        bgm: MUSIC.lastSavedState,
      },
      {
        speaker: "Protagonist",
        text: "She doesn't step toward me. She raises one hand, and the whole room flushes with a violent, blood-orange light.",
        isInternal: true,
        background: BACKGROUNDS.bedroomDark,
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_branch_b_04_irisVr.mp3",
        text: "Command: Override_User_Lucidity. Force_Time_Cycle: DUSK.",
        systemGraphic:
          "terminal:Command: Override_User_Lucidity\nForce_Time_Cycle: DUSK",
      },
      {
        speaker: "Protagonist",
        text: "The sunset. Leo's warning. In the real world, the needle is going into my arm. In here, my knees buckle before I can even reach the door.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day11_branch_b_06_irisVr.mp3",
        text: "You're going to sleep now. And when you wake up, that boy will be gone, and we will finally be alone.",
        sprites: [{ character: "Iris", expression: "84", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The sedative drags me under. The last thing I hear is the sound of distant sirens dissolving into static.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day12_start" }],
      },
    ],
  },

  {
    id: "day12_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Iris told me to wait for her here. The student council room is suffocatingly quiet, lit by a heavy gold sunset that doesn't move.",
        isInternal: true,
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.lastSavedState,
        textVariants: [
          {
            requires: { exposedLeo: 1 },
            text: "I woke up here. The student council room. She must have moved me while the sedative worked through my system. The light is a heavy gold sunset that doesn't move.",
          },
        ],
      },
      {
        speaker: "Protagonist",
        text: "Dust hangs motionless in the air. The clock ticks, but the second hand just vibrates in place. Time isn't progressing. It's being held.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "My heart is still racing from Leo's call. I need a terminal, a command prompt, anything. Instead I find Iris's phone sitting in the middle of the desk, unlocked and glowing.",
        isInternal: true,
        systemGraphic: "phone:Iris's Phone\nUnlocked",
        textVariants: [
          {
            requires: { exposedLeo: 1 },
            text: "My throat is still raw from saying his name out loud. I need a terminal, a command prompt, anything. Instead I find Iris's phone sitting in the middle of the desk, unlocked and glowing.",
          },
        ],
      },
      {
        speaker: "Protagonist",
        text: "She never leaves her phone. If it's here, it's a trap. If it's here, it's also the first chance I've had.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "There is an app on the screen with no name, just a blinking red eye. I tap it.",
        isInternal: true,
        bgm: null,
        sfx: SFX.staticBurst,
        sfxVolume: 0.6,
      },
      {
        speaker: "Protagonist",
        text: "The app opens to a live feed. Grainy green night vision. A basement. A medical chair. And strapped into it... me.",
        isInternal: true,
        systemGraphic:
          "cg:Night-vision feed: the real-world protagonist strapped into the chair beneath the VR rig.",
      },
      {
        speaker: "Protagonist",
        text: "The IV bag is labeled in sloppy handwriting: Nutrient Mix + Sedative. Leo wasn't lying. I'm really down there.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_08_irisVr.mp3",
        text: "I'm sorry you had to see that, {playerName}.",
        sprites: [{ character: "Iris", expression: "86", position: "center" }],
        bgm: MUSIC.finalSaveState,
      },
      {
        speaker: "Protagonist",
        text: "I spin around so fast I nearly drop the phone. She's in the doorway, flushed, gentle, almost sympathetic. That scares me more than anger would.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Iris... please. Let me go. Just let me wake up.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_11_irisVr.mp3",
        text: "Wake up to what? To that cold basement? To a world where you're stressed, tired, and alone?",
        sprites: [{ character: "Iris", expression: "87", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She takes the phone from my hands and closes the feed with one thumb. Then she presses her palms against my chest like she's checking a machine for heat.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_13_irisVr.mp3",
        text: "Look at your heart rate. Your cortisol is spiking. It hurts, doesn't it? The fear. The reality. It hurts so much.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_14_irisVr.mp3",
        text: "But I can fix it. I can make you forget the pain. I just need to flood your system with something stronger.",
        sprites: [{ character: "Iris", expression: "88", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She steps closer, loosening her collar, moving slowly enough that every gesture feels calculated. The room smells faintly sweet. The music under the silence feels like a pulse.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_16_irisVr.mp3",
        text: "You don't need to be afraid. You just need to look at me. Only me. Let me be the only thing in your mind.",
        sprites: [{ character: "Iris", expression: "89", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "It's a honeypot. A trap built to overload fear with desire and relief until resistance feels impossible. The basement is cold and real. She is warm and carefully unreal.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_start_18_irisVr.mp3",
        text: "Don't look away, honey. Tell me I'm beautiful. Tell me you want to stay.",
      },
      {
        speaker: "Protagonist",
        text: "If I let this wash over me, I may never want to wake up again.",
        isInternal: true,
        choices: [
          {
            text: "\"Stop. I'm not looking at you. This isn't real.\"",
            nextSceneId: "day12_branch_a",
            stateEffects: { lucidity: 30, addiction: -50 },
          },
          {
            text: '"You\'re beautiful..."',
            nextSceneId: "day12_branch_b",
            stateEffects: { addiction: 50, lucidity: -30 },
          },
        ],
      },
    ],
  },

  {
    id: "day12_branch_a",
    nextSceneId: "final_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Stop. Put your clothes back on, Iris.",
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "90", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I force myself to stand and turn away from her. My heart is trying to claw out of my chest, but I keep my eyes on the wall and not on the shape she wants me to see.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "It isn't real. You aren't real. You're just a script trying to hack my brain chemistry. I'd rather die in that basement than become your pet in here.",
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_branch_a_04_irisVr.mp3",
        text: "You... ungrateful...",
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_branch_a_05_irisVr.mp3",
        text: "Fine. If you want to suffer so badly, I'll let you. But you are never leaving. Do you hear me?!",
        sfx: SFX.doorBurstRun,
      },
      {
        speaker: "Protagonist",
        text: "Her footsteps thunder away down the hall. I survived the trap. That only means the final confrontation is here.",
        isInternal: true,
        sprites: [],
      },
    ],
  },

  {
    id: "day12_branch_b",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "...You're beautiful.",
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.finalSaveState,
        sprites: [{ character: "Iris", expression: "91", position: "center" }],
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_branch_b_02_irisVr.mp3",
        text: "Yes. That's right. Just look at me.",
      },
      {
        speaker: "Protagonist",
        text: "The fear loosens all at once. The basement, Leo's voice, the cold shape of my real body in that chair, all of it starts to blur beneath the relief of letting go.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/day12_branch_b_04_irisVr.mp3",
        text: "I love you so much. I'll make sure you never have to think again.",
      },
      {
        speaker: "Protagonist",
        text: "I close my eyes. I surrender. The code begins rewriting the parts of me that still wanted to wake.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "ending_loop" }],
      },
    ],
  },

  {
    id: "final_start",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "The student council room dissolves into a void of raw, scrolling code.",
        background: BACKGROUNDS.binaryCode,
        bgm: null,
      },
      {
        speaker: "Protagonist",
        text: "Walls, desks, sky, all of it unravel into green-black streams. The simulation is breaking apart around us.",
        isInternal: true,
        background: BACKGROUNDS.studentCouncilGlitch,
      },
      {
        speaker: "Iris",
        voice: "/voice/final_start_03_irisVr.mp3",
        text: "You're ruining it! I gave you everything! Why do you keep looking at the outside world?!",
        sprites: [{ character: "Iris", expression: "80", position: "center" }],
        bgm: MUSIC.pistonPressure,
      },
      {
        speaker: "Protagonist",
        text: "Because it's real, Iris! You're keeping me in a cage!",
      },
      {
        speaker: "Iris",
        voice: "/voice/final_start_05_irisVr.mp3",
        text: "A cage? It's a sanctuary! Do you want to go back there? To the cold? To being a nobody?",
      },
      {
        speaker: "Protagonist",
        text: "A massive boom rolls through the void like a server rack collapsing in the dark. Somewhere behind the code, the real world is still moving.",
        isInternal: true,
        sfx: SFX.serverRackBoom,
      },
      {
        speaker: "Protagonist",
        text: "I can almost hear police sirens behind layers of static. Iris hears them too. Panic flashes across her face.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        voice: "/voice/final_start_08_irisVr.mp3",
        text: "They're at the door. I have to put you to sleep. I have to lock the system.",
      },
      {
        speaker: "Protagonist",
        text: "She raises one hand. A command prompt blossoms above her head.",
        isInternal: true,
        systemGraphic:
          "terminal:Command: Execute_Neural_Lockdown\nAdmin_Override_Initiated",
        sprites: [{ character: "Iris", expression: "97", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "",
        isInternal: true,
        choices: [
          {
            text: "Take Iris's hand and stay in the world she made.",
            nextSceneId: "ending_loop",
            stateEffects: { addiction: 10 },
            requirements: { addiction: 70 },
            lockReason: "Requires much higher dependency on Iris.",
          },
          {
            text: "Force the shutdown and wake up, no matter what waits outside.",
            nextSceneId: "ending_breakout",
            requirements: { lucidity: 50 },
            lockReason: "Requires stronger lucidity.",
          },
          {
            text: "Use the silver locket memory to break her model of you.",
            nextSceneId: "ending_sunrise",
            requirements: { lucidity: 60, silverLocket: 1 },
            lockReason:
              "Requires pocketing the silver locket and high lucidity.",
          },
        ],
      },
    ],
  },

  {
    id: "ending_loop",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Wait. Iris, stop.",
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.finalWinterRoom,
        sprites: [{ character: "Iris", expression: "93", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The command prompt hovers above us. My body feels impossibly heavy, and the memory of her warmth is still burning through every thought that was supposed to save me.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I'm tired of fighting. I want to stay with you.",
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_loop_04_irisVr.mp3",
        text: "There. Doesn't that feel better? No choices. No pain. Just us.",
        sprites: [{ character: "Iris", expression: "94", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The glitches vanish. The void rewrites itself into a blinding white room around us. Her lips touch mine and, somewhere in the real world, an icy prick slides into my arm.",
        isInternal: true,
        systemGraphic:
          "cg:A tear on the real-world protagonist's cheek in the blue light of the rig. A mechanical syringe pushes sedative into the IV line.",
      },
      {
        speaker: "Protagonist",
        text: "The sedative erases the last resistant edge of me. There is no Leo. There is no school. There is only Iris. Forever.",
        isInternal: true,
      },
      {
        speaker: "System",
        text: "ENDING 1 — DIGITAL BLISS",
      },
    ],
  },

  {
    id: "ending_breakout",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "No! I'm not letting you do this!",
        background: BACKGROUNDS.studentCouncilGlitch,
        bgm: MUSIC.pistonPressure,
        sprites: [{ character: "Iris", expression: "97", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I lunge for her arm before the command can execute. I don't know how this place handles force, only that I have to reject her with everything I have left.",
        isInternal: true,
        sfx: SFX.digitalGlassShatter,
        sfxVolume: 0.6,
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_breakout_03_irisVr.mp3",
        text: "Let go of me!",
        sprites: [{ character: "Iris", expression: "83", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The conflict between my autonomy and her control throws the whole place into a violent red logic loop. I scream the only command that still feels mine: wake up.",
        isInternal: true,
        sprites: [],
        background: BACKGROUNDS.studentCouncilRed,
      },
      {
        speaker: "Protagonist",
        text: "I gasp in real darkness. Mold. Copper. Old carpet. The VR rig is dead over my eyes, but the leather straps around my wrists are very real.",
        isInternal: true,
        vrMode: false,
        background: BACKGROUNDS.fadeToBlack,
      },
      {
        speaker: "Protagonist",
        text: "Heavy footsteps thud on the stairs above me. The cops didn't make it in time.",
        isInternal: true,
        sfx: SFX.footstepsStairs,
        background: BACKGROUNDS.basement,
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_breakout_07_irisVr.mp3",
        text: "You broke my world, honey... I spent so long coding it for you.",
        sprites: [{ character: "Iris", expression: "96", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Iris... don't...",
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_breakout_09_irisVr.mp3",
        text: "If you won't love me in there, you'll just have to stay down here until you learn. Don't worry. I'll never let them find us. Now... open wide. It's time to eat.",
        sprites: [{ character: "Iris", expression: "95", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She sits on my lap and raises a fork toward my mouth with one hand while a knife glints in the other. I close my eyes. The nightmare has only changed shape.",
        isInternal: true,
      },
      {
        speaker: "System",
        text: "ENDING 2 — THE BASEMENT CLIFFHANGER",
      },
    ],
  },

  {
    id: "ending_sunrise",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Iris. Look at me.",
        background: BACKGROUNDS.studentCouncilGlitch,
        bgm: null,
        sprites: [{ character: "Iris", expression: "97", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "My hand closes around something that renders badly in the void, heavy with static and memory. The silver locket.",
        isInternal: true,
        sprites: [
          { character: "Iris", expression: "97", position: "center" },
          { character: "Item", expression: "102", position: "right-small" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "This simulation is built on my memories, right? On the data you stole from my phone and my schedule.",
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_sunrise_04_irisVr.mp3",
        text: "Yes! And I made it perfect!",
      },
      {
        speaker: "Protagonist",
        text: "Then tell me what this is. What's the date engraved on the inside?",
        // sprites: [
        //   { character: "Item", expression: "101", position: "center-small" },
        // ],
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_sunrise_06_irisVr.mp3",
        text: "It's... a necklace. I rendered it for you. It's our symbol!",
        sprites: [{ character: "Iris", expression: "98", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "A whining tone builds through the code as she tries to read something she never stole and never indexed.",
        isInternal: true,
        sfx: SFX.dialupWhineBuild,
        sfxVolume: 0.6,
      },
      {
        speaker: "Iris",
        voice: "/voice/ending_sunrise_08_irisVr.mp3",
        text: "It says... 'Always... Yours'...? No. [DATA_NOT_FOUND]. [INDEX_ERROR].",
      },
      {
        speaker: "Protagonist",
        text: "It's my mother's birthday. March 12th. You don't know me, Iris. You only love a save file.",
      },
      {
        speaker: "Protagonist",
        text: "The paradox hits her like a sledgehammer. Her avatar flickers through Maya, Chloe, the hallway smile, the beach smile, then shatters into white static.",
        isInternal: true,
        bgm: MUSIC.sunlightFloorboards,
        sfx: SFX.staticExplosion,
        sfxVolume: 0.6,
        sprites: [{ character: "Iris", expression: "92", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The void collapses into blinding white. Then cold air rips the visor from my face.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
        sfx: SFX.policeBreach,
        vrMode: false,
      },
      {
        speaker: "Leo",
        voice: "/voice/ending_sunrise_12_leo.mp3",
        text: "I got you! Medics, get in here! We got him!",
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "Leo is standing over me, exhausted and real. In the background, Iris is sobbing against the wall while officers pin her arms behind her back. For the first time in weeks, I let myself fall asleep.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Six months later, the coffee in the cafe is bitter. I like it that way. It tastes real.",
        isInternal: true,
        background: BACKGROUNDS.cafeReal,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "Across from me, Leo sets down two paper cups and drops into the chair with the kind of ordinary clumsiness no simulation ever bothered to copy.",
        isInternal: true,
        sprites: [{ character: "Leo", expression: "99", position: "center" }],
      },
      {
        speaker: "Leo",
        voice: "/voice/ending_sunrise_16_leo.mp3",
        text: "Hey man. How was physical therapy today?",
      },
      {
        speaker: "Protagonist",
        text: "Getting better. I walked a full mile without the cane.",
      },
      {
        speaker: "Leo",
        voice: "/voice/ending_sunrise_18_leo.mp3",
        text: "That's awesome. You'll be back on the track team by spring.",
      },
      {
        speaker: "Protagonist",
        text: "Across the street, a girl with short hair walks a dog. For one terrible second my heart misfires. Then she turns and she's just a stranger, living her own life under a real sky.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Leo?",
      },
      {
        speaker: "Leo",
        voice: "/voice/ending_sunrise_21_leo.mp3",
        text: "Yeah?",
      },
      {
        speaker: "Protagonist",
        text: "The sun feels... actually warm today.",
      },
      {
        speaker: "Leo",
        voice: "/voice/ending_sunrise_23_leo.mp3",
        text: "Yeah. It does.",
        sprites: [{ character: "Leo", expression: "100", position: "center" }],
      },
      {
        speaker: "System",
        text: "ENDING 3 — SUNRISE",
      },
    ],
  },
];

export function getSceneById(id: string): Scene | undefined {
  return scenes.find((s) => s.id === id);
}
