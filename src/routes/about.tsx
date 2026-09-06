import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ResumeForge AI" },
      {
        name: "description",
        content: "Discover how ResumeForge AI helps job seekers create ATS-optimized resumes in seconds.",
      },
      { property: "og:title", content: "About Us — ResumeForge AI" },
      {
        property: "og:description",
        content: "Discover how ResumeForge AI helps job seekers create ATS-optimized resumes in seconds.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
        <p className="mt-4 text-muted-foreground">
          ResumeForge AI is an AI-powered resume builder designed to take the stress out of job
          applications. Whether you are switching careers, entering the workforce, or aiming for a
          promotion, we help you craft a resume that gets noticed.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>Enter your experience, skills, and education.</li>
            <li>Let our AI transform rough notes into polished, recruiter-ready content.</li>
            <li>Pick a template, preview your resume live, and download a PDF in seconds.</li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Built for results</h2>
          <p className="mt-3 text-muted-foreground">
            From ATS-friendly formatting to job match scoring, every feature is built around one
            goal: helping you land more interviews.
          </p>
        </section>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
