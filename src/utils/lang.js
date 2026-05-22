/* Translation helper and utility functions */

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
