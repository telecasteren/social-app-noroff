import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { submitFollow } from "/js/utils/source/api/users/actions/submitFollow.js";
import { submitUnfollow } from "/js/utils/source/api/users/actions/submitUnfollow.js";
import { syncFollowState } from "/js/app/events/userActions/following/syncFollowState.js";
import { createFollowButton } from "/js/app/events/userActions/following/createFollowBtn.js";

/**
 * Creates and manages a follow/unfollow button for a given user.
 *
 * This function generates a follow button, synchronizes its initial state
 * based on whether the current user is already following the target user,
 * and attaches click event handlers to toggle the following state.
 *
 * Behavior:
 * - If the user is not being followed, clicking the button will submit a follow request.
 * - If the user is already being followed, clicking the button will submit an unfollow request.
 * - Displays appropriate success, info, or warning messages.
 * - Disables the button during the async operation to prevent multiple clicks.
 *
 * @async
 * @param {Object} user - The user object representing the target user to follow/unfollow.
 * @param {string} user.name - The username of the target user.
 * @returns {Promise<HTMLButtonElement>} The follow/unfollow button element with its event listeners attached.
 * @throws {Error} Throws an error if the follow/unfollow operation fails.
 */
export const toggleFollowing = async (user) => {
  const followBtn = createFollowButton();
  const currentUser = loadKey("profile");
  const visitedUserName = user.name;

  let isFollowing = await syncFollowState(user, currentUser, followBtn);

  followBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    followBtn.disabled = true;

    try {
      if (!isFollowing) {
        await submitFollow(user);
        userMessage("success", `Started following: ${visitedUserName}`);
      } else {
        await submitUnfollow(user);
        userMessage("info", `Stopped following: ${visitedUserName}`);
      }

      isFollowing = await syncFollowState(user, currentUser, followBtn);
    } catch (error) {
      userMessage("warning", "There was an error updating the follow state.");
      isFollowing = await syncFollowState(user, currentUser, followBtn);

      throw error;
    } finally {
      followBtn.disabled = false;
      setTimeout(clearUserMessage, 10000);
    }
  });

  return followBtn;
};
