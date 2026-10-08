export type SectionId = "home" | "projects" | "about" | "experience" | "skills" | "education" | "contact" | "resume";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education & certs" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Résumé" },
];

export const FACTS: [string, string][] = [
  ["Studying", "BS Information Technology, CIT-U"],
  ["Working", "Export Team, JobTarget"],
  ["Focus", "Full-stack web & mobile"],
  ["Hackathon", "Proweaver Hackathon 2025"],
];
