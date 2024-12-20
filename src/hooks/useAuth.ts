import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  getRedirectResult
} from 'firebase/auth';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Check for redirect result
    getRedirectResult(auth).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('Authentication failed. Please try again.');
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // First try popup
      await signInWithPopup(auth, provider);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        // If popup is blocked, fallback to redirect
        toast.success('Redirecting to Google sign-in...'); // Changed from toast.info to toast.success
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectError) {
          toast.error('Sign in failed. Please check your browser settings.');
          console.error('Redirect sign in error:', redirectError);
        }
      } else if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('Sign in failed. Please try again.');
        console.error('Sign in error:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Sign out failed. Please try again.');
      console.error('Error signing out:', error);
    }
  };

  return { user, loading, signIn, signOut };
}