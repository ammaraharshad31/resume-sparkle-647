import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ResumeForge AI" },
      {
        name: "description",
        content: "Review the ResumeForge AI Terms of Service before using our resume builder.",
      },
      { property: "og:title", content: "Terms of Service — ResumeForge AI" },
      {
        property: "og:description",
        content: "Review the ResumeForge AI Terms of Service before using our resume builder.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          By using ResumeForge AI, you agree to these Terms of Service. Please read them carefully.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Use of the service</h2>
          <p className="mt-3 text-muted-foreground">
            ResumeForge AI provides tools to create, edit, and download resumes. You may use the
            service for lawful purposes only. You are responsible for the accuracy of the
            information you enter.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Accounts and subscriptions</h2>
          <p className="mt-3 text-muted-foreground">
            Some features require an account or subscription. You are responsible for keeping your
            account credentials secure. Subscription fees are billed according to the plan you select.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Intellectual property</h2>
          <p className="mt-3 text-muted-foreground">
            You retain ownership of the content you create. ResumeForge AI owns the software,
            templates, and branding used to deliver the service.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Limitation of liability</h2>
          <p className="mt-3 text-muted-foreground">
            ResumeForge AI is provided as-is. We are not responsible for hiring decisions or outcomes
            resulting from use of the service.
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
