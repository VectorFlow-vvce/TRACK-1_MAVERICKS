import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { VoiceMicButton } from "@/components/VoiceMicButton";
import { useTranslation } from "@/context/LanguageContext";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    { icon: "🏠", label: t("housing") },
    { icon: "🌾", label: t("agriculture") },
    { icon: "🎓", label: t("education") },
    { icon: "🏥", label: t("health") },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavBar />
      <main className="max-w-2xl mx-auto px-5 py-6 fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">💰 {t("heroFind")}</h1>

        <div className="rounded-full bg-surface border border-border flex items-center pl-4 pr-1 py-1 mb-8">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            placeholder={t("trySaying")}
            className="flex-1 bg-transparent px-3 py-2 text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={() => navigate({ to: "/chat" })}
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
            aria-label={t("tapToSpeak")}
          >
            🎙
          </button>
        </div>

        <h2 className="text-base font-semibold text-foreground mb-3">{t("quickActions")}</h2>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {cards.map((c) => (
            <button
              key={c.label}
              onClick={() => navigate({ to: "/dashboard" })}
              className="rounded-xl bg-card border border-border p-5 text-left hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="text-base font-semibold text-foreground">{c.label}</div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <VoiceMicButton onTranscript={() => navigate({ to: "/chat" })} />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
