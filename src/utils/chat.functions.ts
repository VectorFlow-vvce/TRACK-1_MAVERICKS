import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
  langName: z.string().min(1).max(40),
});

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "", error: "AI not configured" };
    }
    const system = `You are BenefitBridge AI, helping Indian citizens find government benefits, subsidies and schemes. Reply ONLY in ${data.langName}. Give practical, simple, accurate advice. Keep replies under 100 words. Use plain language a first-time citizen can understand.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: system }, ...data.messages],
        }),
      });
      if (!res.ok) {
        if (res.status === 429) return { reply: "", error: "Rate limit exceeded. Please try again later." };
        if (res.status === 402) return { reply: "", error: "AI credits exhausted. Please add credits." };
        return { reply: "", error: `AI error (${res.status})` };
      }
      const json = await res.json();
      const reply: string = json?.choices?.[0]?.message?.content ?? "";
      return { reply, error: null as string | null };
    } catch (e) {
      console.error("chat error", e);
      return { reply: "", error: "AI request failed" };
    }
  });
