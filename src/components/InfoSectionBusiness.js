import { svgs } from "./../svgs.js";

class InfoSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="relative flex items-center gap-4 overflow-x-auto px-6 py-5">

        <div class="min-w-[30%] square-rounded-box items-start main-blue-gradient  flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.events(24, 24, "#F9FAFB")}
            <p id="hostedNumber" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="subtitle text-white-t1">Hosted Events</span>
        </div>

        <div class="min-w-[30%] square-rounded-box items-start green-gradient  flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.people(24, 24, "#F9FAFB")}
            <p id="fansRegistered" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="subtitle text-white-t1">Fans Registered</span>
        </div>

        <div class="min-w-[30%] square-rounded-box items-start black-gradient  flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.calendar(24, 24, "#F9FAFB")}
            <p id="eventsThisWeek" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="subtitle text-white-t1">This Week</span>
        </div>

      </section>
    `;
  }
}

customElements.define("info-section", InfoSection);
