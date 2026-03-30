import { EventCard } from "./EventCard";

customElements.define("event-card", EventCard);

export function renderEvents(events, eventsContainerId) {
  /* This function takes an array of event objects and the id of the container where 
  the events should be rendered and appends the rendered events to that container */
  const eventsContainer = $(`#${eventsContainerId}`);
  for (let event of events) {
    const eventCard = document.createElement("event-card");
    eventCard.event = event;

    eventsContainer.append(eventCard);
  }
}
