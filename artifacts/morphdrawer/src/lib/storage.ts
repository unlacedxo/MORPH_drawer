import { useState, useEffect } from "react";
import { PromptData } from "./generator";

const SAVED_KEY = "morphdrawer-saved";
const THEME_KEY = "morphdrawer-theme";

export function getSavedPrompts(): PromptData[] {
  try {
    const item = localStorage.getItem(SAVED_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

export function savePrompt(prompt: PromptData) {
  const saved = getSavedPrompts();
  if (!saved.find(p => p.id === prompt.id)) {
    localStorage.setItem(SAVED_KEY, JSON.stringify([prompt, ...saved]));
  }
}

export function deleteSavedPrompt(id: string) {
  const saved = getSavedPrompts();
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved.filter(p => p.id !== id)));
}

export function clearSavedPrompts() {
  localStorage.removeItem(SAVED_KEY);
}

export function useSavedPrompts() {
  const [prompts, setPrompts] = useState<PromptData[]>(getSavedPrompts());

  useEffect(() => {
    const handleStorage = () => setPrompts(getSavedPrompts());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const save = (p: PromptData) => {
    savePrompt(p);
    setPrompts(getSavedPrompts());
  };

  const remove = (id: string) => {
    deleteSavedPrompt(id);
    setPrompts(getSavedPrompts());
  };

  const clear = () => {
    clearSavedPrompts();
    setPrompts([]);
  };

  return { prompts, save, remove, clear };
}

export function useTheme() {
  const [theme, setThemeState] = useState<string>(() => {
    return localStorage.getItem(THEME_KEY) || "moth-dust";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
