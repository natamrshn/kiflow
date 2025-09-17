import { Message } from "@/src/constants/types/ai_chat";
import { buildPrompt } from "./buildPrompt";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export async function askGemini(
  messages: Message[],
  slidePrompt: string,
  isFirstMessage: boolean,
  model: string = "gemini-2.0-flash"
): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY не налаштований");
    return "⚠️ Помилка: відсутній API ключ.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const lastUserMessage = messages.filter((m) => m.role === "user").slice(-1)[0];

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text:  buildPrompt(slidePrompt, isFirstMessage, lastUserMessage)}],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.9,
      maxOutputTokens: 800,
    },
  };

  try {
    const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Помилка: Gemini не повернув текст."
    );
  } catch (err) {
    console.error("Gemini API error", err);
    return "⚠️ Сталася помилка при отриманні відповіді від AI.";
  }
}
