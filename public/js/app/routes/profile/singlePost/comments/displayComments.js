import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import { commentBlock } from "/js/utils/source/helpers/commentBlock.js";

/**
 * Creates a container with all comments for a specific post.
 *
 * This function fetches a single post using its ID from the URL parameters,
 * iterates over its comments, and appends each comment's structured HTML
 * (via `commentBlock`) to a container element.
 *
 * @async
 * @function
 * @returns {Promise<HTMLElement>} A `<div>` element containing all comments
 *  for the current post, with each comment rendered using `commentBlock`.
 *
 * @fires getPostParams Retrieves the post ID from URL parameters.
 * @fires getSinglePost Fetches a post object, including its comments.
 * @fires commentBlock Generates the HTML elements for each comment.
 */
const Comments = async () => {
  const postId = getPostParams("id");
  const post = await getSinglePost(postId);

  const commentsContainer = document.createElement("div");
  commentsContainer.id = "comments-container";
  commentsContainer.className = "commentsContainer flex flex-col gap-2";
  commentsContainer.setAttribute("data-post-id", postId);

  post.comments.forEach(async (comment) => {
    const { block, line } = await commentBlock(comment);
    commentsContainer.appendChild(line);
    commentsContainer.appendChild(block);
  });

  return commentsContainer;
};
export default Comments;
