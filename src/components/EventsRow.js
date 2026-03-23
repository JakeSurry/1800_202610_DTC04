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
            class="white-card square-rounded-box p-0 flex-col gap-2 w-50 md:w-50 pb-4 md:h-70"
          >
          <img
            src="${event.image}"
            alt="${event.name}"
            class="w-full object-contain rounded-t-lg"/>
          <div class="flex flex-col gap-3 px-4 text-black">
            <h3 class="text-sm font-bold">${event.name}</h3>
            <div class="flex gap-2 items-center">
              ${svgs.people(14, 14, "#000000")}
              <p class="text-xs font-medium md:text-sm">${event.registration}</p>
            </div>
            <div class="flex gap-2 items-center">
            ${svgs.clock(14, 14, "#000000")}
            <p class="text-xs font-medium md:text-sm">${event.date}</p>
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
