import { INTRO, INTRO_SESSION_KEY, STILL } from "./introTimeline";

/**
 * Runs in <head>, before first paint, so there is never a flash of the page
 * followed by an overlay. It only decides; the opening itself is markup and
 * CSS (Intro.tsx).
 *
 * The opening plays when ALL of these hold:
 *  - this is the home page, with no #anchor (a link to a section skips it);
 *  - it is the first page view of this browser session (or ?intro is in the URL);
 *  - the visitor has not asked to save data.
 * Its mode: "still" under reduced motion (a short title card that never blocks
 * the page), "lite" on phones, touch screens and low-core devices (a lighter
 * particle budget), otherwise "full". If it does not play nothing is set,
 * and the overlay stays display:none.
 *
 * Without JavaScript this never runs, so the overlay never appears. A timer
 * is the failsafe: if the opening has not started (Intro.tsx sets
 * data-intro-live when it starts the clock) within INTRO.wait, it is ended,
 * so the page can never stay covered or held back. Once it has started, the
 * opening ends itself (its own timers, and the CSS "vanish" animation).
 * On localhost it plays on every load, for development.
 */
export const introGateScript = `(function(){var d=document.documentElement;try{
var isDev=location.hostname==="localhost"||location.hostname==="127.0.0.1";
var seen=false;
try{seen=sessionStorage.getItem(${JSON.stringify(INTRO_SESSION_KEY)})==="1"}catch(e){}
var force=/[?&]intro(=|&|$)/.test(location.search)||isDev;
var save=navigator.connection&&navigator.connection.saveData;
if(location.pathname!=="/"||location.hash||save||(seen&&!force))return;
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var lite=matchMedia("(max-width: 47.99rem), (pointer: coarse)").matches||(navigator.hardwareConcurrency||8)<4;
d.setAttribute("data-intro","play");
d.setAttribute("data-intro-mode",reduce?"still":lite?"lite":"full");
setTimeout(function(){var s=d.getAttribute("data-intro");if((s==="play"||s==="exiting")&&!d.hasAttribute("data-intro-live"))d.setAttribute("data-intro","done")},reduce?${STILL.failsafe}:isDev?${INTRO.failsafe * 3}:${INTRO.wait});
}catch(e){}})();`;
