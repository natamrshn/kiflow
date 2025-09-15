import { supabase } from '@/src/config/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean | null;
  error: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
  getUserRole: () => Promise<string | null>;
  
  // Internal actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  // devtools(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isLoading: true,
      isGuest: null,
      error: null,

      // Actions
      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          const isGuest = !data.session || !data.session.user || data.session.user.is_anonymous;
          set({ 
            user: data.user, 
            session: data.session, 
            isGuest,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign in failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signUp: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name || null,
                role: 'user'
              }
            }
          });
          
          if (error) throw error;
          
          const isGuest = !data.session || !data.session.user || data.session.user.is_anonymous;
          set({ 
            user: data.user, 
            session: data.session, 
            isGuest,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign up failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          // Check if there's an active session first
          const { data: sessionData } = await supabase.auth.getSession();

          // If no session exists, return success without attempting to sign out
          if (!sessionData?.session) {
            console.log('No active session found during logout');
            set({ 
              user: null, 
              session: null, 
              isGuest: true, 
              isLoading: false 
            });
            return;
          }

          // Proceed with signOut if we have a session
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null, 
            session: null, 
            isGuest: true, 
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Error during signOut:', error);
          set({ 
            error: error.message || 'Sign out failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          // Clear any existing session
          await supabase.auth.signOut();

          // Start the OAuth flow
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });

          if (error) throw error;

          // Wait a moment to ensure we have a session
          const checkSession = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            return sessionData?.session;
          };

          // Retry a few times to get the session
          let session = null;
          let attempts = 0;
          const maxAttempts = 5;

          while (!session && attempts < maxAttempts) {
            session = await checkSession();
            if (!session) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              attempts++;
            }
          }

          const isGuest = !session || !session.user || session.user.is_anonymous;
          set({ 
            user: session?.user || null, 
            session, 
            isGuest,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Error signing in with Google:', error);
          set({ 
            error: error.message || 'Google sign in failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      checkSession: async () => {
        console.log('🔵 AuthStore: checkSession called');
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          const isGuest = !data.session || !data.session.user || data.session.user.is_anonymous;
          console.log('🔵 AuthStore: Session check result:', { 
            hasSession: !!data.session, 
            hasUser: !!data.session?.user, 
            isGuest 
          });
          
          set({ 
            user: data.session?.user || null, 
            session: data.session, 
            isGuest,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('❌ AuthStore: Error getting session:', error);
          set({ 
            user: null, 
            session: null, 
            isGuest: true, 
            isLoading: false,
            error: error.message || 'Session check failed'
          });
        }
      },

      getUserRole: async () => {
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error || !user) return null;
          return user.user_metadata?.role || 'user';
        } catch (error) {
          console.error('Error getting user role:', error);
          return null;
        }
      },

      clearError: () => set({ error: null }),

      // Internal actions
      setUser: (user: User | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    })
    // ,{
    //   name: 'auth-store',
    // }
  // )
);

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  console.log('🔵 AuthStore: Auth state changed:', { event, hasSession: !!session });
  const { setUser, setSession, setLoading } = useAuthStore.getState();
  
  if (session && session.user && !session.user.is_anonymous) {
    console.log('🔵 AuthStore: User authenticated');
    setUser(session.user);
    setSession(session);
    useAuthStore.setState({ isGuest: false });
  } else {
    console.log('🔵 AuthStore: User is guest');
    setUser(null);
    setSession(null);
    useAuthStore.setState({ isGuest: true });
  }
  
  setLoading(false);
});
