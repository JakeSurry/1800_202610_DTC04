/**
 * profile.js
 * Manages the personal user profile page (profile.html).
 * Displays user info with real-time Firestore updates (onSnapshot),
 * handles the edit profile form, and renders the user's registered events.
 */

import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { queryEvents } from "./events.js";
import { renderEvents } from "./components/EventsRow.js";

/** Convert underscored team names to display format (e.g. "New_Zealand" → "New Zealand"). */
function formatTeamName(team) {
  return team ? team.replaceAll("_", " ") : "";
}

/** Extract up to two initials from a name for avatar fallback. */
function getInitials(name) {
  if (!name) return "FF";
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "FF";
}

/** Wire up the profile view / edit view toggle and the edit form submission. */
function initAuthUI() {
  const profileView = document.getElementById("profileView");
  const editProfileView = document.getElementById("editProfileView");
  const toEditBtn = document.getElementById("toEdit");
  const toProfileBtn = document.getElementById("toProfile");
  const editForm = document.getElementById("editProfile");

  function setVisible(element, visible) {
    if (!element) return;
    element.classList.toggle("hidden", !visible);
  }

  toProfileBtn?.addEventListener("click", () => {
    setVisible(editProfileView, false);
    setVisible(profileView, true);
  });

  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    toEditBtn?.addEventListener("click", async () => {
      setVisible(profileView, false);
      setVisible(editProfileView, true);

      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      const userDoc = userDocSnap.data() || {};

      const displayNameInput = document.querySelector("#displayName");
      const locationInput = document.querySelector("#editLocation");
      const phoneInput = document.querySelector("#editPhone");
      const favoriteTeamInput = document.querySelector("#favoriteTeam");

      if (displayNameInput) displayNameInput.value = userDoc.displayName || "";
      if (locationInput) locationInput.value = userDoc.location || "";
      if (phoneInput) phoneInput.value = userDoc.phone || "";
      if (favoriteTeamInput)
        favoriteTeamInput.value = userDoc.favoriteTeam || "";
    });

    editForm?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userDoc = userDocSnap.data() || {};

      const newDisplayName =
        document.querySelector("#displayName")?.value?.trim() ||
        userDoc.displayName ||
        "";

      const newLocation =
        document.querySelector("#editLocation")?.value?.trim() ||
        userDoc.location ||
        "";

      const newPhone =
        document.querySelector("#editPhone")?.value?.trim() ||
        userDoc.phone ||
        "";

      const newFavoriteTeam =
        document.querySelector("#favoriteTeam")?.value?.trim() ||
        userDoc.favoriteTeam ||
        "";

      await setDoc(
        userDocRef,
        {
          displayName: newDisplayName,
          location: newLocation,
          phone: newPhone,
          favoriteTeam: newFavoriteTeam,
        },
        { merge: true },
      );

      setVisible(editProfileView, false);
      setVisible(profileView, true);
    });
  });
}

/** Subscribe to the user's Firestore document and update all profile fields in real time. */
function ShowProfileInfo() {
  const nameElement = document.getElementById("full-name");
  const displayElement = document.getElementById("display-name");
  const locationElement = document.getElementById("location");
  const emailElement = document.getElementById("email");
  const phoneElement = document.getElementById("phone");
  const avatarContainer = document.getElementById("profile-avatar");

  const favoriteTeamCard = document.getElementById("favorite-team-card");
  const favoriteTeamElement = document.getElementById("favorite-team");
  const favoriteTeamFlag = document.getElementById("favorite-team-flag");

  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    onSnapshot(doc(db, "users", user.uid), (userDoc) => {
      const data = userDoc.data() || {};

      const name = data.name || user.displayName || user.email || "Fans Feast";
      const displayName = data.displayName || "Display Name";
      const location = data.location || "Location";
      const email = data.email || user.email || "Email";
      const phone = data.phone || "Phone";
      const favoriteTeam = data.favoriteTeam || "";
      const profilePic = data.profilePic || "";

      if (nameElement) nameElement.textContent = name;
      if (displayElement) displayElement.textContent = displayName;
      if (locationElement) locationElement.textContent = location;
      if (emailElement) emailElement.textContent = email;
      if (phoneElement) phoneElement.textContent = phone;

      if (avatarContainer) {
        avatarContainer.innerHTML = profilePic
          ? `
            <img
              src="${profilePic}"
              alt="${displayName || name}"
              class="h-30 w-30 rounded-2xl object-cover border-2 border-white"
            />
          `
          : `
            <div
              class="h-30 w-30 flex items-center justify-center rounded-2xl main-blue-gradient text-white text-3xl font-bold border-2 border-white"
            >
              ${getInitials(displayName || name)}
            </div>
          `;
      }

      if (
        favoriteTeam &&
        favoriteTeamCard &&
        favoriteTeamElement &&
        favoriteTeamFlag
      ) {
        favoriteTeamElement.textContent = formatTeamName(favoriteTeam);
        favoriteTeamFlag.src = `./images/flags/${favoriteTeam}.png`;
        favoriteTeamFlag.alt = `${formatTeamName(favoriteTeam)} flag`;
        favoriteTeamCard.classList.add("flex");
        favoriteTeamCard.classList.remove("hidden");
      } else if (favoriteTeamCard) {
        favoriteTeamCard.classList.add("hidden");
      }
    });
  });
}

/** Load and render the events the user has registered for. */
async function ShowProfileEvents() {
  onAuthReady(async (user) => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const registeredEventIds = userDoc.data()?.registeredEvents || [];

      if (registeredEventIds.length === 0) return;

      const allEvents = await queryEvents();
      const myEvents = allEvents.filter((event) =>
        registeredEventIds.includes(event.id),
      );

      renderEvents(myEvents, "events", "compact");
    } catch (error) {
      console.error("Error loading profile events:", error);
    }
  });
}

ShowProfileInfo();
ShowProfileEvents();
document.addEventListener("DOMContentLoaded", initAuthUI);
