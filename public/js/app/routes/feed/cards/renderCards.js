import { saveKey } from "/js/utils/storage/saveKey.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { NO_IMG_URL } from "/js/utils/general/constants.js";

/**
 * Renders a list of post cards inside a given container, the apps feed page.
 *
 * Each post card includes an image, author information, and a truncated title.
 * Metadata such as post ID, creation date, number of reactions, and number of comments
 * are stored as `data-*` attributes on the card element for later use.
 *
 * Images and avatars fall back to a default placeholder if missing or unavailable.
 * Newly rendered posts are also merged into local storage under the "posts" key.
 *
 * @async
 * @function renderCards
 * @param {Array<Object>} posts - An array of post objects to render.
 * @param {HTMLElement} container - The DOM element in which the post cards will be appended.
 *
 * @returns {Promise<void>} Resolves when all posts are rendered and saved.
 *
 * @throws {Error} Logs an error to the console if `container` is undefined.
 *
 * @sideeffects
 * - Mutates the DOM by appending new post card elements into `container`.
 * - Persists/updates the "posts" array in local storage.
 */
export const renderCards = async (posts, container) => {
  if (!container) {
    console.error("container is undefined");
    return;
  }

  posts.forEach((post) => {
    const postId = post.id;
    const created = post.created;
    const postTitle =
      post.title.length > 30 ? post.title.slice(0, 30) + "..." : post.title;
    const reactionsCount = post._count.reactions;
    const comments = post.comments || [];
    const commentsCount = post._count.comments;
    const postImgSrc = post.media?.url || NO_IMG_URL;
    const postImgAlt = post.media?.alt || "Default post image";
    const postAuthorName = post?.author?.name || "Unknown author";
    const postAuthorAvatar = post.author?.avatar.url || "";

    const card = document.createElement("div");
    card.className = `user-post max-w-sm w-80 bg-stone-50 border border-stone-200 rounded-md
    shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300`;
    card.setAttribute("data-id", postId);
    card.setAttribute("data-id", postId);
    card.dataset.created = created;
    card.dataset.likes =
      typeof reactionsCount === "number" ? reactionsCount : 0;
    card.dataset.comments = Array.isArray(comments) ? commentsCount : 0;

    const image = document.createElement("img");
    image.className = `rounded-t-md w-full h-48 object-cover cursor-pointer`;
    image.src = postImgSrc;
    image.alt = postImgAlt;
    image.loading = "lazy";
    image.onerror = () => {
      image.src = NO_IMG_URL;
      image.alt = "Image not available";
    };

    const contentDiv = document.createElement("div");
    contentDiv.className = "p-5";

    const authorWrapper = document.createElement("div");
    authorWrapper.className = "mb-2 flex items-center gap-2";

    const avatar = document.createElement("img");
    avatar.className = "w-6 h-6 rounded-full inline-block";
    avatar.src = postAuthorAvatar;
    avatar.alt = `${postAuthorName}'s avatar`;
    avatar.onerror = () => {
      avatar.src = NO_IMG_URL;
      avatar.alt = "Default avatar";
    };

    const linkTitle = document.createElement("a");
    linkTitle.href = `/user/profile/?id=${postAuthorName}`;
    const authorName = document.createElement("h2");
    authorName.className = `text-2xl font-bold tracking-tight text-accent-light
    dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200`;
    authorName.textContent = postAuthorName;
    linkTitle.appendChild(authorName);

    const title = document.createElement("h3");
    title.className =
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    title.textContent = postTitle;

    authorWrapper.appendChild(avatar);
    authorWrapper.appendChild(linkTitle);
    contentDiv.appendChild(authorWrapper);
    contentDiv.appendChild(title);
    card.appendChild(image);
    card.appendChild(contentDiv);

    container.appendChild(card);
  });

  const existingPosts = loadKey("posts") || [];
  const allPosts = [...existingPosts];

  posts.forEach((post) => {
    const postId = post?.id;
    if (!allPosts.some((p) => p.id === postId)) {
      allPosts.push(post);
    }
  });
  saveKey("posts", allPosts);
};
