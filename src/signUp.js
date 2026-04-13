/**
 * signUp.js
 * Handles personal account sign-up form submission.
 * Validates inputs, creates a personal account via Firebase Auth + Firestore,
 * and redirects to the home page on success.
 */

import { signupUser, authErrorMessage } from "./authentication.js";

function signUpAuth() {
  const alertEl = document.getElementById("authAlert");
  const signupForm = document.getElementById("signUp");
  const redirectUrl = "./index.html";

  let errorTimeout;

  // Display an error message for 5 seconds, then auto-hide
  function showError(msg) {
    alertEl.textContent = msg || "";
    alertEl.classList.remove("hidden");
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(hideError, 5000);
  }

  function hideError() {
    alertEl.classList.add("hidden");
    alertEl.textContent = "";
    clearTimeout(errorTimeout);
  }

  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const name = document.querySelector("#full_name")?.value?.trim() ?? "";
    const email = document.querySelector("#email")?.value?.trim() ?? "";
    const password = document.querySelector("#password")?.value ?? "";
    const phone = document.querySelector("#phoneNumber")?.value ?? "";

    if (!name || !email || !password) {
      showError("Please fill in name, email, phone number and password.");
      return;
    }

    try {
      await signupUser({
        accountType: "personal",
        name,
        email,
        password,
        phone,
      });
      location.href = redirectUrl;
    } catch (err) {
      showError(authErrorMessage(err));
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", signUpAuth);
