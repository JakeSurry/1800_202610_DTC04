import { db } from "/src/firebaseConfig.js";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("eventId");
}

function initEditEvent() {
  const form = document.getElementById("editEventForm");
  const alertEl = document.getElementById("formAlert");
  const deleteBtn = document.getElementById("deleteEventBtn");
  const eventId = getEventIdFromUrl();

  function showError(message) {
    alertEl.textContent = message;
    alertEl.classList.remove("hidden");
  }

  function hideError() {
    alertEl.textContent = "";
    alertEl.classList.add("hidden");
  }

  async function loadEvent() {
    if (!eventId) {
      showError("Missing event ID.");
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        showError("Event not found.");
        return;
      }

      const event = eventSnap.data();

      document.getElementById("name").value = event.name || "";
      document.getElementById("venue").value = event.venue || "";
      document.getElementById("team1").value = event.team1 || "";
      document.getElementById("team2").value = event.team2 || "";
      document.getElementById("eventDate").value = event.date || "";
      document.getElementById("eventTime").value = event.time || "";
      document.getElementById("description").value = event.description || "";
    } catch (error) {
      console.error(error);
      showError("Unable to load event.");
    }
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    if (!eventId) {
      showError("Missing event ID.");
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
      await updateDoc(doc(db, "events", eventId), {
        name,
        venue,
        team1,
        team2,
        date: eventDate,
        time: eventTime,
        description,
        match: `${team1} vs ${team2}`,
      });

      alert("Event updated successfully.");
      window.location.href = "./mainBusiness.html";
    } catch (error) {
      console.error(error);
      showError("Unable to save changes.");
    }
  });

  deleteBtn?.addEventListener("click", async () => {
    if (!eventId) {
      showError("Missing event ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "events", eventId));
      alert("Event deleted successfully.");
      window.location.href = "./mainBusiness.html";
    } catch (error) {
      console.error(error);
      showError("Unable to delete event.");
    }
  });

  loadEvent();
}

document.addEventListener("DOMContentLoaded", initEditEvent);
