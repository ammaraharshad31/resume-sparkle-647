import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ResumeForge AI" },
      {
        name: "description",
        content: "Read the ResumeForge AI Privacy Policy to understand how we protect your data.",
      },
      { property: "og:title", content: "Privacy Policy — ResumeForge AI" },
      {
        property: "og:description",
        content: "Read the ResumeForge AI Privacy Policy to understand how we protect your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Your privacy matters. This policy explains what information ResumeForge AI collects, how
          we use it, and the choices you have.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <p className="mt-3 text-muted-foreground">
            We collect the information you provide when building your resume, such as your name,
            contact details, work experience, skills, and education. We also collect basic usage
            data to improve the product.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">How we use your information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>To generate, format, and display your resume.</li>
            <li>To save your progress and let you manage your resumes.</li>
            <li>To improve our AI suggestions and user experience.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Data security</h2>
          <p className="mt-3 text-muted-foreground">
            We use industry-standard security measures to protect your data. We do not sell your
            personal information to third parties.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Contact us</h2>
          <p className="mt-3 text-muted-foreground">
            If you have questions about this Privacy Policy, please reach out through our support
            channels.
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
