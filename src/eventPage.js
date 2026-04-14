/**
 * eventPage.js
 * Renders all events in "full" visual style on a dedicated events listing page.
 * Uses the <event-card> custom element (already registered by EventsRow.js).
 */

import { queryEvents } from "./events";
import { getLoader } from "./components/Loader";
import { EventCard } from "./components/EventCard";

customElements.define("event-card", EventCard);

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

$(document).ready(async function () {
  const loader = getLoader();
  loader?.setText("Loading Events...");
  loader?.show();
  try {
    await renderAllEvents();
  } catch (error) {
  } finally {
    loader?.hide();
  }
});
