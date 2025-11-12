import { loadKey } from "/js/utils/storage/loadKey.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { queryProfiles } from "/js/utils/source/api/users/search/queryProfiles.js";
import { returnProfileList } from "/js/app/components/search/returnProfileList.js";
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
 * Not in use. Function to handle searching profiles and rendering results. Will be implemented in future updates.
 * @param {HTMLElement} searchBar - The search bar element containing the input and button.
 * @param {HTMLElement} container - The container element where search results will be rendered.
 * @returns {void}
 */
export const searchProfiles = (searchBar, container) => {
  const searchBox = searchBar.querySelector("#default-search");
  const button = searchBar.querySelector("#search-btn");
  const posts = loadKey("posts");

  if (!searchBox || !button || !container) {
    console.error("Search box, button, or container not found.");
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
      const results = await queryProfiles(query);
      const profileData = results.data;

      if (Array.isArray(profileData) && profileData.length > 0) {
        const profiles = await returnProfileList(profileData);

        container.innerHTML = "";
        container.appendChild(profiles);
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
      userMessage("error", "Failed to search profiles. Please try again.");
      throw error;
    } finally {
      setTimeout(() => clearUserMessage(), 3000);
    }
  });

  setScrollHandler(createScrollHandler(getPosts, container, renderCards));
};
