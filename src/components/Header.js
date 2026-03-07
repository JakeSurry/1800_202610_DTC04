import { logoutUser, onAuthReady } from "../authentication.js";

const sidebarButtons = [
  {
    name: "Home",
    href: "./index.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
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
    href: "./events.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
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
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
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
      <svg width="40" height="40" stroke-width="1" stroke="#000000" viewBox="0 0 24 24" id="SVGRoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg">
        <defs id="defs2"/>
        <g id="layer1">
        <path d="M 11.919922 2 C 10.64638 2.0147005 9.4821928 2.3671115 8.578125 2.9941406 C 7.6792226 3.6175872 7.0132653 4.5812058 7.0058594 5.7089844 L 7.0097656 5.6386719 C 7.0097656 5.6386719 7.0024551 5.7130504 7.0019531 5.7167969 C 7.0019412 5.7202735 6.9999993 5.7230828 7 5.7265625 C 6.9999452 5.7331489 7.0000091 5.7395087 7 5.7460938 C 6.9999982 5.7474108 7 5.748683 7 5.75 C 6.9882771 5.8383315 6.9202267 6.3282218 6.8808594 7.0566406 C 6.8381389 7.8471027 6.8115029 8.7859447 7.03125 9.6367188 C 7.2431803 10.457232 7.7459198 11.567077 8.2128906 12.580078 C 8.4407534 13.074381 8.4849158 13.152828 8.6484375 13.490234 L 2.6054688 16.080078 A 1 1 0 0 0 2.5292969 16.117188 A 1 1 0 0 0 2.515625 16.125 A 1 1 0 0 0 2.3242188 16.261719 A 1 1 0 0 0 2.3125 16.273438 A 1 1 0 0 0 2.2109375 16.384766 A 1 1 0 0 0 2.2011719 16.398438 A 1 1 0 0 0 2.1621094 16.453125 A 1 1 0 0 0 2.1542969 16.466797 A 1 1 0 0 0 2.1132812 16.539062 A 1 1 0 0 0 2.1113281 16.541016 A 1 1 0 0 0 2.1074219 16.548828 A 1 1 0 0 0 2.0820312 16.601562 A 1 1 0 0 0 2.0761719 16.617188 A 1 1 0 0 0 2 17.037109 L 2 21 A 1.0001 1.0001 0 0 0 3 22 L 17 22 A 1 1 0 0 0 18 21 A 1 1 0 0 0 17 20 L 4 20 L 4 17.660156 L 10.394531 14.919922 A 1 1 0 0 0 10.919922 13.605469 A 1 1 0 0 0 10.894531 13.554688 C 10.894531 13.554688 10.882972 13.529617 10.882812 13.529297 A 1 1 0 0 0 10.880859 13.525391 C 10.867866 13.499275 10.474364 12.709626 10.029297 11.744141 C 9.5769416 10.762845 9.0795577 9.5657237 8.96875 9.1367188 C 8.8657581 8.7379745 8.8389173 7.8697972 8.8769531 7.1660156 C 8.9149889 6.4622341 8.9902344 5.9082031 8.9902344 5.9082031 A 1.0001 1.0001 0 0 0 9 5.7617188 C 8.9999559 5.7581872 9 5.7535288 9 5.75 C 9 5.7464651 8.999956 5.7437554 9 5.7402344 A 1.0001 1.0001 0 0 0 9 5.7265625 C 8.9999259 5.3743439 9.2003296 4.9949216 9.7167969 4.6367188 C 10.233264 4.2785159 11.034287 4.0104935 11.943359 4 C 11.960144 3.9999231 11.977355 3.9999031 11.994141 4 A 1.0001 1.0001 0 0 0 12 4 C 12.920307 4.0000001 13.737388 4.2648355 14.265625 4.625 C 14.793862 4.9851645 15 5.3697738 15 5.7265625 A 1.0001 1.0001 0 0 0 15.009766 5.8613281 C 15.009766 5.8613281 15.085002 6.4180551 15.123047 7.1269531 C 15.161092 7.8358511 15.134867 8.711834 15.03125 9.1152344 C 14.919899 9.5487438 14.423072 10.750181 13.970703 11.736328 C 13.518919 12.721201 13.106539 13.550587 13.105469 13.552734 C 13.105467 13.552737 13.103516 13.554688 13.103516 13.554688 A 1 1 0 0 0 13.070312 13.628906 A 1 1 0 0 0 13.068359 13.630859 A 1 1 0 0 0 13.050781 13.683594 A 1 1 0 0 0 13.033203 13.744141 A 1 1 0 0 0 13.023438 13.785156 A 1 1 0 0 0 13.021484 13.792969 A 1 1 0 0 0 13.011719 13.847656 A 1 1 0 0 0 13.001953 13.927734 A 1 1 0 0 0 13.001953 13.931641 A 1 1 0 0 0 13 14.013672 A 1 1 0 0 0 13.003906 14.097656 A 1 1 0 0 0 13.013672 14.167969 A 1 1 0 0 0 13.019531 14.195312 A 1 1 0 0 0 13.021484 14.208984 A 1 1 0 0 0 13.035156 14.263672 A 1 1 0 0 0 13.060547 14.34375 A 1 1 0 0 0 13.083984 14.404297 A 1 1 0 0 0 13.095703 14.429688 A 1 1 0 0 0 13.130859 14.496094 A 1 1 0 0 0 13.175781 14.566406 A 1 1 0 0 0 13.21875 14.625 A 1 1 0 0 0 13.232422 14.640625 A 1 1 0 0 0 13.263672 14.675781 A 1 1 0 0 0 13.291016 14.707031 A 1 1 0 0 0 13.339844 14.751953 A 1 1 0 0 0 13.34375 14.755859 A 1 1 0 0 0 13.345703 14.755859 A 1 1 0 0 0 13.408203 14.806641 A 1 1 0 0 0 13.478516 14.853516 A 1 1 0 0 0 13.552734 14.894531 A 1 1 0 0 0 13.554688 14.896484 A 1 1 0 0 0 13.628906 14.929688 A 1 1 0 0 0 13.630859 14.931641 A 1 1 0 0 0 13.683594 14.949219 A 1 1 0 0 0 13.71875 14.960938 L 16.683594 15.949219 A 1 1 0 0 0 17.949219 15.316406 A 1 1 0 0 0 17.316406 14.050781 L 15.388672 13.408203 C 15.546128 13.079656 15.578418 13.025252 15.787109 12.570312 C 16.254016 11.552475 16.757248 10.436699 16.96875 9.6132812 C 17.187986 8.7597543 17.161809 7.8165187 17.119141 7.0214844 C 17.076473 6.22645 16.990234 5.59375 16.990234 5.59375 C 16.9389 4.5028113 16.275849 3.5748919 15.392578 2.9726562 C 14.474567 2.3467347 13.292301 2.0010822 12.005859 2 C 11.979441 1.9998475 11.9522 1.9998475 11.925781 2 A 1.0001 1.0001 0 0 0 11.919922 2 z M 20 15 A 1 1 0 0 0 19 16 L 19 17 L 18 17 A 1 1 0 0 0 17 18 A 1 1 0 0 0 18 19 L 19 19 L 19 20 A 1 1 0 0 0 20 21 A 1 1 0 0 0 21 20 L 21 19 L 22 19 A 1 1 0 0 0 23 18 A 1 1 0 0 0 22 17 L 21 17 L 21 16 A 1 1 0 0 0 20 15 z " id="path3110" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#000000;stop-opacity:1;opacity:1"/>
        </g>
        </svg>
    `,
    auth: "guest",
  },
  {
    name: "Help Center",
    href: "./help.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
           fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M12 16v.01" />
        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
      </svg>
    `,
    auth: "both",
  },
  {
    name: "Profile",
    href: "./profile.html",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
      </svg>
    `,
    auth: "user",
  },
  {
    name: "Logout",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000"
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
    return sidebarButtons.filter((button) => {
      if (button.auth === "both") return true;
      if (button.auth === "user") return this.isLoggedIn;
      if (button.auth === "guest") return !this.isLoggedIn;
      return true;
    });
  }

  sidebarButton(button) {
    const hrefAttr = button.href ? `href="${button.href}"` : `href="#"`;
    const actionAttr = button.action ? `data-action="${button.action}"` : "";

    return `
      <a ${hrefAttr} ${actionAttr}
         class="flex items-center justify-between cursor-pointer bg-${button.color} hover:bg-${button.hoverColor}
                active:bg-${button.hoverColor} active:scale-105 rounded-2xl m-4 p-2 text-3xl drop-shadow-xl">
        ${button.svg}
        <span class="m-1 w-[55%] text-black text-sm font-medium text-left">${button.name}</span>
      </a>
    `;
  }

  renderTopBar() {
    const visibleButtons = this.getVisibleButtons();

    this.innerHTML = `
      <header class="bg-[#162E5C] p-6 flex justify-between h-15 md:h-20 items-center text-white sticky top-0 z-50">
        <a href="./index.html" class="min-h-7 max-h-7 flex items-center">
          <img class="h-10 md:h-12 object-contain" src="images/fansFeastLogo.png" alt="Fans Feast Logo" />
        </a>

        <nav class="hidden md:flex w-120 items-center gap-10">
          <a href="./index.html" class="font-bold">Home</a>
          <a href="./events.html" class="font-bold">Events</a>
          ${this.isLoggedIn ? "" : `<a href="./login.html" class="font-bold">Log In</a>`}
          ${this.isLoggedIn ? "" : `<a href="./signup.html" class="font-bold">Sign Up</a>`}
          <a href="./help.html" class="font-bold">Help Center</a>
          ${this.isLoggedIn ? `<a href="./profile.html" class="font-bold">Profile</a>` : ""}
          ${this.isLoggedIn ? `<a href="#" data-action="logout" class="font-bold">Logout</a>` : ""}
        </nav>

        <button class="min-h-10 max-h-10 flex items-center cursor-pointer md:hidden" id="menu-button">
          <svg class="hover:scale-110"
               xmlns="http://www.w3.org/2000/svg"
               width="40" height="40" viewBox="0 0 24 24"
               fill="none" stroke="#fff" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

        <div id="sidebar"
             class="hidden md:hidden flex-col absolute top-full right-0 z-50 w-3/4 h-[calc(100vh-100%)]
                    bg-[#9CA3AF] translate-x-full transition-transform duration-300 ease-in-out overflow-hidden">
          ${visibleButtons.map((button) => this.sidebarButton(button)).join("")}
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

    const openSidebar = () => {
      sidebar.classList.remove("hidden");
      sidebar.classList.add("flex");

      requestAnimationFrame(() => {
        sidebar.classList.remove("translate-x-full");
      });

      dimmer.classList.remove("hidden");
    };

    const closeSidebar = () => {
      sidebar.classList.add("translate-x-full");
      dimmer.classList.add("hidden");

      setTimeout(() => {
        if (sidebar.classList.contains("translate-x-full")) {
          sidebar.classList.remove("flex");
          sidebar.classList.add("hidden");
        }
      }, 300);
    };

    menuButton.onclick = () => {
      const isClosed = sidebar.classList.contains("hidden");

      if (isClosed) {
        openSidebar();
      } else {
        closeSidebar();
      }
    };

    dimmer.onclick = () => {
      closeSidebar();
    };

    this.querySelectorAll('[data-action="logout"]').forEach((element) => {
      element.onclick = async (e) => {
        e.preventDefault();
        await logoutUser();
      };
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
