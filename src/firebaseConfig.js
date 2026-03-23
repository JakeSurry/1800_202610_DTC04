import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
/*
THIS IS TO TEST NEW CONFIG WITHOUT MESSING UP FIRESTORE. BE SURE TO REMOVE!!!!!!!!!!!!!!!!!!!!!
 */
import { connectFirestoreEmulator } from "firebase/firestore";

// NORMAL FIRESTORE DB. DELETE EVERYTHING BUT THIS LINE
export const db = getFirestore(app);

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}
// end firestore emulator stuff
export const auth = getAuth(app);

