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
        <div class="bg-[#FFFFFF] rounded-full w-full h-7 flex items-center pl-4 gap-3 md:h-10 md:pl-6">

          <div id="searchIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                 viewBox="0 0 24 24" fill="none" stroke="#6B7280"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
          </div>

          <input
            id="searchInput"
            class="w-full bg-transparent outline-none text-[#1F2937] placeholder:text-[#9CA3AF] text-xs md:text-base"
            type="text"
            placeholder="${this._placeholder}"
            value="${this._value}"
          />

          <button
            type="button"
            id="searchSubmit"
            class="flex justify-center items-center bg-linear-to-r from-[#4EA3E3] via-[#2563EB] to-[#1D4ED8] text-[#F9FAFB] rounded-r-full px-4 py-1 hover:brightness-110 h-full md:px-6 md:py-3"
            aria-label="Search"
          >
            <p class="text-xs md:text-base font-medium">Search</p>
          </button>

        </div>
      </div>
    `;
  }

  wire() {
    const input = this.querySelector("#searchInput");
    const searchBtn = this.querySelector("#searchSubmit");

    if (!input || !searchBtn) return;

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
  }
}

customElements.define("search-bar", SearchBar);
