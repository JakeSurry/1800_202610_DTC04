import { svgs } from "./../svgs.js";
import { getNumAttendees } from "../events.js";
import { getEventLocation } from "../regLinks.js";

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
              <h4 class="line-clamp-1">${event.name}</h4>
              <div class="flex gap-2 items-start">
                ${svgs.location(14, 14, "#000000")}
                <p class="subtitle font-semibold text-left line-clamp-1">${await getEventLocation(event.id)}</p>
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
                <p class="subtitle font-semibold">${formatTimeRange(event.startTime, event.duration)}</p>
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

export function formatTime(time) {
  if (!time) return "TBD";
  const [hoursStr, minutes] = time.split(":");
  let hours = parseInt(hoursStr, 10);

  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes}${period}`;
}

export function formatTimeRange(startTime, duration) {
  if (!startTime) return "TBD";
  const start = formatTime(startTime);
  if (!duration) return start;

  const [hoursStr, minutes] = startTime.split(":");
  let totalMinutes = parseInt(hoursStr, 10) * 60 + parseInt(minutes, 10);

  const durationMatch = duration.match(/([\d.]+)/);
  if (!durationMatch) return start;

  const durationValue = parseFloat(durationMatch[1]);
  totalMinutes += durationValue * 60;

  const endHours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
  const endMinutes = String(totalMinutes % 60).padStart(2, "0");
  const end = formatTime(`${endHours}:${endMinutes}`);

  return `${start} - ${end}`;
}
