import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import type { Scheme } from "@/data/schemes";
import type { LangKey } from "@/data/translations";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const borderByType: Record<Scheme["benefit_type"], string> = {
  cash: "border-l-success",
  service: "border-l-info",
  subsidy: "border-l-primary",
  loan: "border-l-purple",
};

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const { t, lang } = useTranslation();
  const k = lang as LangKey;
  const strong = scheme.match_score >= 80;
  const fit = scheme.match_score >= 60;

  return (
    <Link
      to="/scheme/$id"
      params={{ id: scheme.id }}
      className={cn(
        "block rounded-xl bg-card border border-border border-l-4 p-4 hover:border-primary/40 transition-colors",
        borderByType[scheme.benefit_type],
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-foreground leading-snug">{scheme.name[k]}</h3>
        <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted-foreground">
          {scheme.ministry}
        </span>
      </div>
      <p className="text-xl font-bold text-primary mb-2">{scheme.benefit_display[k]}</p>
      {strong ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-success/15 text-success text-xs font-medium px-2 py-1 mb-2">
          <CheckCircle2 className="h-3.5 w-3.5" /> {t("strongFit")}
        </span>
      ) : fit ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 text-warning text-xs font-medium px-2 py-1 mb-2">
          <Zap className="h-3.5 w-3.5" /> {t("likelyFit")}
        </span>
      ) : null}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{scheme.why_qualify[k]}</p>
      <div className="flex items-center justify-end text-primary text-sm font-medium">
        {t("howToApply")} <ArrowRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
}
