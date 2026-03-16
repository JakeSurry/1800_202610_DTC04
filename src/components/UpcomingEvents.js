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
        class="relative w-[320px] md:w-105 overflow-hidden rounded-[28px] bg-cover bg-center text-[#F9FAFB] shadow-lg"
      >
        <div class="absolute inset-0 bg-linear-to-t from-[#1D4ED8]/85 via-[#2563EB]/65 to-[#4EA3E3]/60"></div>

        <div class="relative z-10 flex min-h-50 flex-col justify-between">
          <div class="px-5 pt-5">
            <div class="flex items-center justify-between gap-3">
              <img
                src="../../images/flags/${event.team1}.png"
                alt="${event.team1}"
                class="h-12 w-12 object-contain"
              />

              <p class="text-center text-base font-bold text-[#F9FAFB]">
                ${event.team1} vs ${event.team2}
              </p>

              <img
                src="../../images/flags/${event.team2}.png"
                alt="${event.team2}"
                class="h-12 w-12 object-contain"
              />
            </div>

            <div class="mt-6 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#F9FAFB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p class="text-sm font-medium text-[#F9FAFB]/90 md:text-base">
                ${event.date} at ${event.time}
              </p>
            </div>
          </div>

          <div class="relative flex items-center justify-between bg-[#162E5C]/95 px-5 py-4">
            <div class="flex items-center gap-2">
              ${svgs.people(22, 22, "#F9FAFB")}
              <p class="text-sm font-medium text-[#F9FAFB]">
                <span class="font-bold">${event.fans}</span> Fans Going
              </p>
            </div>

            <button
              type="button"
              id="viewEvent"
              class="rounded-full bg-linear-to-r from-[#4EA3E3] via-[#2563EB] to-[#1D4ED8] px-5 py-2 text-sm font-semibold text-[#F9FAFB] hover:brightness-110"
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
