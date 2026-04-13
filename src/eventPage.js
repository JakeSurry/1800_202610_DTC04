/**
 * eventPage.js
 * Renders all events in "full" visual style on a dedicated events listing page.
 * Uses the <event-card> custom element (already registered by EventsRow.js).
 */

import { queryEvents } from "./events";

const container = document.getElementById("events-list");

async function renderAllEvents() {
  const events = await queryEvents();
  container.innerHTML = "";

  for (const event of events) {
    const eventCard = document.createElement("event-card");
    eventCard.event = event;
    eventCard.visualStyle = "full";
    container.appendChild(eventCard);
  }
}

renderAllEvents();
