import { logoutUser, onAuthReady } from "../authentication.js";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { svgs } from "../svgs.js";

const ROUTES = {
  guestHome: "./index.html",
  userHome: "./index.html",
  businessDashboard: "./mainBusiness.html",

  events: "./events.html",
  helpCenter: "./help",

  login: "./login.html",
  personalSignup: "./signup.html",
  businessSignup: "./signUpBusiness.html",

  myEvents: "./myEvents",
  userProfile: "./profile.html",

  hostedEvents: "./hostedEvents.html",
  businessProfile: "./businessProfile.html",

  createEvent: "./createEvent.html",
};

const ICONS = {
  home: svgs.home(22, 22, "currentColor"),
  events: svgs.stadium(22, 22, "currentColor"),
  myEvents: svgs.events(22, 22, "currentColor"),
  login: svgs.profile(22, 22, "currentColor"),
  signup: svgs.signup(22, 22, "currentColor"),
  business: svgs.business(22, 22, "currentColor"),
  help: svgs.help(22, 22, "currentColor"),
  profile: svgs.profile(22, 22, "currentColor"),
  logout: svgs.logout(22, 22, "currentColor"),
  chevron: svgs.chevron(18, 18, "currentColor"),
  matches: svgs.stadium(22, 22, "currentColor"),
};

/* =========================
   NAV BY STATE
========================= */
const NAV_CONFIG = {
  guest: {
    quickActions: [
      { name: "Log In", href: ROUTES.login, primary: true },
      { name: "Sign Up", href: ROUTES.personalSignup, primary: false },
    ],
    sections: [
      {
        title: "Explore",
        links: [
          { name: "Home", href: ROUTES.guestHome, svg: ICONS.home },
          { name: "Events", href: ROUTES.events, svg: ICONS.events },
        ],
      },
      {
        title: "Account",
        links: [
          {
            name: "Personal Sign Up",
            href: ROUTES.personalSignup,
            svg: ICONS.signup,
          },
          {
            name: "Business Sign Up",
            href: ROUTES.businessSignup,
            svg: ICONS.business,
          },
        ],
      },
      {
        title: "Support",
        links: [
          { name: "Help Center", href: ROUTES.helpCenter, svg: ICONS.help },
        ],
      },
    ],
    desktop: [
      { name: "Home", href: ROUTES.guestHome },
      { name: "Events", href: ROUTES.events },
      { name: "Help Center", href: ROUTES.helpCenter },
      { name: "Log In", href: ROUTES.login },
      { name: "Sign Up", href: ROUTES.personalSignup },
    ],
  },

  user: {
    quickActions: [
      { name: "My Events", href: ROUTES.myEvents, primary: true },
      { name: "Profile", href: ROUTES.userProfile, primary: false },
    ],
    sections: [
      {
        title: "Explore",
        links: [
          { name: "Home", href: ROUTES.userHome, svg: ICONS.home },
          { name: "Events", href: ROUTES.events, svg: ICONS.events },
        ],
      },
      {
        title: "Account",
        links: [
          { name: "My Events", href: ROUTES.myEvents, svg: ICONS.myEvents },
          { name: "Profile", href: ROUTES.userProfile, svg: ICONS.profile },
        ],
      },
      {
        title: "Support",
        links: [
          { name: "Help Center", href: ROUTES.helpCenter, svg: ICONS.help },
        ],
      },
      {
        title: "Session",
        links: [
          { name: "Logout", href: "#", svg: ICONS.logout, action: "logout" },
        ],
      },
    ],
    desktop: [
      { name: "Home", href: ROUTES.userHome },
      { name: "Events", href: ROUTES.events },
      { name: "My Events", href: ROUTES.myEvents },
      { name: "Profile", href: ROUTES.userProfile },
      { name: "Help Center", href: ROUTES.helpCenter },
      { name: "Logout", href: "#", action: "logout" },
    ],
  },

  business: {
    quickActions: [
      { name: "Create Event", href: ROUTES.createEvent, primary: true },
      { name: "Dashboard", href: ROUTES.businessDashboard, primary: false },
    ],
    sections: [
      {
        title: "Management",
        links: [
          {
            name: "Dashboard",
            href: ROUTES.businessDashboard,
            svg: ICONS.home,
          },
          {
            name: "Hosted Events",
            href: ROUTES.hostedEvents,
            svg: ICONS.events,
          },
        ],
      },
      {
        title: "Account",
        links: [
          {
            name: "Business Profile",
            href: ROUTES.businessProfile,
            svg: ICONS.profile,
          },
        ],
      },
      {
        title: "Support",
        links: [
          { name: "Help Center", href: ROUTES.helpCenter, svg: ICONS.help },
        ],
      },
      {
        title: "Session",
        links: [
          { name: "Logout", href: "#", svg: ICONS.logout, action: "logout" },
        ],
      },
    ],
    desktop: [
      { name: "Dashboard", href: ROUTES.businessDashboard },
      { name: "Hosted Events", href: ROUTES.hostedEvents },
      { name: "Business Profile", href: ROUTES.businessProfile },
      { name: "Help Center", href: ROUTES.helpCenter },
      { name: "Logout", href: "#", action: "logout" },
    ],
  },
};

