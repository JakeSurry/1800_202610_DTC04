import { svgs } from "./../svgs.js";

class HostedEvent extends HTMLElement {
  set event(value) {
    this._event = value;
    this.render();
  }

  set fullWidth(value) {
    this._fullWidth = value;
    this.render();
  }

  render() {
    const event = this._event;
    if (!event) return;

    const widthClass = this._fullWidth ? "w-full" : "w-[320px] md:w-105";

    this.innerHTML = `
      <div
        style="background-image: url('${event.image}');"
        class="relative ${widthClass} overflow-hidden square-rounded-box p-0 bg-cover bg-center"
      >
        <div class="absolute inset-0 hero-blue-gradient"></div>

        <div class="relative z-10 flex min-h-50 flex-col justify-between w-full">
          <div class="px-5 pt-5">
            <div class="flex items-center justify-between gap-3 max-w-80">
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

            <h4 class="text-white font-semibold">
              ${event.name}
            </h4>

            <div class="mt-1 flex items-center gap-2">
              ${svgs.clock(18, 18, "#F9FAFB")}

              <p class="subtitle text-white">
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
            <div class="flex gap-2">
              <button
                type="button"
                id="viewEvent"
                class="default-button main-blue-gradient bright-hover small-button"
              >
                Edit
              </button>
              <button
                type="button"
                id="viewEventPage"
                class="default-button clear-window-color clear-hover small-button"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.querySelector("#viewEvent")?.addEventListener("click", () => {
      if (!event.id) {
        console.error("Event ID missing");
        return;
      }

      window.location.href = `/editEvent.html?eventId=${event.id}`;
    });
    this.querySelector("#viewEventPage")?.addEventListener("click", () => {
      if (!event.id) {
        console.error("Event ID missing");
        return;
      }

      window.location.href = `/eventDetails.html?eventId=${event.id}`;
    });
  }
}

customElements.define("hosted-event-card", HostedEvent);

export function renderHostedEvents(events, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let event of events) {
    const card = document.createElement("hosted-event-card");

    if (options.fullWidth) {
      card.fullWidth = true;
    }

    card.event = event;
    container.appendChild(card);
  }
}
