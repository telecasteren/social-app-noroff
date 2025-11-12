import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";

/**
 * Fetches a set of posts and generates a container filled with post cards.
 *
 * This function:
 * - Retrieves the first page of posts using `getPosts` with a limit defined by `POSTS_PER_PAGE`.
 * - Creates a container element for the post cards with responsive flex layout classes.
 * - Renders each post inside the container using `renderCards`.
 *
 * @async
 * @function
 * @returns {Promise<HTMLElement>} A promise that resolves to the DOM element containing all rendered post cards.
 */
export const createCards = async () => {
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  const cardContainer = document.createElement("div");
  cardContainer.id = "posts-container";
  cardContainer.className =
    "card-container flex flex-column flex-wrap gap-4 sm:gap-6 lg:gap-12 justify-center md:ml-20 md:mr-20";

  await renderCards(posts, cardContainer);
  return cardContainer;
};
