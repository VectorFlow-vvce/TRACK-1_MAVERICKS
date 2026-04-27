import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Volume2, Shield, Mic } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useTranslation } from "@/context/LanguageContext";
import { useServerFn } from "@tanstack/react-start";
import { chatWithAI } from "@/utils/chat.functions";
import { speak } from "@/utils/textToSpeech";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({ component: Chat });

interface Msg { role: "user" | "assistant"; content: string; ts: number }

function Chat() {
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t("welcomeMsg"), ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatFn = useServerFn(chatWithAI);
  const scrollRef = useRef<HTMLDivElement>(null);
  const voice = useVoiceInput(language.bcp47);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!voice.isListening && voice.transcript) {
      setInput(voice.transcript);
      voice.resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice.isListening, voice.transcript]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = [...messages.slice(-9), userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res = await chatFn({ data: { messages: history, langName: language.englishName } });
      if (res.error) {
        toast.error(res.error);
      } else if (res.reply) {
        const aMsg: Msg = { role: "assistant", content: res.reply, ts: Date.now() };
        setMessages((m) => [...m, aMsg]);
        if (localStorage.getItem("auto_speak") !== "off") speak(res.reply, language.bcp47);
      }
    } catch (e) {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <NavBar />
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl w-full mx-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
            {m.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground border border-border rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs text-muted-foreground">{new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.role === "assistant" && (
                  <button onClick={() => speak(m.content, language.bcp47)} aria-label="Read">
                    <Volume2 className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center"><Shield className="h-4 w-4 text-primary" /></div>
            <div className="rounded-2xl bg-card border border-border px-4 py-3 flex gap-1">
              <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
              <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
              <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-16 inset-x-0 border-t border-border bg-background p-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <button
            onClick={() => voice.isListening ? voice.stopListening() : voice.startListening()}
            className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${voice.isListening ? "bg-destructive" : "bg-primary"} text-primary-foreground`}
            aria-label={t("tapToSpeak")}
          >
            <Mic className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("chatPlaceholder")}
            className="flex-1 h-11 rounded-full bg-surface border border-border px-4 text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
