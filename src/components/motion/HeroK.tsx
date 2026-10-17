"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// The WebGL scene is a separate chunk, loaded only on the client and only
// after the page has finished loading, so it can never compete with the
// portrait (the page's LCP element), fonts or CSS.
const KField = dynamic(() => import("./KField").then((module) => module.KField), { ssr: false });

type Status = "pending" | "ready" | "unsupported";

/**
 * The hero's K. An outlined K is drawn by CSS from the first paint, as the
 * static version for phones that skip the scene, browsers without WebGL and
 * the moments before it loads. When the particle K is ready it crossfades
 * in. Decorative; hidden from assistive technology.
 */
export function HeroK({ className }: { className?: string }) {
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    // Data-saver and very small screens keep the static K.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    let idle = 0;
    let timer = 0;
    let wait: MutationObserver | undefined;
    // requestIdleCallback is missing in Safari; fall back to a short timer.
    const ric = (window as { requestIdleCallback?: typeof window.requestIdleCallback }).requestIdleCallback;
    const begin = () => {
      if (ric) idle = ric(() => setLoad(true), { timeout: 1500 });
      else timer = window.setTimeout(() => setLoad(true), 300);
    };
    const afterLoad = () => {
      if (document.readyState === "complete") begin();
      else window.addEventListener("load", begin, { once: true });
    };

    // While the opening plays, and while it opens onto the page, the particle
    // K waits: it should assemble where it can be seen, and its first-load
    // set-up (a long task) must not land in the middle of the hand-over.
    const root = document.documentElement;
    const opening = () => root.dataset.intro === "play" || root.dataset.intro === "exiting";
    if (opening()) {
      wait = new MutationObserver(() => {
        if (opening()) return;
        wait?.disconnect();
        afterLoad();
      });
      wait.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
    } else {
      afterLoad();
    }
    return () => {
      wait?.disconnect();
      window.removeEventListener("load", begin);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <span
        className={cn(
          "k-fallback absolute inset-0 grid place-items-center transition-opacity duration-1000",
          status === "ready" && "opacity-0",
        )}
      >
        K
      </span>
      {load && <KField onStatus={(ok) => setStatus(ok ? "ready" : "unsupported")} className="absolute inset-0" />}
    </div>
  );
}
