import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";
import { renderPosts } from "/js/app/routes/profile/sections/posts/renderPosts.js";

/**
 * Fetches and renders a paginated list of user posts.
 *
 * This function:
 * - Retrieves posts for a specified limit and page number using `getUserPosts`.
 * - Creates a container `<div>` for the posts.
 * - Displays a "No posts yet." message if there are no posts on the first page.
 * - Renders the posts into the container using `renderPosts`.
 *
 * @async
 * @function
 * @param {number} limit - The number of posts to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @returns {Promise<HTMLElement>} A `<div>` element containing the rendered posts or a "No posts yet." message.
 */
const Posts = async (limit, page = 1) => {
  const { data: userPosts } = await getUserPosts(limit, page);

  const postsList = document.createElement("div");
  postsList.id = "posts-container";
  postsList.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5";

  if (userPosts.length === 0 && page === 1) {
    const message = document.createElement("div");
    message.textContent = "No posts yet.";
    message.className =
      "p-4 w-fit text-center text-sm rounded-sm shadow-xl border border-accent-light dark:border-accent-dark";
    postsList.appendChild(message);

    return postsList;
  }

  await renderPosts(userPosts, postsList);
  return postsList;
};
export default Posts;
