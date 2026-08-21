"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollRevealProvider({ children }: { children: ReactNode }) {
  useScrollReveal();
  return <>{children}</>;
}
