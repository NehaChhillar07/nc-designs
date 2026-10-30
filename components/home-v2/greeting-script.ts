// The greeting's before-paint script, in its own module: it is imported by the
// server page, and a constant exported from a "use client" file would arrive
// there as a client reference instead of the string.

const GREETED_KEY = "v2-greeted";
export const PLAYING_FLAG = "__v2GreetPlaying";
export const SIGN_FLAG = "__v2SignPlaying";

// Runs inline, before first paint, from app/v2/page.tsx. The name is signed
// on every page load (signature.tsx); the greeting plays once per session.
// Reduced-motion users get neither. Phones skip the greeting itself (on a
// phone a full-screen greeting reads as a loader, not a hello) but still see
// the signature, which plays in place on a page that is already there. When
// something should play, it leaves a one-time flag for the component to find.
// sessionStorage can throw (private mode, blocked storage): then both simply
// play, which is harmless.
export const greetingScript = `(function(){var d=document.documentElement,w=window;
if(matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-v2-greet","skip");d.setAttribute("data-v2-sign","skip");return}
w.${SIGN_FLAG}=1;try{
if(sessionStorage.getItem("${GREETED_KEY}")||matchMedia("(max-width: 767px)").matches){d.setAttribute("data-v2-greet","skip");sessionStorage.setItem("${GREETED_KEY}","1");return}
sessionStorage.setItem("${GREETED_KEY}","1");
}catch(e){}
w.${PLAYING_FLAG}=1})();`;
