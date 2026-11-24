export type SectionId = "home" | "projects" | "about" | "experience" | "skills" | "education" | "contact" | "resume";

/** kanji = section title in Japanese, kana = reading, num = kanji numeral. */
export interface Section { id: SectionId; label: string; kanji: string; kana: string; num: string }

export const SECTIONS: Section[] = [
  { id: "home", label: "Home", kanji: "序", kana: "jo", num: "一" },
  { id: "projects", label: "Projects", kanji: "作品", kana: "sakuhin", num: "二" },
  { id: "about", label: "About", kanji: "私", kana: "watashi", num: "三" },
  { id: "experience", label: "Experience", kanji: "経験", kana: "keiken", num: "四" },
  { id: "skills", label: "Skills", kanji: "技", kana: "waza", num: "五" },
  { id: "education", label: "Education & certs", kanji: "学び", kana: "manabi", num: "六" },
  { id: "contact", label: "Contact", kanji: "縁", kana: "en", num: "七" },
  { id: "resume", label: "Résumé", kanji: "履歴書", kana: "rirekisho", num: "八" },
];

export const sectionById = (id: SectionId) => SECTIONS.find((x) => x.id === id)!;

export const FACTS: [string, string][] = [
  ["Studying", "BS Information Technology, CIT-U"],
  ["Working", "Export Team, JobTarget"],
  ["Focus", "Full-stack web & mobile"],
  ["Hackathon", "Proweaver Hackathon 2025"],
  ["Motto", "限界を超えろ — surpass your limits"],
];
