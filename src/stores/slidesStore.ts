import { supabase } from '@/src/config/supabaseClient';
import { Slide } from '@/src/constants/types/slides';
import { create } from 'zustand';

interface SlidesState {
  // State
  slides: Slide[];
  currentSlideIndex: number;
  currentModuleId: string | null;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  
  // Actions
  fetchSlidesByModule: (moduleId: string) => Promise<void>;
  setCurrentSlideIndex: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  clearError: () => void;
  clearSlides: () => void;
  
  // Internal actions
  setSlides: (slides: Slide[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentModuleId: (moduleId: string | null) => void;
}

// Cache duration in milliseconds (10 minutes for slides)
const CACHE_DURATION = 10 * 60 * 1000;

export const useSlidesStore = create<SlidesState>()(
  (set, get) => ({
    // Initial state
    slides: [],
    currentSlideIndex: 0,
    currentModuleId: null,
    isLoading: false,
    error: null,
    lastFetchTime: null,

    // Actions
    fetchSlidesByModule: async (moduleId: string) => {
      const { lastFetchTime, currentModuleId } = get();
      const now = Date.now();
      
      // Check if we have cached data for this module that's still valid
      if (
        currentModuleId === moduleId && 
        lastFetchTime && 
        (now - lastFetchTime) < CACHE_DURATION && 
        get().slides.length > 0
      ) {
        console.log('📚 SlidesStore: Using cached slides for module', moduleId);
        return;
      }

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
          lastFetchTime: now,
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
      currentModuleId: null, 
      lastFetchTime: null 
    }),

    // Internal actions
    setSlides: (slides: Slide[]) => set({ slides }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setError: (error: string | null) => set({ error }),
    setCurrentModuleId: (moduleId: string | null) => set({ currentModuleId: moduleId }),
  })
);
