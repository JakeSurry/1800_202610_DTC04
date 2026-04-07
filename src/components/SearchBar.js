import { svgs } from "../svgs.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();
    this._value = "";
    this._placeholder = this.getAttribute("placeholder") || "Search";
    this._filterOpen = false;
    this._filters = { team: "", orderBy: "" };
  }

  connectedCallback() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("q")) this._value = params.get("q");
    if (params.has("team")) this._filters.team = params.get("team");
    if (params.has("orderBy")) this._filters.orderBy = params.get("orderBy");

    this.render();
    this.wire();
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = String(v ?? "");
    const input = this.querySelector("#searchInput");
    if (input) input.value = this._value;
  }

  get filters() {
    return { ...this._filters };
  }

  render() {
    const f = this._filters;
    const teams = [
      "Algeria", "Argentina", "Australia", "Austria", "Belgium", "Brazil",
      "Canada", "Cape Verde", "Colombia", "Croatia", "Curaçao", "Ecuador",
      "Egypt", "England", "France", "Germany", "Ghana", "Haiti", "Iran",
      "Ivory Coast", "Japan", "Jordan", "Mexico", "Morocco", "Netherlands",
      "New Zealand", "Norway", "Panama", "Paraguay", "Portugal", "Qatar",
      "Saudi Arabia", "Scotland", "Senegal", "South Africa", "South Korea",
      "Spain", "Switzerland", "Tunisia", "United States", "Uruguay", "Uzbekistan",
    ];
    const teamOptions = teams
      .map(
        (t) =>
          `<option value="${t}" ${f.team === t ? "selected" : ""}>${t}</option>`,
      )
      .join("");

    this.innerHTML = `
      <div class="w-full relative">
        <div class="bg-white rounded-full w-full h-7 flex items-center pl-4 gap-3 md:h-10 md:pl-6">

          <div id="searchIcon">
          ${svgs.search(22, 22, "#6B7280")}
          </div>

          <input
            id="searchInput"
            class="w-full text-black"
            type="text"
            placeholder="${this._placeholder}"
            value="${this._value}"
          />
          <button
            type="button"
            id="searchFilter"
            class="hover:cursor-pointer"
          >
          ${svgs.filter(22, 22, "#6B7280")}
          </button>
          <button
            type="button"
            id="searchSubmit"
            class="default-button main-blue-gradient bright-hover h-full rounded-l-none"
            aria-label="Search"
          >
            <p class="text-white">Search</p>
          </button>

        </div>

        <div id="filterMenu" class="hidden absolute left-0 right-0 mt-2 bg-white border-2 border-gray-600 rounded-xl shadow-lg p-4 z-50">
          <p class="text-sm font-bold text-gray-700 mb-3">Filter Events</p>
          <div class="flex flex-col gap-3">
            <div>
              <label for="filterTeam" class="text-xs font-semibold text-gray-600">Team</label>
              <select
                id="filterTeam"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-black mt-1"
              >
                <option value="">All Teams</option>
                ${teamOptions}
              </select>
            </div>
            <div>
              <label for="filterOrderBy" class="text-xs font-semibold text-gray-600">Sort By</label>
              <select
                id="filterOrderBy"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-black mt-1"
              >
                <option value="">Default</option>
                <option value="dateTime" ${f.orderBy === "dateTime" ? "selected" : ""}>Date</option>
                <option value="name" ${f.orderBy === "name" ? "selected" : ""}>Name</option>
                <option value="attendees" ${f.orderBy === "attendees" ? "selected" : ""}>Attendees</option>
              </select>
            </div>
            <button
              type="button"
              id="applyFilters"
              class="main-blue-gradient hover:bright-hover w-full rounded-lg py-2 mt-1"
            >
              <p class="text-white text-sm font-semibold">Apply Filters</p>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  wire() {
    const input = this.querySelector("#searchInput");
    const searchBtn = this.querySelector("#searchSubmit");
    const filterBtn = this.querySelector("#searchFilter");
    const filterMenu = this.querySelector("#filterMenu");
    const filterTeam = this.querySelector("#filterTeam");
    const filterOrderBy = this.querySelector("#filterOrderBy");
    const applyBtn = this.querySelector("#applyFilters");

    if (!input || !searchBtn) return;

    filterBtn.addEventListener("click", () => {
      this._filterOpen = !this._filterOpen;
      filterMenu.classList.toggle("hidden", !this._filterOpen);
    });

    filterTeam.addEventListener("change", (e) => {
      this._filters.team = e.target.value;
    });
    filterOrderBy.addEventListener("change", (e) => {
      this._filters.orderBy = e.target.value;
    });

    input.addEventListener("input", (e) => {
      this._value = e.target.value;
      this.dispatchEvent(
        new CustomEvent("search:input", {
          bubbles: true,
          detail: { value: this._value, filters: this.filters },
        }),
      );
    });

    const doSubmit = () => {
      this._filterOpen = false;
      filterMenu.classList.add("hidden");
      this.dispatchEvent(
        new CustomEvent("search:submit", {
          bubbles: true,
          detail: { value: this._value, filters: this.filters },
        }),
      );
    };

    searchBtn.addEventListener("click", doSubmit);
    applyBtn.addEventListener("click", doSubmit);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSubmit();
    });
  }
}

customElements.define("search-bar", SearchBar);
