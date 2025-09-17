import { Message } from "@/src/constants/types/ai_chat";

export function buildPrompt(
    slidePrompt: string,
    isFirstMessage: boolean,
    lastUserMessage?: Message
  ): string { 

    let content: string = "";

    if (isFirstMessage) {
      content = `Візьми текст після слова "КЕЙС:" у цьому описі:
        ${slidePrompt}
        
        Покажи його без слова "КЕЙС:" і без лапок. 
        Не додавай нічого від себе.`;
    } else if (lastUserMessage?.text){
      if (lastUserMessage.text) {
        content = `Оціни відповідь студента за критеріями з цього опису: ${slidePrompt}
        Відповідь студента: ${lastUserMessage.text}`;
      }
    }

    return content;
  }