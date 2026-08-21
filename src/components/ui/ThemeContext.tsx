"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeAccent = "cobalt" | "emerald" | "violet" | "amber" | "crimson";

export interface AccentOption {
  id: ThemeAccent;
  name: string;
  color: string;
  glow: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { id: "cobalt", name: "Signal Cobalt", color: "#4F7FFF", glow: "rgba(79, 127, 255, 0.4)" },
  { id: "emerald", name: "Matrix Emerald", color: "#10B981", glow: "rgba(16, 185, 129, 0.4)" },
  { id: "violet", name: "Hyper Violet", color: "#A855F7", glow: "rgba(168, 85, 247, 0.4)" },
  { id: "amber", name: "Solar Amber", color: "#F59E0B", glow: "rgba(245, 158, 11, 0.4)" },
  { id: "crimson", name: "Crimson Pulse", color: "#EF4444", glow: "rgba(239, 68, 68, 0.4)" },
];

interface ThemeContextType {
  accent: ThemeAccent;
  setAccent: (accent: ThemeAccent) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  accent: "cobalt",
  setAccent: () => {},
  soundEnabled: false,
  setSoundEnabled: () => {},
  toggleSound: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<ThemeAccent>("cobalt");
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem("portfolio_accent") as ThemeAccent;
      if (savedAccent && ACCENT_OPTIONS.some((a) => a.id === savedAccent)) {
        document.documentElement.setAttribute("data-accent", savedAccent);
      } else {
        document.documentElement.setAttribute("data-accent", "cobalt");
      }
    } catch {}
  }, []);

  const setAccent = (newAccent: ThemeAccent) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem("portfolio_accent", newAccent);
    } catch {}
    document.documentElement.setAttribute("data-accent", newAccent);
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      localStorage.setItem("portfolio_sound", String(enabled));
    } catch {}
  };

  const toggleSound = () => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio_sound", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
