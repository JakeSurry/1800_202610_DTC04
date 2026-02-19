import { logoutUser, onAuthReady } from "../authentication.js";

const sidebarButtons = [
  {
    name: "Home",
    href: "./index.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    `,
    auth: "both",
  },
  {
    name: "Events",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M3 9h3v6h-3z" />
        <path d="M18 9h3v6h-3z" />
        <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        <path d="M12 5l0 14" />
      </svg>
    `,
    auth: "both",
  },
  {
    name: "Log In",
    href: "./login.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
      </svg>
    `,
    auth: "guest",
  },
  {
    name: "Sign Up",
    href: "./signup.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4" />
      </svg>
    `,
    auth: "guest",
  },
  {
    name: "Help",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M12 16v.01" />
        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
      </svg>
    `,
    auth: "both",
  },
  {
    name: "Logout",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#000000"
           stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z" />
        <path d="M6 12h8" />
        <path d="M6 12l2-2" />
        <path d="M6 12l2 2" />
      </svg>
    `,
    auth: "user",
    action: "logout",
  },
];

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.isLoggedIn = false;

    this.renderTopBar();
    this.wireEvents();

    onAuthReady((user) => {
      this.isLoggedIn = !!user;
      this.renderTopBar();
      this.wireEvents();
    });
  }

  getVisibleButtons() {
    return sidebarButtons.filter((b) => {
      if (b.auth === "both") return true;
      if (b.auth === "user") return this.isLoggedIn;
      if (b.auth === "guest") return !this.isLoggedIn;
      return true;
    });
  }

  sidebarButton(button) {
    const hrefAttr = button.href ? `href="${button.href}"` : `href="#"`;
    const actionAttr = button.action ? `data-action="${button.action}"` : "";

    return `
      <a ${hrefAttr} ${actionAttr}
         class="flex items-center cursor-pointer bg-${button.color} hover:bg-${button.hoverColor}
                active:bg-${button.hoverColor} active:scale-105 rounded-2xl m-4 p-2 text-3xl drop-shadow-xl">
        ${button.svg}
        <span class="m-1">${button.name}</span>
      </a>
    `;
  }

  renderTopBar() {
    const visibleButtons = this.getVisibleButtons();

    this.innerHTML = `
      <header class="bg-gray-400 p-6 flex justify-between max-h-19 items-center relative">
        <a href="./index.html" class="min-h-10 max-h-10 flex items-center">
          <img class="max-h-14 max-w-full" src="images/fansFeastLogo.png" />
        </a>

        <nav class="w-120 flex space-x-10 invisible md:visible">
          <a href="./index.html" class="font-bold">Home</a>
          <a href="#" class="font-bold">Events</a>
          ${this.isLoggedIn ? "" : `<a href="./login.html" class="font-bold">Log In</a>`}
          ${this.isLoggedIn ? "" : `<a href="./signup.html" class="font-bold">Sign Up</a>`}
          <a href="#" class="font-bold">Help Center</a>
          ${this.isLoggedIn ? `<a href="#" data-action="logout" class="font-bold">Logout</a>` : ""}
        </nav>

        <button class="min-h-10 max-h-10 flex items-center cursor-pointer md:invisible" id="menu-button">
          <svg class="hover:scale-110"
               xmlns="http://www.w3.org/2000/svg"
               width="48" height="48" viewBox="0 0 24 24"
               fill="none" stroke="#000000" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

        <div id="sidebar"
             class="flex flex-col absolute top-full right-0 z-50 w-1/3 h-[calc(100vh-100%)]
                    bg-gray-400 translate-x-full transition-transform duration-300 ease-in-out overflow-hidden">
          ${visibleButtons.map((b) => this.sidebarButton(b)).join("")}
        </div>

        <div id="sidebarDimmer"
             class="hidden absolute top-full left-0 w-full z-40 bg-black h-[calc(100vh-100%)] opacity-50"></div>
      </header>
    `;
  }

  wireEvents() {
    const menuButton = this.querySelector("#menu-button");
    const sidebar = this.querySelector("#sidebar");
    const dimmer = this.querySelector("#sidebarDimmer");

    if (!menuButton || !sidebar || !dimmer) return;

    menuButton.onclick = () => {
      sidebar.classList.toggle("translate-x-full");
      dimmer.classList.toggle("hidden");
    };

    dimmer.onclick = () => {
      sidebar.classList.add("translate-x-full");
      dimmer.classList.add("hidden");
    };

    this.querySelectorAll('[data-action="logout"]').forEach((el) => {
      el.onclick = async (e) => {
        e.preventDefault();
        await logoutUser();
      };
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
