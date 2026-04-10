import type { Scene } from "./types";

// Asset paths
export const BACKGROUNDS = {
  // Day 1
  classroomAfternoon: "/backgrounds/__1._Classroom,_Late_202604110132.png",
  schoolHallway: "/backgrounds/__2._School_Hallway,_202604110134.png",
  schoolGates: "/backgrounds/__3._School_Gates,_202604110134.png",
  bedroomNight: "/backgrounds/__4._Protagonist's_Bedroom,_202604110133.png",
  darkStreet: "/backgrounds/__5._Dark_Street,_202604110136.png",
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
  // Day 6
  classroomMorningVR: "/backgrounds/__15._Classroom,_Morning_202604110139.png",
  whiteVoid: "/backgrounds/__16._Artificial_White_202604110140.png",
  gymnasium: "/backgrounds/__17._School_Gymnasium,_202604110140.png",
  classroomNormalVR: "/backgrounds/__18._Classroom,_Morning_202604110140.png",
  hallwayLockers: "/backgrounds/__19._Hallway_with_202604110141.png",
  // Day 9-10
  glitchingLibrary: "/backgrounds/__20._Glitching_Library,_202604110141.png",
  totalWhite: "/backgrounds/__21._Total_White_202604110141.png",
  bedroomVR: "/backgrounds/__22._Protagonist's_Bedroom_202604110143.png",
  bedroomDark: "/backgrounds/__23._Protagonist's_Bedroom_202604110144.png",
  // Day 12+
  studentCouncil: "/backgrounds/__24._Student_Council_202604110145.png",
  binaryCode: "/backgrounds/__25._Binary_Code_202604110145.png",
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
  obsession: "/music/2 Breath_Behind_the_Door.mp3",
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
        bgm: MUSIC.graySuburbia,
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
        text: "She isn't looking at her phone. She isn't reading a book. She's just... staring directly at the west doors. Like she's been waiting for them to open. Like a statue left out in the cold.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "1", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I hesitate. Usually, I'd just put my headphones in and walk past. But her gaze snaps to me the second my foot hits the pavement.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Oh! {playerName}!",
        sprites: [{ character: "Iris", expression: "2", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Her voice is a little too loud for the quiet courtyard. I stop, adjusting my grip on my backpack strap.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Hey, Iris. You're still here? The last bus leaves from the corner in a few minutes, doesn't it?",
      },
      {
        speaker: "Iris",
        text: "I... I was just waiting for the bus, yeah. Even though the stop is a block away.",
        sprites: [{ character: "Iris", expression: "3", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "She takes a step closer. The gravel crunches under her shoes. She smells faintly of lavender, but underneath it, there's a sharp, metallic scent. Like copper.",
        isInternal: true,
        sfx: SFX.footstepsGravel,
      },
      {
        speaker: "Iris",
        text: "I like the view from here. It's the view of where you spend your day.",
        sprites: [{ character: "Iris", expression: "4", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "...Excuse me?",
      },
      {
        speaker: "Iris",
        text: "I know your schedule, you know. 3:15 PM, you leave through the west exit. 3:20 PM, you check your locker. 3:23 PM, you walk past the old oak tree.",
      },
      {
        speaker: "Protagonist",
        text: "My stomach does a slow, uncomfortable flip. The acoustic guitar in my headphones suddenly feels completely disconnected from the heavy silence settling between us.",
        isInternal: true,
      },
      {
        speaker: "Iris",
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
        sprites: [{ character: "Iris", expression: "5", position: "center" }],
      },
      {
        speaker: "Iris",
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
        text: "I knew it. I knew you'd understand. Everyone else says I'm weird, but you... you're different. We're the same.",
      },
      {
        speaker: "Protagonist",
        text: "I should probably get going, Iris. It's getting dark.",
      },
      {
        speaker: "Iris",
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
      },
      {
        speaker: "Protagonist",
        text: "They are wearing a dark hoodie, but the posture is unmistakable. It's small. Tense.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "In their hands, lifted up toward her face, is a digital camera with a long zoom lens. Pointed directly at my bedroom window.",
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
      },
      {
        speaker: "Protagonist",
        text: "The name makes my blood run cold.",
        isInternal: true,
        systemGraphic: "C:/Users/Iris/Archive/My_Future_Husband",
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
      },
      {
        speaker: "Protagonist",
        text: "I rip my headphones off my ears, throwing them onto the desk.",
        isInternal: true,
        sfx: SFX.hallwayThud,
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
          "You look so handsome when you're concentrating. Sweet dreams. See you tomorrow. ❤️",
      },
      {
        speaker: "Protagonist",
        text: "I don't sleep that night. I just sit in the dark, watching the door.",
        isInternal: true,
      },
    ],
  },
];

export function getSceneById(id: string): Scene | undefined {
  return scenes.find((s) => s.id === id);
}
