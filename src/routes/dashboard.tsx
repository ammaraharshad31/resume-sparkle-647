import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { loadResumes, saveResumes, type ResumeData } from "@/lib/resume";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ResumeForge AI" },
      {
        name: "description",
        content: "Manage your saved resumes: edit, duplicate or delete them, and start a new one in seconds.",
      },
      { property: "og:title", content: "Dashboard — ResumeForge AI" },
      { property: "og:description", content: "All your saved AI resumes in one place." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  useEffect(() => setResumes(loadResumes()), []);

  const remove = (id: string) => {
    const next = resumes.filter((r) => r.id !== id);
    setResumes(next);
    saveResumes(next);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-surface">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">Your resumes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {resumes.length} saved · Free plan allows 1 active resume
            </p>
          </div>
          <Button asChild variant="brand" className="shrink-0">
            <Link to="/builder">
              <Plus className="h-4 w-4" /> New resume
            </Link>
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border bg-card p-14 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium">No resumes yet</p>
            <Button asChild variant="brand" className="mt-5">
              <Link to="/builder">Create your first resume</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((r) => (
              <article
                key={r.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
                  {r.template}
                </span>
                <h2 className="mt-3 truncate text-lg font-bold">{r.fullName || "Untitled resume"}</h2>
                <p className="text-sm text-primary">{r.jobTitle || "No job title"}</p>
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {r.summary || "No summary generated yet."}
                </p>
                <p className="mt-4 text-[11px] text-muted-foreground">
                  Updated {new Date(r.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-5 flex gap-2">
                  <Button
                    size="sm"
                    variant="soft"
                    className="flex-1"
                    onClick={() => navigate({ to: "/builder", search: { id: r.id } })}
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => remove(r.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
