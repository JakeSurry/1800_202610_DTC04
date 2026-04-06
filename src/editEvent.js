import uploadImage from "./uploadImage";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("eventId");
}

function showImagePicker() {
  let imageInput = document.getElementById("image");
  let imageContainer = document.getElementById("imageContainer");

  imageContainer.classList.add("hidden");
  imageInput.classList.toggle("hidden");
}

function showPreview(image) {
  let imageInput = document.getElementById("image");
  let imageContainer = document.getElementById("imageContainer");
  let coverImage = document.getElementById("coverImage");

  coverImage.src = image;

  imageInput.classList.add("hidden");
  imageContainer.classList.toggle("hidden");
}

function initEditEvent() {
  const form = document.getElementById("editEventForm");
  const alertEl = document.getElementById("formAlert");
  const deleteBtn = document.getElementById("deleteEventBtn");
  const eventId = getEventIdFromUrl();

  document
    .getElementById("changeImageBtn")
    .addEventListener("click", () => showImagePicker());

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

      console.log(event);

      document.getElementById("name").value = event.name || "";
      document.getElementById("venue").value = event.venue || "";
      document.getElementById("Home_Team").value = event.team1 || "";
      document.getElementById("Away_Team").value = event.team2 || "";
      document.getElementById("eventDate").value = event.date || "";
      document.getElementById("startTime").value = event.startTime || "";
      document.getElementById("endTime").value = event.endTime || "";
      document.getElementById("description").value = event.description || "";
      let coverImage = document.getElementById("coverImage");
      coverImage.src = event.image;
    } catch (error) {
      console.error(error);
      showError("Unable to load event.");
    }
  }

  document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    showPreview(localUrl);
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    if (!eventId) {
      showError("Missing event ID.");
      return;
    }

    const name = document.getElementById("name")?.value?.trim() ?? "";
    const venue = document.getElementById("venue")?.value?.trim() ?? "";
    const team1 = document.getElementById("Home_Team")?.value?.trim() ?? "";
    const team2 = document.getElementById("Away_Team")?.value?.trim() ?? "";
    const eventDate = document.getElementById("eventDate")?.value ?? "";
    const startTime = document.getElementById("startTime")?.value ?? "";
    const endTime = document.getElementById("endTime")?.value ?? "";
    const description =
      document.getElementById("description")?.value?.trim() ?? "";
    const coverImage = document.getElementById("image");

    if (
      !name ||
      !venue ||
      !team1 ||
      !team2 ||
      !eventDate ||
      !startTime ||
      !endTime ||
      !description
    ) {
      showError("Please complete all required fields.");
      return;
    }
    let imageUrl = "";

    const payload = {
      name,
      venue,
      team1,
      team2,
      date: eventDate,
      startTime,
      endTime,
      description,
      match: `${team1} vs ${team2}`,
    };

    if (coverImage?.files?.[0]) {
      const file = coverImage?.files?.[0];
      imageUrl = await uploadImage(file);
      payload.image = imageUrl;
    }

    try {
      await updateDoc(doc(db, "events", eventId), payload);

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
