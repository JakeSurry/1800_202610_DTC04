/**
 * EventsRow.js
 * Registers the <event-card> custom element and provides a helper
 * to render an array of events into any container by ID.
 */

import { EventCard } from "./EventCard";

customElements.define("event-card", EventCard);

/**
 * Render event cards into a container.
 * @param {Array}  events             - Array of event objects from Firestore
 * @param {string} eventsContainerId  - DOM id of the target container
 * @param {string} cardType           - Visual style: "default", "compact", or "long"
 */
export function renderEvents(events, eventsContainerId, cardType = "default") {
  const eventsContainer = $(`#${eventsContainerId}`);
  for (let event of events) {
    const eventCard = document.createElement("event-card");
    eventCard.event = event;
    eventCard.visualStyle = cardType;

    eventsContainer.append(eventCard);
  }
}
