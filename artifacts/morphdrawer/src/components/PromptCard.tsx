import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Copy, Sparkles, Tag } from "lucide-react";
import { PromptData, formatPromptText } from "../lib/generator";
import { useSavedPrompts } from "../lib/storage";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";
import { clsx } from "clsx";

interface PromptCardProps {
  prompt: PromptData;
  onNewPrompt?: () => void;
  isSavedView?: boolean;
}

export function PromptCard({ prompt, onNewPrompt, isSavedView }: PromptCardProps) {
  const { prompts: savedPrompts, save, remove } = useSavedPrompts();
  const { toast } = useToast();

  const isSaved = savedPrompts.some((p) => p.id === prompt.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatPromptText(prompt));
    toast({
      title: "Copied to clipboard!",
      description: "Ready to paste into Procreate or your notes.",
      duration: 2000,
    });
  };

  const handleToggleSave = () => {
    if (isSaved) {
      remove(prompt.id);
      if (!isSavedView) {
        toast({ title: "Removed from saved.", duration: 2000 });
      }
    } else {
      save(prompt);
      toast({ title: "Saved to your sketchbook!", duration: 2000 });
    }
  };

  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
    Apprentice: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    Intermediate: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-card text-card-foreground border border-card-border p-6 sm:p-8 rounded-2xl sketchy-border shadow-md relative"
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <Badge variant="outline" className={clsx("font-mono text-xs rounded-full sketchy-border", difficultyColors[prompt.difficulty])}>
          {prompt.difficulty}
        </Badge>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 pr-24 leading-tight">
        {prompt.title}
      </h2>

      <div className="space-y-4 text-base sm:text-lg leading-relaxed mb-8">
        <p>
          Draw a <strong className="text-primary">{prompt.shapes[0]}</strong> and{" "}
          <strong className="text-primary">{prompt.shapes[1]}</strong>{" "}
          <span className="underline decoration-wavy decoration-accent/50 underline-offset-4">{prompt.characterType}</span> who feels{" "}
          <em>{prompt.mood}</em>, {prompt.pose}.
        </p>
        <p>
          <span className="font-bold font-mono text-sm text-muted-foreground uppercase tracking-wider">Silhouette rule:</span>{" "}
          {prompt.silhouetteRule}.
        </p>
        <p>
          <span className="font-bold font-mono text-sm text-muted-foreground uppercase tracking-wider">Texture:</span>{" "}
          {prompt.texture}.
        </p>
        <div className="bg-accent/10 p-4 rounded-xl sketchy-border border border-accent/20">
          <p>
            <span className="font-bold font-mono text-sm text-accent uppercase tracking-wider flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3" /> Beginner Focus
            </span>
            {prompt.challenge}
          </p>
        </div>
        <p>
          <span className="font-bold font-mono text-sm text-muted-foreground uppercase tracking-wider">Weird constraint:</span>{" "}
          {prompt.weirdConstraint}.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="secondary" className="sketchy-border bg-secondary/50 text-secondary-foreground">
          <Tag className="w-3 h-3 mr-1" /> {prompt.palette}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onNewPrompt && (
          <Button
            onClick={onNewPrompt}
            size="lg"
            className="flex-1 font-display text-lg tracking-wide tactile-hover sketchy-border bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New Prompt
          </Button>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size={onNewPrompt ? "icon" : "default"}
            onClick={handleToggleSave}
            className="tactile-hover sketchy-border bg-card hover:bg-muted shrink-0 w-full sm:w-auto"
            title={isSaved ? "Remove from saved" : "Save prompt"}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
            {!onNewPrompt && <span className="ml-2">{isSaved ? "Saved" : "Save"}</span>}
          </Button>
          <Button
            variant="outline"
            size={onNewPrompt ? "icon" : "default"}
            onClick={handleCopy}
            className="tactile-hover sketchy-border bg-card hover:bg-muted shrink-0 w-full sm:w-auto"
            title="Copy for Procreate"
          >
            <Copy className="w-5 h-5" />
            {!onNewPrompt && <span className="ml-2">Copy</span>}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}