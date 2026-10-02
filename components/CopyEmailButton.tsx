"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";

export default function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    // Fire and forget: a pending/blocked clipboard permission shouldn't stall the label.
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className={`btn ${className ?? ""}`} onClick={copy} data-cursor="link" aria-live="polite">
      {copied ? "Copied ✓" : "Copy email"} <Copy size={16} strokeWidth={2} aria-hidden />
    </button>
  );
}
