const sidebarButtons = [
  {
    name: "Home",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
        `,
  },
  {
    name: "Events",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="64"
           height="64"
           viewBox="0 0 24 24"
           fill="none"
           stroke="#000000"
           stroke-width="1"
           stroke-linecap="round"
           stroke-linejoin="round"
         >
           <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
           <path d="M3 9h3v6h-3z" />
           <path d="M18 9h3v6h-3z" />
           <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
           <path d="M12 5l0 14" />
         </svg>
        `,
  },
  {
    name: "Log In",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="64"
           height="64"
           viewBox="0 0 24 24"
           fill="none"
           stroke="#000000"
           stroke-width="1"
           stroke-linecap="round"
           stroke-linejoin="round"
         >
           <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
           <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
           <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
         </svg>

        `,
  },
  {
    name: "Help",
    href: "#",
    color: "white",
    hoverColor: "gray-200",
    svg: `
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="64"
           height="64"
           viewBox="0 0 24 24"
           fill="none"
           stroke="#000000"
           stroke-width="1"
           stroke-linecap="round"
           stroke-linejoin="round"
         >
           <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
           <path d="M12 16v.01" />
           <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
         </svg>

        `,
  },
];

function sidebarButton(button) {
  return `
    <a 
      href="${button.href}"
      class="flex items-center cursor-pointer bg-${button.color} hover:bg-${button.hoverColor} active:bg-${button.hoverColor} active:scale-105 rounded-2xl m-4 p-2 text-3xl drop-shadow-xl"    
    >
      ${button.svg}
      <span
        class="m-1"
      >
        ${button.name}
      </span>
    </a>
    `;
}

function renderTopBar(buttons) {
  return `
    <header class="bg-gray-400 p-6 flex justify-between max-h-19 items-center relative">
      <a 
       href="./index.html
       class="min-h-10 max-h-10 flex items-center"
      >
        <img class="max-h-14 max-w-full" src="images/fansFeastLogo.png" />
      </a>
      <nav class="w-120 flex space-x-10 invisible md:visible">
        <a href="#" class="font-bold">Home</a>
        <a href="#" class="font-bold">Events</a>
        <a href="#" class="font-bold">Log In</a>
        <a href="#" class="font-bold">Sign Up</a>
        <a href="#" class="font-bold">Help Center</a>
      </nav>
      <button
        class="min-h-10 max-h-10 flex items-center cursor-pointer md:invisible"
        id="menu-button"
      >
        <svg
          class="hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </button>
    <!-- Sidebar Overlay -->
      <div
        id="sidebar"
        class="flex flex-col absolute top-full right-0 z-50 w-1/3 h-[calc(100vh-100%)] bg-gray-400 translate-x-full transition-transform duration-300 ease-in-out overflow-hidden"
      >
      ${buttons.map(sidebarButton).join("")}
      </div>
      <div
        id="sidebarDimmer"
        class="hidden absolute top-full left-0 w-full z-49 bg-black h-[calc(100vh-100%)] opacity-50"
      >
      test
      </div>
    </header>
    `;
}

export function renderHeader() {
  const header = document.getElementById("header");
  header.insertAdjacentHTML("beforeend", renderTopBar(sidebarButtons));

  const menuButton = document.getElementById("menu-button");
  const sidebar = document.getElementById("sidebar");
  const sidebarDimmer = document.getElementById("sidebarDimmer");
  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("translate-x-full");
    sidebarDimmer.classList.toggle("hidden");
  });
}
