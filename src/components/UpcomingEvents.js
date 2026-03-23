import { svgs } from "./../svgs.js";

class HostedEvent extends HTMLElement {
  set event(value) {
    this._event = value;
    this.render();
  }

  render() {
    const event = this._event;
    if (!event) return;

    this.innerHTML = `
      <div
        style="background-image: url('${event.image}');"
        class="relative w-[320px] md:w-105 overflow-hidden square-rounded-box p-0 justify-center bg-cover bg-center text-white shadow-lg"
      >
        <div class="absolute inset-0 hero-blue-gradient"></div>

        <div class="relative z-10 flex min-h-50 flex-col justify-between w-full">
          <div class="px-5 pt-5">
            <div class="flex items-center justify-between gap-3">
              <img
                src="../../images/flags/${event.team1}.png"
                alt="${event.team1}"
                class="h-12 w-12 object-contain"
              />

              <p class="text-center text-base font-bold text-white">
                ${event.team1} vs ${event.team2}
              </p>

              <img
                src="../../images/flags/${event.team2}.png"
                alt="${event.team2}"
                class="h-12 w-12 object-contain"
              />
            </div>

            <div class="mt-1 flex items-center gap-2">
               ${svgs.clock(18, 18, "#F9FAFB")}

              <p class="subtitle text-white md:text-base">
                ${event.date} at ${event.time}
              </p>
            </div>
          </div>

          <div class="relative flex items-center justify-between bg-dark-blue px-5 py-4">
            <div class="flex items-center gap-2">
              ${svgs.people(22, 22, "#F9FAFB")}
              <p class="text-sm font-medium text-white">
                <span class="font-bold">${event.fans}</span> Fans Going
              </p>
            </div>

            <button
              type="button"
              id="viewEvent"
              class="main-blue-gradient bright-hover small-button"
            >
              View Event
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("hosted-event-card", HostedEvent);

export function renderHostedEvents(events, hostedEvents) {
  const eventsContainer = $(`#${hostedEvents}`);
  for (let event of events) {
    const eventCard = document.createElement("hosted-event-card");
    eventCard.event = event;
    eventsContainer.append(eventCard);
  }
}
