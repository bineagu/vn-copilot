import type { Scene } from "./types";

// Asset paths
export const BACKGROUNDS = {
  classroom: "/backgrounds/1. The Classroom (Late Afternoon).png",
  schoolGates: "/backgrounds/3. The School Gates (Sunset).png",
  bedroom: "/backgrounds/4. Protagonist's Bedroom (Night).png",
  darkStreet: "/backgrounds/5. The Dark Street.png",
};

export const CHARACTERS = {
  irisReal: "/characters/Iris real.png",
  irisVR: "/characters/Iris vr.png",
  chloe: "/characters/Chloe.png",
  maya: "/characters/Maya.png",
};

export const MUSIC = {
  graySuburbia: "/music/1 Three_PM_Kitchen_Table.mp3",
  obsession: "/music/2 Breath_Behind_the_Door.mp3",
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
        background: BACKGROUNDS.classroom,
        bgm: null,
      },
      {
        speaker: "Protagonist",
        text: "Around me, the classroom empties in a blur of scraped chairs and overlapping conversations. I don't really tune into them. It's just noise. White noise in a gray room.",
        isInternal: true,
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
        sprites: [
          { character: "Iris", expression: "neutral", position: "center" },
        ],
      },
      {
        speaker: "Protagonist",
        text: "I hesitate. Usually, I'd just put my headphones in and walk past. But her gaze snaps to me the second my foot hits the pavement.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "Oh! {playerName}!",
        sprites: [
          { character: "Iris", expression: "smile", position: "center" },
        ],
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
      },
      {
        speaker: "Protagonist",
        text: "She takes a step closer. The gravel crunches under her shoes. She smells faintly of lavender, but underneath it, there's a sharp, metallic scent. Like copper.",
        isInternal: true,
      },
      {
        speaker: "Iris",
        text: "I like the view from here. It's the view of where you spend your day.",
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
        sprites: [
          { character: "Iris", expression: "hurt", position: "center" },
        ],
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
        sprites: [
          { character: "Iris", expression: "blushing", position: "center" },
        ],
      },
      {
        speaker: "Iris",
        text: "Sweet? You think I'm sweet?!",
      },
      {
        speaker: "Protagonist",
        text: "She takes another step forward, entirely invading my personal space. She reaches out, her fingertips lightly brushing the fabric of my uniform sleeve.",
        isInternal: true,
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
        sprites: [
          { character: "Iris", expression: "manic", position: "center" },
        ],
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
        background: BACKGROUNDS.bedroom,
        bgm: MUSIC.graySuburbia,
      },
      {
        speaker: "Protagonist",
        text: "The house is completely silent. My parents are working the night shift again. It's just me, the hum of my computer tower, and the occasional rattle of the wind against the glass.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "I'm trying to focus on a history assignment, but the words keep swimming on the screen. My mind keeps drifting back to the school gate. To Iris.",
        isInternal: true,
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
      },
      {
        speaker: "Protagonist",
        text: "The figure flinches violently. The camera nearly drops from her hands. She doesn't say a word, doesn't even look up to meet my eyes. She just turns and bolts down the street, disappearing into the dark.",
        isInternal: true,
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
        background: BACKGROUNDS.bedroom,
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
      },
      {
        speaker: "Protagonist",
        text: "I open a text file. It's a massive spreadsheet.\nDates. Times. GPS coordinates.\nMonday, 8:02 AM: Walked past the bakery.\nTuesday, 4:15 PM: Stayed at the arcade for exactly 42 minutes.\nSunday, 2:00 AM: Pacing in bedroom. (Heart rate elevated?)",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "How... how does she know my heart rate?",
      },
      {
        speaker: "Protagonist",
        text: "I back out of the folder, feeling sick. There's another folder. Audio_Board.",
        isInternal: true,
      },
      {
        speaker: "Protagonist",
        text: "Inside are dozens of small .wav files. I click one at random.",
        isInternal: true,
      },
      {
        speaker: "Audio",
        text: '(Static hiss) "...hey Leo, do you... want to... grab lunch?"',
      },
      {
        speaker: "Protagonist",
        text: "It's my voice. But it sounds weird. Chopped up.\nI click another one.",
        isInternal: true,
      },
      {
        speaker: "Audio",
        text: '(Static hiss) "...I... love... you... Iris."',
      },
      {
        speaker: "Protagonist",
        text: "I rip my headphones off my ears, throwing them onto the desk.",
        isInternal: true,
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
