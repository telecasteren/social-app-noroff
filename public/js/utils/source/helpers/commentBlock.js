import { commentHtml } from "/js/app/routes/profile/singlePost/comments/commentHtml.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { deleteComment } from "/js/utils/source/api/posts/comments/deleteComment.js";

/**
 * Generates a DOM block for a single comment with optional delete functionality.
 *
 * Creates a container for the comment and a horizontal line separator. If the
 * currently logged-in user is the author of the comment, a "Delete" button is
 * added with functionality to remove the comment from the DOM and delete it
 * from the backend.
 *
 * @async
 * @param {Object} comment - The comment object.
 * @param {number} comment.id - Unique identifier for the comment.
 * @param {Object} comment.author - The author of the comment.
 * @param {string} comment.author.name - The name of the comment author.
 * @returns {Promise<{ block: HTMLElement, line: HTMLElement }>}
 *   Returns an object containing:
 *   - `block`: The main comment container element.
 *   - `line`: A horizontal line element to visually separate comments.
 *
 * @example
 * const { block, line } = await commentBlock(commentData);
 * commentsContainer.appendChild(line);
 * commentsContainer.appendChild(block);
 */
export const commentBlock = async (comment) => {
  const commentId = comment.id;
  const commentAuthorName = comment.author.name;
  const currentUser = await getCurrentUser();
  const currentUserName = currentUser.name;

  const lineEl = document.createElement("hr");
  lineEl.className = "border-solid border-gray-200 dark:border-[#0f0c29] my-2";

  const singleCommentContainer = document.createElement("div");
  singleCommentContainer.className = "flex flex-col";

  const commentEl = commentHtml(comment);
  singleCommentContainer.appendChild(commentEl);

  if (currentUserName === commentAuthorName) {
    const deleteCommentBtn = document.createElement("button");
    deleteCommentBtn.className =
      "bg-red-500 text-white text-xs px-2 py-1 m-0 rounded-md self-end";
    deleteCommentBtn.textContent = "Delete";

    deleteCommentBtn.addEventListener("click", async () => {
      try {
        await deleteComment(commentId);
        singleCommentContainer.remove();
        lineEl.remove();
      } catch (error) {
        throw new Error("Error deleting comment");
      }
    });

    singleCommentContainer.appendChild(deleteCommentBtn);
  }

  return { block: singleCommentContainer, line: lineEl };
};
