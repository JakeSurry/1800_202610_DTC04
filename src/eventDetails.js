import { renderEvents } from "./components/EventsRow.js";
import {
  queryEvents,
  getNumAttendees,
  getEvent,
  getVenueID,
  getVenue,
} from "./events";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { onAuthReady } from "./authentication.js";
import { svgs } from "../src/svgs.js";

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

  //element refs
  const eventVsEl = document.getElementById("team-vs");
  const team1Image = document.getElementById("team-1-image");
  const team2Image = document.getElementById("team-2-image");
  const eventDesc = document.getElementById("event-description");
  const venueDesc = document.getElementById("venue-description");
  const venueType = document.getElementById("venue-type");
  const venuePhone = document.getElementById("venue-phone");
  const venueWeb = document.getElementById("venue-website");
  const venueInsta = document.getElementById("venue-instagram");

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
      //refs
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);
      const currentVenueId = await getVenueID(eventId);
      const venueRef = doc(db, "business_accounts", currentVenueId);
      const venueSnap = await getDoc(venueRef);

      if (!eventSnap.exists() || !venueSnap.exists()) {
        showError("Event not found.");
        return;
      }

      //data
      const event = eventSnap.data();
      const venue = venueSnap.data();
      const venueLoc = `${venue.address}, ${venue.city}, ${venue.province}, ${venue.postalCode}`;
      const attendeesCount = await getNumAttendees(eventId);

      //assign values
      if (eventVsEl) eventVsEl.textContent = event.team1 + " vs " + event.team2;
      if (team1Image) team1Image.src = `../../images/flags/${event.team1}.png`;
      if (team2Image) team2Image.src = `../../images/flags/${event.team2}.png`;
      if (eventDesc) eventDesc.textContent = event.description || "";

      if (venueDesc) venueDesc.textContent = venue.description || "";
      if (venueType && venue.businessType)
        venueType.innerHTML =
          venueInfoTemplate(
            venue.businessType,
            svgs.beer(25, 25, "currentColor"),
          ) || "";
      if (venuePhone && venue.phone)
        venuePhone.innerHTML =
          venueInfoTemplate(venue.phone, svgs.phone(25, 25, "currentColor")) ||
          "";
      if (venueWeb && venue.website)
        venueWeb.innerHTML =
          venueInfoTemplate(
            venue.website,
            svgs.website(25, 25, "currentColor"),
          ) || "";
      if (venueInsta && venue.instagram)
        venueInsta.innerHTML =
          venueInfoTemplate(
            venue.instagram,
            svgs.instagram(25, 25, "currentColor"),
          ) || "";

      document.querySelectorAll(".event-name").forEach((el) => {
        el.textContent = event.name || "Unnamed Event";
      });
      document.querySelectorAll(".date").forEach((el) => {
        el.textContent = event.date || "TBD";
      });

      document.querySelectorAll(".time").forEach((el) => {
        el.textContent = event.time || "TBD";
      });

      document.querySelectorAll(".location").forEach((el) => {
        el.textContent = venueLoc || "TBD";
      });

      document.querySelectorAll(".attendees").forEach((el) => {
        el.textContent = attendeesCount ?? "0";
      });

      if (event.image) {
        document.getElementById("event-bg").style.backgroundImage =
          `url("${event.image}")`;
      }
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

function venueInfoTemplate(value, svg) {
  return `<div class="flex gap-2">
            ${svg}
            <p class="subtitle font-semibold">${value}</p>
          </div>`;
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
