import { auth, db } from "/src/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function onAuthReady(callback) {
  return onAuthStateChanged(auth, callback);
}

export function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    if (!window.location.pathname.endsWith("main.html")) return;

    if (!user) {
      window.location.href = "index.html";
      return;
    }

    try {
      const businessRef = doc(db, "business_accounts", user.uid);
      const userRef = doc(db, "users", user.uid);

      const businessSnap = await getDoc(businessRef);
      const userSnap = await getDoc(userRef);

      if (businessSnap.exists()) {
        const businessData = businessSnap.data();
        $("#welcomeMessage").text(
          `Welcome, ${businessData.displayName || businessData.businessName || user.email}!`,
        );
        return;
      }

      if (userSnap.exists()) {
        const userData = userSnap.data();
        $("#welcomeMessage").text(
          `Hello, ${userData.displayName || userData.name || user.email}!`,
        );
        return;
      }

      $("#welcomeMessage").text(`Hello, ${user.displayName || user.email}!`);
    } catch (error) {
      console.error("Error checking auth state:", error);
      $("#welcomeMessage").text(`Hello, ${user.displayName || user.email}!`);
    }
  });
}

export async function signupUser(data) {
  const {
    accountType,
    email,
    password,
    phone = null,
    name = null,
    businessName = null,
  } = data;

  if (!accountType) {
    throw new Error("accountType is required.");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  const displayName =
    accountType === "business" ? (businessName ?? email) : (name ?? email);

  await updateProfile(user, { displayName });

  try {
    if (accountType === "personal") {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        accountType: "personal",
        name: name,
        email: email,
        displayName: displayName,
        profilePic: null,
        age: null,
        homeTeam: null,
        registeredEvents: [],
        phone: phone,
        location: null,
      });
    } else if (accountType === "business") {
      await setDoc(doc(db, "business_accounts", user.uid), {
        uid: user.uid,
        accountType: "business",
        businessName: businessName,
        email: email,
        displayName: displayName,
        phone: phone,
        profilePic: null,
        coverImage: null,
        businessType: null,
        address: null,
        description: null,
        website: null,
        instagram: null,
        hostingEvents: [],
      });
    } else {
      throw new Error("Invalid account type.");
    }

    console.log("Firestore account document created successfully!");
  } catch (error) {
    alert(
      `Error creating account document:\n${error.code || ""}\n${error.message || error}`,
    );
    throw error;
  }
  return user;
}

export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html";
}

export function authErrorMessage(error) {
  const code = (error?.code || "").toLowerCase();

  const map = {
    "auth/invalid-credential": "Wrong email or password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/email-already-in-use": "Email is already in use.",
    "auth/weak-password": "Password too weak (min 6 characters).",
    "auth/missing-password": "Password cannot be empty.",
    "auth/network-request-failed": "Network error. Try again.",
  };

  return map[code] || "Something went wrong. Please try again.";
}
