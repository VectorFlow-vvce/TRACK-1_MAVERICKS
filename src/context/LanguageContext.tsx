import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LANGUAGES, TRANSLATIONS, translate, type LangKey, type Language } from "@/data/translations";

interface LanguageContextValue {
  lang: LangKey;
  language: Language;
  setLang: (l: LangKey) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "benefitbridge_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangKey>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY) as LangKey | null;
    if (saved && TRANSLATIONS[saved]) setLangState(saved);
  }, []);

  const setLang = (l: LangKey) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const language = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);

  return (
    <LanguageContext.Provider value={{ lang, language, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useTranslation() {
  const { t, lang, language } = useLanguage();
  return { t, lang, language };
}
