import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { VoiceMicButton } from "@/components/VoiceMicButton";
import { Progress } from "@/components/ui/progress";
import type { UserProfile } from "@/data/schemes";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const TOTAL = 8;

function Onboarding() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<UserProfile>({});
  const [draft, setDraft] = useState("");

  const setAns = (patch: Partial<UserProfile>) => setAnswers((a) => ({ ...a, ...patch }));

  const next = () => {
    if (step < TOTAL) {
      setStep(step + 1);
      setDraft("");
    } else {
      localStorage.setItem("benefitbridge_profile", JSON.stringify(answers));
      navigate({ to: "/loading" });
    }
  };
  const back = () => step > 1 && setStep(step - 1);

  const questions = [t("state"), t("income"), t("occupation"), t("category"), t("age"), t("gender"), t("aadhaar"), t("land")];

  const onTranscript = (text: string) => {
    setDraft(text);
    handleAnswer(text);
  };

  const handleAnswer = (val: string) => {
    switch (step) {
      case 1: setAns({ state: val }); break;
      case 2: {
        const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
        setAns({ income: isFinite(num) ? num : 0 }); break;
      }
      case 5: {
        const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
        setAns({ age: isFinite(num) ? num : 0 }); break;
      }
      default: setAns({ state: val });
    }
  };

  const chip = (label: string, onClick: () => void, active?: boolean) => (
    <button
      key={label}
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 text-sm font-medium border transition-colors ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-surface text-foreground border-border hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <button onClick={back} disabled={step === 1} className="text-muted-foreground disabled:opacity-30">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <LanguageSwitcher />
      </div>
      <div className="px-5 mb-4">
        <Progress value={(step / TOTAL) * 100} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">{t("stepOf", { n: step, total: TOTAL })}</p>
      </div>

      <div className="flex-1 px-5 max-w-2xl mx-auto w-full fade-in">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{questions[step - 1]}</h2>
        <p className="text-sm italic text-muted-foreground mb-8">{t("trySaying")}</p>

        <div className="flex justify-center mb-8">
          <VoiceMicButton onTranscript={onTranscript} />
        </div>

        {/* Choice steps */}
        {step === 3 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[
              ["farmer", `👨‍🌾 ${t("farmer")}`],
              ["daily_wage", `👷 ${t("dailyWage")}`],
              ["small_biz", `🏪 ${t("smallBiz")}`],
              ["salaried", `💼 ${t("salaried")}`],
              ["student", `🎓 ${t("student")}`],
              ["unemployed", `❌ ${t("unemployed")}`],
            ].map(([v, l]) => chip(l, () => setAns({ occupation: v }), answers.occupation === v))}
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {["General", "OBC", "SC", "ST"].map((c) =>
              chip(c, () => setAns({ category: c }), answers.category === c),
            )}
          </div>
        )}
        {step === 6 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[["male", t("male")], ["female", t("female")], ["other", t("other")]].map(([v, l]) =>
              chip(l, () => setAns({ gender: v }), answers.gender === v),
            )}
          </div>
        )}
        {(step === 7 || step === 8) && (
          <div className="flex gap-2 justify-center mb-6">
            {chip(`✅ ${t("yes")}`, () => setAns(step === 7 ? { has_aadhaar: true } : { has_land: true }), step === 7 ? answers.has_aadhaar === true : answers.has_land === true)}
            {chip(`❌ ${t("no")}`, () => setAns(step === 7 ? { has_aadhaar: false } : { has_land: false }), step === 7 ? answers.has_aadhaar === false : answers.has_land === false)}
          </div>
        )}

        {/* Text input fallback for steps 1, 2, 5 and land size */}
        {(step === 1 || step === 2 || step === 5) && (
          <input
            value={draft}
            onChange={(e) => { setDraft(e.target.value); handleAnswer(e.target.value); }}
            placeholder={t("typeHere")}
            className="w-full h-12 rounded-lg bg-surface border border-border px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        )}
        {step === 8 && answers.has_land && (
          <input
            type="number"
            placeholder={t("landSize")}
            onChange={(e) => setAns({ land_size: parseFloat(e.target.value) || 0 })}
            className="mt-3 w-full h-12 rounded-lg bg-surface border border-border px-4 text-base text-foreground"
          />
        )}

        {/* Confirmation chip */}
        {draft && (step === 1 || step === 2 || step === 5) && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-3 py-1.5 text-sm">
            <Check className="h-4 w-4" /> {t("iHeard")}: {draft}
          </div>
        )}
      </div>

      <div className="p-5 border-t border-border bg-background">
        <button
          onClick={next}
          className="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
        >
          {step === TOTAL ? t("continueBtn") : t("nextBtn")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
