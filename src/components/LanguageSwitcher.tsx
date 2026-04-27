import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LANGUAGES, type LangKey } from "@/data/translations";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { toast } from "sonner";
import { translate } from "@/data/translations";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const { language, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSelect = (code: LangKey) => {
    setLang(code);
    setOpen(false);
    toast.success(translate(code, "languageChanged"));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors min-h-[40px]"
      >
        <span className="text-base">{language.flag}</span>
        <span>{language.nativeName}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-card border border-border shadow-2xl z-50 fade-in overflow-hidden">
          <div className="max-h-[320px] overflow-y-auto py-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-2 transition-colors text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{l.flag}</span>
                  <span className="flex flex-col">
                    <span className={`text-base ${lang === l.code ? "text-primary font-semibold" : "text-foreground"}`}>
                      {l.nativeName}
                    </span>
                    <span className="text-xs text-muted-foreground">{l.englishName}</span>
                  </span>
                </span>
                {lang === l.code && <Check className="h-5 w-5 text-primary" />}
              </button>
            ))}
          </div>
          <div className="border-t border-border px-4 py-2">
            <p className="text-xs text-muted-foreground">{t("voiceHint")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
