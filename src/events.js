import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { seedEventsAndRegLinks } from "./seedEvents";

/**
  Create a single event document.
  Returns the new event's document ID.
  
  @param {Object} eventData
  @param {string} eventData.dateTime  – MMDDYYHHMM format (e.g. "0310261345" is March 10, 2026 1:45PM)
  @param {[string,string]} eventData.teams – tuple of two team names
  @param {string} eventData.regLink  – RegLink document ID
   */
export async function createEvent(eventData) {
  const docRef = await addDoc(collection(db, "events"), eventData);
  return docRef.id;
}

// Fetch a single event by its document ID
export async function getEvent(eventId) {
  const eventRef = doc(db, "events", eventId);

  const snap = await getDoc(eventRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Query events with optional filters
export async function queryEvents(filters = {}) {
  const constraints = [];

  if (filters.team) {
    constraints.push(where("teams", "array-contains", filters.team));
  }

  if (filters.orderByField) {
    constraints.push(orderBy(filters.orderByField));
  }

  if (filters.limit) {
    constraints.push(limit(filters.limit));
  }

  const q = query(collection(db, "events"), ...constraints);

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error querying events:", error);
    return [];
  }
}

// Get a random event
export async function getRandEvent() {
  const q = query(collection(db, "events"));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)];
  } catch (error) {
    console.error("Error querying events:", error);
    return [];
  }
}

// Get the information for an eventId's reglink
export async function getEventRegLink(eventId) {
  const event = await getEvent(eventId);
  if (!event?.regLink) return null;

  const regLinkRef = doc(db, "reg_links", event.regLink);
  const snap = await getDoc(regLinkRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Get number of attendees for a given event
export async function getNumAttendees(eventId) {
  const regLink = await getEventRegLink(eventId);
  if (!regLink) return 0;
  return regLink.attendees.length;
}

// Parse a raw event's date fields into a timestamp for sorting
function parseDateToTimestamp(raw) {
  if (raw.dateTime) {
    const month = parseInt(raw.dateTime.substring(0, 2)) - 1;
    const day = parseInt(raw.dateTime.substring(2, 4));
    const year = 2000 + parseInt(raw.dateTime.substring(4, 6));
    const hour = parseInt(raw.dateTime.substring(6, 8));
    const minute = parseInt(raw.dateTime.substring(8, 10));
    return new Date(year, month, day, hour, minute).getTime();
  }
  if (raw.date && raw.time) {
    return new Date(`${raw.date}T${raw.time}`).getTime();
  }
  return 0;
}

// Parse a raw event's date fileds into to readable string
function parseSeedDateTime(dt) {
  const month = parseInt(dt.substring(0, 2));
  const day = parseInt(dt.substring(2, 4));
  const year = 2000 + parseInt(dt.substring(4, 6));
  const hour = parseInt(dt.substring(6, 8));
  const minute = dt.substring(8, 10);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${months[month - 1]} ${day}, ${year} • ${displayHour}:${minute} ${ampm}`;
}


// Map a Firestore event document to the format <event-card> expects
function formatEventForCard(event) {
  let name = "";
  let dateStr = "";

  if (event.name) {
    // Event created via the createEvent form
    name = event.name;
    if (event.date && event.time) {
      const d = new Date(`${event.date}T${event.time}`);
      dateStr =
        d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) +
        " • " +
        d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    }
  } else if (event.teams && event.dateTime) {
    // Seed event
    name = `${event.teams[0]} vs ${event.teams[1]}`;
    dateStr = parseSeedDateTime(event.dateTime);
  } else {
    return null;
  }

  return {
    id: event.id,
    name,
    image: "./images/dummyImage.jpg",
    registration: "0 Fans Going",
    date: dateStr,
  };
}

// All loaded events stored for client-side filtering
let allEvents = [];

// Fetch all events from Firestore and store them for filtering
async function loadEventsPage() {
  const container = document.getElementById("events-list");
  if (!container) return;

  const snapshot = await getDocs(collection(db, "events"));

  await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const event = { id: docSnap.id, ...docSnap.data() };
      const formatted = formatEventForCard(event);
      if (!formatted) return;

      // Get attendee count using getNumAttendees
      const attendeeCount = await getNumAttendees(event.id);
      formatted.registration = `${attendeeCount} Fans Going`;

      allEvents.push({ raw: event, formatted, attendeeCount });
    }),
  );

  // Apply any filters from URL params on initial load
  applyFiltersFromURL();
}

// Read current URL params and render filtered events
function applyFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  filterAndRender(
    params.get("q") || "",
    params.get("team") || "",
    params.get("orderBy") || "",
  );
}

// Filter, sort, and render events into the container
function filterAndRender(searchQuery, teamFilter, orderByField) {
  const container = document.getElementById("events-list");
  if (!container) return;
  container.innerHTML = "";

  let filtered = allEvents.filter(({ raw, formatted }) => {
    // Text search — match against event name or team names
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = formatted.name.toLowerCase().includes(q);
      const teamMatch = raw.teams?.some((t) => t.toLowerCase().includes(q));
      if (!nameMatch && !teamMatch) return false;
    }

    // Team filter
    if (teamFilter) {
      const t = teamFilter.toLowerCase();
      const hasTeam = raw.teams?.some((team) =>
        team.toLowerCase().includes(t),
      );
      if (!hasTeam) return false;
    }

    return true;
  });

  // Sort
  if (orderByField === "dateTime") {
    filtered.sort((a, b) => parseDateToTimestamp(a.raw) - parseDateToTimestamp(b.raw));
  } else if (orderByField === "name") {
    filtered.sort((a, b) =>
      a.formatted.name.localeCompare(b.formatted.name),
    );
  } else if (orderByField === "attendees") {
    filtered.sort((a, b) => b.attendeeCount - a.attendeeCount);
  }

  // Render
  for (const { formatted } of filtered) {
    const eventCard = document.createElement("event-card");
    eventCard.event = formatted;
    container.appendChild(eventCard);
  }
}

// Listen for search:submit from the SearchBar component
document.addEventListener("search:submit", (e) => {
  const { value, filters } = e.detail;

  // Update URL params so state persists on refresh
  const params = new URLSearchParams();
  if (value) params.set("q", value);
  if (filters.team) params.set("team", filters.team);
  if (filters.orderBy) params.set("orderBy", filters.orderBy);

  const qs = params.toString();
  window.history.replaceState(
    {},
    "",
    qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
  );

  filterAndRender(value, filters.team, filters.orderBy);
});

seedEventsAndRegLinks().then(() => loadEventsPage());
