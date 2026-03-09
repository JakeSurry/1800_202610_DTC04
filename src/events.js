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
