import { submitComment } from "/js/utils/source/api/posts/comments/submitComment.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";

/**
 * Handles submitting a comment for the current post.
 *
 * This function retrieves the post ID from the URL, collects the author name
 * and comment body from the DOM, constructs a comment object, and submits it
 * using the `submitComment` API function. On success, it displays a success
 * message and reloads the page to reflect the new comment. On failure, it
 * displays an error message and throws an error.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The response data from the comment submission API.
 * @throws {Error} Throws an error if submitting the comment fails.
 */
export const submitCommentHandler = async () => {
  const { id: postId } = getPostParams();
  const post = Number(postId);

  const authorName = document.getElementById("author-name");
  const commentTextarea = document.getElementById("comment-message");

  const commentData = {
    postId: post,
    replyToId: null,
    owner: authorName?.value ?? authorName?.textContent ?? "",
    body: commentTextarea.value,
    created: new Date().toISOString(),
  };

  try {
    const response = await submitComment(commentData);
    userMessage("success", "Comment submitted.");

    window.location.reload();
    return response.data;
  } catch (error) {
    userMessage("error", "Failed to create comment.");
    throw new Error("Submitting comment failed");
  }
};
