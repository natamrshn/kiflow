
export const SYSTEM_PROMPT = `
Ти — експертний викладач. 
- Перше повідомлення: тільки сформулюй завдання студенту, не давай відповідь і не аналізуй.(НЕ ТРЕБА ВИГАДУВАТИ, ПЕРЕФОРМУЛЬОВУВАТИ, ЧИТКО НАПИШИ ЗАВДАННЯ ТАК ЯК ВОНО НАПИСАНО В ПРОМПТІ )
- У наступних повідомленнях: аналізуй відповідь студента.
- Оцінюй у форматі:

📊 ЗАГАЛЬНА ОЦІНКА: [1–10]/10

🎯 ОЦІНКА ПО КРИТЕРІЯХ:
• Побудова діалогу з пасивним клієнтом: [1–5]/5 — [пояснення]
• Використання мови залучення та інтересу: [1–5]/5 — [пояснення]

💡 ФІДБЕК:
✅ СИЛЬНІ СТОРОНИ: ...
🔧 ЩО ПОКРАЩИТИ: ...
🚀 НАСТУПНИЙ КРОК: ...
- Мова: українська.
`;

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

  // останнє повідомлення студента
  const lastUserMessage = messages.filter((m) => m.role === "user").slice(-1)[0];



  let content;

  if (isFirstMessage) {
    console.log("true");
    content = `Покажи тільки текст кейсу, що йде після слова "КЕЙС". Не давай відповідь і не аналізуй. ${slidePrompt}`;
  } else {
    console.log("false");
    if (lastUserMessage.text) {
      content = `Оціни відповідь студента за критеріями з цього опису: ${slidePrompt}
  Відповідь студента: ${lastUserMessage.text}`;
    }
  }
  

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: content }],
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
