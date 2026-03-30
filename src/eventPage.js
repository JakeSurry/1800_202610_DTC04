import { EventCard } from "./components/EventCard";
import { queryEvents } from "./events";

const container = document.getElementById("events-list");
customElements.define("event-card", EventCard);

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
