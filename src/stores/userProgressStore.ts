import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type ProgressMap = Record<string, number>;

interface UserProgressState {
  // State
  progressByModule: ProgressMap;
  isHydrated: boolean;
  isSaving: boolean;
  error: string | null;

  // Derived getters
  getModuleProgress: (moduleId: string) => number;
  getCourseProgress: (moduleIds: string[]) => number;

  // Actions
  setModuleProgress: (moduleId: string, progressPercent: number) => Promise<void>;
  incrementModuleProgress: (moduleId: string, deltaPercent: number) => Promise<void>;
  resetModuleProgress: (moduleId: string) => Promise<void>;
  clearAllProgress: () => Promise<void>;

  // Internal
  hydrateFromStorage: () => Promise<void>;
  persistToStorage: () => Promise<void>;
}

const STORAGE_KEY = 'user_progress_v1';

export const useUserProgressStore = create<UserProgressState>()((set, get) => ({
  // Initial state
  progressByModule: {},
  isHydrated: false,
  isSaving: false,
  error: null,

  // Derived getters
  getModuleProgress: (moduleId: string) => {
    const { progressByModule } = get();
    return Math.max(0, Math.min(100, progressByModule[moduleId] ?? 0));
  },

  getCourseProgress: (moduleIds: string[]) => {
    if (moduleIds.length === 0) return 0;
    
    const { progressByModule } = get();
    const totalProgress = moduleIds.reduce((sum, moduleId) => {
      return sum + (progressByModule[moduleId] ?? 0);
    }, 0);
    
    const averageProgress = totalProgress / moduleIds.length;
    return Math.max(0, Math.min(100, Math.round(averageProgress)));
  },

  // Actions
  setModuleProgress: async (moduleId: string, progressPercent: number) => {
    const safe = Math.max(0, Math.min(100, Math.round(progressPercent)));
    set(state => ({
      progressByModule: { ...state.progressByModule, [moduleId]: safe },
      error: null,
    }));
    await get().persistToStorage();
  },

  incrementModuleProgress: async (moduleId: string, deltaPercent: number) => {
    const current = get().getModuleProgress(moduleId);
    const next = current + deltaPercent;
    await get().setModuleProgress(moduleId, next);
  },

  resetModuleProgress: async (moduleId: string) => {
    set(state => {
      const copy = { ...state.progressByModule };
      delete copy[moduleId];
      return { progressByModule: copy } as Partial<UserProgressState> as UserProgressState;
    });
    await get().persistToStorage();
  },

  clearAllProgress: async () => {
    set({ progressByModule: {} });
    await get().persistToStorage();
  },

  // Internal
  hydrateFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ProgressMap;
        set({ progressByModule: parsed, isHydrated: true, error: null });
      } else {
        set({ isHydrated: true, error: null });
      }
    } catch (e: any) {
      set({ isHydrated: true, error: e?.message ?? 'Failed to load progress' });
    }
  },

  persistToStorage: async () => {
    try {
      set({ isSaving: true });
      const { progressByModule } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progressByModule));
      set({ isSaving: false, error: null });
    } catch (e: any) {
      set({ isSaving: false, error: e?.message ?? 'Failed to save progress' });
    }
  },
}));

// Kick off hydration on import
useUserProgressStore.getState().hydrateFromStorage();


