import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ mode: z.enum(["login", "signup"]).optional() }),
  head: () => ({
    meta: [
      { title: "Log in or Sign up — ResumeForge AI" },
      {
        name: "description",
        content: "Access your ResumeForge AI dashboard to manage, edit and download your AI-built resumes.",
      },
      { property: "og:title", content: "Log in or Sign up — ResumeForge AI" },
      { property: "og:description", content: "Sign in to build and manage AI-powered resumes." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">(mode ?? "login");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 900);
  };

  return (
    <div className="grid min-h-screen bg-gradient-surface lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-gradient-brand p-12 text-primary-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold">
          <FileText className="h-5 w-5" /> ResumeForge AI
        </Link>
        <div>
          <h2 className="max-w-sm text-4xl font-extrabold leading-tight">
            Your next role starts with one good page.
          </h2>
          <p className="mt-4 max-w-sm text-sm opacity-90">
            42,000+ job seekers use ResumeForge AI to write, score and export resumes that pass ATS
            filters.
          </p>
        </div>
        <p className="text-xs opacity-70">Design by Ammarah Arshad</p>
      </aside>

      <main className="flex items-center justify-center px-5 py-14">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 text-sm font-bold lg:hidden">
            <FileText className="h-5 w-5 text-primary" /> ResumeForge AI
          </Link>

          <div className="flex rounded-xl bg-secondary p-1">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                }`}
              >
                {t === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <h1 className="mt-8 text-2xl font-bold tracking-tight">
            {tab === "login" ? "Welcome back" : "Create your free account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {tab === "login"
              ? "Log in to pick up where you left off."
              : "No credit card. Your first resume is on us."}
          </p>

          <form className="mt-7 space-y-4" onSubmit={submit}>
            {tab === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Ammarah Arshad" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" variant="brand" className="w-full" disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {tab === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prefer to look around first?{" "}
            <Link to="/builder" className="font-medium text-primary hover:underline">
              Try the builder
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
