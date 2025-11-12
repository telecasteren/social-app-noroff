import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { submitCommentHandler } from "/js/app/events/userActions/commenting/submitCommentHandler.js";
import { toggleCommentBtn } from "/js/app/events/userActions/commenting/toggleCommentBtn.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

/**
 * Creates and returns a comment form element for the current user.
 *
 * The form includes:
 * - The current user's avatar and display name.
 * - A textarea for writing a comment.
 * - A submit button that triggers `submitCommentHandler`, displays status messages,
 *   hides the form, and re-enables the toggle button.
 * - A cancel button that hides the form and restores the toggle button.
 *
 * @async
 * @function commentForm
 * @returns {Promise<HTMLDivElement>} A form container element for submitting a comment.
 *
 * @requires getCurrentUser
 * @requires submitCommentHandler
 * @requires userMessage
 * @requires clearUserMessage
 *
 * @sideeffects
 * - Attaches event listeners for submitting and canceling comments.
 * - Displays and hides UI messages using `userMessage` and `clearUserMessage`.
 * - Toggles visibility of the comment form and toggle button.
 */
export const commentForm = async () => {
  const currentUser = await getCurrentUser();
  const currentUserName = currentUser.name || "Unknown user";
  const avatarSrc = currentUser.avatar.url || {};
  const avatarAlt = currentUser.avatar.alt || "No profile image found.";

  const commentForm = document.createElement("div");
  commentForm.id = "comment-form";
  commentForm.className = "hidden";

  const header = document.createElement("div");
  header.className = "flex items-center space-x-2 rtl:space-x-reverse";

  const img = document.createElement("img");
  img.className =
    "w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark";
  img.src = avatarSrc;
  img.alt = avatarAlt;

  const commentContainer = document.createElement("div");
  commentContainer.id = "comment-form-container";
  commentContainer.className = "commentForm w-full flex flex-col gap-4";

  const authorName = document.createElement("span");
  authorName.setAttribute("required", "");
  authorName.id = "author-name";
  authorName.className = "text-sm font-semibold text-gray-900 dark:text-white";
  authorName.textContent = currentUserName;

  const commentTextarea = document.createElement("textarea");
  commentTextarea.rows = 3;
  commentTextarea.id = "comment-message";
  commentTextarea.className = `w-full p-2 border border-accent-light dark:border-accent-dark
  rounded-md dark:bg-[#302b63] text-black dark:text-white hover:scale-[1.01] transition duration-300`;

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "flex justify-start mb-6";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.type = "submit";
  submitCommentBtn.id = "submit-comment";
  submitCommentBtn.className =
    "mt-2 px-4 py-2 w-fit text-black bg-accent-light dark:bg-accent-dark rounded-md hover:brightness-110 cursor-pointer";
  submitCommentBtn.textContent = "Submit";

  submitCommentBtn.addEventListener("click", (event) => {
    userMessage("info", "Sending comment...");

    event.preventDefault();
    submitCommentHandler();

    setTimeout(() => clearUserMessage(), 500);
    commentForm.classList.toggle("hidden");
    toggleCommentBtn();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "ml-4 mt-2 text-sm text-gray-400 hover:text-red-800";
  cancelBtn.textContent = "Cancel";

  cancelBtn.addEventListener("click", () => {
    toggleCommentBtn();
    commentForm.classList.add("hidden");
  });

  header.appendChild(img);
  header.appendChild(authorName);
  commentContainer.appendChild(header);
  commentContainer.appendChild(commentTextarea);
  buttonDiv.appendChild(submitCommentBtn);
  buttonDiv.appendChild(cancelBtn);
  commentContainer.appendChild(buttonDiv);

  commentForm.appendChild(commentContainer);

  return commentForm;
};
