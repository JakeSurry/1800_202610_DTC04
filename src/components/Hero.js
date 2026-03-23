class Hero extends HTMLElement {
  set hero(match) {
    this._sugestedMatch = match;
    this.render();
  }

  render() {
    const match = this._sugestedMatch;
    if (!match) return;

    this.innerHTML = `
      <section
        class="relative min-h-105 bg-no-repeat bg-center bg-cover overflow-hidden flex items-center justify-center px-6 py-10"
        style="background-image: url('images/hero.png');"
      >
        <div class="absolute inset-0 hero-blue-gradient"></div>

        <div class="relative z-10 max-w-4xl w-full flex flex-col items-center gap-5 text-center text-white">
          <div class="flex flex-col items-center gap-3">
            <h1 class="title font-bold text-white">
              FIND THE BEST PLACES TO WATCH THE WORLD CUP
            </h1>

            <h3 class="text-base md:text-xl font-light text-white">
              Discover top sports bars and restaurants screening the World Cup
            </h3>
          </div>

          <div class="w-full max-w-xl">
            <search-bar placeholder="Search teams, matches, or bars"></search-bar>
          </div>

          <div class="flex items-center gap-4 rounded-2xl border  px-7 py-4 blur-window">
            <div class="flex flex-col items-center gap-2 text-center">
              <div class="flex items-center justify-center gap-5">
                <img
                  src="../../images/flags/${match.team1}.png"
                  alt="${match.team1}"
                  class="w-10 h-10 object-contain"
                />

                <p class="text-xs font-bold md:text-base text-white">
                  ${match.team1} vs ${match.team2}
                </p>

                <img
                  src="../../images/flags/${match.team2}.png"
                  alt="${match.team2}"
                  class="w-10 h-10 object-contain"
                />
              </div>

              <p class="text-sm md:text-base text-white/90">
                ${match.date} at ${match.time}
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("hero-section", Hero);
