import { NO_IMG_URL } from "/js/utils/general/constants.js";

/**
 * Creates a single post card DOM element representing a user post.
 *
 * This function:
 * - Accepts a `post` object containing post metadata (image, title, caption, and username).
 * - Generates a card element with a post image, author name, title, and caption.
 * - Uses fallback values if certain post properties are missing (e.g., default image, title, or username).
 * - Applies styling classes for layout, hover effects, and dark mode support.
 *
 * @function
 * @param {Object} post - The post data object.
 * @param {string} [post.imgSrc] - The URL of the post image.
 * @param {string} [post.imgAlt] - The alt text for the post image.
 * @param {string} [post.username] - The name of the post's author.
 * @param {string} [post.title] - The post's title.
 * @param {string} [post.caption] - The post's caption or body text.
 * @param {number|string} post.id - The unique identifier for the post.
 * @returns {HTMLElement} The DOM element representing the post card.
 */
export const createSingleCard = (post) => {
  const postImgSrc = post.imgSrc || NO_IMG_URL;
  const postImgAlt = post.imgAlt || "Default post image";
  const userName = post.username || "Unknown User";
  const postTitle = post.title || "Untitled Post";

  const card = document.createElement("div");
  card.setAttribute("data-id", post.id);
  card.className = `user-post max-w-sm w-80 bg-white border border-gray-200 rounded-md
    shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300`;

  const image = document.createElement("img");
  image.className = "rounded-t-md w-full h-48 object-cover";
  image.src = postImgSrc;
  image.alt = postImgAlt;

  const contentDiv = document.createElement("div");
  contentDiv.className = "p-5";

  const linkTitle = document.createElement("a");
  linkTitle.href = "/user/profile/";
  const authorName = document.createElement("h2");
  authorName.className =
    "mb-2 text-2xl font-bold tracking-tight text-accent-light dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200";
  authorName.textContent = userName;
  linkTitle.appendChild(authorName);

  const title = document.createElement("h3");
  title.className =
    "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  title.textContent = postTitle;

  const paragraph = document.createElement("p");
  paragraph.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  paragraph.textContent = post.caption;

  contentDiv.appendChild(linkTitle);
  contentDiv.appendChild(title);
  contentDiv.appendChild(paragraph);

  card.appendChild(image);
  card.appendChild(contentDiv);

  return card;
};
