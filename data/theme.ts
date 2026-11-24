/** 夜 Yoru — night palette: sumi ink ground, washi text, moonlit accents. */
export const DARK: Record<string, string> = {
  "--color-bg": "#14120f", "--color-surface": "#1e1b17", "--color-text": "#ede6d8",
  "--color-accent": "#e0533f",
  "--color-neutral-100": "#1e1b17", "--color-neutral-200": "#29251f", "--color-neutral-300": "#3a352d", "--color-neutral-400": "#57503f",
  "--color-neutral-500": "#7f7766", "--color-neutral-600": "#a1998a", "--color-neutral-700": "#b8b0a1", "--color-neutral-800": "#d8d0c1", "--color-neutral-900": "#ede6d8",
  "--color-accent-100": "#2e1511", "--color-accent-200": "#4a1d15", "--color-accent-300": "#7a2416",
  "--color-accent-600": "#e86b57", "--color-accent-700": "#f08a74", "--color-accent-800": "#f6b3a4", "--color-accent-900": "#fbd9d0",
  "--color-divider": "rgba(237,230,216,.24)",
  "--sun": "#efe2bf", "--sun-glow": "rgba(239,226,191,.22)", "--ink": "#ede6d8",
  "--petal": "#d98fa0", "--petal-2": "#efc2cc",
  "--shoji-paper": "#2a251f", "--shoji-wood": "#0b0a08",
};

export type Theme = "light" | "dark";
export const THEME_KEY = "km-theme";

export function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.dataset.theme = t;
  Object.entries(DARK).forEach(([k, v]) => (t === "dark" ? root.style.setProperty(k, v) : root.style.removeProperty(k)));
  try { localStorage.setItem(THEME_KEY, t); } catch {}
}

/** Runs before first paint (inline in <head>) so dark mode doesn't flash. */
export const THEME_INIT_SCRIPT = `(function(){try{var r=document.documentElement;r.style.setProperty('--km-on-accent','#f8dcd3');r.style.setProperty('--km-on-accent-hi','#fff8ee');var t=localStorage.getItem('${THEME_KEY}')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');r.dataset.theme=t;if(t==='dark'){var d=${JSON.stringify(DARK)};for(var k in d)r.style.setProperty(k,d[k]);}}catch(e){}})();`;
