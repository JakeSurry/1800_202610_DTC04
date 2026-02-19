import { signupUser, authErrorMessage } from "./authentication.js";

function signUpAuth() {
  const alertEl = document.getElementById("authAlert");
  const signupForm = document.getElementById("signUp");
  const redirectUrl = "./main.html";

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

  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();
    const name = document.querySelector("#full_name")?.value?.trim() ?? "";
    const email = document.querySelector("#email")?.value?.trim() ?? "";
    const password = document.querySelector("#password")?.value ?? "";
    if (!name || !email || !password) {
      showError("Please fill in name, email, phone number and password.");
      return;
    }
    try {
      const res = await signupUser(name, email, password);
      console.log(res);
      location.href = redirectUrl;
    } catch (err) {
      showError(authErrorMessage(err));
      console.error(err);
    } finally {
      setSubmitDisabled(signupForm, false);
    }
  });
}

document.addEventListener("DOMContentLoaded", signUpAuth);
