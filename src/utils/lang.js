/* Translation helper and utility functions */

export function smoothScrollToTop() {
  const start = window.scrollY;
  const duration = 500;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start * (1 - ease));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function fallbackImg(e) {
  e.target.src = "/images/logo.jpg";
}

/**
 * Translate a language object to the requested language.
 * Falls back: requested lang → en → fr → ar → ""
 */
export function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || obj.fr || obj.ar || "";
}
