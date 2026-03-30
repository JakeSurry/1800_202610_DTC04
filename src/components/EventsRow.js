import { svgs } from "../svgs.js";
class Event extends HTMLElement {
  set event(value) {
    this._event = value;
    this.render();
  }

  render() {
    const event = this._event;
    if (!event) return;
    this.innerHTML = `
        <div
            class="white-card square-rounded-box items-start p-0 border-0 flex flex-col gap-2 pb-4 h-full min-w-50 md:min-w-0"
          >
          <img
          src="${event.image}"
          alt="${event.name}"
          class="w-full aspect-2/1 object-cover rounded-t-lg"
          />
          <div class="space-y-2 px-5">
            <h4>${event.name}</h4>
            <div class="flex gap-2 items-center">
              ${svgs.people(14, 14, "#000000")}
              <p class="subtitle font-semibold">${event.registration}</p>
            </div>
            <div class="flex gap-2 items-center">
            ${svgs.clock(14, 14, "#000000")}
            <p class="subtitle font-semibold">${event.date}</p>
          </div>
        </div>
        `;
  }
}

customElements.define("event-card", Event);

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
