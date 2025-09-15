import { supabase } from '@/src/config/supabaseClient';
import { create } from 'zustand';

interface Question {
  id: string;
  slide_id: string;
  text: string;
  prompt: string;
}

interface QuestionsState {
  questions: Record<string, Question>;
  isLoading: boolean;
  error: string | null;

  fetchQuestionBySlide: (slideId: string) => Promise<void>;
}

export const useQuestionsStore = create<QuestionsState>((set, get) => ({
  questions: {},
  isLoading: false,
  error: null,

  fetchQuestionBySlide: async (slideId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('slide_ai_prompts')
        .select('*')
        .eq('slide_id', slideId)
        .single(); // якщо по одному питанню на слайд

      if (error) throw error;

      if (data) {
        set((state) => ({
          questions: {
            ...state.questions,
            [slideId]: data,
          },
          isLoading: false,
        }));
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
