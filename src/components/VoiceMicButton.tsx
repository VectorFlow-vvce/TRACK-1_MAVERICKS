import { Mic, MicOff, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { cn } from "@/lib/utils";

interface Props {
  onTranscript?: (text: string) => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  processing?: boolean;
}

export function VoiceMicButton({ onTranscript, size = "lg", showLabel = true, processing }: Props) {
  const { t, language } = useTranslation();
  const v = useVoiceInput(language.bcp47);

  useEffect(() => {
    if (!v.isListening && v.transcript && onTranscript) {
      onTranscript(v.transcript);
      v.resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.isListening, v.transcript]);

  const dim = size === "sm" ? 56 : size === "md" ? 72 : 96;

  const handleClick = () => {
    if (processing) return;
    if (v.isListening) v.stopListening();
    else v.startListening();
  };

  const stateError = v.error || !v.supported;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-label={t("tapToSpeak")}
        style={{ width: dim, height: dim }}
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-200 shadow-lg active:scale-95",
          processing && "bg-primary",
          !processing && v.isListening && "bg-destructive",
          !processing && !v.isListening && !stateError && "bg-primary",
          stateError && !v.isListening && "bg-destructive",
        )}
      >
        {!v.isListening && !processing && !stateError && (
          <span className="absolute inset-0 rounded-full bg-primary/40 pulse-ring" />
        )}
        {v.isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-destructive/50 ring-listen-1" />
            <span className="absolute inset-0 rounded-full bg-destructive/40 ring-listen-2" />
            <span className="absolute inset-0 rounded-full bg-destructive/30 ring-listen-3" />
          </>
        )}
        {processing ? (
          <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
        ) : stateError && !v.isListening ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-primary-foreground" />
        )}
      </button>
      {showLabel && (
        <div className="text-center min-h-[2.5rem]">
          <p className="text-base font-medium text-foreground">
            {processing ? t("processing") : v.isListening ? t("listening") : stateError ? t("micError") : t("tapToSpeak")}
          </p>
          {v.interimTranscript && (
            <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">{v.interimTranscript}</p>
          )}
        </div>
      )}
    </div>
  );
}
