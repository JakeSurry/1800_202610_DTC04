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
        <div class="absolute inset-0 hero-blue-gradient"></div>

        <div class="relative z-10 max-w-4xl w-full flex flex-col gap-5 text-white">
          <div class="flex flex-col gap-3">
            <h1 id="title" class=" font-bold text-white"></h1>

            <h3 id="subtitle" class="text-base md:text-xl font-light text-white"></h3>
          </div>
          <div class="flex gap-3 items-center">
            <button
              type="button"
              id="createEvent"
              class="main-blue-gradient bright-hover"
            >
              Create Event
            </button>
            <button
              class="clear-window-color clear-hover"
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
