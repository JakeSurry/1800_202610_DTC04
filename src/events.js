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
  @param {string} eventData.reg_link  – RegLink document ID
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

// Get the RegLink data associated with an event
export async function getEventRegLink(eventId) {
  const event = await getEvent(eventId);

  if (!event || !event.regLink) return null;
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

// get the venue ID from the reglink
export async function getVenueID(eventId) {
  const regLink = await getEventRegLink(eventId);
  if (!regLink) return 0;
  return regLink.host;
}

// get the venue obj
export async function getVenue(eventId) {
  const venueID = await getVenueID(eventId);
  const venueRef = doc(db, "business_accounts", venueID);
  const snap = await getDoc(venueRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

//get venue location
export async function getEventLocation(eventId) {
  const venue = await getVenue(eventId);
  return `${venue.address}, ${venue.city}, ${venue.province}, ${venue.postalCode}`;
}
seedEventsAndRegLinks();
