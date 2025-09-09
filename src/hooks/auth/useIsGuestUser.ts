import { supabase } from '@/src/config/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the current user is a guest.
 * A user is considered a guest if there is no active session or if the user is anonymous.
 * @returns {boolean | null} True if the user is a guest, false if authenticated, null while loading.
 */
export const useIsGuestUser = (): boolean | null => {
  const [isGuest, setIsGuest] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial session state synchronously if possible
    // supabase.auth.getSession() might be useful here for an immediate check,
    // but onAuthStateChange covers initial state and subsequent changes.

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        if (session && session.user && !session.user.is_anonymous) {
          setIsGuest(false); // User is logged in and not anonymous
        } else {
          setIsGuest(true); // User is a guest (no session or anonymous)
        }
      }
    );

    // Check current session on mount as onAuthStateChange might not fire immediately
    // if the user is already logged in or out.
    const checkCurrentSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setIsGuest(true); // Assume guest on error
        return;
      }
      if (data.session && data.session.user && !data.session.user.is_anonymous) {
        setIsGuest(false);
      } else {
        setIsGuest(true);
      }
    };

    checkCurrentSession();

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return isGuest;
};