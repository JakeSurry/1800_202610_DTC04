import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
Create a single reg_link document.
Returns the new reg_link's document ID.

@param {Object} regLinkData
@param {string} regLinkData.host      – BusActID (business account doc ID)
@param {string} regLinkData.event     – EventID  (event doc ID)
@param {Array}  regLinkData.attendees – array of attendee objects
 */
export async function createRegLink(regLinkData) {
  const docRef = await addDoc(collection(db, "reg_links"), regLinkData);
  return docRef.id;
}

// Fetch a single reg_link by its document ID
export async function getRegLink(regLinkId) {
  const ref = doc(db, "reg_links", regLinkId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Get the event associated with a reg_link
export async function getRegLinkEvent(regLinkId) {
  const regLink = await getRegLink(regLinkId);
  if (!regLink || !regLink.event) return null;

  const eventRef = doc(db, "events", regLink.event);
  const snap = await getDoc(eventRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Get the host associated with a reg_link
export async function getRegLinkHost(regLinkId) {
  const regLink = await getRegLink(regLinkId);
  if (!regLink || !regLink.host) return null;

  const hostRef = doc(db, "businesses", regLink.host);
  const snap = await getDoc(hostRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Get all reg_links for a given event ID
export async function getRegLinksByEvent(eventId) {
  const q = query(collection(db, "reg_links"), where("event", "==", eventId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get all reg_links hosted by a given business
export async function getRegLinksByHost(busActId) {
  const q = query(collection(db, "reg_links"), where("host", "==", busActId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get the location for a given event (traverses event -> reg_link -> business)
export async function getEventLocation(eventId) {
  const eventRef = doc(db, "events", eventId);
  const eventSnap = await getDoc(eventRef);
  if (!eventSnap.exists()) return null;
  const eventData = eventSnap.data();

  const regLinkRef = doc(db, "reg_links", eventData.reg_link);
  const regLinkSnap = await getDoc(regLinkRef);
  if (!regLinkSnap.exists()) return null;
  const regLinkData = regLinkSnap.data();

  const hostRef = doc(db, "businesses", regLinkData.host);
  const hostSnap = await getDoc(hostRef);
  if (!hostSnap.exists()) return null;

  return hostSnap.data().location;
}
