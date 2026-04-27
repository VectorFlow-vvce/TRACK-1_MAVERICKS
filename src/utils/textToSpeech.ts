export function speak(text: string, langCode: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode;
    const rate = parseFloat(localStorage.getItem("voice_speed") || "1");
    u.rate = isFinite(rate) ? rate : 1;
    const voices = window.speechSynthesis.getVoices();
    const base = langCode.split("-")[0];
    const v = voices.find((vc) => vc.lang === langCode) || voices.find((vc) => vc.lang.startsWith(base));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch {}
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
}
