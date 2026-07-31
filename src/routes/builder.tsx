import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Download, Loader2, Sparkles, Target, X, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteNav } from "@/components/site-nav";
import { ResumePreview } from "@/components/resume-preview";
import {
  TEMPLATES,
  emptyResume,
  generateBullets,
  generateSummary,
  loadResumes,
  matchScore,
  upsertResume,
  type MatchResult,
  type ResumeData,
  type TemplateId,
} from "@/lib/resume";

export const Route = createFileRoute("/builder")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Resume Builder — ResumeForge AI" },
      {
        name: "description",
        content:
          "Fill in your details, generate an AI-written resume, switch templates, score it against a job description and download the PDF.",
      },
      { property: "og:title", content: "Resume Builder — ResumeForge AI" },
      {
        property: "og:description",
        content: "Live preview resume builder with AI writing, ATS templates and PDF export.",
      },
    ],
  }),
  component: Builder,
});

function Builder() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(() => emptyResume());
  const [skillDraft, setSkillDraft] = useState("");
  const [generating, setGenerating] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [modal, setModal] = useState<null | "ready" | "download" | "saved">(null);

  useEffect(() => {
    if (!id) return;
    const found = loadResumes().find((r) => r.id === id);
    if (found) setData(found);
  }, [id]);

  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const addSkill = () => {
    const v = skillDraft.trim();
    if (!v || data.skills.includes(v)) return;
    set("skills", [...data.skills, v]);
    setSkillDraft("");
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setData((d) => ({
        ...d,
        summary: generateSummary(d),
        bullets: generateBullets(d),
      }));
      setGenerating(false);
      setModal("ready");
    }, 1100);
  };

  const handleOptimize = () => {
    if (!data.jobDescription.trim()) {
      setMatch({ score: 0, matched: [], missing: [] });
      return;
    }
    setOptimizing(true);
    setTimeout(() => {
      setMatch(matchScore(data));
      setOptimizing(false);
    }, 900);
  };

  const handleSave = () => {
    upsertResume(data);
    setModal("saved");
  };

  const handleDownload = () => {
    upsertResume(data);
    setModal("download");
  };

  return (
    <div className="min-h-screen bg-gradient-surface pb-28 lg:pb-10">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
              Resume Builder
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill it in, generate, preview, download.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSave} className="shrink-0">
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* LEFT: form */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Your details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={data.fullName}
                    placeholder="Ammarah Arshad"
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={data.jobTitle}
                    placeholder="Social Media Manager"
                    onChange={(e) => set("jobTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={data.email}
                    placeholder="you@example.com"
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.location}
                    placeholder="Lahore, PK"
                    onChange={(e) => set("location", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="skill">Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skill"
                    value={skillDraft}
                    placeholder="Type a skill and press Enter"
                    onChange={(e) => setSkillDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" variant="soft" onClick={addSkill} className="shrink-0">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
                {data.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.skills.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("skills", data.skills.filter((x) => x !== s))}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                      >
                        {s} <X className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience"
                  rows={5}
                  value={data.experience}
                  placeholder={"One achievement per line\nManaged social channels for 6 brands"}
                  onChange={(e) => set("experience", e.target.value)}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={data.education}
                  placeholder="BSc Marketing — University of the Punjab, 2021"
                  onChange={(e) => set("education", e.target.value)}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="jd">Job Description (optional)</Label>
                <Textarea
                  id="jd"
                  rows={4}
                  value={data.jobDescription}
                  placeholder="Paste the job posting here to score your match"
                  onChange={(e) => set("jobDescription", e.target.value)}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="brand" onClick={handleGenerate} disabled={generating} className="flex-1">
                  {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {generating ? "Writing your resume…" : "Generate Resume"}
                </Button>
                <Button variant="outline" onClick={handleOptimize} disabled={optimizing} className="flex-1">
                  {optimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
                  {optimizing ? "Scanning job post…" : "Optimize for Job"}
                </Button>
              </div>
            </section>

            {/* Templates */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Templates
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set("template", t.id as TemplateId)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      data.template === t.id
                        ? "border-primary bg-secondary shadow-glow"
                        : "border-border hover:-translate-y-0.5 hover:border-primary/40"
                    }`}
                  >
                    <span className="block h-12 rounded-md bg-gradient-brand opacity-80" />
                    <span className="mt-2 block text-sm font-semibold">{t.name}</span>
                    <span className="block text-[11px] leading-tight text-muted-foreground">
                      {t.blurb}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Match score */}
            {match && (
              <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Job Match Score
                  </h2>
                  <span className="text-2xl font-extrabold text-primary">{match.score}%</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-brand transition-all duration-700"
                    style={{ width: `${match.score}%` }}
                  />
                </div>
                {match.matched.length > 0 && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Matched keywords:{" "}
                    <span className="text-foreground">{match.matched.slice(0, 10).join(", ")}</span>
                  </p>
                )}
                {match.missing.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Add these to score higher:{" "}
                    <span className="font-medium text-destructive">{match.missing.join(", ")}</span>
                  </p>
                )}
                {!data.jobDescription.trim() && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Paste a job description above to get a real score.
                  </p>
                )}
              </section>
            )}
          </div>

          {/* RIGHT: preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Live Preview
              </p>
              <Button variant="brand" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
            <ResumePreview data={data} keywords={match?.matched.slice(0, 12) ?? []} />
          </div>
        </div>
      </main>

      {/* Sticky mobile actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <Button variant="brand" className="flex-1" onClick={handleGenerate} disabled={generating}>
          <Sparkles className="h-4 w-4" /> Generate
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleDownload}>
          <Download className="h-4 w-4" /> PDF
        </Button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-5 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-card p-7 text-center shadow-glow">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
              {modal === "download" ? <Download className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </span>
            <h3 className="mt-4 text-lg font-bold">
              {modal === "ready"
                ? "Your resume is ready!"
                : modal === "download"
                  ? "Download ready"
                  : "Resume saved"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {modal === "ready"
                ? "We rewrote your summary and experience. Review it in the preview on the right."
                : modal === "download"
                  ? "Your PDF is prepared. We'll open the print dialog — choose “Save as PDF”."
                  : "You can find it any time in your dashboard."}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {modal === "download" && (
                <Button
                  variant="brand"
                  onClick={() => {
                    setModal(null);
                    setTimeout(() => window.print(), 150);
                  }}
                >
                  Download PDF
                </Button>
              )}
              {modal === "saved" && (
                <Button variant="brand" onClick={() => navigate({ to: "/dashboard" })}>
                  Go to dashboard
                </Button>
              )}
              <Button variant="outline" onClick={() => setModal(null)}>
                {modal === "ready" ? "View resume" : "Close"}
              </Button>
              {modal === "ready" && (
                <Link
                  to="/dashboard"
                  onClick={handleSave}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Save & go to dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
