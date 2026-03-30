import { svgs } from "./../svgs.js";
import { getNumAttendees } from "../events.js";

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

    const styleClass = this._visualStyle === "compact" ? "max-w-70" : "";

    this.innerHTML = `
        <button class="outline-hover rounded-lg">
          <div class="white-card square-rounded-box items-start p-0 border-0 flex flex-col gap-2 pb-4 h-full min-w-50 md:min-w-0 ${styleClass}" >
            <img
            src="${event.image ? event.image : "../images/dummyImage.jpg"}"
            alt="${event.name}"
            class="w-full aspect-2/1 object-cover rounded-t-lg"
            />
            <div class="space-y-2 px-5">
              <h4>${event.name}</h4>
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
  }
}
