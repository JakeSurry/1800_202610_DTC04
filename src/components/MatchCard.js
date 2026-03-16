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
        class="relative flex w-50 md:w-80 flex-col gap-2 rounded-3xl bg-cover bg-center pb-4 text-[#F9FAFB] md:h-40"
      >
        <div class="absolute inset-0 rounded-3xl bg-linear-to-t from-black/75 via-black/45 to-transparent"></div>

        <div class="z-10">
          <div class="flex items-center gap-3 p-4">
            <img
              src="../../images/flags/${match.team1}.png"
              alt="${match.team1}"
              class="h-10 w-10 object-contain"
            />

            <p class="text-xs font-bold text-[#F9FAFB] md:text-base">
              ${match.team1} vs ${match.team2}
            </p>

            <img
              src="../../images/flags/${match.team2}.png"
              alt="${match.team2}"
              class="h-10 w-10 object-contain"
            />
          </div>

          <div class="flex items-center gap-2 px-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#F9FAFB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p class="text-xs font-medium text-[#F9FAFB]/90 md:text-sm">
              ${match.date} at ${match.time}
            </p>
          </div>

          <button class="absolute right-5 bottom-2 flex items-center justify-center">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                fill="#BFBFBF"
              />
            </svg>
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
