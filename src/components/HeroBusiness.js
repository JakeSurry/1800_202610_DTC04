class HeroBusiness extends HTMLElement {
  set hero(match) {
    this._sugestedMatch = match;
    this.render();
  }

  render() {
    const match = this._sugestedMatch;
    if (!match) return;

    this.innerHTML = `
      <section
        class="relative min-h-62.5 bg-no-repeat bg-center bg-cover overflow-hidden flex items-center justify-center px-6 py-10"
        style="background-image: url('images/hero.png');"
      >
        <div class="absolute inset-0 bg-linear-to-r from-[#1D4ED8]/80 via-[#2563EB]/60 to-[#4EA3E3]/40"></div>

        <div class="relative z-10 max-w-4xl w-full flex flex-col gap-5 text-[#F9FAFB]">
          <div class="flex flex-col gap-3">
            <h1 id="title" class="text-2xl md:text-4xl font-bold text-[#F9FAFB]"></h1>

            <h3 id="subtitle" class="text-base md:text-xl font-light text-[#F9FAFB]/90"></h3>
          </div>
          <div class="flex gap-3 items-center">
            <button
              type="button"
              id="createEvent"
              class="flex justify-center items-center bg-linear-to-r from-[#4EA3E3] via-[#2563EB] to-[#1D4ED8] text-[#F9FAFB] font-medium rounded-full px-4 py-1 hover:brightness-110 md:px-6 md:py-3"
            >
              Create Event
            </button>
            <button
              class="rounded-full px-4 py-1 border border-[#F9FAFB]/20 bg-[#FFFFFF]/10 text-[#F9FAFB] font-medium hover:bg-[#FFFFFF]/15 transition md:px-6 md:py-3"
            >
              Edit my events
            </button>

          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("hero-section-buisness", HeroBusiness);
