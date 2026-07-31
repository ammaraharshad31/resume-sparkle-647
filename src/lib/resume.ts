export type TemplateId = "modern" | "minimal" | "corporate" | "creative";

export type ResumeData = {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  jobDescription: string;
  summary: string;
  bullets: string[];
  template: TemplateId;
  updatedAt: string;
};

export const TEMPLATES: { id: TemplateId; name: string; blurb: string }[] = [
  { id: "modern", name: "Modern", blurb: "Bold name, clean sections" },
  { id: "minimal", name: "Minimal", blurb: "Thin type, black & white" },
  { id: "corporate", name: "Corporate", blurb: "Structured with dividers" },
  { id: "creative", name: "Creative", blurb: "Accent panel, expressive" },
];

export function emptyResume(): ResumeData {
  return {
    id: crypto.randomUUID(),
    fullName: "",
    jobTitle: "",
    email: "",
    location: "",
    skills: [],
    experience: "",
    education: "",
    jobDescription: "",
    summary: "",
    bullets: [],
    template: "modern",
    updatedAt: new Date().toISOString(),
  };
}

const VERBS = [
  "Spearheaded",
  "Owned",
  "Scaled",
  "Led",
  "Streamlined",
  "Launched",
];

/** Simulated AI writer — deterministic, realistic phrasing. */
export function generateSummary(data: ResumeData): string {
  const title = data.jobTitle.trim() || "Professional";
  const years = Math.max(2, Math.min(9, (data.experience.length % 7) + 3));
  const top = data.skills.slice(0, 3);
  const skillLine = top.length
    ? ` Specialised in ${top.join(", ")}.`
    : " Adaptable across fast-moving, cross-functional teams.";
  return `Results-driven ${title} with ${years}+ years of experience delivering measurable business impact — including a 45% lift in core performance metrics and consistent on-time delivery across high-visibility projects.${skillLine} Known for turning ambiguous goals into shipped outcomes.`;
}

export function generateBullets(data: ResumeData): string[] {
  const title = data.jobTitle.trim() || "the team";
  const lines = data.experience
    .split(/\n+/)
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

  const rewritten = lines.slice(0, 4).map((line, i) => {
    const verb = VERBS[i % VERBS.length];
    const metric = [42, 31, 27, 58][i % 4];
    return `${verb} ${line.charAt(0).toLowerCase()}${line.slice(1)} — driving a ${metric}% improvement in team output.`;
  });

  if (rewritten.length) return rewritten;
  return [
    `Delivered end-to-end projects as ${title}, improving delivery speed by 42%.`,
    "Partnered with design, data and leadership to prioritise the highest-impact work.",
    "Built repeatable processes and documentation adopted across the wider org.",
  ];
}

export type MatchResult = { score: number; matched: string[]; missing: string[] };

const STOP = new Set(
  "the a an and or for with to of in on at by we you your our is are be as that this will have has from their they it its who what more than experience work working role team teams strong plus must should can able".split(
    " ",
  ),
);

export function matchScore(data: ResumeData): MatchResult {
  const jd = data.jobDescription.toLowerCase();
  const words = Array.from(
    new Set(
      jd
        .split(/[^a-z+#.]+/)
        .map((w) => w.replace(/^\.+|\.+$/g, ""))
        .filter((w) => w.length > 2 && !STOP.has(w)),
    ),
  );
  const haystack = [
    data.skills.join(" "),
    data.experience,
    data.education,
    data.summary,
    data.bullets.join(" "),
    data.jobTitle,
  ]
    .join(" ")
    .toLowerCase();

  const keywords = words.slice(0, 24);
  const matched = keywords.filter((w) => haystack.includes(w));
  const missing = keywords.filter((w) => !haystack.includes(w)).slice(0, 8);
  const base = keywords.length ? (matched.length / keywords.length) * 100 : 0;
  const bonus = Math.min(18, data.skills.length * 2.5);
  const score = Math.round(Math.max(38, Math.min(97, base * 0.8 + bonus + 12)));
  return { score, matched, missing };
}

const KEY = "airesume.resumes";

export function loadResumes(): ResumeData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return SEED;
    return JSON.parse(raw) as ResumeData[];
  } catch {
    return SEED;
  }
}

export function saveResumes(list: ResumeData[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertResume(resume: ResumeData) {
  const list = loadResumes();
  const idx = list.findIndex((r) => r.id === resume.id);
  const next = { ...resume, updatedAt: new Date().toISOString() };
  if (idx >= 0) list[idx] = next;
  else list.unshift(next);
  saveResumes(list);
  return list;
}

export const SEED: ResumeData[] = [
  {
    id: "seed-1",
    fullName: "Ammarah Arshad",
    jobTitle: "Social Media Manager",
    email: "ammarah@example.com",
    location: "Lahore, PK",
    skills: ["Content Strategy", "Meta Ads", "Analytics", "Copywriting"],
    experience:
      "Managed social channels for 6 consumer brands\nBuilt a content calendar shipping 40 posts per month",
    education: "BSc Marketing — University of the Punjab, 2021",
    jobDescription: "",
    summary:
      "Results-driven Social Media Manager with 3+ years of experience increasing engagement by 45% across paid and organic channels.",
    bullets: [
      "Spearheaded social channels for 6 consumer brands — driving a 42% improvement in team output.",
      "Owned a content calendar shipping 40 posts per month — driving a 31% improvement in team output.",
    ],
    template: "modern",
    updatedAt: "2026-07-12T10:00:00.000Z",
  },
  {
    id: "seed-2",
    fullName: "Daniel Okafor",
    jobTitle: "Product Designer",
    email: "daniel@example.com",
    location: "Berlin, DE",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    experience: "Led redesign of a B2B analytics dashboard used by 12k seats",
    education: "BA Interaction Design — UdK Berlin, 2019",
    jobDescription: "",
    summary:
      "Results-driven Product Designer with 5+ years of experience shipping enterprise interfaces that reduce time-to-insight.",
    bullets: [
      "Spearheaded redesign of a B2B analytics dashboard used by 12k seats — driving a 42% improvement in team output.",
    ],
    template: "corporate",
    updatedAt: "2026-06-28T10:00:00.000Z",
  },
];
