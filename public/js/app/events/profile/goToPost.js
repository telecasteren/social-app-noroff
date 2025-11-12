import { addNavTracking } from "/js/utils/source/helpers/navigationTracking.js";

/**
 * Attaches click event listeners to all elements with the `.user-post` class.
 *
 * When a post card is clicked (excluding clicks on elements with the `.edit-post` class),
 * the function:
 * - Stores the current page path, query parameters, and scroll position in `sessionStorage`
 *   under the key `"previousPage"`.
 * - Delays a call to `addNavTracking()` for navigation analytics/tracking.
 * - Redirects the user to the full post view page (`/user/post/?id={postId}`) if the post has an ID.
 *
 * @function openPost
 * @returns {void} This function does not return a value.
 *
 * @sideeffects
 * - Adds event listeners to `.user-post` elements in the DOM.
 * - Updates `sessionStorage` with navigation metadata.
 * - Navigates to a new page (`/user/post/?id={postId}`) upon clicking a post card.
 *
 * @requires addNavTracking
 */
export const openPost = () => {
  const posts = document.querySelectorAll(".user-post");

  posts.forEach((post) => {
    post.addEventListener("click", (e) => {
      const postId = post.dataset.id;
      const cameFrom = window.location.pathname + window.location.search;
      const scrollY = window.scrollY || 0;

      if (e.target.closest(".edit-post")) return;

      setTimeout(() => {
        addNavTracking();
      }, 100);

      sessionStorage.setItem(
        "previousPage",
        JSON.stringify({
          cameFrom,
          scrollY,
        })
      );

      if (postId) {
        window.location.href = `/user/post/?id=${postId}`;
      }
    });
  });
};
