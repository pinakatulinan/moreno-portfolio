export interface SkillArea { no: string; area: string; tools: string[] }

export const SKILLS: SkillArea[] = (
  [
    ["Frontend", ["HTML", "CSS", "Tailwind CSS", "JavaScript", "ReactJS"]],
    ["Backend", ["Spring Boot", "Django", "FastAPI", "Node.js"]],
    ["Databases", ["MySQL", "Supabase", "Firebase"]],
    ["Mobile", ["Kotlin", "Android Studio", "XML", "React Native"]],
    ["Automation", ["EY ServiceNow", "Puppeteer", "Casper"]],
    ["AI tooling", ["Google Antigravity", "ChatGPT Pro", "Claude Code"]],
    ["UI/UX design", ["Figma"]],
    ["Graphic design", ["Canva"]],
  ] as [string, string[]][]
).map(([area, tools], i) => ({ area, tools, no: String(i + 1).padStart(2, "0") }));

export const SOFT_SKILLS: string[] = [
  "Communicates and coordinates well with the team",
  "Works independently and finishes assigned tasks",
  "Strong attention to detail",
  "Stays calm under pressure",
  "Problem analysis and solving",
  "Organizes tasks and manages time efficiently",
];
