import { svgs } from "../svgs.js";

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
        <div class="bg-white rounded-full w-full h-7 flex items-center pl-4 gap-3 md:h-10 md:pl-6">

          <div id="searchIcon">
          ${svgs.search(22, 22, "#6B7280")}
          </div>

          <input
            id="searchInput"
            class="w-full"
            type="text"
            placeholder="${this._placeholder}"
            value="${this._value}"
          />

          <button
            type="button"
            id="searchSubmit"
            class="main-blue-gradient hover:bright-hover h-full rounded-l-none"
            aria-label="Search"
          >
            <p class="text-white">Search</p>
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
