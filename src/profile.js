import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
function initAuthUI() {
  // --- DOM Elements ---
  const profileView = document.getElementById("profileView");
  const editProfileView = document.getElementById("editProfileView");
  const toEditBtn = document.getElementById("toEdit");
  const toProfileBtn = document.getElementById("toProfile");
  const editForm = document.getElementById("editProfile");

  function setVisible(el, visible) {
    el.classList.toggle("hidden", !visible);
  }

  // Listeners
  toProfileBtn?.addEventListener("click", (e) => {
    setVisible(editProfileView, false);
    setVisible(profileView, true);
  });

  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }
    toEditBtn?.addEventListener("click", async (e) => {
      setVisible(profileView, false);
      setVisible(editProfileView, true);

      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      const userDoc = userDocSnap.data();

      document.querySelector("#displayName").value = userDoc.displayName || "";
      document.querySelector("#editLocation").value = userDoc.location || "";
      document.querySelector("#editPhone").value = userDoc.phone || "";
    });

    editForm?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      const userDoc = userDocSnap.data();

      const newDisplayName =
        document.querySelector("#displayName")?.value?.trim() ||
        userDoc.displayName;

      const newLoc =
        document.querySelector("#editLocation")?.value?.trim() ||
        userDoc.location;

      const newPhone =
        document.querySelector("#editPhone")?.value || userDoc.phone;

      await setDoc(
        doc(db, "users", user.uid),
        {
          displayName: newDisplayName,
          location: newLoc,
          phone: newPhone,
        },
        { merge: true },
      );
      setVisible(editProfileView, false);
      setVisible(profileView, true);
    });
  });
}

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
    onSnapshot(doc(db, "users", user.uid), (userDoc) => {
      const data = userDoc.data() || {};

      const name = data.name || user.displayName || user.email;
      const displayName = data.displayName || "Display Name";
      const location = data.location || "Location";
      const email = data.email || "Email";
      const phone = data.phone || "Phone";

      if (nameElement) nameElement.textContent = name;
      if (displayElement) displayElement.textContent = displayName;
      if (locationElement) locationElement.textContent = location;
      if (emailElement) emailElement.textContent = email;
      if (phoneElement) phoneElement.textContent = phone;
    });
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
document.addEventListener("DOMContentLoaded", initAuthUI);
