import { EventCard } from "./components/EventCard";
import { queryEvents } from "./events";
import { getLoader } from "./components/Loader";

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
