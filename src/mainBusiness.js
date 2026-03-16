import { onAuthReady } from "./authentication.js";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { renderHostedEvents } from "./components/UpcomingEvents.js";
import { renderMatchSchedule } from "./components/matchSchedule.js";

async function showName() {
  onAuthReady(async (user) => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const eventNumber = document.getElementById("hostedNumber");
    const fansRegistered = document.getElementById("fansRegistered");
    const eventsThisWeek = document.getElementById("eventsThisWeek");

    try {
      const businessRef = doc(db, "business_accounts", user.uid);
      const businessSnap = await getDoc(businessRef);

      if (!businessSnap.exists()) {
        console.error("Business account document not found.");
        return;
      }

      const businessData = businessSnap.data();

      const name =
        businessData.displayName || businessData.businessName || user.email;
      const hostingEvents = businessData.hostingEvents || [];

      const events = hostingEvents.length;
      const fans = 0;
      const numberEventsThisWeek = events;

      if (eventNumber) {
        eventNumber.textContent = `${events}`;
      }

      if (fansRegistered) {
        fansRegistered.textContent = `${fans}`;
      }

      if (eventsThisWeek) {
        eventsThisWeek.textContent = `${numberEventsThisWeek}`;
      }

      if (title) {
        title.textContent = `Welcome back ${name}`;
      }

      if (subtitle) {
        if (events > 0) {
          subtitle.textContent = `Hosting ${events} World Cup events this week`;
        } else {
          subtitle.textContent = `Create an event to feel the World Cup with the fans`;
        }
      }
    } catch (error) {
      console.error("Error loading business data:", error);
    }
  });
}

function addMatch() {
  const match = {
    team1: "Canada",
    team2: "Mexico",
    date: "June 18, 2026",
    time: "11:00 AM",
  };

  const heroSection = document.querySelector("hero-section-buisness");
  if (heroSection) {
    heroSection.hero = match;
  }
}

export const dummyHostedEvents = [
  {
    image: "images/stadium1.png",
    team1: "Canada",
    team2: "Mexico",
    date: "June 18, 2026",
    time: "11:00 AM",
    fans: 150,
  },
  {
    image: "images/stadium2.png",
    team1: "Brazil",
    team2: "Germany",
    date: "June 20, 2026",
    time: "2:00 PM",
    fans: 150,
  },
  {
    image: "images/stadium3.png",
    team1: "Argentina",
    team2: "France",
    date: "June 22, 2026",
    time: "5:30 PM",
    fans: 150,
  },
  {
    image: "images/stadium4.png",
    team1: "England",
    team2: "Spain",
    date: "June 25, 2026",
    time: "7:00 PM",
    fans: 150,
  },
];

const dummySchedule = [
  {
    team1: "Argentina",
    team2: "Mexico",
    date: "June 21, 2026",
    time: "2:00 PM",
  },
  {
    team1: "England",
    team2: "France",
    date: "June 23, 2026",
    time: "11:00 AM",
  },
  {
    team1: "Spain",
    team2: "Germany",
    date: "June 25, 2026",
    time: "5:30 PM",
  },
  {
    team1: "Brazil",
    team2: "Uruguay",
    date: "June 28, 2026",
    time: "8:00 PM",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  addMatch();
  showName();
  renderHostedEvents(dummyHostedEvents, "hosted-event-card");
  renderMatchSchedule(dummySchedule, "matches");
});
