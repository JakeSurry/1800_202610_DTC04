import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { queryEvents } from "./events";
import { getLoader } from "./components/Loader.js";
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
        registeredEventIds.includes(e.regLink)
      );

      renderEvents(myEvents, "events", "full");
    } catch (err) {
      console.error("Error loading profile events:", err);
    }
  });
}

$(document).ready(async function () {
  const loader = getLoader();
  loader?.setText("Loading My Events...");
  loader?.show();
  try {
    await ShowProfileEvents();
  } catch (error) {
  } finally {
    loader?.hide();
  }
});
