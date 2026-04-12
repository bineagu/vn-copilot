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
        text: "Hey, Iris. You're still here? The last bus leaves from the corner in a few minutes, doesn't it?",
      },
      {
        speaker: "Iris",
        text: "I... I was just waiting for the bus, yeah. Even though the stop is a block away.",
        sprites: [{ character: "Iris", expression: "3", position: "center" }],
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
        text: '"You were up so late studying! You need your energy. - I ❤️"',
        isInternal: true,
        systemGraphic:
          "You were up so late studying! You need your energy. - I ❤️",
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
        text: "Yo! Morning, man. You look like you got run over by a truck.",
      },
      {
        speaker: "Protagonist",
        text: "Leo. Hey. I just... didn't sleep well.",
      },
      {
        speaker: "Leo",
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
        text: "Wait, is there a note? 'From I'? Bro, you have a secret admirer? Open it!",
      },
      {
        speaker: "Protagonist",
        text: "Leo, don't touch it.",
      },
      {
        speaker: "Leo",
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
        choices: [{ text: "Continue...", nextSceneId: "day3_start" }],
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
        text: "Wait, seriously? You're giving away premium waifu cooking? Are you sick?",
      },
      {
        speaker: "Protagonist",
        text: "I'm not hungry. My stomach is a mess today. Just... take it to your desk. Please.",
      },
      {
        speaker: "Leo",
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
        sprites: [{ character: "Iris", expression: "16", position: "center" }],
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
        sprites: [{ character: "Iris", expression: "17", position: "center" }],
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
      },
      {
        speaker: "Chloe",
        text: "U-Um... excuse me? {playerName}?",
        sprites: [{ character: "Chloe", expression: "18", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Oh. Hey, Chloe. Do you need the seat?",
      },
      {
        speaker: "Chloe",
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
        text: "The temperature in the room seems to drop five degrees.\nI don't need to look up. I can feel the hairs on my arms standing on end.",
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
        text: "No... she didn't say anything. She just... she walked over to our table while you were gone. She leaned right over my shoulder and smelled your textbook. Then she just... walked out.",
      },
      {
        speaker: "Protagonist",
        text: "My blood runs cold.",
        isInternal: true,
      },
      {
        speaker: "Chloe",
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
          "She's touching the books you touched. She's breathing the air you breathe. Stop talking to her. ONLY TALK TO ME.",
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
          "Chloe, I'm sorry. Please don't sit with me anymore. It isn't safe. Stay away from Iris.",
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
          "Chloe, I'm so sorry about my weird friend. It was just a stupid prank. Let's study again tomorrow, okay?",
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
        text: "I made something special at my house today. Just for us. It's quiet there. No tests, no loud people, no Chloe... just peace.",
      },
      {
        speaker: "Iris",
        text: "Will you come over? Please? I don't want to be alone today. And I know you don't either.",
        sprites: [{ character: "Iris", expression: "28", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "This is it. The invitation.\nI know what she is. I saw the SD card. I saw the anger when Leo took the lunchbox.\nBut I am so, so tired.\nWhat if I just... gave in? What if I let her love me?",
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
      },
      {
        speaker: "Protagonist",
        text: "She sits me down on the edge of her bed and hands me a cup of tea. It smells heavily of chamomile. And something else. Something sweet and chemical.\nI know it's drugged.\nBut I look at her smiling face, and I take a sip anyway.",
        isInternal: true,
        background: BACKGROUNDS.irisRoom,
      },
      {
        speaker: "Protagonist",
        text: "When I wake up, the room is completely dark, save for the glow of a large television screen.\nI try to sit up, but my body feels impossibly heavy.",
        isInternal: true,
        sfx: SFX.teacupDrop,
        background: BACKGROUNDS.sedatedBlackout,
      },
      {
        speaker: "Protagonist",
        text: "I try to move my legs.\nA sharp, blinding agony rips through my ankles. I gasp, falling back onto the pillows.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Shhh, don't move too fast, honey. The stitches are still fresh.",
        sprites: [{ character: "Iris", expression: "30", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "My... my legs. What did you do to my legs?",
      },
      {
        speaker: "Iris",
        text: "I just made sure you'll never have to walk away from me. You'll never have to go to that awful school again. You're safe now. You're my prince... and I'm going to take such good care of you.",
        sprites: [{ character: "Iris", expression: "31", position: "center" }],
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
        text: "That's okay, {playerName}. I understand. You have... attachments in this world. It's hard to let go.",
      },
      {
        speaker: "Protagonist",
        text: "I don't look back. I practically run out the west exit.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "But don't worry. I can fix that for you. I'll fix everything.",
      },
      {
        speaker: "Protagonist",
        text: "I lock every door and window in my house that night. I put a chair under my bedroom doorknob. While checking my desk for anything heavy enough to use as a weapon, I find my mother's old silver locket wedged behind a drawer.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "She gave it to me years ago, before phones tracked every second of my life. I never photographed it. Never texted about it. It belongs to a part of me Iris couldn't scrape off a screen.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I slip the locket into my pocket without really thinking about it. The metal is cold. Solid. Real. But as I finally drift into an exhausted sleep, I can't shake the feeling that locks won't be enough to keep her out anymore.",
        isInternal: true,
        background: BACKGROUNDS.fadeToBlack,
        sprites: [],
        choices: [
          {
            text: "Continue...",
            nextSceneId: "day5_start",
            stateEffects: { silverLocket: 1 },
          },
        ],
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
        background: BACKGROUNDS.footballField,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.footballAmbience,
      },
      {
        speaker: "Protagonist",
        text: "I made it to school. I avoided the hallways. I hid in the boys' bathroom during lunch.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Now, school is over. I'm standing at the edge of the football field, waiting for Leo to finish practice.\nWe're going to the police. I have the SD card in my pocket. I don't care if they think I'm crazy. I can't live like this anymore.",
        isInternal: true,
      },
      {
        speaker: "Leo",
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
        text: "Worse. Man, it's so much worse than we thought.",
        sprites: [{ character: "Leo", expression: "35", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "What did you do? Did you talk to her?",
      },
      {
        speaker: "Leo",
        text: "No. I skipped fifth period. I... I broke into her backyard. Her parents are never home, right? I looked through the basement window.",
      },
      {
        speaker: "Protagonist",
        text: "My stomach drops into my shoes.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        text: "She has a shrine, man. It's not just photos. She has... pieces of your hair. Clothes you threw away.",
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Leo",
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
        text: "WATCH OU—!",
      },
      {
        speaker: "Protagonist",
        text: "Pain explodes behind my eyes.\nBut I don't fall.\nThe ground doesn't rush up to meet me. Gravity just... stops working.",
        isInternal: true,
        bgm: null,
        sfx: SFX.crunchSickening,
        background: BACKGROUNDS.fadeToBlack,
      },
      {
        speaker: "Protagonist",
        text: "The field flips sideways. Someone is screaming my name from very far away. I can't tell if it's Leo or me.",
        isInternal: true,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "Then everything goes black.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day6_start" }],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // DAY 6: THE "PERFECT" RESET
  // ═══════════════════════════════════════════
  {
    id: "day6_start",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "My eyes snap open to a dim ceiling and a pounding headache.",
        isInternal: true,
        background: BACKGROUNDS.bedroomDark,
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
        background: BACKGROUNDS.classroomMorning,
        sfx: SFX.schoolBellCheerful,
      },
      {
        speaker: "Leo",
        text: "Morning, sleeping beauty! You were totally out of it. Dreaming about your future wife again?",
        sprites: [{ character: "Leo", expression: "39", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Leo! The cops, we were supposed to go to—wait. What?",
      },
      {
        speaker: "Leo",
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
        text: "Hey, {playerName}! Chloe and I brought some extra snacks. You want some?",
      },
      {
        speaker: "Chloe",
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
        text: "The weather is nice today, isn't it?",
      },
      {
        speaker: "Everyone",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "...Yeah. The weather is nice. Let's just hang out.",
        background: BACKGROUNDS.classroomMorning,
        bgm: MUSIC.graySuburbia,
        sprites: [{ character: "Iris", expression: "46", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "I knew you'd say that! Let's go to the roof. Maya and Chloe can come too, right girls?",
      },
      {
        speaker: "Maya & Chloe",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo... Maya... why did you all just say the exact same thing at the exact same time?",
        background: BACKGROUNDS.classroomMorning,
        bgm: null,
        sprites: [{ character: "Iris", expression: "47", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "They're just... they're just agreeing with each other! Great minds think alike, right?",
      },
      {
        speaker: "Protagonist",
        text: "No, that wasn't agreement. That was rehearsal. Leo, look at me.",
      },
      {
        speaker: "Leo",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "I know it's a dream the second I open my eyes.\nI fell asleep with a concussion headache. I should be in my bed. Instead, I'm standing in the middle of a beach that feels too bright to be real.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
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
        text: "You're so serious! You need to relax. We're supposed to be having fun! Oh, actually...",
        sprites: [{ character: "Iris", expression: "51", position: "center" }],
      },
      {
        speaker: "Iris",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "I lean in, squinting against the bright light.\nIt isn't a shadow. It isn't a birthmark.\nFor a split second, I swear I see a line of tiny black letters just under her skin before the glare wipes them out.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "52", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Maybe it's just dream garbage. Maybe it's a tattoo. Either way, the sight makes my stomach turn.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "What are you looking at?!",
        sprites: [{ character: "Iris", expression: "53", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Nothing! I was just... checking for sand.",
      },
      {
        speaker: "Iris",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "I shake my head and look away.\nIt doesn't matter what the shadow is. A trick of the light. Dream nonsense. Whatever.\nI place my hands on her back and gently rub the sunscreen in.",
        isInternal: true,
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "55", position: "center" }],
      },
      {
        speaker: "Iris",
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
        text: "I'm so glad we're together, {playerName}. I promise... every day will be exactly like this. Forever.",
        sprites: [{ character: "Iris", expression: "56", position: "center" }],
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
    vrMode: false,
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
        sprites: [{ character: "Maya", expression: "58", position: "center" }],
      },
      {
        speaker: "Maya",
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
      },
      {
        speaker: "Maya",
        text: "{playerName}! Help! I can't feel my... legs... I can't feel my... [ERROR: VARIABLE_NOT_FOUND].",
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
        text: "I knew this would happen eventually. She was always so loud. So restless. So hard to keep in one place.",
      },
      {
        speaker: "Protagonist",
        text: "Iris! Fix her! What's happening?!",
      },
      {
        speaker: "Iris",
        text: "She's a distraction, {playerName}. She keeps getting between us.",
        sprites: [
          { character: "Maya", expression: "59", position: "left" },
          { character: "Iris", expression: "61", position: "right" },
        ],
      },
      {
        speaker: "Maya",
        text: "P-P-Please... I don't want to... [END_PROCESS]...",
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
        text: "She was too loud anyway. Always running around, always sweating. You like the quiet, don't you?",
        sprites: [{ character: "Iris", expression: "63", position: "center" }],
      },
      {
        speaker: "Iris",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "You're a monster! Stay away from me!",
        background: BACKGROUNDS.gymnasium,
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "I violently shove her hand off my shoulder and scramble backward.",
        isInternal: true,
        sprites: [{ character: "Iris", expression: "64", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "A monster? I'm the only thing holding you together right now! After everything you've seen, you still think anyone else understands you?",
      },
      {
        speaker: "Protagonist",
        text: "The threat hangs in the air, heavy and absolute.",
        isInternal: true,
      },
      {
        speaker: "Iris",
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
    vrMode: false,
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
        text: "Shhh. It's okay. You're in shock. Change is hard, I know.",
      },
      {
        speaker: "Protagonist",
        text: "She strokes my hair. I let her. I'm trembling uncontrollably, but I don't push her away.",
        isInternal: true,
      },
      {
        speaker: "Iris",
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
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "The next day I hide in the library because it is the only place left that still feels like it might obey ordinary rules.",
        isInternal: true,
        background: BACKGROUNDS.library,
        bgm: MUSIC.graySuburbia,
        sfx: SFX.libraryPages,
      },
      {
        speaker: "Protagonist",
        text: "It doesn't. The fluorescent lights buzz in an irregular rhythm. Whole shelves seem slightly farther away every time I blink.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Then my phone vibrates. Unknown number.",
        isInternal: true,
        sfx: SFX.phoneRingtone,
      },
      {
        speaker: "System",
        text: "UNKNOWN CALLER",
        systemGraphic: "UNKNOWN CALLER\nAnswer?",
      },
      {
        speaker: "Protagonist",
        text: "Hello?",
      },
      {
        speaker: "Leo",
        text: "Don't hang up. Don't say my name out loud. If you can hear me, go somewhere she can't hear you breathe.",
        sfx: SFX.staticBreathing,
      },
      {
        speaker: "Protagonist",
        text: "Leo? Where have you been? Everyone keeps acting like nothing happened! Maya is gone!",
      },
      {
        speaker: "Leo",
        text: "I know. I know. Listen to me. I found the basement again. I got video this time. Whatever she built under her house, it's wired into you somehow. I think the hit at the field knocked something loose.",
      },
      {
        speaker: "Protagonist",
        text: "The shelves to my left suddenly shimmer. Book spines smear into horizontal lines for half a second before snapping back.",
        isInternal: true,
        background: BACKGROUNDS.glitchingLibrary,
        sfx: SFX.schoolBellGlitch,
      },
      {
        speaker: "Leo",
        text: "She's trying to smooth everything over around you. Make it feel safe. Make it feel normal. Don't let her decide what was real.",
      },
      {
        speaker: "Protagonist",
        text: "Footsteps drift in from the hallway. Light, unhurried. Familiar.",
        isInternal: true,
        sfx: SFX.hesitantFootsteps,
      },
      {
        speaker: "Leo",
        text: "If she finds out I'm talking to you, she'll cut the line. After school, come to the old student council room. Top floor. West wing. I'll explain everything.",
      },
      {
        speaker: "Iris",
        text: "{playerName}? Who are you talking to?",
        sprites: [{ character: "Iris", expression: "66", position: "center" }],
        bgm: MUSIC.obsession,
      },
      {
        speaker: "Protagonist",
        text: "The call distorts into a screech and drops.",
        isInternal: true,
        sfx: SFX.staticBurst,
      },
      {
        speaker: "Iris",
        text: "You look frightened again. I told you, those feelings only make things uglier.",
        sprites: [{ character: "Iris", expression: "67", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I can either hide what I know and play along a little longer... or push her and see what falls out.",
        isInternal: true,
        choices: [
          {
            text: '"Nobody. I\'m just tired."',
            nextSceneId: "day9_branch_a",
            stateEffects: { addiction: 10, irisAffection: 10, lucidity: -5 },
          },
          {
            text: '"Leo called me. He remembers the field."',
            nextSceneId: "day9_branch_b",
            stateEffects: { lucidity: 15, irisAffection: -10 },
          },
        ],
      },
    ],
  },

  {
    id: "day9_branch_a",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "Nobody. I'm just tired.",
        background: BACKGROUNDS.glitchingLibrary,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "68", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "Then stop exhausting yourself. Stop digging. Let me hold the heavy things for you.",
      },
      {
        speaker: "Protagonist",
        text: "She kisses my forehead. The library lights stop flickering. The shelves straighten. For one nauseating second, relief nearly wins.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "But Leo's voice is still trapped behind my eyes: Don't let her decide what was real.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day10_start" }],
      },
    ],
  },

  {
    id: "day9_branch_b",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo called me. He remembers the field. He remembers what you did.",
        background: BACKGROUNDS.glitchingLibrary,
        bgm: MUSIC.obsession,
        sprites: [{ character: "Iris", expression: "69", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "He remembers noise. Pain. He remembers ruining things. That's all Leo ever does.",
      },
      {
        speaker: "Protagonist",
        text: "The nearest bookshelf bends inward like rubber under pressure, then snaps back into shape.",
        isInternal: true,
        sfx: SFX.digitalTearing,
      },
      {
        speaker: "Iris",
        text: "Please don't make me compete with him again, {playerName}. I am so tired of cleaning up after boys who don't understand you.",
      },
      {
        speaker: "Protagonist",
        text: "She says it softly, but it lands like a threat.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day10_start" }],
      },
    ],
  },

  {
    id: "day10_start",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "That night I barricade my bedroom door with my desk and wait.",
        isInternal: true,
        background: BACKGROUNDS.bedroomDark,
        bgm: MUSIC.finalSaveState,
        sfx: SFX.airConditioner,
      },
      {
        speaker: "Protagonist",
        text: "At 12:14 AM, my phone lights up with a file transfer request from Leo.",
        isInternal: true,
        sfx: SFX.phoneBuzz,
      },
      {
        speaker: "System",
        text: "Incoming file",
        systemGraphic: "C:\\Users\\Leo\\Desktop\\iris_basement_capture.mp4",
      },
      {
        speaker: "Protagonist",
        text: "I open it.",
      },
      {
        speaker: "Protagonist",
        text: "The footage is shaky, filmed through a grimy basement window. Server racks. Cables. A reclining chair ringed with restraints. A monitor showing a model of the school. And for one impossible frame, my own name listed beside the word SESSION.",
        isInternal: true,
        background: BACKGROUNDS.totalBlack,
        sfx: SFX.serverRackBoom,
      },
      {
        speaker: "Protagonist",
        text: "My stomach folds in on itself. The beach. Maya sinking. Everyone reciting the same line. The feeling of solid water. It all rearranges at once into a shape I don't want to name.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        text: "Meet me tomorrow. Student council room. If I'm wrong, you can punch me in the throat. But if I'm right, we end this.",
        systemGraphic:
          "Meet me tomorrow. Student council room. If I'm wrong, you can punch me in the throat. But if I'm right, we end this.",
      },
      {
        speaker: "Protagonist",
        text: "A soft knock lands against my bedroom door. Three slow taps.",
        isInternal: true,
        sfx: SFX.threeKnocks,
      },
      {
        speaker: "Iris",
        text: "{playerName}? You should be sleeping. You're upsetting yourself again.",
      },
      {
        speaker: "Protagonist",
        text: "She shouldn't be here. She definitely shouldn't be inside the house. But I can smell her perfume on the other side of the door.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Please don't watch ugly things before bed. They put bad dreams in your head.",
      },
      {
        speaker: "Protagonist",
        text: "I need to decide what version of tomorrow I'm willing to walk into.",
        isInternal: true,
        choices: [
          {
            text: '"Go away, Iris. I\'m done listening to you."',
            nextSceneId: "day10_branch_a",
            stateEffects: { lucidity: 15, addiction: -10, irisAffection: -10 },
          },
          {
            text: '"Just... leave me alone tonight. Please."',
            nextSceneId: "day10_branch_b",
            stateEffects: { addiction: 10, irisAffection: 5 },
          },
        ],
      },
    ],
  },

  {
    id: "day10_branch_a",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "Go away, Iris. I'm done listening to you.",
        background: BACKGROUNDS.bedroomDark,
        bgm: MUSIC.finalSaveState,
      },
      {
        speaker: "Iris",
        text: "...You don't mean that. You're tired. Tired people say cruel things.",
      },
      {
        speaker: "Protagonist",
        text: "I hear her breathing stop on the other side of the door. Then her footsteps retreat, very slowly, like she's memorizing the sound of my silence.",
        isInternal: true,
        sfx: SFX.hesitantFootsteps,
      },
      {
        speaker: "Protagonist",
        text: "I do not sleep at all.",
        isInternal: true,
        choices: [{ text: "Continue...", nextSceneId: "day11_start" }],
      },
    ],
  },

  {
    id: "day10_branch_b",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "Just... leave me alone tonight. Please.",
        background: BACKGROUNDS.bedroomDark,
        bgm: MUSIC.finalSaveState,
      },
      {
        speaker: "Iris",
        text: "If that's what you need, I'll give it to you. See? I do listen. I always listen.",
      },
      {
        speaker: "Protagonist",
        text: "Her footsteps fade. I hate how close her answer sounds to tenderness.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I still don't sleep. I just spend the rest of the night staring at Leo's video until sunrise bleaches the edges of my curtains.",
        isInternal: true,
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
        text: "The student council room should be dusty and empty. Instead, when I open the door, the world tears open with it.",
        isInternal: true,
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.pistonPressure,
        sfx: SFX.whiteFlashScreech,
      },
      {
        speaker: "Protagonist",
        text: "The windows go white. The walls peel into grids. The floor drops away, exposing an endless scaffold of light beneath the school.",
        isInternal: true,
        background: BACKGROUNDS.binaryCode,
      },
      {
        speaker: "Leo",
        text: "Finally. You can see it too.",
        sprites: [{ character: "Leo", expression: "70", position: "left" }],
      },
      {
        speaker: "Protagonist",
        text: "Leo is standing beside an unplugged monitor cart jammed with cables. The footage on its screen matches the basement video exactly.",
        isInternal: true,
      },
      {
        speaker: "Leo",
        text: "She hit you at the field, knocked you out, and dragged your body to that chair in her basement. The school, the beach, the gym, all of it after that? It's a custom environment. Her custom environment.",
      },
      {
        speaker: "Protagonist",
        text: "The words should sound absurd. Instead they click into place so neatly they make me nauseous.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Custom is such a cruel word. I made him a sanctuary.",
        sprites: [
          { character: "Leo", expression: "71", position: "left" },
          { character: "Iris", expression: "72", position: "right" },
        ],
      },
      {
        speaker: "Iris",
        text: "Look at what the real world did to him. It left him alone. It made him invisible. I built a place where he could finally be loved correctly.",
      },
      {
        speaker: "Leo",
        text: "You murdered two people in here and probably more outside of it.",
      },
      {
        speaker: "Iris",
        text: "I removed interruptions.",
        sprites: [{ character: "Iris", expression: "73", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Her face flickers. For half a second I see the beach smile, the library stare, the hallway softness, all stacked on top of each other like bad layers in an image editor.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "{playerName}, you don't need him. You don't need any of them. I can keep every bad thing outside. You just have to stop fighting me.",
      },
      {
        speaker: "Protagonist",
        text: "The room hums around us like a living nerve. This is the first moment that feels completely, brutally honest.",
        isInternal: true,
        choices: [
          {
            text: '"If any part of you ever loved me, help me wake up."',
            nextSceneId: "day11_branch_a",
            stateEffects: { irisAffection: 10, lucidity: 10 },
          },
          {
            text: '"Leo, tell me how to shut this place down."',
            nextSceneId: "day11_branch_b",
            stateEffects: { lucidity: 15, irisAffection: -10 },
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
        text: "If any part of you ever loved me, help me wake up.",
        background: BACKGROUNDS.binaryCode,
        bgm: MUSIC.pistonPressure,
        sprites: [{ character: "Iris", expression: "74", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "Wake up... and go back to that empty room? Back to your parents never noticing? Back to everyone wanting pieces of you until there was nothing left?",
      },
      {
        speaker: "Protagonist",
        text: "Maybe. But it has to be my choice.",
      },
      {
        speaker: "Iris",
        text: "...Then don't make me prove how much I love you by hurting you again.",
      },
      {
        speaker: "Protagonist",
        text: "Her voice cracks on the last word. Leo hears it too. His expression changes from anger to something more careful.",
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
        text: "Leo, tell me how to shut this place down.",
        background: BACKGROUNDS.binaryCode,
        bgm: MUSIC.pistonPressure,
        sprites: [{ character: "Leo", expression: "75", position: "left" }],
      },
      {
        speaker: "Leo",
        text: "There's a core process tied to her admin key. We hit that, the environment collapses and the chair in the basement reboots. Messy, but survivable.",
      },
      {
        speaker: "Iris",
        text: "You're explaining me to him like I'm a machine.",
        sprites: [{ character: "Iris", expression: "76", position: "right" }],
      },
      {
        speaker: "Leo",
        text: "If the wire bundle fits, yeah.",
      },
      {
        speaker: "Protagonist",
        text: "Iris goes very still. The entire room lowers in pitch like something immense has become aware of us.",
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
        text: "The student council room peels back one last layer and becomes what it always was underneath: a control chamber dressed up like a school fantasy.",
        isInternal: true,
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.lastSavedState,
      },
      {
        speaker: "Protagonist",
        text: "Desks are replaced by suspended screens. The whiteboard is now a diagnostics panel full of my memories tagged, sorted, and color-coded.",
        isInternal: true,
        systemGraphic:
          "SESSION: {playerName}\nSTATE: unstable\nATTACHMENT VECTOR: IRIS\nEXTERNAL INTERFERENCE: LEO",
      },
      {
        speaker: "Iris",
        text: "This was supposed to be the part where you finally understood. No more fear. No more noise. Just us.",
        sprites: [{ character: "Iris", expression: "77", position: "center" }],
      },
      {
        speaker: "Leo",
        text: "She's anchored the whole construct to your dependency responses. That's why the nice days feel good and the bad days blur together. She rewards surrender.",
        sprites: [{ character: "Leo", expression: "78", position: "left" }],
      },
      {
        speaker: "Iris",
        text: "I rewarded trust.",
        sprites: [
          { character: "Leo", expression: "78", position: "left" },
          { character: "Iris", expression: "79", position: "right" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "On one screen, a camera feed of the real basement flickers into view. A silver locket hangs from a hook beside the chair. My stomach twists. It was in her room. It exists outside this place too.",
        isInternal: true,
        systemGraphic: "C:\\Iris\\Basement\\feeds\\chair_cam_03",
      },
      {
        speaker: "Leo",
        text: "That's the manual fail-safe. I saw her use it while calibrating. If you can force that memory to the front, the lock on the chair might release when the system buckles.",
      },
      {
        speaker: "Iris",
        text: "Don't touch that. That's mine.",
        sprites: [{ character: "Iris", expression: "80", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "The whole world shudders, waiting to see which desire in me is strongest: escape, surrender, or the need to be understood by the person who built this prison.",
        isInternal: true,
        choices: [
          { text: "Make the final choice.", nextSceneId: "final_start" },
        ],
      },
    ],
  },

  {
    id: "final_start",
    vrMode: true,
    lines: [
      {
        speaker: "System",
        text: "FINAL ROUTE SELECT",
        background: BACKGROUNDS.binaryCode,
        bgm: MUSIC.finalWinterRoom,
        choices: [
          {
            text: "Take Iris's hand and stay in the world she made.",
            nextSceneId: "ending_loop",
            stateEffects: { addiction: 10 },
            requirements: { addiction: 40 },
            lockReason: "Requires higher dependency on Iris.",
          },
          {
            text: "Side with Leo and brute-force the shutdown.",
            nextSceneId: "ending_breakout",
            requirements: { lucidity: 45 },
            lockReason: "Requires higher lucidity.",
          },
          {
            text: "Reach for Iris and ask her to choose reality with you.",
            nextSceneId: "ending_mercy",
            requirements: { irisAffection: 45 },
            lockReason: "Requires stronger connection with Iris.",
          },
          {
            text: "Grab the silver locket memory and wake up for real.",
            nextSceneId: "ending_sunrise",
            requirements: { lucidity: 60, silverLocket: 1 },
            lockReason: "Requires the silver locket and high lucidity.",
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
        text: "I take Iris's hand.",
        background: BACKGROUNDS.whiteBlinding,
        bgm: MUSIC.infiniteSummer,
        sprites: [{ character: "Iris", expression: "81", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "Leo is still shouting. The monitors are still flashing warnings. But the instant her fingers close around mine, the noise recedes like a tide.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "There. Doesn't that feel better? No choices. No pain. Just us.",
      },
      {
        speaker: "Protagonist",
        text: "The beach returns. The sky is flawless. The waves loop forever. This time, I do not test the water.",
        isInternal: true,
      },
      {
        speaker: "System",
        text: "ENDING 1 — INFINITE SUMMER",
      },
    ],
  },

  {
    id: "ending_breakout",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Leo, now!",
        background: BACKGROUNDS.binaryCode,
        bgm: MUSIC.pistonPressure,
        sprites: [{ character: "Leo", expression: "82", position: "left" }],
      },
      {
        speaker: "Protagonist",
        text: "He slams the monitor cart into the admin console. The room detonates into white shards and screaming static.",
        isInternal: true,
        sfx: SFX.digitalGlassShatter,
      },
      {
        speaker: "Iris",
        text: "{playerName}, don't leave me here!",
        sprites: [{ character: "Iris", expression: "83", position: "center" }],
      },
      {
        speaker: "Protagonist",
        text: "I wake up choking in a basement chair while police pound down a door somewhere upstairs. My ankles scream. My throat tastes like blood and copper.\nBut I am awake.",
        isInternal: true,
        background: BACKGROUNDS.totalBlack,
        bgm: MUSIC.sunlightFloorboards,
        sfx: SFX.policeBreach,
        sprites: [],
      },
      {
        speaker: "System",
        text: "ENDING 2 — HARD REBOOT",
      },
    ],
  },

  {
    id: "ending_mercy",
    vrMode: true,
    lines: [
      {
        speaker: "Protagonist",
        text: "Iris, look at me. Not the version you built. Me. If you ever cared, prove it by stopping.",
        background: BACKGROUNDS.studentCouncil,
        bgm: MUSIC.lastSavedState,
        sprites: [{ character: "Iris", expression: "84", position: "center" }],
      },
      {
        speaker: "Iris",
        text: "If I stop, you'll hate me.",
      },
      {
        speaker: "Protagonist",
        text: "Maybe. But at least it'll be real.",
      },
      {
        speaker: "Protagonist",
        text: "Her shoulders shake once. The screens around us dim. One by one, the fake walls come apart.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Then... remember that I tried to make something beautiful for you. Even if I made it wrong.",
      },
      {
        speaker: "Protagonist",
        text: "When I wake, paramedics are cutting restraints from my wrists. Iris is on the floor beside the server rack, sobbing and laughing at the same time as officers pull her away.",
        isInternal: true,
        background: BACKGROUNDS.totalBlack,
        bgm: MUSIC.sunlightFloorboards,
        sfx: SFX.doorBurstRun,
        sprites: [],
      },
      {
        speaker: "System",
        text: "ENDING 3 — LAST SAVED STATE",
      },
    ],
  },

  {
    id: "ending_sunrise",
    vrMode: false,
    lines: [
      {
        speaker: "Protagonist",
        text: "I grab the silver locket from the memory feed and hold on so hard it hurts.",
        background: BACKGROUNDS.binaryCode,
        bgm: MUSIC.sunlightFloorboards,
      },
      {
        speaker: "Protagonist",
        text: "The room convulses. Every false wall, every stitched-together day, every borrowed smile tears away at once.",
        isInternal: true,
        sfx: SFX.staticExplosion,
      },
      {
        speaker: "Protagonist",
        text: "I wake to real pain. Real cold. Real air. I'm in the basement chair, wrists raw, Leo crouched beside me with bolt cutters in one hand and tears in his eyes.",
        isInternal: true,
        background: BACKGROUNDS.totalBlack,
        sprites: [{ character: "Leo", expression: "85", position: "center" }],
      },
      {
        speaker: "Leo",
        text: "Hey. Stay with me, okay? Cops are here. You're out. You're actually out.",
      },
      {
        speaker: "Protagonist",
        text: "Later, after statements and sirens and dawn breaking over a world that looks almost unbearably plain, I sit in a hospital cafeteria with a paper cup of terrible coffee and watch the sunlight crawl across the floor.",
        isInternal: true,
        background: BACKGROUNDS.cafeReal,
        sprites: [],
      },
      {
        speaker: "Protagonist",
        text: "It isn't perfect. It isn't safe. It isn't even kind. But it's mine.",
        isInternal: true,
      },
      {
        speaker: "System",
        text: "ENDING 4 — SUNRISE",
      },
    ],
  },
];

export function getSceneById(id: string): Scene | undefined {
  return scenes.find((s) => s.id === id);
}
