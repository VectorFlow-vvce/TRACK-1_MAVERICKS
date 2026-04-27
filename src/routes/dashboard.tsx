import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { SchemeCard } from "@/components/SchemeCard";
import { useTranslation } from "@/context/LanguageContext";
import { matchSchemes, type UserProfile, type BenefitType } from "@/data/schemes";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const TABS: Array<{ key: BenefitType | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "cash", label: "Cash" },
  { key: "subsidy", label: "Subsidy" },
  { key: "loan", label: "Loan" },
  { key: "service", label: "Service" },
];

function Dashboard() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<BenefitType | "all">("all");

  const profile: UserProfile = useMemo(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("benefitbridge_profile") || "{}"); } catch { return {}; }
  }, []);

  const schemes = useMemo(() => matchSchemes(profile), [profile]);
  const filtered = tab === "all" ? schemes : schemes.filter((s) => s.benefit_type === tab);
  const total = schemes.reduce((sum, s) => sum + (s.match_score >= 60 ? s.annual_benefit_inr : 0), 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavBar />
      <main className="max-w-2xl mx-auto px-5 py-6 fade-in">
        <div className="rounded-2xl p-5 mb-6 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
          <p className="text-sm text-muted-foreground">💰 {t("totalBenefit")}</p>
          <p className="text-3xl font-bold text-primary mt-1">₹{total.toLocaleString("en-IN")}</p>
          <p className="text-sm text-foreground mt-1">{t("schemesFound", { n: schemes.length })}</p>
        </div>

        <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === tb.key ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((s) => <SchemeCard key={s.id} scheme={s} />)}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
