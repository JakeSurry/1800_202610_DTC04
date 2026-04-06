import { renderEvents } from "./components/EventsRow.js";
import { queryEvents, getNumAttendees, getEvent, getVenueID } from "./events";
import { db } from "/src/firebaseConfig.js";
import {
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { onAuthReady } from "./authentication.js";
import { svgs } from "../src/svgs.js";
import { formatTime } from "../src/components/EventCard.js";

document.addEventListener("DOMContentLoaded", () => {
  onAuthReady(async (user) => {
    await initEventDetails(user);
    setup();
  });
});

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("eventId");
}

async function initEventDetails(user) {
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
  const joinEventBtn = document.getElementById("join");

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
      const venueLoc = [
        venue.address || "TBD",
        venue.city,
        venue.province,
        venue.postalCode,
      ]
        .filter(Boolean)
        .join(", ");
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
        el.textContent = formatTime(event.time) || "TBD";
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

  // join event button
  let isRegistered = await checkregStatus(user, eventId);
  formatJoinButton(joinEventBtn, user, isRegistered);

  joinBtn?.addEventListener("click", async () => {
    if (!eventId) {
      showError("Missing event ID.");
      return;
    }

    if (!user) {
      location.href = "../login.html";
      return;
    }

    const event = await getEvent(eventId);
    try {
      if (isRegistered) {
        await updateDoc(doc(db, "reg_links", event.regLink), {
          attendees: arrayRemove(user.uid),
        });

        await updateDoc(doc(db, "users", user.uid), {
          registeredEvents: arrayRemove(eventId),
        });

        alert("Unregistered successfully.");
      } else {
        await updateDoc(doc(db, "reg_links", event.regLink), {
          attendees: arrayUnion(user.uid),
        });

        await updateDoc(doc(db, "users", user.uid), {
          registeredEvents: arrayUnion(eventId),
        });

        alert("Registered successfully.");
      }

      isRegistered = await checkregStatus(user, eventId);
      formatJoinButton(joinEventBtn, user, isRegistered);
    } catch (error) {
      console.error(error);
      showError("Unable to join the event. Please try again.");
    }
  });

  loadEvent();
}

async function checkregStatus(user, eventId) {
  if (!user) return false;

  const userSnap = await getDoc(doc(db, "users", user.uid));
  const userData = userSnap.data();
  return userData?.registeredEvents?.includes(eventId) || false;
}

function formatJoinButton(joinEventBtn, user, isRegistered) {
  if (!joinEventBtn) return;

  joinEventBtn.className = "default-button w-full";

  if (!user) {
    joinEventBtn.textContent = "Sign Up to Join!";
    joinEventBtn.classList.add("black-gradient", "text-white");
    return;
  }

  if (isRegistered) {
    joinEventBtn.textContent = "Unregister";
    joinEventBtn.classList.add("bg-red", "text-white");
  } else {
    joinEventBtn.textContent = "Join Event";
    joinEventBtn.classList.add("main-blue-gradient");
  }
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