class SiteNavbar extends HTMLElement {
  constructor() {
    super();

    this.classList.add("block", "sticky", "top-0", "z-50");

    this.accountState = "guest";
    this.accountInfo = {
      name: "Welcome to Fans Feast",
      subtitle: "Sign in to save your events",
      avatarUrl: null,
      avatarFallback: "FF",
    };
    this.init();
  }

  async init() {
    this.renderTopBar();
    this.wireEvents();

    onAuthReady(async (user) => {
      this.accountState = await this.resolveAccountState(user);
      this.accountInfo = await this.resolveAccountInfo(user, this.accountState);
      this.renderTopBar();
      this.wireEvents();
    });
  }

  async resolveAccountState(user) {
    if (!user) return "guest";

    try {
      const businessRef = doc(db, "business_accounts", user.uid);
      const businessSnap = await getDoc(businessRef);
      if (businessSnap.exists()) return "business";

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) return "user";

      return "guest";
    } catch (error) {
      console.error("Error resolving account state:", error);
      return "guest";
    }
  }

  async resolveAccountInfo(user, state) {
    if (!user || state === "guest") {
      return {
        name: "Welcome to Fans Feast",
        subtitle: "Sign in to save your events",
        avatarUrl: null,
        avatarFallback: "FF",
      };
    }

    try {
      if (state === "business") {
        const businessRef = doc(db, "business_accounts", user.uid);
        const businessSnap = await getDoc(businessRef);
        const data = businessSnap.exists() ? businessSnap.data() : {};

        const name =
          data.displayName || data.businessName || "Business Account";
        return {
          name,
          subtitle: "Business account",
          avatarUrl: data.profilePic || null,
          avatarFallback: this.getInitials(name),
        };
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.exists() ? userSnap.data() : {};

      const name = data.displayName || data.name || user.email || "Fan Account";
      return {
        name,
        subtitle: "Fan account",
        avatarUrl: data.profilePic || null,
        avatarFallback: this.getInitials(name),
      };
    } catch (error) {
      console.error("Error resolving account info:", error);
      const fallbackName = user.displayName || user.email || "Fans Feast";
      return {
        name: fallbackName,
        subtitle: state === "business" ? "Business account" : "Fan account",
        avatarUrl: null,
        avatarFallback: this.getInitials(fallbackName),
      };
    }
  }

  getInitials(name) {
    if (!name) return "FF";
    const parts = String(name).trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "FF";
  }

  getCurrentConfig() {
    return NAV_CONFIG[this.accountState] || NAV_CONFIG.guest;
  }

  accountPanel() {
    const { name, subtitle, avatarUrl, avatarFallback } = this.accountInfo;

    return `
      <div class="square-rounded-box clear-window-color">
        <div class="flex items-center gap-3">
          ${
            avatarUrl
              ? `<img src="${avatarUrl}" alt="${name}" class="h-14 w-14 rounded-full object-cover border border-white-t4" />`
              : `<div class="flex h-14 w-14 items-center justify-center rounded-full main-blue-gradient text-sm font-bold text-white">
                  ${avatarFallback}
                </div>`
          }

          <div class="min-w-0">
            <p class="truncate font-semibold text-white">${name}</p>
            <p class="text-xs text-white-t1">${subtitle}</p>
          </div>
        </div>
      </div>
    `;
  }

  quickActionButton(action) {
    return `
      <a
        href="${action.href}"
        class="${
          action.primary
            ? "main-blue-gradient bright-hover"
            : "clear-window-color clear-hover"
        } flex-1 px-4 py-2 small-button"
      >
        ${action.name}
      </a>
    `;
  }

  sectionLink(link) {
    const hrefAttr = link.href ? `href="${link.href}"` : `href="#"`;
    const actionAttr = link.action ? `data-action="${link.action}"` : "";

    return `
      <a
        ${hrefAttr}
        ${actionAttr}
        class="justify-between text-white clear-hover hover:bg-white-t4"
      >
        <div class="flex items-center gap-3">
          <div class="text-white">
            ${link.svg}
          </div>
          <span class="text-sm font-medium">${link.name}</span>
        </div>
        <div class="text-white-t1">
          ${link.action === "logout" ? "" : ICONS.chevron}
        </div>
      </a>
    `;
  }

  sectionBlock(section) {
    return `
      <div class="mt-4">
        <p class="mb-2 px-3 subheading">
          ${section.title}
        </p>
        <div class="flex flex-col">
          ${section.links.map((link) => this.sectionLink(link)).join("")}
        </div>
      </div>
    `;
  }

  desktopLink(button) {
    const hrefAttr = button.href ? `href="${button.href}"` : `href="#"`;
    const actionAttr = button.action ? `data-action="${button.action}"` : "";

    return `
      <a ${hrefAttr} ${actionAttr} class="p-0 accent-hover-text">
        ${button.name}
      </a>
    `;
  }

  renderTopBar() {
    const config = this.getCurrentConfig();

    const homeHref =
      this.accountState === "business"
        ? ROUTES.businessDashboard
        : this.accountState === "user"
        ? ROUTES.userHome
        : ROUTES.guestHome;

    this.innerHTML = `
      <header class="flex h-15 items-center justify-between bg-dark-blue p-6 text-white md:h-20">
        <a href="${homeHref}" >
          <img class="h-10 object-contain md:h-12" src="images/fansFeastLogo.png" alt="Fans Feast Logo" />
        </a>

        <nav class="hidden items-center gap-8 md:flex">
          ${config.desktop.map((button) => this.desktopLink(button)).join("")}
        </nav>

        <button class="default-button flex cursor-pointer items-center md:hidden" id="menu-button" aria-label="Open menu">
          ${svgs.menu(40, 40, "#f9fafb")}
        </button>

        <div
          id="sidebar"
          class="hidden fixed top-0 right-0 z-60 h-screen w-[82%] max-w-105 flex-col overflow-y-auto dark-blue-gradient p-5 pt-24 translate-x-full transition-transform duration-300 ease-in-out md:hidden"
        >
          <div class="mt-5">
            ${this.accountPanel()}
          </div>

          <div class="mt-4 flex gap-3">
            ${config.quickActions
              .map((action) => this.quickActionButton(action))
              .join("")}
          </div>

          <div class="mt-4 border-t border-white-t4 pt-2">
            ${config.sections
              .map((section) => this.sectionBlock(section))
              .join("")}
          </div>
        </div>

        <div
          id="sidebarDimmer"
          class="hidden fixed inset-0 z-55 overlay-black-gradient backdrop-blur-[2px] md:hidden"
        ></div>
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
      document.body.classList.add("overflow-hidden");

      requestAnimationFrame(() => {
        sidebar.classList.remove("translate-x-full");
      });

      dimmer.classList.remove("hidden");
    };

    const closeSidebar = () => {
      sidebar.classList.add("translate-x-full");
      dimmer.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");

      setTimeout(() => {
        if (sidebar.classList.contains("translate-x-full")) {
          sidebar.classList.remove("flex");
          sidebar.classList.add("hidden");
        }
      }, 300);
    };

    menuButton.onclick = () => {
      const isClosed = sidebar.classList.contains("hidden");
      if (isClosed) openSidebar();
      else closeSidebar();
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
