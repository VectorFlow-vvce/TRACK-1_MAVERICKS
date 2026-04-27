import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shield, Check, Loader2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export const Route = createFileRoute("/loading")({ component: Loading });

function Loading() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const id = setTimeout(() => navigate({ to: "/dashboard" }), 1800);
    return () => clearTimeout(id);
  }, [navigate]);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <Shield className="h-16 w-16 text-primary spin-slow mb-6" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">{t("findingSchemes")}</h2>
      <p className="text-sm text-muted-foreground mb-8">{t("encouraging")}</p>
      <ul className="space-y-3 text-left">
        <li className="flex items-center gap-3 text-success"><Check className="h-5 w-5" /> {t("profileAnalyzed")}</li>
        <li className="flex items-center gap-3 text-primary"><Loader2 className="h-5 w-5 animate-spin" /> {t("matchingSchemes")}</li>
        <li className="flex items-center gap-3 text-muted-foreground"><span className="h-5 w-5 rounded border border-border" /> {t("calculatingBenefits")}</li>
      </ul>
    </div>
  );
}
