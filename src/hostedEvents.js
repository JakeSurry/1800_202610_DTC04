import { onAuthReady } from "./authentication.js";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { getRegLink, getRegLinkEvent } from "./regLinks.js";
import { renderHostedEvents } from "./components/UpcomingEvents.js";

function showError(message) {
  const alertEl = document.getElementById("eventsAlert");
  if (!alertEl) return;

  alertEl.textContent = message;
  alertEl.classList.remove("hidden");
}

function hideError() {
  const alertEl = document.getElementById("eventsAlert");
  if (!alertEl) return;

  alertEl.textContent = "";
  alertEl.classList.add("hidden");
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "";
  const [hours, minutes] = String(timeString).split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

async function buildHostedEvents(hostingEvents = []) {
  const events = [];

  for (const regLinkId of hostingEvents) {
    const regLink = await getRegLink(regLinkId);
    if (!regLink) continue;

    const event = await getRegLinkEvent(regLinkId);
    if (!event) continue;

    const fans = Array.isArray(regLink.attendees)
      ? regLink.attendees.length
      : 0;

    events.push({
      id: event.id,
      regLinkId,
      name: event.name || `${event.team1} vs ${event.team2}`,
      image: event.image || "images/stadium1.png",
      team1: event.team1,
      team2: event.team2,
      date: formatDate(event.date),
      time: formatTime(event.startTime),
      fans,
      rawDate: event.date,
    });
  }

  return events;
}

function getLoader() {
  return document.querySelector("page-loader");
}

async function loadHostedEventsScreen(user) {
  hideError();

  try {
    const businessRef = doc(db, "business_accounts", user.uid);
    const businessSnap = await getDoc(businessRef);

    if (!businessSnap.exists()) {
      showError("Business account document not found.");
      return;
    }

    const businessData = businessSnap.data();
    const hostingEvents = businessData.hostingEvents || [];
    const events = await buildHostedEvents(hostingEvents);

    renderHostedEvents(events, "hosted-events-list", { fullWidth: true });
  } catch (error) {
    console.error("Error loading hosted events screen:", error);
    showError("Unable to load hosted events.");
  }
}

function initHostedEventsScreen() {
  const loader = getLoader();
  loader?.setText("Loading hosted events...");
  loader?.show();

  onAuthReady(async (user) => {
    try {
      if (!user) {
        location.href = "index.html";
        return;
      }

      await loadHostedEventsScreen(user);
    } finally {
      loader?.hide();
    }
  });
}

document.addEventListener("DOMContentLoaded", initHostedEventsScreen);
