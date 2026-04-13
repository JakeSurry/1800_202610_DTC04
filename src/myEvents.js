/**
 * myEvents.js
 * Displays the logged-in user's registered events on the "My Events" page.
 * Fetches the user's registeredEvents array from Firestore, cross-references
 * it with all events, and renders the matching ones.
 */

import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { queryEvents } from "./events";
import { renderEvents } from "./components/EventsRow.js";

async function ShowProfileEvents() {
  onAuthReady(async (user) => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const registeredEventIds = userDoc.data()?.registeredEvents || [];

      if (registeredEventIds.length === 0) return;

      // Filter all events down to only those the user has registered for
      const allEvents = await queryEvents();
      const myEvents = allEvents.filter((e) =>
        registeredEventIds.includes(e.id),
      );

      renderEvents(myEvents, "events", "full");
    } catch (err) {
      console.error("Error loading profile events:", err);
    }
  });
}

ShowProfileEvents();
