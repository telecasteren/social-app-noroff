import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { loadKey } from "/js/utils/storage/loadKey.js";

/**
 * Animates the underline of a navigation menu to align with the target list item.
 *
 * - Only shows the underline for the current user's profile if on `/user/profile`.
 * - Retrieves the current and target positions and widths of the underline.
 * - Smoothly transitions the underline to the target using `requestAnimationFrame`.
 *
 * @async
 * @function updateUnderline
 * @param {HTMLLIElement} targetLi - The list item element to which the underline should move.
 * @returns {Promise<void>} Resolves when the animation is complete.
 */
export const updateUnderline = async (targetLi) => {
  const currentUrl = window.location.pathname;
  let showUnderline = true;

  if (currentUrl.includes("/user/profile")) {
    const currentUser = loadKey("profile")?.name;
    let visitedProfile;
    try {
      const profileData = await getUserParams();
      visitedProfile = profileData?.name;
    } catch (error) {
      showUnderline = false;
    }
    if (visitedProfile !== currentUser) {
      showUnderline = false;
    }
  }
  if (!showUnderline) return;

  const ulEl = document.querySelector("ul.active");
  if (!ulEl) return;

  const underlineLeft = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-left") || "0"
  );
  const underlineWidth = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-width") || "0"
  );

  const { offsetLeft: targetLeft, offsetWidth: targetWidth } = targetLi;

  let startTime = null;
  const steps = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / 300, 1);

    const newLeft = underlineLeft + (targetLeft - underlineLeft) * progress;
    const newWidth = underlineWidth + (targetWidth - underlineWidth) * progress;

    ulEl.style.setProperty("--underline-left", `${newLeft}px`);
    ulEl.style.setProperty("--underline-width", `${newWidth}px`);

    if (progress < 1) {
      requestAnimationFrame(steps);
    }
  };

  requestAnimationFrame(steps);
};
