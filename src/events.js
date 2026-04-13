/**
 * events.js
 * Core event data layer — CRUD operations, querying, and the events listing page logic.
 * Also powers client-side filtering/sorting on events.html via the SearchBar component.
 *
 * Firestore collections used:
 *   - "events"     — event documents
 *   - "reg_links"  — registration links tying events to businesses and attendees
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
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
  @param {string} eventData.name       – Event name
  @param {string} eventData.venue      – Venue name
  @param {string} eventData.team1      – Home team
  @param {string} eventData.team2      – Away team
  @param {string} eventData.date       – YYYY-MM-DD format
  @param {string} eventData.startTime  – HH:MM 24-hour format
  @param {string} eventData.endTime    – HH:MM 24-hour format
  @param {string} eventData.duration   – e.g. "2 hrs"
  @param {string} eventData.regLink    – RegLink document ID
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

  if (filters.orderByField) {
    constraints.push(orderBy(filters.orderByField));
  }

  if (filters.limit) {
    constraints.push(limit(filters.limit));
  }

  const q = query(collection(db, "events"), ...constraints);

  try {
    const snapshot = await getDocs(q);
    let events = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (filters.team) {
      const t = filters.team.toLowerCase();
      events = events.filter(
        (e) =>
          e.team1?.toLowerCase().includes(t) ||
          e.team2?.toLowerCase().includes(t),
      );
    }

    return events;
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

/** Combine a raw event's date and startTime into a numeric timestamp for sorting. */
function parseDateToTimestamp(raw) {
  if (raw.date && raw.startTime) {
    return new Date(`${raw.date}T${raw.startTime}`).getTime();
  }
  if (raw.date) {
    return new Date(raw.date).getTime();
  }
  return 0;
}

/** All loaded events cached in-memory for client-side filtering on events.html. */
let allEvents = [];

/** Fetch every event from Firestore (with attendee counts) and apply URL-based filters. */
async function loadEventsPage() {
  const container = document.getElementById("events-list");
  if (!container) return;

  const snapshot = await getDocs(collection(db, "events"));

  await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const event = { id: docSnap.id, ...docSnap.data() };
      if (!event.name && !event.team1) return;

      const attendeeCount = await getNumAttendees(event.id);
      allEvents.push({ raw: event, attendeeCount });
    }),
  );

  // Apply any filters from URL params on initial load
  applyFiltersFromURL();
}

/** Read current URL search params and apply them to the cached event list. */
function applyFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  filterAndRender(
    params.get("q") || "",
    params.get("team") || "",
    params.get("orderBy") || "",
  );
}

/** Filter cached events by text/team, sort by the chosen field, and render EventCards. */
function filterAndRender(searchQuery, teamFilter, orderByField) {
  const container = document.getElementById("events-list");
  if (!container) return;
  container.innerHTML = "";

  let filtered = allEvents.filter(({ raw }) => {
    // Text search — match against event name or team names
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = (raw.name || "").toLowerCase().includes(q);
      const teamMatch =
        (raw.team1 || "").toLowerCase().includes(q) ||
        (raw.team2 || "").toLowerCase().includes(q);
      if (!nameMatch && !teamMatch) return false;
    }

    // Team filter
    if (teamFilter) {
      const t = teamFilter.toLowerCase();
      const hasTeam =
        (raw.team1 || "").toLowerCase().includes(t) ||
        (raw.team2 || "").toLowerCase().includes(t);
      if (!hasTeam) return false;
    }

    return true;
  });

  // Sort
  if (orderByField === "dateTime") {
    filtered.sort((a, b) => parseDateToTimestamp(a.raw) - parseDateToTimestamp(b.raw));
  } else if (orderByField === "name") {
    filtered.sort((a, b) =>
      (a.raw.name || "").localeCompare(b.raw.name || ""),
    );
  } else if (orderByField === "attendees") {
    filtered.sort((a, b) => b.attendeeCount - a.attendeeCount);
  }

  // Render
  for (const { raw } of filtered) {
    const eventCard = document.createElement("event-card");
    eventCard.event = raw;
    container.appendChild(eventCard);
  }
}

// Listen for search:submit from the <search-bar> component and re-filter in-place
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

// Ensure seed data exists (no-op if events collection already has data), then load the page
seedEventsAndRegLinks().then(() => loadEventsPage());
