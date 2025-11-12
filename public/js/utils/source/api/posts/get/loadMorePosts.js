import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { openPost } from "/js/app/events/profile/goToPost.js";

let currentPage = 1;
let isLoading = false;
let isMorePosts = true;

/**
 * Loads additional posts for infinite scrolling and appends them to a container.
 *
 * Handles pagination state internally, prevents multiple simultaneous requests,
 * and stops fetching when no more posts are available.
 *
 * @async
 * @param {function(number, number): Promise<{ data: Array }>} fetchMorePosts -
 *   Function to fetch posts. Receives the current page and posts per page.
 * @param {HTMLElement} container - The DOM element where new posts will be rendered.
 * @param {function(Array, HTMLElement): Promise<void>} renderCallback -
 *   Callback function to render fetched posts into the container.
 * @throws Will throw an error if fetching posts fails.
 *
 * @example
 * await loadMorePosts(getPosts, postsContainer, renderCards);
 */
export const loadMorePosts = async (
  fetchMorePosts,
  container,
  renderCallback
) => {
  if (isLoading || !isMorePosts) return;
  isLoading = true;
  currentPage++;

  try {
    const { data: morePosts } = await fetchMorePosts(
      currentPage,
      POSTS_PER_PAGE
    );
    if (!morePosts || morePosts.length === 0) {
      isMorePosts = false;
      return;
    }

    await renderCallback(morePosts, container);
    openPost();
  } catch (error) {
    throw error;
  } finally {
    isLoading = false;
  }
};

/**
 * Resets the pagination state used by `loadMorePosts`.
 *
 * Sets the current page back to 1 and allows fetching posts again.
 *
 * @function
 *
 * @example
 * resetPagination();
 */
export const resetPagination = () => {
  currentPage = 1;
  isLoading = false;
  isMorePosts = true;
};
