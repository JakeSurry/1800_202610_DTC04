class PageLoader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        id="pageLoaderOverlay"
        class="fixed inset-0 z-999 flex items-center justify-center bg-off-white/90 backdrop-blur-sm"
      >
        <div class="flex flex-col items-center gap-4">
          <div
            class="h-12 w-12 rounded-full border-4 border-blue/20 border-t-blue animate-spin"
          ></div>
          <p class="text-black font-medium">Loading...</p>
        </div>
      </div>
    `;
  }

  show() {
    const overlay = this.querySelector("#pageLoaderOverlay");
    overlay?.classList.remove("hidden");
  }

  hide() {
    const overlay = this.querySelector("#pageLoaderOverlay");
    overlay?.classList.add("hidden");
  }

  setText(text) {
    const label = this.querySelector("p");
    if (label) {
      label.textContent = text;
    }
  }
}
export function getLoader() {
  return document.querySelector("page-loader");
}

customElements.define("page-loader", PageLoader);
