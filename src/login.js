import { loginUser, authErrorMessage } from "./authentication.js";
import { db } from "/src/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

function initLoginAuth() {
  const alertEl = document.getElementById("authAlert");
  const loginForm = document.getElementById("login");

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
      const res = await loginUser(email, password);
      const user = res.user;

      const businessRef = doc(db, "business_accounts", user.uid);
      const businessSnap = await getDoc(businessRef);

      if (businessSnap.exists()) {
        location.href = "./mainBusiness.html";
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        location.href = "./index.html";
        return;
      }

      showError("Account profile not found.");
    } catch (err) {
      showError(authErrorMessage(err));
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", initLoginAuth);
