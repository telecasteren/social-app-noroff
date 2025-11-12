import { loadKey } from "/js/utils/storage/loadKey.js";
import renderContent from "/js/app/ui/renderContent.js";
import Logout from "/js/utils/storage/logout.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { closeModal } from "/js/app/components/modal/closeModal.js";
import { toggleModal } from "/js/app/components/modal/toggleModal.js";
import { setPageTitles } from "/js/utils/general/setPageTitles.js";

/**
 * Handles navigation and special click behavior for links within the app.
 *
 * - Prevents default anchor behavior.
 * - Reloads the page if navigating to `/` and already on `/`.
 * - Handles logout by showing a modal with a "Logging out" message, animated dots, and then calling `Logout()`.
 * - Appends the current user's ID to profile links if `isProfile` is true.
 * - Updates browser history and renders new content for other links.
 *
 * @function handleClicks
 * @param {Event} e - The click event object from an anchor element or similar.
 * @param {string} href - The target URL for navigation.
 * @param {boolean} [isProfile=false] - Whether the clicked link is a profile link (appends current user ID if true).
 *
 * @sideeffects
 * - May reload the page or update `window.location`.
 * - May display a modal during logout.
 * - Updates browser history via `history.pushState`.
 * - Calls `renderContent()` to update page content.
 * - Logs warnings or messages to the console or via `userMessage`.
 */
export const handleClicks = (e, href, isProfile = false) => {
  e.preventDefault();

  if (href === "/") {
    if (window.location.pathname === "/") {
      window.location.reload();
      return;
    }
    window.location.assign("/");
    return;
  }

  if (href === "/user/logout/") {
    const logoutContainer = document.createElement("div");
    logoutContainer.className =
      "flex flex-wrap items-center justify-self-center w-[200px]";
    const logoutMessage = document.createElement("p");
    logoutMessage.className = "text-black text-medium m-4";
    logoutMessage.textContent = "Logging out";
    logoutContainer.appendChild(logoutMessage);

    toggleModal(logoutContainer);
    if (logoutContainer) {
      const closeBtn = document.querySelector(".close-modal");
      const modalContent = document.querySelector(".modal-content");
      closeBtn.style.opacity = "0";
      modalContent.style.width = "40%";
    }

    let dots = 0;
    let maxDots = 3;
    const dotInterval = setInterval(() => {
      dots = (dots + 1) % (maxDots + 1);
      logoutMessage.textContent = "Logging out" + " . ".repeat(dots);
    }, 400);

    setTimeout(() => {
      clearInterval(dotInterval);
      Logout();
      closeModal();
    }, 3000);

    return;
  }

  if (isProfile) {
    const profile = loadKey("profile");
    const currentUser = profile?.name;
    if (!currentUser) {
      userMessage("info", "Login to view your profile.");
      console.warn("No profile found in localStorage.");
      return;
    }
    href += `?id=${currentUser}`;
  }

  if (window.location.pathname + window.location.search !== href) {
    history.pushState(null, "", href);

    renderContent();
    setPageTitles();
  }
};
