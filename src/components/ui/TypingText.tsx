"use client";

import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  words: string[];
  className?: string;
  /** Delay before typing starts (ms) */
  startDelay?: number;
}

export function TypingText({ words, className = "", startDelay = 600 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState(words[0] || "");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const currentWord = words[wordIndex] || "";
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 0 : 2200;

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          return;
        }
      }
    };

    timeoutRef.current = setTimeout(tick, displayed.length === 0 && !isDeleting ? startDelay : typeSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, wordIndex, words, startDelay]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-0.5 align-middle bg-current animate-pulse opacity-70"
        aria-hidden="true"
      />
    </span>
  );
}
