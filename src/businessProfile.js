import { db } from "/src/firebaseConfig.js";
import { onAuthReady } from "./authentication.js";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

function getLoader() {
  return document.querySelector("page-loader");
}

function showError(message) {
  const alertEl = document.getElementById("formAlert");
  if (!alertEl) return;
  alertEl.textContent = message;
  alertEl.classList.remove("hidden");
}

function hideError() {
  const alertEl = document.getElementById("formAlert");
  if (!alertEl) return;
  alertEl.textContent = "";
  alertEl.classList.add("hidden");
}

function safeText(value, fallback = "Not added") {
  return value && String(value).trim() ? value : fallback;
}

function getInitials(name) {
  if (!name) return "FF";
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "FF";
}

function renderBusinessAvatar(data) {
  const avatarContainer = document.getElementById("business-avatar");
  if (!avatarContainer) return;

  const displayName =
    data.displayName || data.businessName || data.email || "Business Account";
  const profilePic = data.profilePic || "";

  avatarContainer.innerHTML = profilePic
    ? `
      <img
        src="${profilePic}"
        alt="${displayName}"
        class="h-30 w-30 rounded-2xl object-cover border-2 border-white"
      />
    `
    : `
      <div
        class="h-30 w-30 flex items-center justify-center rounded-2xl main-blue-gradient text-white text-3xl font-bold border-2 border-white"
      >
        ${getInitials(displayName)}
      </div>
    `;
}

async function loadBusinessProfile(user) {
  const businessRef = doc(db, "business_accounts", user.uid);
  const businessSnap = await getDoc(businessRef);

  if (!businessSnap.exists()) {
    throw new Error("Business profile not found.");
  }

  const data = businessSnap.data();

  document.getElementById("display-name-text").textContent = safeText(
    data.displayName,
    "No display name",
  );
  document.getElementById("business-name-text").textContent = safeText(
    data.businessName,
    "No business name",
  );
  document.getElementById("business-type-text").textContent = safeText(
    data.businessType,
    "No business type",
  );
  document.getElementById("location-text").textContent =
    [data.city, data.province].filter(Boolean).join(", ") ||
    "Location not added";
  document.getElementById("email-text").textContent = safeText(
    data.email,
    "No email",
  );
  document.getElementById("phone-text").textContent = safeText(
    data.phone,
    "No phone",
  );
  document.getElementById("website-text").textContent = safeText(
    data.website,
    "No website",
  );
  document.getElementById("instagram-text").textContent = safeText(
    data.instagram,
    "No Instagram",
  );
  document.getElementById("description-text").textContent = safeText(
    data.description,
    "No description added yet.",
  );
  document.getElementById("address-text").textContent = safeText(data.address);
  document.getElementById("city-text").textContent = safeText(data.city);
  document.getElementById("province-text").textContent = safeText(
    data.province,
  );
  document.getElementById("postal-code-text").textContent = safeText(
    data.postalCode,
  );

  renderBusinessAvatar(data);

  document.getElementById("displayName").value = data.displayName || "";
  document.getElementById("businessName").value = data.businessName || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("businessType").value = data.businessType || "";
  document.getElementById("website").value = data.website || "";
  document.getElementById("instagram").value = data.instagram || "";
  document.getElementById("description").value = data.description || "";
  document.getElementById("address").value = data.address || "";
  document.getElementById("city").value = data.city || "";
  document.getElementById("province").value = data.province || "";
  document.getElementById("postalCode").value = data.postalCode || "";
}

function wireViewToggle() {
  const editView = document.getElementById("editBusinessView");
  const toEdit = document.getElementById("toEdit");
  const toProfile = document.getElementById("toProfile");

  toEdit?.addEventListener("click", () => {
    editView.classList.remove("hidden");
  });

  toProfile?.addEventListener("click", () => {
    editView.classList.add("hidden");
    hideError();
  });
}

function wireFormSubmit(user) {
  const form = document.getElementById("editBusinessProfile");
  const editView = document.getElementById("editBusinessView");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const payload = {
      displayName:
        document.getElementById("displayName")?.value?.trim() || null,
      businessName:
        document.getElementById("businessName")?.value?.trim() || null,
      phone: document.getElementById("phone")?.value?.trim() || null,
      businessType:
        document.getElementById("businessType")?.value?.trim() || null,
      website: document.getElementById("website")?.value?.trim() || null,
      instagram: document.getElementById("instagram")?.value?.trim() || null,
      description:
        document.getElementById("description")?.value?.trim() || null,
      address: document.getElementById("address")?.value?.trim() || null,
      city: document.getElementById("city")?.value?.trim() || null,
      province: document.getElementById("province")?.value?.trim() || null,
      postalCode: document.getElementById("postalCode")?.value?.trim() || null,
      updatedAt: serverTimestamp(),
    };

    try {
      await updateDoc(doc(db, "business_accounts", user.uid), payload);
      await loadBusinessProfile(user);
      editView.classList.add("hidden");
    } catch (error) {
      console.error("Error updating business profile:", error);
      showError("Unable to save profile changes.");
    }
  });
}

function initBusinessProfile() {
  const loader = getLoader();
  loader?.setText("Loading business profile...");
  loader?.show();

  onAuthReady(async (user) => {
    try {
      if (!user) {
        location.href = "index.html";
        return;
      }

      await loadBusinessProfile(user);
      wireViewToggle();
      wireFormSubmit(user);
    } catch (error) {
      console.error(error);
    } finally {
      loader?.hide();
    }
  });
}

document.addEventListener("DOMContentLoaded", initBusinessProfile);
