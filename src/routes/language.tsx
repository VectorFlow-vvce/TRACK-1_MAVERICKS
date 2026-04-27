import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { LANGUAGES, type LangKey, translate } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/language")({
  component: LanguagePage,
});

function LanguagePage() {
  const { lang, setLang } = useLanguage();
  const [selected, setSelected] = useState<LangKey>(lang);
  const navigate = useNavigate();

  const handleContinue = () => {
    setLang(selected);
    navigate({ to: "/onboarding" });
  };

  return (
    <div className="min-h-screen bg-background px-5 py-8 pb-32">
      <div className="max-w-2xl mx-auto fade-in">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Choose your language</h1>
        <p className="text-base text-muted-foreground mb-1">अपनी भाषा चुनें</p>
        <p className="text-base text-muted-foreground mb-8">ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ</p>

        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => {
            const active = selected === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setSelected(l.code)}
                className={`relative rounded-xl bg-card border p-4 text-left transition-all ${
                  active ? "border-primary shadow-lg shadow-primary/10" : "border-border hover:border-border"
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </span>
                )}
                <div className="text-2xl mb-1">{l.flag}</div>
                <div className="text-base font-semibold text-foreground">{l.nativeName}</div>
                <div className="text-xs text-muted-foreground">{l.englishName}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 inset-x-0 p-4 bg-background border-t border-border pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <button
          onClick={handleContinue}
          className="w-full max-w-2xl mx-auto block h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
        >
          {translate(selected, "continueBtn")}
        </button>
      </div>
    </div>
  );
}
