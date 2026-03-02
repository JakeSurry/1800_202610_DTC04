class SearchBar extends HTMLElement {
  constructor() {
    super();
    this._value = "";
    this._placeholder = this.getAttribute("placeholder") || "Search";
  }

  connectedCallback() {
    this.render();
    this.wire();
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = String(v ?? "");
    const input = this.querySelector("input");
    if (input) input.value = this._value;
  }

  render() {
    this.innerHTML = `
      <div class="w-full">
        <div class="bg-gray-400 rounded-full w-full h-10 flex items-center px-4 gap-3">
          <button type="button"
                  id="filterBtn"
                  class="shrink-0 rounded-full p-2 hover:bg-gray-300 active:scale-95 transition"
                  aria-label="Open filters">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="22" height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <circle cx="9" cy="6" r="2"></circle>

            <line x1="4" y1="12" x2="20" y2="12"></line>
            <circle cx="15" cy="12" r="2"></circle>

            <line x1="4" y1="18" x2="20" y2="18"></line>
            <circle cx="11" cy="18" r="2"></circle>
            </svg>
          </button>

          <input id="searchInput"
                 class="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-600"
                 type="text"
                 placeholder="${this._placeholder}"
                 value="${this._value}" />

          <button type="button"
                  id="searchBtn"
                  class="shrink-0 rounded-full p-2 hover:bg-gray-300 active:scale-95 transition"
                  aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  wire() {
    const input = this.querySelector("#searchInput");
    const searchBtn = this.querySelector("#searchBtn");
    const filterBtn = this.querySelector("#filterBtn");

    if (!input || !searchBtn || !filterBtn) return;

    // capture typing
    input.addEventListener("input", (e) => {
      this._value = e.target.value;

      this.dispatchEvent(
        new CustomEvent("search:input", {
          bubbles: true,
          detail: { value: this._value },
        }),
      );
    });

    searchBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("search:submit", {
          bubbles: true,
          detail: { value: this._value },
        }),
      );
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.dispatchEvent(
          new CustomEvent("search:submit", {
            bubbles: true,
            detail: { value: this._value },
          }),
        );
      }
    });

    filterBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("filter:open", {
          bubbles: true,
          detail: {},
        }),
      );
    });
  }
}

customElements.define("search-bar", SearchBar);
