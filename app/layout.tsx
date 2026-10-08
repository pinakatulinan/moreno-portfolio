import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { THEME_INIT_SCRIPT } from "@/data/theme";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Kyle Ezekiel D. Moreno — Full-stack Developer",
  description:
    "Full-stack developer based in Cebu, PH. I build web platforms, mobile apps, automation scripts and AI-powered tools.",
  openGraph: {
    title: "Kyle Ezekiel D. Moreno — Full-stack Developer",
    description: "Full-stack developer based in Cebu, PH. Open to full-stack roles.",
    url: SITE.url,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f3f2f2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
