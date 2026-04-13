/**
 * signUpBusiness.js
 * Handles business account sign-up form submission.
 * Validates inputs, creates a business account via Firebase Auth + Firestore,
 * and redirects to the business dashboard on success.
 */

import { signupUser, authErrorMessage } from "./authentication.js";

function signUpAuth() {
  const alertEl = document.getElementById("authAlert");
  const signupForm = document.getElementById("signUp");
  const redirectUrl = "./mainBusiness.html";

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

    const businessName =
      document.querySelector("#businessName")?.value?.trim() ?? "";
    const email = document.querySelector("#email")?.value?.trim() ?? "";
    const password = document.querySelector("#password")?.value ?? "";
    const phone = document.querySelector("#phoneNumber")?.value?.trim() ?? "";

    if (!businessName || !email || !phone || !password) {
      showError(
        "Please fill in business name, contact name, email, phone number, and password.",
      );
      return;
    }

    try {
      const res = await signupUser({
        accountType: "business",
        businessName,
        email,
        password,
        phone,
      });

      console.log(res);
      location.href = redirectUrl;
    } catch (err) {
      showError(authErrorMessage(err));
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", signUpAuth);
