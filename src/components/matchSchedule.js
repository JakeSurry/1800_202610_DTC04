class MatchSchedule extends HTMLElement {
  set event(value) {
    this._event = value;
    this.render();
  }

  render() {
    const event = this._event;
    if (!event) return;

    this.innerHTML = `
      <div class="w-full square-rounded-box white-card">
        <div class="w-full flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img
              src="../../images/flags/${event.team1}.png"
              alt="${event.team1}"
              class="h-10 w-10 object-cover rounded-full shrink-0"
            />

            <div class="flex flex-col items-center">
              <p class="text-black text-base md:text-lg font-bold truncate">
                ${event.team1} vs ${event.team2}
              </p>
              <p class="text-off-black subtitle md:text-base">
                ${event.date} · ${event.time}
              </p>
            </div>

            <img
              src="../../images/flags/${event.team2}.png"
              alt="${event.team2}"
              class="h-10 w-10 object-cover rounded-full shrink-0"
            />
          </div>

          <button
            type="button"
            id="hostMatch"
            class="default-button shrink-0 main-blue-gradient bright-hover small-button"
          >
            Host Match
          </button>
        </div>
      </div>
    `;

    this.querySelector("#hostMatch")?.addEventListener("click", () => {
      const params = new URLSearchParams({
        team1: event.team1,
        team2: event.team2,
        date: event.date,
        time: event.time,
      });

      window.location.href = `/createEvent.html?${params.toString()}`;
    });
  }
}

customElements.define("match-schedule-card", MatchSchedule);

export function renderMatchSchedule(events, containerId) {
  const matchScheduleContainer = document.getElementById(containerId);
  if (!matchScheduleContainer) return;

  matchScheduleContainer.innerHTML = "";

  for (let event of events) {
    const matchCard = document.createElement("match-schedule-card");
    matchCard.event = event;
    matchScheduleContainer.appendChild(matchCard);
  }
}
