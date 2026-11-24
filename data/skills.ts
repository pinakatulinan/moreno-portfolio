/** jp = a kanji for the area, read = its reading. */
export interface SkillArea { no: string; area: string; jp: string; read: string; tools: string[] }

export const SKILLS: SkillArea[] = (
  [
    ["Frontend", "表", "omote · the front", ["HTML", "CSS", "Tailwind CSS", "JavaScript", "ReactJS"]],
    ["Backend", "裏", "ura · the back", ["Spring Boot", "Django", "FastAPI", "Node.js"]],
    ["Databases", "蔵", "kura · storehouse", ["MySQL", "Supabase", "Firebase"]],
    ["Mobile", "携", "kei · to carry", ["Kotlin", "Android Studio", "XML", "React Native"]],
    ["Automation", "自動", "jidō · automatic", ["EY ServiceNow", "Puppeteer", "Casper"]],
    ["AI tooling", "知", "chi · knowledge", ["Google Antigravity", "ChatGPT Pro", "Claude Code"]],
    ["UI/UX design", "意匠", "ishō · design", ["Figma"]],
    ["Graphic design", "絵", "e · picture", ["Canva"]],
  ] as [string, string, string, string[]][]
).map(([area, jp, read, tools], i) => ({ area, jp, read, tools, no: String(i + 1).padStart(2, "0") }));

export const SOFT_SKILLS: string[] = [
  "Communicates and coordinates well with the team",
  "Works independently and finishes assigned tasks",
  "Strong attention to detail",
  "Stays calm under pressure",
  "Problem analysis and solving",
  "Organizes tasks and manages time efficiently",
];
