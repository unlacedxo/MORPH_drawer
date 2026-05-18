import { useState } from "react";
import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  shapeTraits, characterTypes, moods, posesActions, silhouetteRules,
  textureDetails, beginnerChallenges, colorPalettes, weirdConstraints
} from "../data/prompts";
import { pickRandom } from "../lib/generator";

interface Mode {
  id: string;
  title: string;
  description: string;
  generate: () => string;
}

const modes: Mode[] = [
  {
    id: "silhouette",
    title: "Silhouette Mode",
    description: "Focus on readability from afar.",
    generate: () => `Draw a ${pickRandom(shapeTraits)} & ${pickRandom(shapeTraits)} ${pickRandom(characterTypes)}. Rule: ${pickRandom(silhouetteRules)}.`
  },
  {
    id: "expression",
    title: "Expression Mode",
    description: "Practice facial expressions and mood.",
    generate: () => {
      const char = pickRandom(characterTypes);
      const m1 = pickRandom(moods);
      let m2 = pickRandom(moods);
      let m3 = pickRandom(moods);
      while(m2 === m1) m2 = pickRandom(moods);
      while(m3 === m1 || m3 === m2) m3 = pickRandom(moods);
      return `Draw a ${char}. Draw 3 expressions: ${m1}, ${m2}, and ${m3}.`;
    }
  },
  {
    id: "outfit",
    title: "Outfit Mode",
    description: "Design clothing and accessories.",
    generate: () => `Draw a ${pickRandom(characterTypes)}. Texture: ${pickRandom(textureDetails)}. Constraint: ${pickRandom(weirdConstraints)}.`
  },
  {
    id: "creature",
    title: "Creature Mode",
    description: "Combine weird traits into a monster.",
    generate: () => `Draw a ${pickRandom(shapeTraits)} & ${pickRandom(shapeTraits)} ${pickRandom(characterTypes)}. Constraint: ${pickRandom(weirdConstraints)}.`
  },
  {
    id: "shape-remix",
    title: "Shape Remix Mode",
    description: "Build a character from restricted shapes.",
    generate: () => {
      const s1 = pickRandom(shapeTraits);
      let s2 = pickRandom(shapeTraits);
      let s3 = pickRandom(shapeTraits);
      while(s2===s1) s2 = pickRandom(shapeTraits);
      while(s3===s1 || s3===s2) s3 = pickRandom(shapeTraits);
      return `Build a character using ONLY these 3 shape types: ${s1}, ${s2}, ${s3}.`
    }
  },
  {
    id: "color",
    title: "Color Constraint",
    description: "Limit your palette.",
    generate: () => `Draw a ${pickRandom(moods)} ${pickRandom(characterTypes)}. Palette: ${pickRandom(colorPalettes)}. Rule: Use ONLY 2 of the 3 colors.`
  },
  {
    id: "prop",
    title: "Prop Mode",
    description: "Focus on interaction with objects.",
    generate: () => `Draw a ${pickRandom(characterTypes)}, ${pickRandom(posesActions)}.`
  },
  {
    id: "redraw",
    title: "Redraw Mode",
    description: "Improve an old sketch.",
    generate: () => `Take an old drawing and: ${pickRandom([
      "simplify the shapes by 50%", 
      `change the mood to ${pickRandom(moods)}`, 
      `add a weird constraint: ${pickRandom(weirdConstraints)}`, 
      `push the silhouette: ${pickRandom(silhouetteRules)}`
    ])}.`
  },
  {
    id: "sticker",
    title: "Sticker Mode",
    description: "Clean, iconic designs.",
    generate: () => `Draw a ${pickRandom(shapeTraits)} ${pickRandom(characterTypes)}. Rule: Make it read as a clean sticker (small, simple, max 4 details).`
  },
  {
    id: "procreate",
    title: "Procreate Mode",
    description: "Tool-specific practice.",
    generate: () => `Using the Monoline brush, sketch a ${pickRandom(characterTypes)} using ONLY shape layers. Focus on: ${pickRandom(beginnerChallenges)}. Canvas: 1000x1000px.`
  }
];

export default function Practice() {
  const [results, setResults] = useState<Record<string, string>>({});

  const roll = (mode: Mode) => {
    setResults(prev => ({ ...prev, [mode.id]: mode.generate() }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Practice Labs</h1>
        <p className="text-muted-foreground mt-1 font-mono">Bite-sized exercises for specific skills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-card-border p-5 rounded-2xl sketchy-border shadow-sm flex flex-col h-full"
          >
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold mb-1">{mode.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
              
              {results[mode.id] && (
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 mb-4 text-sm font-medium text-foreground">
                  {results[mode.id]}
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => roll(mode)} 
              variant="secondary"
              className="w-full sketchy-border tactile-hover mt-auto font-mono text-sm"
            >
              <Dices className="w-4 h-4 mr-2" />
              {results[mode.id] ? "Reroll" : "Roll"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}