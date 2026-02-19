import { loginUser, authErrorMessage } from "./authentication.js";

function initLoginAuth() {
  const alertEl = document.getElementById("authAlert");
  const loginForm = document.getElementById("login");
  const redirectUrl = "main.html";

  let errorTimeout;
  function showError(msg) {
    alertEl.textContent = msg || "";
    alertEl.classList.remove("d-none");
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(hideError, 5000);
  }

  function hideError() {
    alertEl.classList.add("d-none");
    alertEl.textContent = "";
    clearTimeout(errorTimeout);
  }

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();
    const email = document.querySelector("#email")?.value?.trim() ?? "";
    const password = document.querySelector("#password")?.value ?? "";
    if (!email || !password) {
      showError("Please enter your email and password.");
      return;
    }
    try {
      await loginUser(email, password);
      location.href = redirectUrl;
    } catch (err) {
      showError(authErrorMessage(err));
      console.error(err);
    } finally {
      setSubmitDisabled(loginForm, false);
    }
  });
}

document.addEventListener("DOMContentLoaded", initLoginAuth);
