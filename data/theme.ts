export const DARK: Record<string, string> = {
  "--color-bg": "#181716", "--color-surface": "#232120", "--color-text": "#f3f2f2",
  "--color-neutral-100": "#232120", "--color-neutral-200": "#2d2b2a", "--color-neutral-300": "#3d3a39", "--color-neutral-400": "#5a5655",
  "--color-neutral-500": "#807b7a", "--color-neutral-600": "#a09b9a", "--color-neutral-700": "#b5b0af", "--color-neutral-800": "#d7d3d3", "--color-neutral-900": "#f3f2f2",
  "--color-accent-100": "#33150f", "--color-accent-200": "#4d1c12", "--color-accent-300": "#7c1405",
  "--color-accent-700": "#ff8a70", "--color-accent-800": "#ffb3a3", "--color-accent-900": "#ffd9d0",
  "--color-divider": "rgba(243,242,242,.32)",
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
export const THEME_INIT_SCRIPT = `(function(){try{var r=document.documentElement;r.style.setProperty('--km-on-accent','#201e1d');r.style.setProperty('--km-on-accent-hi','#f3f2f2');var t=localStorage.getItem('${THEME_KEY}')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');r.dataset.theme=t;if(t==='dark'){var d=${JSON.stringify(DARK)};for(var k in d)r.style.setProperty(k,d[k]);}}catch(e){}})();`;
