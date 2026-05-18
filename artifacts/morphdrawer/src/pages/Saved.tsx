import { motion, AnimatePresence } from "framer-motion";
import { useSavedPrompts } from "../lib/storage";
import { PromptCard } from "../components/PromptCard";
import { BookDashed, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Saved() {
  const { prompts, clear } = useSavedPrompts();

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Saved Spells</h1>
          <p className="text-muted-foreground mt-1 font-mono">Your personal grimoire of creatures.</p>
        </div>
        {prompts.length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your sketchbook? This cannot be undone.")) {
                clear();
              }
            }}
            className="sketchy-border text-destructive hover:bg-destructive/10 hover:text-destructive w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {prompts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center px-4"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 sketchy-border">
            <BookDashed className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="font-display text-xl text-foreground mb-2">Your sketchbook is empty.</p>
          <p className="text-muted-foreground">Head to Create to catch your first character.</p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} isSavedView />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}