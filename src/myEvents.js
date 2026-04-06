import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { queryEvents } from "./events";

import { renderEvents } from "./components/EventsRow.js";

async function ShowProfileEvents() {
  onAuthReady(async (user) => {
    if (!user) return;
    onSnapshot(doc(db, "users", user.uid), (userDoc) => {});

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const registeredEventIds = userDoc.data()?.registeredEvents || [];

      if (registeredEventIds.length === 0) return;

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
