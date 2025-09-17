import { supabase } from '@/src/config/supabaseClient';
import { Slide } from '@/src/constants/types/slides';
import { create } from 'zustand';

interface SlidesState {
  // Стан
  slides: Slide[];
  currentSlideIndex: number;
  currentModuleId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Дії
  fetchSlidesByModule: (moduleId: string) => Promise<void>;
  setCurrentSlideIndex: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  clearError: () => void;
  clearSlides: () => void;
  
  // Внутрішні дії
  setSlides: (slides: Slide[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentModuleId: (moduleId: string | null) => void;
}


export const useSlidesStore = create<SlidesState>()(
  (set, get) => ({
    // Початковий стан
    slides: [],
    currentSlideIndex: 0,
    currentModuleId: null,
    isLoading: false,
    error: null,

    // Дії
    fetchSlidesByModule: async (moduleId: string) => {
      set({ isLoading: true, error: null, currentModuleId: moduleId });
      
      try {
        const { data, error } = await supabase
          .from('slides')
          .select('*')
          .eq('module_id', moduleId)
          .order('slide_order', { ascending: true });

        if (error) throw error;
        
        set({ 
          slides: data || [], 
          currentSlideIndex: 0,
          isLoading: false, 
          error: null 
        });
        
        console.log(`📚 SlidesStore: Loaded ${data?.length || 0} slides for module ${moduleId}`);
      } catch (error: any) {
        console.error('❌ SlidesStore: Error fetching slides:', error);
        set({ 
          error: error.message || 'Failed to fetch slides', 
          isLoading: false 
        });
        throw error;
      }
    },

    setCurrentSlideIndex: (index: number) => {
      const { slides } = get();
      const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
      set({ currentSlideIndex: safeIndex });
    },

    nextSlide: () => {
      const { currentSlideIndex, slides } = get();
      const nextIndex = currentSlideIndex + 1;
      if (nextIndex < slides.length) {
        set({ currentSlideIndex: nextIndex });
      }
    },

    previousSlide: () => {
      const { currentSlideIndex } = get();
      const prevIndex = currentSlideIndex - 1;
      if (prevIndex >= 0) {
        set({ currentSlideIndex: prevIndex });
      }
    },

    clearError: () => set({ error: null }),

    clearSlides: () => set({ 
      slides: [], 
      currentSlideIndex: 0, 
      currentModuleId: null
    }),

    // Внутрішні дії
    setSlides: (slides: Slide[]) => set({ slides }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setError: (error: string | null) => set({ error }),
    setCurrentModuleId: (moduleId: string | null) => set({ currentModuleId: moduleId }),
  })
);
