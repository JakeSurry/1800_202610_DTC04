import { createRegLink } from "./regLinks.js";
import uploadImage from "./uploadImage.js";
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
  const imageInput = document.getElementById("image");
  const imageContainer = document.getElementById("imageContainer");
  const coverImage = document.getElementById("coverImage");
  const changeImageBtn = document.getElementById("changeImageBtn");

  let previewUrl = "";

  function showError(message) {
    alertEl.textContent = message;
    alertEl.classList.remove("hidden");
  }

  function hideError() {
    alertEl.textContent = "";
    alertEl.classList.add("hidden");
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

  function prefillFromParams() {
    const params = new URLSearchParams(window.location.search);

    const team1 = params.get("team1") || "";
    const team2 = params.get("team2") || "";
    const date = params.get("date") || "";
    const startTimeParams = params.get("startTime") || "";
    const endTimeParams = params.get("endTime") || "";

    const team1Input = document.getElementById("Home_Team");
    const team2Input = document.getElementById("Away_Team");
    const dateInput = document.getElementById("eventDate");
    const startTimeInput = document.getElementById("startTime");
    const endTimeInput = document.getElementById("endTime");

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

    if (startTimeInput && startTimeParams) {
      startTimeInput.value = normalizeTimeForInput(startTimeParams);
    }

    if (endTimeInput && endTimeParams) {
      endTimeInput.value = normalizeTimeForInput(endTimeParams);
    }
  }

  function showImagePicker() {
    imageContainer.classList.add("hidden");
    imageInput.classList.remove("hidden");
    imageInput.click();
  }

  function showPreview(imageUrl) {
    coverImage.src = imageUrl;
    imageInput.classList.add("hidden");
    imageContainer.classList.remove("hidden");
  }

  function clearPreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      previewUrl = "";
    }

    coverImage.src = "";
    imageInput.value = "";
    imageContainer.classList.add("hidden");
    imageInput.classList.remove("hidden");
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

  imageInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(file);
    showPreview(previewUrl);
  });

  changeImageBtn?.addEventListener("click", () => {
    clearPreview();
  });

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
    const team1 = document.getElementById("Home_Team")?.value?.trim() ?? "";
    const team2 = document.getElementById("Away_Team")?.value?.trim() ?? "";
    const eventDate = document.getElementById("eventDate")?.value ?? "";
    const startTime = document.getElementById("startTime")?.value ?? "";
    const endTime = document.getElementById("endTime")?.value ?? "";
    const duration = document.getElementById("duration")?.value ?? "";
    const description =
      document.getElementById("description")?.value?.trim() ?? "";
    const file = imageInput?.files?.[0];

    if (
      !name ||
      !venue ||
      !team1 ||
      !team2 ||
      !eventDate ||
      !startTime ||
      !endTime ||
      !duration ||
      !file ||
      !description
    ) {
      showError("Please complete all required fields.");
      return;
    }

    try {
      const businessData = await ensureBusinessAccount(currentUser.uid);
      const imageUrl = await uploadImage(file);

      const eventRef = await addDoc(collection(db, "events"), {
        name,
        venue,
        team1,
        team2,
        date: eventDate,
        startTime,
        endTime,
        duration,
        description,
        match: `${team1} vs ${team2}`,
        hostName:
          businessData.displayName ||
          businessData.businessName ||
          currentUser.displayName ||
          currentUser.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        image: imageUrl,
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
      clearPreview();

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
