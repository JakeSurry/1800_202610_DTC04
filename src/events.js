/* 

=======================================================
OLD evnts.js
=======================================================

import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "./firebaseConfig"
import { EventCard } from "./components/EventCard";

function addEventData() {
  const eventsRef = collection(db, "Events");
  console.log("Adding sample events data...");
  addDoc(eventsRef, {
    code: "EV00",
    name: "EventTest1",
    match: "Canada United States",
    teamOne: "Canada",
    teamTwo: "United States",
    dateTime: "April 26 2:00PM",
    venue: "Sports Bar",
    attendees: 26,
  });
  addDoc(eventsRef, {
    code: "EV01",
    name: "EventTest2",
    match: "Brazil Argentina",
    teamOne: "Brazil",
    teamTwo: "Argentina",
    dateTime: "April 28 5:00PM",
    venue: "Downtown Pub",
    attendees: 12,
  });
}

async function seedEvents() {
    const eventsRef = collection(db, "Events");
    const querySnapshot = await getDocs(eventsRef);
    if (querySnapshot.empty) {
        console.log("Events collection is empty. Seeding data...");
        addEventData();
    } else {
        console.log("Events collection already contains data. Skipping seed.");
    }
}

seedEvents();

async function getEventsByAttribute() {
    const q = query(
        collection(db, "Events"),
        where("attendees", ">", 0), // Here we can use these functions to narrow down results similar to jquerry
        orderBy("attendees"),       // Should be usefull when setting up specific fields like Upcomming, Near By, ETC.
        limit(10)                   // These are just some example ways of filtering, more found on docs (make sure to import the ones you use)
    );
    try {
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

customElements.define("event-card-new", EventCard);

const container = document.getElementById("events-list");
const events = await getEventsByAttribute()
events.forEach((event) => {
  const card = document.createElement("event-card-new");
  card.setEvent(event);
  container.appendChild(card);
});
 */

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

// Get the RegLink data associated with an event
export async function getEventRegLink(eventId) {
  const event = await getEvent(eventId);
  if (!event || !event.reg_link) return null;

  const regLinkRef = doc(db, "reg_links", event.reg_link);
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

seedEventsAndRegLinks()