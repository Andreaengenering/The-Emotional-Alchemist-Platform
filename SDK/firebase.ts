// Firebase initialization module
// This module initializes Firebase and exports the app and analytics instances

import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyA1HqEwmaEoowtz7usPoeKlaHki5AEgQw8",
    authDomain: "the-emotional-alchemist.firebaseapp.com",
    projectId: "the-emotional-alchemist",
    storageBucket: "the-emotional-alchemist.firebasestorage.app",
    messagingSenderId: "912771777784",
    appId: "1:912771777784:web:fd31fb378186c8bbd1a70d",
    measurementId: "G-G0QX5XPEL4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics
export let analytics: Analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}
