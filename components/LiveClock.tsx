"use client";

import { useSyncExternalStore } from "react";

/* One shared 1s ticker for every clock on the page. Server render and the
   first client render both show "--:--:--" so hydration never mismatches. */
const listeners = new Set<() => void>();
let current = "--:--:--";
let timer: ReturnType<typeof setInterval> | null = null;

const format = () =>
  new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour12: false });

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    current = format();
    timer = setInterval(() => {
      current = format();
      listeners.forEach((l) => l());
    }, 1000);
    queueMicrotask(() => listeners.forEach((l) => l()));
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export default function LiveClock({ suffix = "" }: { suffix?: string }) {
  const time = useSyncExternalStore(subscribe, () => current, () => "--:--:--");
  return (
    <time suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
      {time}
      {suffix}
    </time>
  );
}
