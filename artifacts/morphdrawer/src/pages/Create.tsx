import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PromptData, generatePrompt, spells, pickRandom } from "../lib/generator";
import { PromptCard } from "../components/PromptCard";
import { Sparkles, History } from "lucide-react";

export default function Create() {
  const [currentPrompt, setCurrentPrompt] = useState<PromptData | null>(null);
  const [history, setHistory] = useState<PromptData[]>([]);
  const [spell, setSpell] = useState<string>("");

  useEffect(() => {
    setSpell(pickRandom(spells));
    handleNewPrompt();
  }, []);

  const handleNewPrompt = () => {
    const newPrompt = generatePrompt();
    setCurrentPrompt(newPrompt);
    setHistory((prev) => {
      const newHistory = [newPrompt, ...prev];
      return newHistory.slice(0, 10); // Keep last 10
    });
  };

  const handleRestorePrompt = (prompt: PromptData) => {
    setCurrentPrompt(prompt);
  };

  if (!currentPrompt) return null;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center gap-2 text-sm font-mono text-primary/80 bg-primary/10 px-4 py-1.5 rounded-full sketchy-border mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Today's Drawing Spell</span>
        </div>
        <p className="font-display text-xl sm:text-2xl text-foreground">"{spell}"</p>
      </div>

      <AnimatePresence mode="wait">
        <PromptCard key={currentPrompt.id} prompt={currentPrompt} onNewPrompt={handleNewPrompt} />
      </AnimatePresence>

      {history.length > 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
            <History className="w-4 h-4" />
            <span>Recent Spells</span>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-3 snap-x">
            {history.slice(1).map((p) => (
              <button
                key={p.id}
                onClick={() => handleRestorePrompt(p)}
                className="snap-start shrink-0 bg-card hover:bg-muted border border-border px-4 py-2 rounded-lg sketchy-border text-sm font-medium transition-colors tactile-hover"
              >
                {p.title}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}