// SDK barrel export file
// Exports all SDK modules for easy importing

export { app, analytics, firebaseConfig } from "./firebase";
export {
    auth,
    signUp,
    signIn,
    logout,
    subscribeToAuthChanges
} from "./auth";
