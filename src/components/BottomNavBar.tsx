import { Link, useLocation } from "@tanstack/react-router";
import { Home, Wallet, MessageCircle, Settings } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function BottomNavBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const items = [
    { to: "/home", icon: Home, label: t("home") },
    { to: "/dashboard", icon: Wallet, label: t("benefits") },
    { to: "/chat", icon: MessageCircle, label: t("chat") },
    { to: "/settings", icon: Settings, label: t("settings") },
  ] as const;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto grid grid-cols-4 h-16">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to === "/dashboard" && pathname.startsWith("/scheme"));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
