import {
  shapeTraits,
  characterTypes,
  moods,
  posesActions,
  silhouetteRules,
  textureDetails,
  beginnerChallenges,
  colorPalettes,
  weirdConstraints,
  difficulties
} from "../data/prompts";

export { spells, shapeTraits, characterTypes, moods, posesActions, silhouetteRules, textureDetails, beginnerChallenges, colorPalettes, weirdConstraints, difficulties } from "../data/prompts";

export interface PromptData {
  id: string;
  title: string;
  shapes: [string, string];
  characterType: string;
  mood: string;
  pose: string;
  silhouetteRule: string;
  texture: string;
  challenge: string;
  palette: string;
  weirdConstraint: string;
  difficulty: typeof difficulties[number];
  createdAt: number;
}

export function pickRandom<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePrompt(): PromptData {
  const shape1 = pickRandom(shapeTraits);
  let shape2 = pickRandom(shapeTraits);
  while (shape2 === shape1) {
    shape2 = pickRandom(shapeTraits);
  }

  const charType = pickRandom(characterTypes);
  const mood = pickRandom(moods);
  
  const titleWords = charType.split(" ");
  const capitalizedCharType = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const capitalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1);
  const title = `The ${capitalizedMood} ${capitalizedCharType}`;

  return {
    id: crypto.randomUUID(),
    title,
    shapes: [shape1, shape2],
    characterType: charType,
    mood: mood,
    pose: pickRandom(posesActions),
    silhouetteRule: pickRandom(silhouetteRules),
    texture: pickRandom(textureDetails),
    challenge: pickRandom(beginnerChallenges),
    palette: pickRandom(colorPalettes),
    weirdConstraint: pickRandom(weirdConstraints),
    difficulty: pickRandom(difficulties),
    createdAt: Date.now(),
  };
}

export function formatPromptText(p: PromptData): string {
  return `Draw a ${p.shapes[0]} and ${p.shapes[1]} ${p.characterType} who feels ${p.mood}, ${p.pose}. 
Silhouette rule: ${p.silhouetteRule}. 
Texture: ${p.texture}. 
Challenge: ${p.challenge}. 
Weird constraint: ${p.weirdConstraint}. 
Palette: ${p.palette}.`;
}
