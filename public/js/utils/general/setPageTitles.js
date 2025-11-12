import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { SITE_NAME } from "/js/utils/general/constants.js";

/**
 * Dynamically sets the page's <title> based on the current path and query parameters.
 *
 * - Uses predefined titles for recognized routes (e.g., feed page).
 * - For post pages (`/post/`), uses the post title if available.
 * - For profile pages (`/profile/`), uses the username if available.
 * - Falls back to default titles if no specific match is found.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves after the document title has been updated.
 *
 * @example
 * await setPageTitles();
 */
export const setPageTitles = async () => {
  const path = window.location.pathname;
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  const pageTitles = {
    "/user/feed/": `Explore | ${SITE_NAME}`,
  };

  let pageTitle = Object.keys(pageTitles).find((key) => path.includes(key))
    ? pageTitles[Object.keys(pageTitles).find((key) => path.includes(key))]
    : `${SITE_NAME} | Dashboard`;

  if (path.includes("/post/")) {
    const { id: postId } = getPostParams();

    if (postId) {
      const numericPostId = Number(postId);
      let post = posts.find((p) => p.id === numericPostId);

      if (post) {
        pageTitle = `${post.title} | ${SITE_NAME}` || `Post | ${SITE_NAME}`;
      } else {
        pageTitle = `Post | ${SITE_NAME}`;
        console.warn(
          `setPageTitles(): Failed to fetch post with ID ${postId}. Fallback initiated.`
        );
      }
    }
  }

  if (path.includes("/profile/")) {
    const user = await getUserParams();
    const userId = user.name;

    if (userId) {
      const user = userId;

      if (user) {
        pageTitle = `${user} | ${SITE_NAME}` || `Profile | ${SITE_NAME}`;
      } else {
        pageTitle = `Profile | ${SITE_NAME}`;
        console.warn(
          `setPageTitles(): Failed to fetch user with ID ${userId}. Fallback initiated.`
        );
      }
    }
  }

  document.title = pageTitle;
};
