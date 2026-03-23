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
        class="relative flex w-50 md:w-80 flex-col gap-2 rounded-3xl bg-cover bg-center pb-4 text-white md:h-40"
      >
        <div class="absolute inset-0 rounded-3xl bg-linear-to-t from-black/75 via-black/45 to-transparent"></div>

        <div class="z-10">
          <div class="flex items-center gap-3 p-4">
            <img
              src="../../images/flags/${match.team1}.png"
              alt="${match.team1}"
              class="h-10 w-10 object-contain"
            />

            <p class="text-xs font-bold text-white md:text-base">
              ${match.team1} vs ${match.team2}
            </p>

            <img
              src="../../images/flags/${match.team2}.png"
              alt="${match.team2}"
              class="h-10 w-10 object-contain"
            />
          </div>

          <div class="flex items-center gap-2 px-4">
          ${svgs.clock(14, 14, "#F9FAFB")}
            <p class="text-xs font-medium text-white/90 md:text-sm">
              ${match.date} at ${match.time}
            </p>
          </div>

          <button class="absolute right-5 bottom-2 flex items-center justify-center">
          ${svgs.info(24, 24, "#BFBFBF")}
          </button>
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
