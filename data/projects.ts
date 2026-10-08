export type ProjectCategory = "Web" | "Mobile" | "AI" | "Automation";
export type Filter = "All" | ProjectCategory;

export interface Project {
  id: string;
  no: string;
  kicker: string;
  title: string;
  cats: ProjectCategory[];
  platform: string;
  status: string;
  short: string;
  desc: string;
  stack: string[];
  role: string;
  github?: string;
}

const RAW: Omit<Project, "no">[] = [
  {
    id: "archiquest",
    kicker: "Capstone",
    title: "Archiquest",
    cats: ["Web", "AI"],
    platform: "Web",
    status: "Capstone project",
    short: "AI reads architectural floor plans and generates structural cost estimates.",
    desc: "A web-based platform for Architecture students and teachers to practice their cost-estimation skills. AI analyzes an architectural floor plan and automatically generates structural cost estimates.",
    stack: ["ReactJS", "Python", "Gemini AI API", "HTML/CSS"],
    role: "Full-stack Developer",
    github: "https://github.com/immatchAA/cost-estimator",
  },
  {
    id: "happymed",
    kicker: "Ongoing",
    title: "HappyMed Pharmacy POS",
    cats: ["Web"],
    platform: "Web (responsive)",
    status: "In development",
    short: "A responsive point-of-sale for sales and inventory at our family pharmacy.",
    desc: "A responsive Point of Sale system I am currently developing to handle sales and inventory management for our new business.",
    stack: ["HTML", "CSS", "JavaScript", "Java", "Spring Boot", "MySQL"],
    role: "Full-stack Developer",
    github: "https://github.com/kinatulinan/HappyMed",
  },
  {
    id: "barangay",
    kicker: "Civic platform",
    title: "Barangay Management System",
    cats: ["Web"],
    platform: "Web",
    status: "Completed",
    short: "Barangay services online — certificates, complaints, appointments and records.",
    desc: "A full-stack web platform that brings barangay services online. Residents request certificates, file complaints, book appointments and follow announcements, while barangay officials manage residents, process requests, log blotter cases and view barangay-wide statistics — all from one system.",
    stack: ["HTML", "CSS", "JavaScript", "Java", "Spring Boot", "Supabase"],
    role: "Full-stack Developer",
    github: "https://github.com/pinakatulinan/Barangay-Management-System",
  },
  {
    id: "jays",
    kicker: "Cross-platform",
    title: "Jay's Fitness Gym",
    cats: ["Mobile", "Web"],
    platform: "iOS · Android · Web",
    status: "Completed",
    short: "Memberships, class scheduling and check-ins from one codebase.",
    desc: "A membership, class-scheduling and check-in platform for Jay's Fitness Gym — one codebase that ships as an iOS app, an Android app and a website.",
    stack: ["Expo", "React Native", "Expo Router", "NativeWind", "Supabase"],
    role: "Full-stack Developer",
    github: "https://github.com/pinakatulinan/Jays-Fitness-Gym",
  },
  {
    id: "fitflow",
    kicker: "Mobile",
    title: "FitFlow",
    cats: ["Mobile", "AI"],
    platform: "Android · Web",
    status: "Completed",
    short: "Personalized workouts, smart meals and activity tracking driven by AI.",
    desc: "A comprehensive fitness application offering personalized workout plans, smart meal suggestions and activity tracking — built to motivate users through analytics and AI-driven plans.",
    stack: ["Kotlin", "Java", "Spring Boot", "Firebase", "HTML", "CSS", "JavaScript"],
    role: "Mobile Developer — integrated frontend and backend",
    github: "https://github.com/kimasaph/IT342_FitFlow",
  },
  {
    id: "ukay",
    kicker: "E-commerce",
    title: "Project U-Kay",
    cats: ["Web"],
    platform: "Web",
    status: "Completed",
    short: "A marketplace to buy and sell thrift clothing online.",
    desc: "An e-commerce website that lets users buy and sell thrift clothing online.",
    stack: ["ReactJS", "Java"],
    role: "Full-stack Developer",
    github: "https://github.com/kinatulinan/ProjectUkay",
  },
  {
    id: "clearance",
    kicker: "ServiceNow course",
    title: "Barangay Clearance Services",
    cats: ["Automation"],
    platform: "ServiceNow",
    status: "Completed",
    short: "Automated barangay clearance requests, approval and email delivery.",
    desc: "A project applying the skills from our ServiceNow course subject: requesting and getting a barangay clearance. A request from the user triggers an automated flow, and once the barangay approves it, an email is sent automatically so the user can receive the clearance they requested.",
    stack: ["ServiceNow Automation"],
    role: "Developer",
  },
];

export const PROJECTS: Project[] = RAW.map((p, i) => ({ ...p, no: String(i + 1).padStart(2, "0") }));

export const FILTERS: Filter[] = ["All", "Web", "Mobile", "AI", "Automation"];

export const countFor = (f: Filter): string =>
  String(f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.cats.includes(f)).length).padStart(2, "0");

export const TYPEWRITER_WORDS = [
  "web platforms.",
  "mobile apps.",
  "automation scripts.",
  "AI-powered tools.",
  "systems that ship.",
];
