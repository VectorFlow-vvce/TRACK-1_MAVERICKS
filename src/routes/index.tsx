import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { LANGUAGES } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const { setLang } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md fade-in">
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-3xl bg-primary/15 flex items-center justify-center">
            <Shield className="h-14 w-14 text-primary" strokeWidth={2.2} />
          </div>
          <span className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg">₹</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">BenefitBridge</h1>
        <div className="space-y-1.5 mb-10">
          <p className="text-lg text-muted-foreground">Discover benefits you deserve</p>
          <p className="text-lg text-muted-foreground">अपने अधिकार के लाभ खोजें</p>
          <p className="text-lg text-muted-foreground">ನಿಮ್ಮ ಹಕ್ಕಿನ ಪ್ರಯೋಜನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ</p>
        </div>
        <Link
          to="/language"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-10 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Get Started →
        </Link>
      </div>
      <div className="w-full max-w-2xl overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 justify-center min-w-min px-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className="shrink-0 rounded-full bg-surface border border-border px-4 py-2 text-sm text-foreground hover:border-primary/40 transition-colors"
            >
              {l.flag} {l.nativeName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
