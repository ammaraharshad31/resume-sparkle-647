import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — ResumeForge AI" },
      {
        name: "description",
        content: "Learn about ResumeForge AI, our mission, and the team behind the job-winning resume builder.",
      },
      { property: "og:title", content: "Company — ResumeForge AI" },
      {
        property: "og:description",
        content: "Learn about ResumeForge AI, our mission, and the team behind the job-winning resume builder.",
      },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Company</h1>
        <p className="mt-4 text-muted-foreground">
          ResumeForge AI is on a mission to make job searching fairer, faster, and more effective.
          We build AI-powered tools that help candidates present their best selves and land the
          opportunities they deserve.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Our mission</h2>
          <p className="mt-3 text-muted-foreground">
            Everyone deserves a shot at their dream role. We believe great candidates are often
            overlooked because they struggle to articulate their value on paper. ResumeForge AI
            bridges that gap with intelligent guidance, instant feedback, and recruiter-ready
            formatting.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">What we stand for</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Clarity over buzzwords — every suggestion is designed to communicate real impact.</li>
            <li>Fairness by default — our tools help level the playing field for all job seekers.</li>
            <li>Privacy first — your data is yours and never sold to third parties.</li>
          </ul>
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
