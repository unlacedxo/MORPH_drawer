import { motion } from "framer-motion";
import { tips } from "../data/prompts";
import { Lightbulb } from "lucide-react";

export default function Tips() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Classroom Tips</h1>
        <p className="text-muted-foreground mt-1 font-mono">Gentle reminders for when you get stuck.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-card-border p-6 rounded-2xl sketchy-border shadow-sm break-inside-avoid"
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">{tip.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {tip.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}