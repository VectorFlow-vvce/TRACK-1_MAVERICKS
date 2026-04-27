import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText, ExternalLink, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { SCHEMES } from "@/data/schemes";
import { useTranslation } from "@/context/LanguageContext";
import type { LangKey } from "@/data/translations";
import { BottomNavBar } from "@/components/BottomNavBar";

export const Route = createFileRoute("/scheme/$id")({ component: SchemeDetail });

function SchemeDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const k = lang as LangKey;
  const scheme = SCHEMES.find((s) => s.id === id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const storageKey = `bb_docs_${id}`;

  useEffect(() => {
    try { setChecked(JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch {}
  }, [storageKey]);

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">Not found</div>
    );
  }

  const toggle = (doc: string) => {
    const next = { ...checked, [doc]: !checked[doc] };
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate({ to: "/dashboard" })} aria-label={t("backBtn")}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground line-clamp-1">{scheme.name[k]}</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-5 py-6 fade-in space-y-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted-foreground">{scheme.ministry}</span>
            <span className="rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-medium uppercase">{scheme.benefit_type}</span>
          </div>
          <p className="text-3xl font-bold text-primary">{scheme.benefit_display[k]}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("matchScore")}: <span className="text-foreground font-semibold">{scheme.match_score}%</span></p>
        </div>

        <div className="rounded-xl bg-card border border-border border-l-4 border-l-success p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">✅ {t("whyQualify")}</h3>
          <p className="text-sm text-muted-foreground">{scheme.why_qualify[k]}</p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> {t("documentsRequired")}
          </h3>
          <ul className="space-y-2">
            {scheme.documents.map((d) => (
              <li key={d}>
                <label className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!checked[d]} onChange={() => toggle(d)} className="h-4 w-4 accent-[--color-primary]" />
                  <span className={`text-sm ${checked[d] ? "line-through text-muted-foreground" : "text-foreground"}`}>{d}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-3">📋 {t("stepsToApply")}</h3>
          <ol className="space-y-4 relative">
            <span className="absolute left-4 top-2 bottom-2 w-px bg-border" aria-hidden />
            {scheme.steps[k].map((s, i) => (
              <li key={i} className="flex gap-3 relative">
                <span className="z-10 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <p className="pt-1 text-sm text-foreground">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={scheme.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
          >
            {t("applyNow")} <ExternalLink className="h-4 w-4" />
          </a>
          <Link
            to="/chat"
            className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg border border-primary/40 text-primary font-medium hover:bg-primary/10"
          >
            <MessageCircle className="h-4 w-4" /> {t("askAI")}
          </Link>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
