import { renderEvents } from "./components/EventsRow.js";
import { queryEvents, getNumAttendees, getEvent, getVenueID } from "./events";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { onAuthReady } from "./authentication.js";

document.addEventListener("DOMContentLoaded", () => {
  onAuthReady(async (user) => {
    initEventDetails(user);
    setup();
  });
});

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("eventId");
}

function initEventDetails(user) {
  const alertEl = document.getElementById("formAlert");
  const joinBtn = document.getElementById("join");
  const eventId = getEventIdFromUrl();

  const nameEl = document.getElementById("event-name");

  function showError(message) {
    if (!alertEl) return;
    alertEl.textContent = message;
    alertEl.classList.remove("hidden");
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

      const attendeesCount = await getNumAttendees(eventId);

      if (nameEl) {
        nameEl.textContent = event.name || "Unnamed Event";
      }

      document.querySelectorAll(".date").forEach((el) => {
        el.textContent = event.date || "N/A";
      });

      document.querySelectorAll(".time").forEach((el) => {
        el.textContent = event.time || "N/A";
      });

      document.querySelectorAll(".attendees").forEach((el) => {
        el.textContent = attendeesCount ?? "0";
      });
    } catch (error) {
      console.error(error);
      showError("Unable to load event.");
    }
  }

  joinBtn?.addEventListener("click", async () => {
    if (!eventId) {
      showError("Missing event ID.");
      return;
    }

    if (!user) {
      alert("Please sign in to join this event.");
      return;
    }

    const event = await getEvent(eventId);
    try {
      await updateDoc(doc(db, "reg_links", event.regLink), {
        attendees: arrayUnion(user.uid),
      });
      await updateDoc(doc(db, "users", user.uid), {
        registeredEvents: arrayUnion(eventId),
      });

      alert("Event updated successfully.");
    } catch (error) {
      console.error(error);
      showError("Unable to join the event. Please try again.");
    }
  });

  loadEvent();
}

async function getOtherEvents() {
  const eventId = getEventIdFromUrl();

  const events = await queryEvents();
  const currentEvent = await getEvent(eventId);
  const currentVenue = await getVenueID(eventId);

  const eventsWithVenue = await Promise.all(
    events.map(async (e) => {
      const venue = await getVenueID(e.id);
      return { ...e, venue };
    }),
  );

  const otherEvents = eventsWithVenue.filter(
    (e) => e.venue === currentVenue && e.id !== currentEvent.id,
  );

  return otherEvents;
}
async function setup() {
  const week = await getOtherEvents();
  renderEvents(week, "venue-events", "long");
}
