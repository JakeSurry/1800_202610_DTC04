/**
 * seedEvents.js
 * Seeds demo data into Firestore when the events collection is empty.
 * Creates sample business accounts, events, and reg_links so the app
 * has content to display during development or first-time setup.
 */

import { collection, getDocs, updateDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { createEvent } from "./events";
import { createRegLink } from "./regLinks";

// Demo business accounts to seed
const SEED_BUSINESSES = [
  {
    id: "BIZ_SPORTSBAR",
    data: {
      uid: "BIZ_SPORTSBAR",
      accountType: "business",
      businessName: "The Sports Bar",
      displayName: "The Sports Bar",
      email: "info@sportsbar.com",
      phone: "604-555-0101",
      profilePic: null,
      coverImage: null,
      businessType: "Bar",
      address: "123 Main St",
      city: "Vancouver",
      province: "BC",
      postalCode: "V6B 1A1",
      description: "The best sports bar in town with giant screens and cold drinks.",
      website: "https://sportsbar.com",
      instagram: "@thesportsbar",
      hostingEvents: [],
    },
  },
  {
    id: "BIZ_DOWNTOWNPUB",
    data: {
      uid: "BIZ_DOWNTOWNPUB",
      accountType: "business",
      businessName: "Downtown Pub",
      displayName: "Downtown Pub",
      email: "hello@downtownpub.com",
      phone: "604-555-0202",
      profilePic: null,
      coverImage: null,
      businessType: "Pub",
      address: "456 Granville St",
      city: "Vancouver",
      province: "BC",
      postalCode: "V6C 2R6",
      description: "A cozy downtown pub perfect for watching the big game.",
      website: "https://downtownpub.com",
      instagram: "@downtownpub",
      hostingEvents: [],
    },
  },
];

// Demo events with their associated reg_link data
const SEED_DATA = [
  {
    regLink: {
      host: "BIZ_SPORTSBAR",
      attendees: [
        { uid: "USER_001", displayName: "Alice" },
        { uid: "USER_002", displayName: "Bob" },
      ],
    },
    event: {
      name: "Canada vs United States Watch Party",
      venue: "The Sports Bar",
      team1: "Canada",
      team2: "United_States",
      date: "2026-04-26",
      startTime: "14:00",
      endTime: "16:00",
      duration: "2 hrs",
      description: "Watch Canada take on the United States at our big screen venue!",
      match: "Canada vs United_States",
      image: "",
    },
  },
  {
    regLink: {
      host: "BIZ_DOWNTOWNPUB",
      attendees: [{ uid: "USER_003", displayName: "Carlos" }],
    },
    event: {
      name: "Brazil vs Argentina Showdown",
      venue: "Downtown Pub",
      team1: "Brazil",
      team2: "Argentina",
      date: "2026-04-28",
      startTime: "17:00",
      endTime: "19:00",
      duration: "2 hrs",
      description: "The ultimate South American rivalry on the big screen!",
      match: "Brazil vs Argentina",
      image: "",
    },
  },
];

/**
 * Check if the events collection is empty; if so, seed business accounts,
 * events, and reg_links. Skips entirely if any events already exist.
 */
export async function seedEventsAndRegLinks() {
  const eventsSnap = await getDocs(collection(db, "events"));

  if (!eventsSnap.empty) {
    console.log("Events collection already has data. Skipping seed.");
    return;
  }

  console.log("Seeding business accounts, events + reg_links...");

  // 1. Create business accounts
  for (const biz of SEED_BUSINESSES) {
    await setDoc(doc(db, "business_accounts", biz.id), biz.data);
    console.log(`  Created business account "${biz.id}"`);
  }

  // 2. Create events and reg_links
  for (const entry of SEED_DATA) {
    const regLinkId = await createRegLink({
      ...entry.regLink,
      event: null,
    });

    const eventId = await createEvent({
      ...entry.event,
      regLink: regLinkId,
    });

    await updateDoc(doc(db, "reg_links", regLinkId), { event: eventId });

    // 3. Add reg_link to the business account's hostingEvents
    const bizRef = doc(db, "business_accounts", entry.regLink.host);
    await updateDoc(bizRef, {
      hostingEvents: [...(SEED_BUSINESSES.find(b => b.id === entry.regLink.host)?.data.hostingEvents || []), regLinkId],
    });

    console.log(`  Created event "${eventId}" <-> reg_link "${regLinkId}"`);
  }

  console.log("Seed complete.");
}
