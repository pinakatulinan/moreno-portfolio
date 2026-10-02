export interface Script { no: string; name: string; desc: string }
export interface Education { years: string; school: string; detail: string }
export interface Cert { name: string; date: string }

export const SCRIPTS: Script[] = (
  [
    ["Autoconfirm", "Confirms whether each job posting actually went live."],
    ["Autoposting", "Posts manually created job postings by connecting them to a script."],
    ["Autodelete", "Removes expired postings so they never get stuck in listings."],
    ["Autoedit", "Updates postings whose fields need changes."],
    ["Formatter", "Formats posting input fields based on the mapping."],
  ] as const
).map(([name, desc], i) => ({ name, desc, no: String(i + 1).padStart(2, "0") }));

export const EDUCATION: Education[] = [
  { years: "2022 — 2027", school: "Cebu Institute of Technology – University", detail: "BS Information Technology" },
  { years: "2020 — 2021", school: "Cebu Aeronautical Technical School", detail: "BS Aircraft Maintenance Technology — first year" },
  { years: "2009 — 2020", school: "Saint Cecilia's College", detail: "Elementary, High School and Senior High School" },
];

export const CERTS: Cert[] = [
  { name: "AWS Academy Foundation & Architecting", date: "Sep – Oct 2025" },
  { name: "Proweaver Hackathon 2025", date: "2025" },
  { name: "Information Management 2 — MySQL (CodeChum)", date: "Nov 12, 2024" },
  { name: "Data Visualization", date: "Sep 19, 2024" },
  { name: "C Programming", date: "May 12, 2024" },
  { name: "HTML", date: "Feb 11, 2024" },
];
