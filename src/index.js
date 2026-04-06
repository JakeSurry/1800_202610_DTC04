import { renderEvents } from "./components/EventsRow.js";
import { renderMatches } from "./components/MatchCard.js";
import { queryEvents, getNumAttendees } from "./events";

const matches = [
  {
    image: "images/stadium1.png",
    team1: "Brazil",
    team2: "Germany",
    date: "June 18, 2026",
    time: "11:00 AM",
  },
  {
    image: "images/stadium2.png",
    team1: "Argentina",
    team2: "France",
    date: "June 22, 2026",
    time: "2:00 PM",
  },
  {
    image: "images/stadium3.png",
    team1: "Canada",
    team2: "Mexico",
    date: "June 25, 2026",
    time: "5:30 PM",
  },
  {
    image: "images/stadium4.png",
    team1: "England",
    team2: "Spain",
    date: "June 30, 2026",
    time: "12:00 PM",
  },
];

function addMatch() {
  const match = {
    team1: "Brazil",
    team2: "germany",
    date: "June 18, 2026",
    time: "11:00 AM",
  };

  const heroSection = document.querySelector("hero-section");
  heroSection.hero = match;
}

async function getMostPopularEvents(limitCount = 4) {
  const events = await queryEvents();

  const eventsWithCounts = await Promise.all(
    events.map(async (event) => {
      const numAttendees = await getNumAttendees(event.id);
      return { ...event, numAttendees };
    }),
  );

  eventsWithCounts.sort((a, b) => b.numAttendees - a.numAttendees);
  return eventsWithCounts.slice(0, limitCount);
}

async function getEventsAfterHour(hourAfter = 19, limitCount = 4) {
  const events = await queryEvents();

  const afterHour = events
    .filter((e) => {
      if (!e.time) return false;

      const hour = parseInt(e.time.split(":")[0], 10);
      return hour >= hourAfter;
    })
    .sort((a, b) => {
      const hourA = parseInt(a.time.split(":")[0], 10);
      const hourB = parseInt(b.time.split(":")[0], 10);
      return hourA - hourB;
    });

  return afterHour.slice(0, limitCount);
}

async function getWeekEvents(limitCount = 4) {
  const events = await queryEvents();
  const now = new Date();

  //get week range
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  //filter
  const thisWeek = events
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return thisWeek.slice(0, limitCount);
}

async function setup() {
  renderMatches(matches, "matches-row");

  const mostPopular = await getMostPopularEvents();
  const afterHour = await getEventsAfterHour(19);
  const week = await getWeekEvents();

  renderEvents(mostPopular, "first-row");
  renderEvents(afterHour, "second-row");
  renderEvents(week, "third-row");
  addMatch();
}

$(document).ready(function () {
  setup();
});
