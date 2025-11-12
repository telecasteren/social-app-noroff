import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { submitReaction } from "/js/utils/source/api/posts/actions/submitReaction.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { saveKey } from "/js/utils/storage/saveKey.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

/**
 * Attaches like/unlike functionality to a post for the current user.
 *
 * This function:
 * - Retrieves the current post based on the URL query parameter.
 * - Checks if a user is logged in and exits early if not.
 * - Updates the likes count and icon visually when the user clicks the like button.
 * - Sends the like/unlike action to the backend via `submitReaction`.
 * - Stores and updates the likes state in local storage.
 * - Displays temporary success or warning messages to the user.
 *
 * @async
 * @returns {Promise<void>} Resolves after event listeners have been attached.
 */
export const likePosts = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const post = await getSinglePost(postId);

  const currentLikes = document.getElementById("numb-likes");
  const likesIcon = document.getElementById("likes-icon");

  const currentUser = loadKey("profile");
  const currentUserId = currentUser?.name || "";
  if (!currentUserId) return;

  const icon = likesIcon.querySelector("i");
  likesIcon.addEventListener("click", async () => {
    const allLikes = loadKey("likes") || {};
    let usersWhoLiked = allLikes[postId] || [];
    const hasLiked = usersWhoLiked.includes(currentUserId);

    if (hasLiked) {
      usersWhoLiked = usersWhoLiked.filter((id) => id !== currentUserId);
      icon.classList.replace("fa-solid", "fa-regular");

      try {
        await submitReaction(postId, false);
        userMessage("success", "You have unliked the post.");
      } catch (error) {
        userMessage(
          "warning",
          "Something happened when unliking. Please try again."
        );
        throw error;
      }
      currentLikes.textContent = parseInt(currentLikes.textContent, 10) - 1;
    } else {
      usersWhoLiked.push(currentUserId);
      icon.classList.replace("fa-regular", "fa-solid");

      try {
        await submitReaction(postId, true);
      } catch (error) {
        userMessage(
          "warning",
          "Something happened when liking. Please try again."
        );
        throw error;
      }
      currentLikes.textContent = parseInt(currentLikes.textContent, 10) + 1;
    }

    if (userMessage) {
      setTimeout(() => {
        clearUserMessage();
      }, 2000);
    }

    allLikes[postId] = usersWhoLiked;
    saveKey("likes", allLikes);
  });
};
