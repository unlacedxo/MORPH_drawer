import { useTheme, clearSavedPrompts } from "../lib/storage";
import { Button } from "../components/ui/button";
import { Trash2, Palette, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const themes = [
  { id: "moth-dust", name: "Moth Dust", colors: ["bg-[#D1C6BB]", "bg-[#433A31]", "bg-[#A77B99]"] },
  { id: "bone-archive", name: "Bone Archive", colors: ["bg-[#EAE4DB]", "bg-[#472E21]", "bg-[#4D4D4D]"] },
  { id: "lunar-static", name: "Lunar Static", colors: ["bg-[#181C25]", "bg-[#A3B8CC]", "bg-[#7966A6]"] },
  { id: "cathedral-dust", name: "Cathedral Dust", colors: ["bg-[#BDB7B2]", "bg-[#3D2E4D]", "bg-[#D4A335]"] }
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all saved prompts?")) {
      clearSavedPrompts();
      window.dispatchEvent(new Event("storage")); // Trigger update in other tabs/components
      toast({ title: "Sketchbook cleared.", duration: 2000 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground font-mono">Configure your workspace.</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Palette className="w-5 h-5" />
          <h2 className="font-display text-xl font-bold">Atmosphere</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={clsx(
                "p-4 rounded-2xl sketchy-border border text-left transition-all tactile-hover flex items-center justify-between",
                theme === t.id 
                  ? "bg-primary text-primary-foreground border-primary shadow-md" 
                  : "bg-card border-card-border hover:bg-muted text-foreground"
              )}
            >
              <span className="font-medium font-mono text-sm">{t.name}</span>
              <div className="flex gap-1">
                {t.colors.map((c, i) => (
                  <div key={i} className={clsx("w-4 h-4 rounded-full border border-black/10", c)} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-2 mb-4 text-destructive">
          <Trash2 className="w-5 h-5" />
          <h2 className="font-display text-xl font-bold">Data Management</h2>
        </div>
        <div className="bg-card border border-card-border p-6 rounded-2xl sketchy-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Clear Sketchbook</p>
            <p className="text-sm text-muted-foreground mt-1">Permanently delete all saved prompts. They cannot be recovered.</p>
          </div>
          <Button variant="destructive" onClick={handleClear} className="sketchy-border w-full sm:w-auto">
            Clear All Data
          </Button>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Info className="w-5 h-5" />
          <h2 className="font-display text-xl font-bold text-foreground">About MORPHDRAWER</h2>
        </div>
        <motion.div 
          className="bg-card border border-card-border p-6 rounded-2xl sketchy-border prose prose-sm dark:prose-invert"
        >
          <p className="text-muted-foreground leading-relaxed">
            MORPHDRAWER is a pocket-sized creature workshop designed for beginner artists. 
            All data lives safely in your browser's local storage. No tracking, no servers, 
            just a quiet place to generate strange and wonderful drawing prompts.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Embrace the blobs. Don't worry about perfect lines. Let the shapes tell you what they want to be.
          </p>
        </motion.div>
      </section>
    </div>
  );
}