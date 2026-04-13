/**
 * main.js
 * Entry script for the logged-in user home page (main.html).
 * Displays the user's name and redirects unauthenticated users to the landing page.
 */

import { onAuthReady } from "./authentication.js";

function showName() {
  const nameElement = document.getElementById("name-goes-here");

  onAuthReady((user) => {
    // Redirect to landing page if not logged in
    if (!user) {
      location.href = "index.html";
      return;
    }

    const name = user.displayName || user.email;

    if (nameElement) {
      nameElement.textContent = `${name}!`;
    }
  });
}

showName();
