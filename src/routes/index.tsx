import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Target,
  ShieldCheck,
  LayoutTemplate,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumeForge AI — Job-Winning Resumes in 60 Seconds" },
      {
        name: "description",
        content:
          "AI resume builder with ATS optimization, job match scoring, live preview and free templates. Build and download a job-winning resume in under a minute.",
      },
      { property: "og:title", content: "ResumeForge AI — Job-Winning Resumes in 60 Seconds" },
      {
        property: "og:description",
        content:
          "AI-powered resume builder that gets you hired faster. Free templates, ATS optimization and instant PDF download.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Resume Generator",
    body: "Turn rough notes into recruiter-ready bullet points and a sharp professional summary.",
  },
  {
    icon: Target,
    title: "Job Match Score",
    body: "Paste a job description and see exactly how well your resume lines up, keyword by keyword.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Optimization",
    body: "Clean, parseable structure that survives applicant tracking systems without losing style.",
  },
  {
    icon: LayoutTemplate,
    title: "Free Templates",
    body: "Modern, Minimal, Corporate and Creative layouts — switch instantly, keep your content.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Three interviews in the first week after rewriting my resume here. The match score told me exactly what was missing.",
    name: "Priya Nair",
    role: "Data Analyst @ Fintech",
  },
  {
    quote:
      "I hate writing about myself. The generator gave me bullets I actually wanted to keep.",
    name: "Marcus Feld",
    role: "Operations Lead",
  },
  {
    quote:
      "Switched to the Corporate template, downloaded the PDF, applied. Offer signed 3 weeks later.",
    name: "Ayesha Khan",
    role: "Social Media Manager",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 text-center sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Trusted by 42,000+ job seekers
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Create a{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Job-Winning Resume
            </span>{" "}
            in 60 Seconds
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            AI-powered resume builder that gets you hired faster.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="brand" size="lg">
              <Link to="/builder">
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">See example resumes</Link>
            </Button>
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
              <div className="rounded-xl bg-secondary/60 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Your input
                </p>
                <p className="mt-3 text-sm font-medium">Social Media Manager</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  managed brand channels, grew followers, ran ads
                </p>
              </div>
              <div className="rounded-xl border border-border p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  AI output
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  “Results-driven Social Media Manager with 3+ years of experience increasing
                  engagement by 45% across paid and organic channels…”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Everything you need to get shortlisted
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center text-3xl font-bold tracking-tight">Hired, not ghosted</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.name}</span> · {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight">Simple pricing</h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Start free. Upgrade when you're applying at scale.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Free
              </p>
              <p className="mt-3 text-4xl font-extrabold">$0</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["1 resume", "Basic templates", "Live preview", "PDF download"].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8 w-full">
                <Link to="/builder">Start Free</Link>
              </Button>
            </div>
            <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-glow">
              <span className="absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                Most popular
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Premium</p>
              <p className="mt-3 text-4xl font-extrabold">
                $12<span className="text-base font-medium text-muted-foreground">/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited resumes",
                  "Advanced AI optimization",
                  "Premium templates",
                  "Job match scoring",
                  "Priority support",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <Button asChild variant="brand" className="mt-8 w-full">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Go Premium
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Sticky CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-5 sm:hidden">
        <Button asChild variant="brand" size="lg" className="pointer-events-auto w-full shadow-glow">
          <Link to="/builder">Start Free</Link>
        </Button>
      </div>
    </div>
  );
}
