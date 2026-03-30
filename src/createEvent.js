import { createRegLink } from "./regLinks.js";
import { auth, db } from "/src/firebaseConfig.js";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

function initCreateEvent() {
  const form = document.getElementById("createEventForm");
  const alertEl = document.getElementById("formAlert");

  function showError(message) {
    alertEl.textContent = message;
    alertEl.classList.remove("hidden");
  }

  function hideError() {
    alertEl.textContent = "";
    alertEl.classList.add("hidden");
  }

  function prefillFromParams() {
    const params = new URLSearchParams(window.location.search);

    const team1 = params.get("team1") || "";
    const team2 = params.get("team2") || "";
    const date = params.get("date") || "";
    const time = params.get("time") || "";

    const team1Input = document.getElementById("team1");
    const team2Input = document.getElementById("team2");
    const dateInput = document.getElementById("eventDate");
    const timeInput = document.getElementById("eventTime");

    if (team1Input && team1) team1Input.value = team1;
    if (team2Input && team2) team2Input.value = team2;

    if (dateInput && date) {
      const parsedDate = new Date(date);
      if (!Number.isNaN(parsedDate.getTime())) {
        dateInput.value = parsedDate.toISOString().split("T")[0];
      } else {
        dateInput.value = date;
      }
    }

    if (timeInput && time) {
      const normalizedTime = normalizeTimeForInput(time);
      timeInput.value = normalizedTime;
    }
  }

  function normalizeTimeForInput(time) {
    if (!time) return "";

    if (/^\d{2}:\d{2}$/.test(time)) {
      return time;
    }

    const parsed = new Date(`2000-01-01 ${time}`);
    if (Number.isNaN(parsed.getTime())) return "";

    const hours = String(parsed.getHours()).padStart(2, "0");
    const minutes = String(parsed.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  async function ensureBusinessAccount(uid) {
    const businessRef = doc(db, "business_accounts", uid);
    const businessSnap = await getDoc(businessRef);

    if (!businessSnap.exists()) {
      throw new Error("Only business accounts can create hosted events.");
    }

    return businessSnap.data();
  }

  prefillFromParams();

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      showError("You must be logged in to create an event.");
      return;
    }

    const name = document.getElementById("name")?.value?.trim() ?? "";
    const venue = document.getElementById("venue")?.value?.trim() ?? "";
    const team1 = document.getElementById("team1")?.value?.trim() ?? "";
    const team2 = document.getElementById("team2")?.value?.trim() ?? "";
    const eventDate = document.getElementById("eventDate")?.value ?? "";
    const eventTime = document.getElementById("eventTime")?.value ?? "";
    const description =
      document.getElementById("description")?.value?.trim() ?? "";

    if (
      !name ||
      !venue ||
      !team1 ||
      !team2 ||
      !eventDate ||
      !eventTime ||
      !description
    ) {
      showError("Please complete all required fields.");
      return;
    }

    try {
      const businessData = await ensureBusinessAccount(currentUser.uid);

      const eventRef = await addDoc(collection(db, "events"), {
        name,
        venue,
        team1,
        team2,
        date: eventDate,
        time: eventTime,
        description,
        match: `${team1} vs ${team2}`,
        hostName:
          businessData.displayName ||
          businessData.businessName ||
          currentUser.displayName ||
          currentUser.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const regLinkId = await createRegLink({
        host: currentUser.uid,
        event: eventRef.id,
        attendees: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "events", eventRef.id), {
        regLink: regLinkId,
        updatedAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "business_accounts", currentUser.uid), {
        hostingEvents: arrayUnion(regLinkId),
        updatedAt: serverTimestamp(),
      });

      form.reset();
      alert("Event created successfully!");
      window.location.href = "./mainBusiness.html";
    } catch (error) {
      console.error("Error creating event:", error);
      showError(
        error.message || "Something went wrong while creating the event.",
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", initCreateEvent);
