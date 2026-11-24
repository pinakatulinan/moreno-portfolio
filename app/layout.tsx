import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { THEME_INIT_SCRIPT } from "@/data/theme";

// Japanese fonts: Google serves them in unicode-range slices, so the browser only
// downloads the slices for the kanji/kana actually on the page.
const mincho = Shippori_Mincho({
  weight: ["500", "700", "800"],
  variable: "--font-mincho",
  display: "swap",
  preload: false,
});
const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  variable: "--font-gothic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Kyle Ezekiel D. Moreno — Full-stack Developer · 限界を超えろ",
  description:
    "Full-stack developer based in Cebu, PH. I build web platforms, mobile apps, automation scripts and AI-powered tools.",
  openGraph: {
    title: "Kyle Ezekiel D. Moreno — Full-stack Developer",
    description: "Full-stack developer based in Cebu, PH. Open to full-stack roles.",
    url: SITE.url,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f2ece1" }, { media: "(prefers-color-scheme: dark)", color: "#14120f" }] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mincho.variable} ${gothic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
