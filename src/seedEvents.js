import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { createEvent } from "./events";
import { createRegLink } from "./regLinks";

const SEED_DATA = [
  {
    regLink: {
      host: "BIZ_SPORTSBAR",           // will map to a businesses doc later
      attendees: [
        { uid: "USER_001", displayName: "Alice" },
        { uid: "USER_002", displayName: "Bob" },
      ],
    },
    event: {
      dateTime: "0426261400",           // April 26 2026 2:00 PM
      teams: ["Canada", "United States"],
    },
  },
  {
    regLink: {
      host: "BIZ_DOWNTOWNPUB",
      attendees: [
        { uid: "USER_003", displayName: "Carlos" },
      ],
    },
    event: {
      dateTime: "0428261700",           // April 28 2026 5:00 PM
      teams: ["Brazil", "Argentina"],
    },
  },
];

// Seeds the events and reg_links collections if events is empty
export async function seedEventsAndRegLinks() {
  const eventsSnap = await getDocs(collection(db, "events"));

  if (!eventsSnap.empty) {
    console.log("Events collection already has data. Skipping seed.");
    return;
  }

  console.log("Seeding events + reg_links...");

  for (const entry of SEED_DATA) {
    // 1. Create reg_link first (event field is null for now)
    const regLinkId = await createRegLink({
      ...entry.regLink,
      event: null,
    });
  
    // 2. Create event with the reg_link ID
    const eventId = await createEvent({
      ...entry.event,
      regLink: regLinkId,
    });
  
    // 3. Update reg_link with the real event ID
    await updateDoc(doc(db, "reg_links", regLinkId), { event: eventId });
  
    console.log(`  Created event "${eventId}" <-> reg_link "${regLinkId}"`);
  }

  console.log("Seed complete.");
}