import { svgs } from "../svgs.js";

class MatchCard extends HTMLElement {
  set event(value) {
    this._match = value;
    this.render();
  }

  render() {
    const match = this._match;
    if (!match) return;

    this.innerHTML = `
      <div
        style="background-image: url('${match.image}');"
        class="relative square-rounded-box flex flex-col bg-cover bg-center p-5 min-w-70 md:min-w-0 flex-1">
        <div class="absolute inset-0 square-rounded-box overlay-black-gradient"></div>
        
        <div class="z-10 flex flex-col items-center justify-center space-y-4 p-3">
          <div class="flex items-center gap-6">
            <img
              src="../../images/flags/${match.team1}.png"
              alt="${match.team1}"
              class="w-1/6 max-w-20 min-w-6 object-contain"
            />

            <h3 class="text-shadow-md font-bold text-white md:text-3xl text-center">
              ${match.team1} vs ${match.team2}
            </h3>

            <img
              src="../../images/flags/${match.team2}.png"
              alt="${match.team2}"
              class="w-1/6 max-w-20 min-w-6 object-contain"
            />
          </div>

          <div class="flex items-center gap-2">
          ${svgs.clock(14, 14, "#F9FAFB")}
            <p class="text-xs font-medium text-white/90 md:text-lg">
              ${match.date} at ${match.time}
            </p>
          </div>

          <a href="/events.html" class="default-button main-blue-gradient bright-hover text-xs md:text-lg">
          Find Events ${svgs.chevron(20, 20, "#F9FAFB")}
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("match-card", MatchCard);

export function renderMatches(matches, matchesContainerId) {
  const matchesContainer = $(`#${matchesContainerId}`);
  for (let match of matches) {
    const matchCard = document.createElement("match-card");
    matchCard.event = match;
    matchesContainer.append(matchCard);
  }
}
