import { loadKey } from "/js/utils/storage/loadKey.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { queryPosts } from "/js/utils/source/api/posts/search/queryPosts.js";
import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import {
  setScrollHandler,
  removeScrollHandler,
} from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

/**
 * Attaches search functionality to a search bar for filtering posts and rendering results.
 *
 * @param {HTMLElement} searchBar - The container element of the search input and button.
 * @param {HTMLElement} container - The container element where search results (post cards) will be rendered.
 *
 * @fires userMessage Displays informational, error, or success messages to the user.
 * @fires clearUserMessage Clears messages after a delay.
 * @fires renderCards Renders post cards in the container based on search results.
 * @fires openPost Initializes click handlers or functionality for individual posts.
 * @fires setScrollHandler Sets up infinite scrolling to load more posts dynamically.
 * @fires removeScrollHandler Removes any previously attached scroll handlers to prevent duplicate loads.
 */
export const searchPosts = (searchBar, container) => {
  const searchBox = searchBar.querySelector("#default-search");
  const button = searchBar.querySelector("#search-btn");
  const posts = loadKey("posts");

  if (!searchBox || !button || !container) {
    return;
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    removeScrollHandler(window._scrollHandler);

    const query = searchBox.value.trim();

    if (!query) {
      userMessage("info", "Search cannot be empty. Please enter search words.");
      return;
    }

    try {
      const results = await queryPosts(query);
      const postsData = results.data;

      if (Array.isArray(postsData) && postsData.length > 0) {
        container.innerHTML = "";
        renderCards(postsData, container);
        openPost();
      } else {
        container.innerHTML = "";
        userMessage("info", "That search returned no results.");
        setTimeout(() => {
          searchBox.value = "";
          renderCards(posts, container);
          openPost();
          clearUserMessage();
        }, 5000);
      }
    } catch (error) {
      userMessage("error", "Failed to search posts. Please try again.");
      throw error;
    } finally {
      setTimeout(() => clearUserMessage(), 3000);
    }
  });

  setScrollHandler(createScrollHandler(getPosts, container, renderCards));
};
