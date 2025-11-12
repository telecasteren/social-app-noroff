import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { createEditIcon } from "/js/app/components/buttons/editIconBtn.js";
import { editPostMenuEvents } from "/js/app/events/profile/editPost/menuHandlers.js";
import { NO_IMG_URL } from "/js/utils/general/constants.js";

/**
 * Renders a list of posts into a specified container element.
 *
 * Each post is displayed with its image, like count, comment count, and optionally
 * an edit button if the current logged-in user matches the profile being viewed.
 * Handles missing images gracefully by replacing them with a default placeholder.
 *
 * @async
 * @function
 * @param {Array<Object>} posts - Array of post objects to render. Each post should have:
 *   - id: Unique identifier of the post.
 *   - created: Timestamp of post creation.
 *   - title: Title of the post.
 *   - body: Body/content of the post.
 *   - _count: Object containing counts for reactions and comments.
 *   - media: Object containing optional `url` and `alt` for the post image.
 * @param {HTMLElement} container - The container element where posts will be appended.
 * @returns {Promise<void>} Resolves once all posts are rendered into the container.
 *
 * @throws Will log an error if the container is undefined.
 *
 * @fires createEditIcon Creates an edit icon for posts if the logged-in user is the profile owner.
 * @fires editPostMenuEvents Opens the post edit menu for editable posts.
 */
export const renderPosts = async (posts, container) => {
  if (!container) {
    console.error("container is undefined");
    return;
  }

  const loggedInUser = await getCurrentUser();
  const activeUsername = loggedInUser.name;
  const profileVisited = await getUserParams();
  const profileUsername = profileVisited.name;

  posts.forEach(async (post) => {
    const postId = post.id;
    const created = post.created;
    const title = post.title || "No title";
    const reactionsCount = post._count.reactions;
    const commentsCount = post._count.comments;
    const postImgSrc = post.media?.url || NO_IMG_URL;
    const postImgAlt = post.media?.alt || "Default post image";
    const postBody = post.body || "";

    const postContainer = document.createElement("div");
    postContainer.className =
      "user-post relative w-full h-48 flex justify-center items-center cursor-pointer";
    postContainer.setAttribute("data-id", postId);
    postContainer.dataset.created = created;
    postContainer.dataset.title = title;
    postContainer.dataset.likes =
      typeof reactionsCount === "number" ? reactionsCount : 0;
    postContainer.dataset.comments =
      typeof commentsCount === "number" ? commentsCount : 0;

    const postImage = document.createElement("img");
    postImage.src = postImgSrc;
    postImage.alt = postImgAlt;
    postImage.className = `w-full h-full object-cover rounded-sm border border-gray-300 dark:border-0
      hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300`;
    postImage.onerror = () => {
      postImage.src = NO_IMG_URL;
      postImage.alt = "Image not available";
    };

    const statsWrapper = document.createElement("div");
    statsWrapper.className =
      "absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1";

    const likes = document.createElement("div");
    likes.innerText = `♥️ ${reactionsCount || 0} Likes`;

    const comments = document.createElement("div");
    comments.innerText = `💬 ${commentsCount || 0} Comments`;

    statsWrapper.appendChild(likes);
    statsWrapper.appendChild(comments);
    postContainer.appendChild(postImage);

    if (activeUsername === profileUsername) {
      const editPostIcon = createEditIcon({
        label: "Edit",
        classes: `
    edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10
    bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
    rounded shadow-md cursor-pointer flex items-center justify-start
    overflow-hidden transition-all duration-300 group
    `,
      });
      postContainer.appendChild(editPostIcon);

      editPostIcon.addEventListener("click", async () => {
        const postData = {
          id: postId,
          media: {
            url: postImgSrc || "",
          },
          title: title,
          body: postBody,
        };
        await editPostMenuEvents(postData);
      });
    }

    postContainer.appendChild(statsWrapper);
    container.appendChild(postContainer);
  });
};
