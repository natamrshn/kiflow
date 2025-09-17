import { supabase } from '@/src/config/supabaseClient';
import { create } from 'zustand';

interface Prompt {
  id: string;
  slide_id: string;
  text: string;
  prompt: string;
}

interface PromptsState {
  prompt: Record<string, Prompt>;
  isLoading: boolean;
  error: string | null;

  fetchPromptBySlide: (slideId: string) => Promise<void>;
}

export const usePromptsStore = create<PromptsState>((set, get) => ({
    prompt: {},
  isLoading: false,
  error: null,

  fetchPromptBySlide: async (slideId: string) => {
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
          prompt: {
            ...state.prompt,
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
