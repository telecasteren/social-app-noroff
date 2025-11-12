/**
 * Creates and returns a "Go back" button element that restores navigation context.
 *
 * The button allows users to return to the previous page (if available) or
 * falls back to the feed page (`/user/feed/`). If the previous page was
 * a feed or profile view, the function also saves the previous scroll position
 * to `sessionStorage` under the key `"restoreScroll"`.
 *
 * @function goBackBtn
 * @returns {HTMLDivElement} A clickable back button element ready to be appended to the DOM.
 *
 * @sideeffects
 * - Reads `sessionStorage.previousPage` to determine navigation history and scroll state.
 * - Updates `sessionStorage.restoreScroll` when applicable.
 * - May trigger navigation via `window.history.back()` or redirect to `/user/feed/`.
 */
export const goBackBtn = () => {
  const data = JSON.parse(sessionStorage.getItem("previousPage") || "{}");
  const cameFrom = data.cameFrom || "";

  const backBtn = document.createElement("div");
  backBtn.className = `text-md mt-4 underline
  hover:underline-none hover:text-[var(--accent)] cursor-pointer`;
  backBtn.textContent = "← Go back";

  backBtn.addEventListener("click", () => {
    if (
      cameFrom?.startsWith("/user/feed/") ||
      cameFrom?.startsWith("/user/profile/")
    ) {
      sessionStorage.setItem("restoreScroll", data.scrollY);
    }
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/user/feed/";
    }
  });

  return backBtn;
};
