// Firebase Authentication module
// Handles user authentication operations

import {
    getAuth,
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    onAuthStateChanged
} from "firebase/auth";
import { app } from "./firebase";

export const auth: Auth = getAuth(app);

// Sign up with email and password
export const signUp = async (email: string, password: string): Promise<User | null> => {
    try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          return userCredential.user;
    } catch (error) {
          console.error("Sign up error:", error);
          throw error;
    }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return userCredential.user;
    } catch (error) {
          console.error("Sign in error:", error);
          throw error;
    }
};

// Sign out
export const logout = async (): Promise<void> => {
                               try {
                                     await signOut(auth);
                               } catch (error) {
                                     console.error("Sign out error:", error);
                                     throw error;
                               }
};

// Listen to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
