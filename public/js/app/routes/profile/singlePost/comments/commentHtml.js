import { formatDate } from "/js/utils/general/formatDate.js";

/**
 * Creates an HTML element representing a single comment.
 *
 * This function generates a comment container including the author's avatar,
 * name (linked to their profile), the comment body, and a formatted timestamp.
 *
 * @function
 * @param {Object} comment - The comment object to render.
 * @param {number|string} comment.id - Unique identifier of the comment.
 * @param {string} comment.created - ISO string representing the creation date.
 * @param {string} comment.body - The text content of the comment.
 * @param {Object} comment.author - The author of the comment.
 * @param {string} comment.author.name - The display name of the author.
 * @param {Object} comment.author.avatar - Avatar information for the author.
 * @param {string} comment.author.avatar.url - URL of the author's avatar image.
 * @param {string} [comment.author.avatar.alt] - Alt text for the avatar image.
 * @returns {HTMLElement} A `<div>` element containing the formatted comment HTML.
 *
 * @fires formatDate Formats the comment's creation date for display.
 */
export const commentHtml = (comment) => {
  const commentId = comment.id;
  const createdAt = comment.created;
  const commentBody = comment.body;
  const authorName = comment.author.name || "Unknown Author";
  const avatarImg = comment.author.avatar.url;
  const avatarAlt = comment.author.avatar.alt || "User avatar";

  const container = document.createElement("div");
  container.id = "comment-container";
  container.setAttribute("data-comment-id", commentId);
  container.className = "flex flex-wrap items-center gap-x-2";

  const img = document.createElement("img");
  img.className =
    "w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark";
  img.src = avatarImg;
  img.alt = avatarAlt;

  const textContainer = document.createElement("div");
  textContainer.className =
    "flex flex-col ml-[42px] w-full max-w-[320px] leading-1.5";

  const header = document.createElement("div");
  header.className = "flex items-center space-x-2 rtl:space-x-reverse";

  const linkTitle = document.createElement("a");
  linkTitle.href = `/user/profile/?id=${authorName}`;

  const nameSpan = document.createElement("span");
  nameSpan.className =
    "text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-light hover:dark:text-accent-dark";
  nameSpan.textContent = authorName;
  linkTitle.appendChild(nameSpan);
  header.appendChild(linkTitle);

  const timeSpan = document.createElement("span");
  timeSpan.className = "text-tiny font-normal text-gray-500 dark:text-gray-400";
  timeSpan.textContent = `Delivered ${formatDate(createdAt)}`;

  const message = document.createElement("p");
  message.className = "text-sm font-normal py-2 text-gray-900 dark:text-white";
  message.textContent = commentBody;

  textContainer.appendChild(message);
  textContainer.appendChild(timeSpan);

  container.appendChild(img);
  container.appendChild(header);
  container.appendChild(textContainer);

  return container;
};
