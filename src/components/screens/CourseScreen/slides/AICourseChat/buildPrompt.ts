import { Message } from "@/src/constants/types/ai_chat";

export function buildPrompt(
  slidePrompt: string,
  isFirstMessage: boolean,
  lastUserMessage?: Message
): string {
  let content = "";

  if (isFirstMessage) {
    content = `Візьми текст після слова "КЕЙС:" у цьому описі:
${slidePrompt}

Покажи його без слова "КЕЙС:" і без лапок. 
Не додавай нічого від себе.`;
    return content;
  }

  if (lastUserMessage?.text) {
    const studentAnswer = lastUserMessage.text;

    const strictFormat = `
Оціни відповідь студента за критеріями з цього опису:
${slidePrompt}

Відповідь студента:
${studentAnswer}

Тепер поверни СТРОГО JSON у такому форматі:
{
  "text": "${studentAnswer}",
  "rating": {
    "overall_score": число від 0 до 10 (тільки число, без "/10" і без пояснень),
    "comment": "Довгий, суцільний коментар-відгук (пояснення + рекомендації)"
  }
}`;
    return strictFormat;
  }

  return "";
}
