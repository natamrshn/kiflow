import { supabase } from '../config/supabaseClient';

export const signUp = async (email: string, password: string, extra?: { name?: string }) => {
  const { data, error } = await supabase.auth.signUp({ 
    email,
    password,
    options: {
      data: {
        full_name: extra?.name || null,
        // role: 'admin',
        role: 'user'
      },
    },
   });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  try {
    // Check if there's an active session first
    const { data: sessionData } = await supabase.auth.getSession();

    // If no session exists, return success without attempting to sign out
    if (!sessionData?.session) {
      console.log('No active session found during logout');
      return { error: null };
    }

    // Proceed with signOut if we have a session
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error('Error during signOut:', err);
    return { error: err };
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  } catch (err) {
    console.error('Error getting session:', err);

    return { data: null, error: err };
  }
};

export const signInWithGoogle = async () => {
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

    return {
      data: { session },
      error: null,
    };
  } catch (err) {
    console.error('Error signing in with Google:', err);

    return {
      data: null,
      error: err,
    };
  }
};


export const getUserRole = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  return user.user_metadata?.role || 'user';
};