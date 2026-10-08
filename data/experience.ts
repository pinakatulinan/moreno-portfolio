export interface Script { no: string; name: string; desc: string }
export interface Education { years: string; school: string; detail: string }
export interface Cert { name: string; issuer: string; date: string; image?: string; verify?: string }

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
  { years: "2022 — 2027", school: "Cebu Institute of Technology – University", detail: "BS Information Technology · in progress" },
  { years: "2020 — 2021", school: "Cebu Aeronautical Technical School", detail: "BS Aircraft Maintenance Technology — first year" },
  { years: "2009 — 2020", school: "Saint Cecilia's College", detail: "Elementary, High School and Senior High School" },
];

export const CERTS: Cert[] = [
  { name: "OWASP Top 10", issuer: "Snyk", date: "Sep 15, 2026", image: "/certs/owasp-top-10.png" },
  { name: "AWS Academy Graduate — Cloud Architecting", issuer: "AWS Academy · 60 hours", date: "Oct 13, 2025", image: "/certs/aws-cloud-architecting.png", verify: "https://www.credly.com/go/OlquBJkD" },
  { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS Academy · 20 hours", date: "Sep 4, 2025", image: "/certs/aws-cloud-foundations.png", verify: "https://www.credly.com/go/UTGLXGir" },
  { name: "Proweaver PromptQuest Hackathon", issuer: "Proweaver, Inc. · Participation", date: "Sep 19, 2025", image: "/certs/proweaver-hackathon.png" },
  { name: "Information Management 2 — MySQL", issuer: "CodeChum", date: "Nov 13, 2024", image: "/certs/mysql-codechum.png", verify: "https://citu.codechum.com/certificates/3565" },
  { name: "Data Visualization", issuer: "Kaggle", date: "Sep 19, 2024", image: "/certs/data-visualization.png" },
  { name: "C Programming", issuer: "", date: "May 12, 2024" },
  { name: "Introduction to HTML", issuer: "Sololearn", date: "Feb 11, 2024", image: "/certs/html.jpg" },
];
