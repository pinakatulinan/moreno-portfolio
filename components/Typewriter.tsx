"use client";

import { useEffect, useState } from "react";
import s from "./Typewriter.module.css";

const TYPE_MS = 65;
const HOLD_MS = 1800;
const DELETE_MS = 30;
const GAP_MS = 300;

export default function Typewriter({ words }: { words: string[] }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let w = 0;
    let i = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;

    const step = () => {
      const word = words[w];
      if (!deleting) {
        i++;
        setTyped(word.slice(0, i));
        if (i >= word.length) {
          deleting = true;
          t = setTimeout(step, HOLD_MS);
          return;
        }
        t = setTimeout(step, TYPE_MS);
      } else {
        i--;
        setTyped(word.slice(0, i));
        if (i <= 0) {
          deleting = false;
          w = (w + 1) % words.length;
          t = setTimeout(step, GAP_MS);
          return;
        }
        t = setTimeout(step, DELETE_MS);
      }
    };
    step();
    return () => clearTimeout(t);
  }, [words]);

  return (
    <>
      {/* Screen readers get the full list instead of a stream of characters */}
      <span className="sr-only">{words.join(" ")}</span>
      <span aria-hidden="true">
        <span className={s.typed}>{typed}</span>
        <span className={s.caret} />
      </span>
    </>
  );
}
