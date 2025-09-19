interface AIResponse {
    content: string;
    rating: {
      overall_score?: number | string;
      dialogue_building?: { score: number; explanation: string };
      engagement_language?: { score: number; explanation: string };
      strengths?: string[];
      weaknesses?: string[];
      feedback?: { next_steps?: string[] };
      comment?: string
    } | null;
  }
  
  export function formatAIResponseForChat(aiResponse: AIResponse): string {
    if (!aiResponse) return "";
  
    const { content, rating } = aiResponse;
    if (!rating) return content;
  
    const lines: string[] = [];
  
    // Основний контент
  
    // Загальна оцінка
    // if (rating.overall_score !== undefined) {
    //   lines.push(`📊 ЗАГАЛЬНА ОЦІНКА: ${rating.overall_score}/10`);
    // }

    if (rating.comment) {
      lines.push(rating.comment)
    }
  
    // // Критерії оцінки
    // lines.push("\n🎯 ОЦІНКА ПО КРИТЕРІЯХ:");
  
    // if (rating.dialogue_building) {
    //   lines.push(`• Побудова діалогу: ${rating.dialogue_building.score}/5`);
    //   lines.push(`  ${rating.dialogue_building.explanation}`);
    // }

    // if (rating.engagement_language) {
    //   lines.push(`• Використання мови залучення: ${rating.engagement_language.score}/5`);
    //   lines.push(`  ${rating.engagement_language.explanation}`);
    // }
  
    // // Сильні сторони
    // if (rating.strengths?.length) {
    //   lines.push("\n✅ СИЛЬНІ СТОРОНИ:");
    //   rating.strengths.forEach((s) => lines.push(`• ${s}`));
    // }
  
    // Слабкі сторони
    // if (rating.weaknesses?.length) {
    //   lines.push("\n🔧 ЩО ПОКРАЩИТИ:");
    //   rating.weaknesses.forEach((w) => lines.push(`• ${w}`));
    // }
  
    // // Наступні кроки
    // if (rating.feedback?.next_steps?.length) {
    //   lines.push("\n🚀 НАСТУПНИЙ КРОК:");
    //   rating.feedback.next_steps.forEach((n) => lines.push(`• ${n}`));
    // }
  
    return lines.join("\n");
  }
  