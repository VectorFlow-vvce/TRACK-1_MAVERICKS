import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { LANGUAGES, type LangKey } from "@/data/translations";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const { t } = useTranslation();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const [speed, setSpeed] = useState(1);
  const [autoSpeak, setAutoSpeak] = useState(true);

  useEffect(() => {
    setSpeed(parseFloat(localStorage.getItem("voice_speed") || "1"));
    setAutoSpeak(localStorage.getItem("auto_speak") !== "off");
  }, []);

  const onSpeed = (v: number[]) => {
    setSpeed(v[0]);
    localStorage.setItem("voice_speed", String(v[0]));
  };
  const onAuto = (v: boolean) => {
    setAutoSpeak(v);
    localStorage.setItem("auto_speak", v ? "on" : "off");
  };

  const clearAll = () => {
    if (!confirm(t("clearHistory") + "?")) return;
    Object.keys(localStorage).forEach((k) => k.startsWith("bb_") && localStorage.removeItem(k));
    toast.success(t("clearHistory"));
  };
  const reset = () => {
    if (!confirm(t("resetProfile") + "?")) return;
    localStorage.removeItem("benefitbridge_profile");
    toast.success(t("resetProfile"));
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar />
      <main className="max-w-2xl mx-auto px-5 py-6 fade-in space-y-8">
        <h1 className="text-2xl font-semibold text-foreground">⚙️ {t("settingsTitle")}</h1>

        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{t("appLanguage")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as LangKey); toast.success(t("languageChanged")); }}
                className={`rounded-xl bg-card border p-3 text-left transition-colors ${lang === l.code ? "border-primary" : "border-border"}`}
              >
                <div className="text-base font-semibold text-foreground">{l.flag} {l.nativeName}</div>
                <div className="text-xs text-muted-foreground">{l.englishName}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">Voice</h2>
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground">{t("voiceSpeed")}</span>
              <span className="text-sm text-primary font-medium">{speed.toFixed(1)}x</span>
            </div>
            <Slider value={[speed]} min={0.5} max={2} step={0.1} onValueChange={onSpeed} />
          </div>
          <div className="rounded-xl bg-card border border-border p-4 flex items-center justify-between">
            <span className="text-sm text-foreground">{t("autoSpeak")}</span>
            <Switch checked={autoSpeak} onCheckedChange={onAuto} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-destructive uppercase">{t("dangerZone")}</h2>
          <button onClick={clearAll} className="w-full flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left hover:border-destructive/40">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="text-sm text-foreground">{t("clearHistory")}</span>
          </button>
          <button onClick={reset} className="w-full flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left hover:border-destructive/40">
            <RotateCcw className="h-4 w-4 text-destructive" />
            <span className="text-sm text-foreground">{t("resetProfile")}</span>
          </button>
        </section>

        <p className="text-center text-xs text-muted-foreground">{t("appVersion")}</p>
      </main>
      <BottomNavBar />
    </div>
  );
}
