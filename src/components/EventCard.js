import { svgs } from "./../svgs.js";

export class EventCard extends HTMLElement {
  constructor() {
    super();
  }

  setEvent(event) {
    this.event = event;
    this.renderEventCard();
  }

  renderEventCard() {
    const event = this.event;

    this.innerHTML = `
        <div class="min-w-md md:w-xl rounded-2xl bg-gray-200 p-4 shadow-md">
            <div class="flex items-stretch gap-3 mb-4">
                <div class="min-w-1/2 bg-gray-700 text-white font-bold text-sm rounded-xl px-5 py-3 flex items-center">
                ${event.name}
                </div>
                <div class="flex-1 bg-gray-400 text-gray-900 font-bold text-sm rounded-xl px-6 py-3 flex items-center justify-center">
                ${event.match}
                </div>
            </div>
            <div class="flex gap-3">
                <div class="flex flex-col gap-3 max-w-1/2 min-w-1/2">
                <div class="bg-gray-300 rounded-xl px-4 py-2.5">
                    <span class="text-xs font-semibold text-gray-700">${event.dateTime}</span>
                </div>
                <div class="bg-gray-300 rounded-xl px-4 py-2.5">
                    <span class="text-xs font-semibold text-gray-700">${event.venue}</span>
                </div>
                <div class="flex items-center gap-2 mt-auto">
                    <div class="min-w-1/4 flex items-center gap-1.5 bg-gray-700 rounded-full px-3 py-2">
                        ${svgs.signup(32, 32, "#e5e7eb")}
                    </div>
                    <div class="flex items-center gap-1.5 bg-gray-300 rounded-full px-3 py-2">
                        ${svgs.people(32, 32)}
                    <span class="text-sm font-bold text-gray-800">${event.attendees}</span>
                    </div>
                </div>
                </div>
                <div class="flex-1 bg-gray-300 rounded-xl flex items-center justify-center min-h-full">
                <span class="text-sm text-gray-500 font-medium">
                    Map View of Location
                </span>
                </div>
            </div>
        </div>
    `;
  }
}
