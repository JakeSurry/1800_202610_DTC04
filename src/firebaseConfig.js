/**
 * firebaseConfig.js
 * Initializes Firebase app, Auth, and Firestore.
 * Reads API credentials from Vite environment variables.
 * Connects to the local Firestore emulator when running on localhost.
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase project configuration pulled from .env via Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Use local Firestore emulator during development
// if (location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

