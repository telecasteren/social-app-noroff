import { loadMorePosts } from "/js/utils/source/api/posts/get/loadMorePosts.js";

/**
 * Creates a scroll event handler that loads more content when the user
 * scrolls near the bottom of the page.
 *
 * @param {Function} fetchPosts - A function that fetches additional posts or data.
 * @param {HTMLElement} renderTarget - The DOM element where the fetched content should be rendered.
 * @param {Function} renderCallback - A callback function to render the fetched content.
 * @returns {Function} A scroll event handler function that can be attached to `window` or other scrollable containers.
 */
export const createScrollHandler = (
  fetchPosts,
  renderTarget,
  renderCallback
) => {
  const scrolledToEnd =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  return async () => {
    if (scrolledToEnd) {
      await loadMorePosts(fetchPosts, renderTarget, renderCallback);
    }
  };
};
