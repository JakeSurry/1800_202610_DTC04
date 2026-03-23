import { svgs } from "./../svgs.js";

class InfoSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="relative flex items-center gap-4 overflow-x-auto px-6 py-5">

        <div class="min-w-[30%] rounded-xl bg-linear-to-r from-[#3B82F6] to-[#1D4ED8] p-4 text-white flex flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.events(24, 24, "#F9FAFB")}
            <p id="hostedNumber" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="text-sm text-white/90">Hosted Events</span>
        </div>

        <div class="min-w-[30%] rounded-xl bg-linear-to-r from-[#34D399] to-[#059669] p-4 text-white flex flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.people(24, 24, "#F9FAFB")}
            <p id="fansRegistered" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="text-sm text-white/90">Fans Registered</span>
        </div>

        <div class="min-w-[30%] rounded-xl bg-linear-to-r from-[#1E293B] to-[#0F172A] p-4 text-white flex flex-col gap-2">
          <div class="flex items-center gap-3">
            ${svgs.calendar(24, 24, "#F9FAFB")}
            <p id="eventsThisWeek" class="text-2xl font-bold text-white"></p>
          </div>
          <span class="text-sm text-white/90">This Week</span>
        </div>

      </section>
    `;
  }
}

customElements.define("info-section", InfoSection);
