import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { createTitle } from "/js/app/components/titles/title.js";
import searchInput from "/js/app/components/search/searchInput.js";
import createPostMenu from "/js/app/routes/feed/newPosts/createPostMenu.js";
import { sortOptions } from "/js/app/components/search/sortOptions.js";
import { createCards } from "/js/app/routes/feed/cards/cards.js";
import { resetPagination } from "/js/utils/source/api/posts/get/loadMorePosts.js";
import { setScrollHandler } from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { searchPosts } from "/js/app/events/search/queryPosts/searchPosts.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
// import { searchProfiles } from "/js/app/events/search/queryPosts/searchProfiles.js";

/**
 * Creates and returns the main Feed page container.
 *
 * This function:
 * - Generates the feed header with a title, search bar, sort menu, and new post button.
 * - Fetches and renders post cards.
 * - Initializes scroll handling, search functionality, and post interaction events.
 * - Restores scroll position if previously saved in `sessionStorage`.
 *
 * @async
 * @function
 * @returns {Promise<HTMLElement>} A container element representing the Feed page.
 */
const Feed = async () => {
  const container = document.createElement("div");
  const headerContent = document.createElement("div");
  headerContent.className = "feed-header justify-items-center pt-8 gap-16";

  const title = createTitle("Feed me");
  title.classList.add("text-bigger", "m-4");

  const searchBar = searchInput();
  const newPost = createPostMenu();
  const sortMenu = sortOptions();
  const Posts = await createCards();

  headerContent.appendChild(title);
  headerContent.appendChild(searchBar);
  headerContent.appendChild(sortMenu);
  headerContent.appendChild(newPost);

  container.appendChild(headerContent);
  container.appendChild(Posts);

  resetPagination();
  setScrollHandler(createScrollHandler(getPosts, Posts, renderCards));
  searchPosts(searchBar, Posts);
  openPost();
  // searchProfiles(searchBar, Posts);

  requestAnimationFrame(() => {
    const scrollY = sessionStorage.getItem("restoreScroll");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.removeItem("restoreScroll");
    }
  });

  return container;
};
export default Feed;
