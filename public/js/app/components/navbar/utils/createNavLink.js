import { handleClicks } from "/js/app/components/navbar/utils/navbarHandlers.js";
import { endDot } from "/js/utils/general/constants.js";
import { userSettings } from "/js/app/components/settings/userSettings.js";

/**
 * Creates a navigation link element (<a>) for the site navigation.
 *
 * Special handling is applied if the link text is "Settings" (returns `userSettings()` component).
 * For other links, an anchor element is created with optional mobile styling and a click handler.
 *
 * @function createNavLink
 * @param {Object} options - The navigation link options.
 * @param {string} options.text - The display text of the link.
 * @param {string} options.href - The URL the link points to.
 * @param {boolean} [isMobile=false] - Whether the link is for mobile navigation styling.
 * @returns {HTMLElement} The created anchor element, or a settings component if text is "Settings".
 *
 * @sideeffects
 * - Attaches a click event listener to handle navigation and optional profile-specific behavior.
 */
export const createNavLink = ({ text, href }, isMobile = false) => {
  if (text === "Settings") {
    return userSettings();
  }

  const a = document.createElement("a");
  a.href = href;
  a.innerHTML = text + endDot;
  a.className = isMobile ? "mobile-nav-item" : "";

  a.addEventListener("click", (e) => {
    handleClicks(e, href, text == "Profile");
  });
  return a;
};
