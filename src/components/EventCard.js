import { svgs } from "./../svgs.js";
import { getNumAttendees, getEventLocation } from "../events.js";

export class EventCard extends HTMLElement {
  constructor() {
    super();
    this._event = null;
    this._visualStyle = "default";
  }

  set event(value) {
    this._event = value;
    this.render();
  }
  set visualStyle(value) {
    this._visualStyle = value || "default";
    this.render();
  }

  async render() {
    const event = this._event;
    if (!event) return;

    let styleClass = "";

    if (this._visualStyle === "compact") {
      styleClass = "max-w-50";
    } else if (this._visualStyle === "long") {
      styleClass = "min-w-90";
    } else {
      styleClass = "min-w-0";
    }

    this.innerHTML = `
        <button class="outline-hover rounded-lg" id="viewEvent">
          <div class="white-card square-rounded-box items-start p-0 border-0 flex flex-col gap-2 pb-4 h-full  ${styleClass}" >
            <img
            src="${event.image ? event.image : "../images/dummyImage.jpg"}"
            alt="${event.name}"
            class="w-full aspect-2/1 object-cover rounded-t-lg"
            />
            <div class="space-y-2 px-5">
              <h4>${event.name}</h4>
              <div class="flex gap-2 items-center">
                ${svgs.location(14, 14, "#000000")}
                <p class="subtitle font-semibold">${await getEventLocation(event.id)}</p>
              </div>
              <div class="flex gap-2 items-center">
                ${svgs.people(14, 14, "#000000")}
                <p class="subtitle font-semibold">${await getNumAttendees(event.id)}</p>
              </div>
              <div class="flex gap-2 items-center">
                ${svgs.calendar(14, 14, "#000000")}
                <p class="subtitle font-semibold">${event.date}</p>
              </div>
              <div class="flex gap-2 items-center">
                ${svgs.clock(14, 14, "#000000")}
                <p class="subtitle font-semibold">${event.time}</p>
              </div>
            </div>
          </div>
        </button>
      `;

    this.querySelector("#viewEvent")?.addEventListener("click", () => {
      if (!event.id) {
        console.error("Event ID missing");
        return;
      }

      window.location.href = `/eventDetails.html?eventId=${event.id}`;
    });
  }
}
