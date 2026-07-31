import type { ResumeData } from "@/lib/resume";

function Highlight({ text, keywords }: { text: string; keywords: string[] }) {
  if (!keywords.length) return <>{text}</>;
  const re = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        keywords.some((k) => k.toLowerCase() === p.toLowerCase()) ? (
          <mark key={i} className="rounded bg-accent px-1 text-accent-foreground">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function ResumePreview({
  data,
  keywords = [],
}: {
  data: ResumeData;
  keywords?: string[];
}) {
  const name = data.fullName.trim() || "Your Name";
  const title = data.jobTitle.trim() || "Your Job Title";
  const contact = [data.email, data.location].filter(Boolean).join("  ·  ");
  const t = data.template;

  const shell =
    t === "creative"
      ? "grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-0 overflow-hidden"
      : "p-8 sm:p-10";

  const heading =
    t === "modern"
      ? "text-3xl font-extrabold tracking-tight"
      : t === "minimal"
        ? "text-2xl font-light tracking-[0.18em] uppercase"
        : t === "corporate"
          ? "text-2xl font-semibold tracking-tight uppercase"
          : "text-3xl font-black tracking-tight";

  const sectionTitle =
    t === "minimal"
      ? "text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
      : t === "corporate"
        ? "text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-1"
        : t === "creative"
          ? "text-xs font-bold uppercase tracking-widest text-primary"
          : "text-xs font-bold uppercase tracking-widest text-primary";

  const Body = (
    <div className={t === "creative" ? "p-7" : ""}>
      {t !== "creative" && (
        <header className={t === "corporate" ? "border-b-2 border-foreground pb-4" : "pb-4"}>
          <h2 className={heading}>{name}</h2>
          <p className="mt-1 text-sm font-medium text-primary">{title}</p>
          {contact && <p className="mt-1 text-xs text-muted-foreground">{contact}</p>}
        </header>
      )}

      <section className="mt-6">
        <h3 className={sectionTitle}>Professional Summary</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {data.summary ? (
            <Highlight text={data.summary} keywords={keywords} />
          ) : (
            <span className="text-muted-foreground">
              Fill the form and hit Generate Resume — your AI-written summary appears here.
            </span>
          )}
        </p>
      </section>

      <section className="mt-6">
        <h3 className={sectionTitle}>Experience</h3>
        <ul className="mt-2 space-y-2">
          {(data.bullets.length
            ? data.bullets
            : data.experience.split(/\n+/).filter(Boolean)
          ).map((b, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
              <span className={t === "minimal" ? "text-muted-foreground" : "text-primary"}>—</span>
              <span>
                <Highlight text={b} keywords={keywords} />
              </span>
            </li>
          ))}
          {!data.bullets.length && !data.experience.trim() && (
            <li className="text-sm text-muted-foreground">No experience added yet.</li>
          )}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className={sectionTitle}>Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.skills.length ? (
            data.skills.map((s) => (
              <span
                key={s}
                className={
                  t === "minimal"
                    ? "border-b border-foreground/30 text-sm"
                    : "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                }
              >
                <Highlight text={s} keywords={keywords} />
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No skills added yet.</span>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h3 className={sectionTitle}>Education</h3>
        <p className="mt-2 text-sm text-foreground/90">
          {data.education ? (
            <Highlight text={data.education} keywords={keywords} />
          ) : (
            <span className="text-muted-foreground">No education added yet.</span>
          )}
        </p>
      </section>
    </div>
  );

  return (
    <div
      id="resume-sheet"
      className={`rounded-xl border border-border bg-card text-card-foreground shadow-soft ${shell} ${
        t === "minimal" ? "font-light" : ""
      }`}
    >
      {t === "creative" && (
        <aside className="bg-gradient-brand p-7 text-primary-foreground">
          <h2 className="text-2xl font-black leading-tight">{name}</h2>
          <p className="mt-2 text-sm opacity-90">{title}</p>
          {contact && <p className="mt-4 text-xs opacity-80">{contact}</p>}
        </aside>
      )}
      {Body}
    </div>
  );
}
