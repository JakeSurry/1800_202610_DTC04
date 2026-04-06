const teams = [
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Cape_Verde",
  "Colombia",
  "Croatia",
  "Curaçao",
  "Ecuador",
  "Egypt",
  "England",
  "France",
  "Germany",
  "Ghana",
  "Haiti",
  "Iran",
  "Ivory_Coast",
  "Japan",
  "Jordan",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New_Zealand",
  "Norway",
  "Panama",
  "Paraguay",
  "Portugal",
  "Qatar",
  "Saudi_Arabia",
  "Scotland",
  "Senegal",
  "South_Africa",
  "South_Korea",
  "Spain",
  "Switzerland",
  "Tunisia",
  "United_States",
  "Uruguay",
  "Uzbekistan",
];

class TeamSelect extends HTMLElement {
  connectedCallback() {
    this.formName = this.getAttribute("name") || "team";
    this.label =
      this.getAttribute("label") || this.formName.replaceAll("_", " ");
    this.wrapperClass =
      this.getAttribute("wrapper-class") || "flex flex-col gap-2";
    this.labelClass = this.getAttribute("label-class") || "";
    this.selectClass = this.getAttribute("select-class") || "blue-input";
    this.selectWrapperClass =
      this.getAttribute("select-wrapper-class") || "relative";
    this.render();
  }

  render() {
    const options = teams
      .map(
        (team) =>
          `<option value="${team}">${team.replaceAll("_", " ")}</option>`,
      )
      .join("");

    this.innerHTML = `
      <div class="${this.wrapperClass}">
        <label for="${this.formName}" class="${this.labelClass}">
          ${this.label}
        </label>

        <div class="${this.selectWrapperClass}">
          <select
            name="${this.formName}"
            id="${this.formName}"
            class="${this.selectClass}"
          >
            <option value="">Select a team</option>
            ${options}
          </select>

          <span class="pointer-events-none absolute inset-y-0 right-5 flex items-center text-white-t1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m5 7 5 5 5-5" />
            </svg>
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define("team-select", TeamSelect);
