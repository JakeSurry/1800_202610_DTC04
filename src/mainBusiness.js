import { onAuthReady } from "./authentication.js";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { renderHostedEvents } from "./components/UpcomingEvents.js";
import { renderMatchSchedule } from "./components/matchSchedule.js";
import { getRegLink, getRegLinkEvent } from "./regLinks.js";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getLoader() {
  return document.querySelector("page-loader");
}

function setHeroText(name, eventsCount) {
  const hero = document.querySelector("hero-section-buisness");
  if (!hero) return;

  hero.hero = {
    team1: "Canada",
    team2: "Mexico",
    date: "June 18, 2026",
    time: "11:00 AM",
  };

  setTimeout(() => {
    const title = hero.querySelector("#title");
    const subtitle = hero.querySelector("#subtitle");

    if (title) {
      title.textContent = `Welcome back ${name}`;
    }

    if (subtitle) {
      subtitle.textContent =
        eventsCount > 0
          ? `Hosting ${eventsCount} World Cup events`
          : `Create an event to feel the World Cup with the fans`;
    }
  }, 0);
}

async function getHostedEventsFromBusiness(hostingEvents = []) {
  const hostedEvents = [];

  for (const regLinkId of hostingEvents) {
    const regLink = await getRegLink(regLinkId);
    if (!regLink) continue;

    const event = await getRegLinkEvent(regLinkId);
    if (!event) continue;

    const fans = Array.isArray(regLink.attendees)
      ? regLink.attendees.length
      : 0;

    hostedEvents.push({
      id: event.id,
      image: event.image || "images/stadium1.png",
      team1: event.team1,
      team2: event.team2,
      date: formatDate(event.date),
      time: formatTime(event.time),
      fans,
      name: event.name,
      rawDate: event.date,
      rawTime: event.time,
    });
  }

  return hostedEvents;
}

function getEventsThisWeekCount(events) {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  return events.filter((event) => {
    if (!event.rawDate) return false;
    const eventDate = new Date(event.rawDate);
    return eventDate >= now && eventDate <= nextWeek;
  }).length;
}

function getNextMatch(events) {
  const upcoming = events
    .filter((event) => event.rawDate)
    .sort((a, b) => {
      const dateA = new Date(`${a.rawDate}T${a.rawTime || "00:00"}`);
      const dateB = new Date(`${b.rawDate}T${b.rawTime || "00:00"}`);
      return dateA - dateB;
    });

  return upcoming[0] || null;
}

async function loadBusinessDashboard(user) {
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
    const hostedEvents = await getHostedEventsFromBusiness(hostingEvents);

    const eventsCount = hostedEvents.length;
    const totalFans = hostedEvents.reduce(
      (sum, event) => sum + (event.fans || 0),
      0,
    );
    const weeklyCount = getEventsThisWeekCount(hostedEvents);

    if (eventNumber) {
      eventNumber.textContent = `${eventsCount}`;
    }

    if (fansRegistered) {
      fansRegistered.textContent = `${totalFans}`;
    }

    if (eventsThisWeek) {
      eventsThisWeek.textContent = `${weeklyCount}`;
    }

    setHeroText(name, eventsCount);

    const nextMatch = getNextMatch(hostedEvents);
    if (nextMatch) {
      const heroSection = document.querySelector("hero-section-buisness");
      if (heroSection) {
        heroSection.hero = {
          team1: nextMatch.team1,
          team2: nextMatch.team2,
          date: nextMatch.date,
          time: nextMatch.time,
        };
      }
    }

    renderHostedEvents(hostedEvents, "hosted-event-card");
  } catch (error) {
    console.error("Error loading business data:", error);
  }
}

function loadMatchSchedule() {
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

  renderMatchSchedule(dummySchedule, "matches");
}

function initBusinessScreen() {
  const loader = getLoader();
  loader?.setText("Loading dashboard...");
  loader?.show();

  onAuthReady(async (user) => {
    try {
      if (!user) {
        location.href = "index.html";
        return;
      }

      await loadBusinessDashboard(user);
      loadMatchSchedule();
    } catch (error) {
      console.error("Error initializing business screen:", error);
    } finally {
      loader?.hide();
    }
  });
}

document.addEventListener("DOMContentLoaded", initBusinessScreen);

document.addEventListener("DOMContentLoaded", initBusinessScreen);
