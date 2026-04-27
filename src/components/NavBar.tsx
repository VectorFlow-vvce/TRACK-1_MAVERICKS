import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/context/LanguageContext";

export function NavBar() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
        <Link to="/home" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-base font-bold text-foreground">{t("appName")}</span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
