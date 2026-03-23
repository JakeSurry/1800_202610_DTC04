class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="bg-dark-blue text-white flex items-center justify-center h-10 mt-6">
        © 2026 Fan's Feast, Inc
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);
