import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

function ShowProfileInfo() {
  const nameElement = document.getElementById("full-name");
  const displayElement = document.getElementById("display-name");

  const locationElement = document.getElementById("location");
  const emailElement = document.getElementById("email");
  const phoneElement = document.getElementById("phone");
  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));

    const name = userDoc.exists()
      ? userDoc.data().name
      : user.displayName || user.email;
    const displayName = userDoc.exists()
      ? userDoc.data().displayName
      : "Display Name";
    const location =
      userDoc.exists() && userDoc.data().location != null
        ? userDoc.data().location
        : "Location";
    const email =
      userDoc.exists() && userDoc.data().email != null
        ? userDoc.data().email
        : "Email";
    const phone =
      userDoc.exists() && userDoc.data().phone != null
        ? userDoc.data().phone
        : "Phone";

    if (nameElement) {
      nameElement.textContent = `${name}`;
    }
    if (displayElement) {
      displayElement.textContent = `${displayName}`;
    }
    if (locationElement) {
      locationElement.textContent = `${location}`;
    }
    if (emailElement) {
      emailElement.textContent = `${email}`;
    }
    if (phoneElement) {
      phoneElement.textContent = `${phone}`;
    }
  });
}

function ShowProfileEvents() {
  const eventsElement = document.getElementById("events");
  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));

    const events =
      userDoc.exists() && userDoc.data().events != null
        ? userDoc.data().events
        : "Events";

    if (eventsElement) {
      eventsElement.textContent = `${events}`;
    }
  });
}

ShowProfileInfo();
ShowProfileEvents();
