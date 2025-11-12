import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import {
  defaultPostDesc,
  defaultDescFallback,
  defaultDescriptions,
  SITE_NAME,
} from "/js/utils/general/constants.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";

/**
 * Dynamically sets the page's meta description based on the current path or post.
 *
 * This function determines the appropriate description to use:
 * - Uses a default description for recognized routes from `defaultDescriptions`.
 * - Uses a fallback description if the route is unknown.
 * - If viewing a specific post (path includes "/post/"), it attempts to use
 *   the post title as part of the description.
 *
 * The meta description is updated or created in the document head.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves after setting or updating the meta description.
 *
 * @example
 * await setMetaDescriptions();
 */
export const setMetaDescriptions = async () => {
  const path = window.location.pathname;
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  let matchedKey = Object.keys(defaultDescriptions).find((key) =>
    path.startsWith(key)
  );

  let metaDescription = matchedKey
    ? defaultDescriptions[matchedKey]
    : defaultDescFallback;

  if (path.includes("/post/")) {
    const { id: postId } = getPostParams();

    if (postId) {
      const numericPostId = Number(postId);
      let post = posts.find((p) => p.id === numericPostId);

      if (post) {
        metaDescription = `${post.title} - ${defaultPostDesc}`;
      } else {
        metaDescription = `${SITE_NAME}: The spot to connect with fellow Foodies.`;
        console.warn(
          `setMetaDescriptions(): Failed to fetch post with ID ${postId}. Fallback initiated.`
        );
      }
    }
  }

  let metaTag = document.querySelector("meta[name='description']");
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", metaDescription);
};
