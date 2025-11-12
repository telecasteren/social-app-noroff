import { getSingleUserProfile } from "/js/utils/source/api/users/getSingleUser.js";

/**
 * Synchronizes the follow button and follower count for a given user.
 *
 * This function fetches the latest profile data of the target user,
 * determines if the current user is following them, updates the follow
 * button text accordingly, and updates the displayed number of followers.
 *
 * @async
 * @param {Object} user - The target user object to check.
 * @param {string} user.name - The username of the target user.
 * @param {Object} currentUser - The current logged-in user object.
 * @param {string} currentUser.name - The username of the current user.
 * @param {HTMLButtonElement} [followBtn] - Optional follow button element to update text content.
 * @returns {Promise<boolean>} Returns `true` if the current user is following the target user, otherwise `false`.
 */
export const syncFollowState = async (user, currentUser, followBtn) => {
  const username = user.name;
  const currentUsername = currentUser.name;
  const updatedUser = await getSingleUserProfile(username);
  const updatedUsersFollowers = updatedUser.followers;
  const amountOfFollowers = updatedUsersFollowers.length;

  const isFollowing = updatedUsersFollowers.some(
    (f) => f.name === currentUsername
  );

  if (followBtn) {
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
  }

  const numberOfFollowers = document.querySelector('[data-label="followers"]');
  if (numberOfFollowers) {
    numberOfFollowers.textContent = amountOfFollowers;
  }

  return isFollowing;
};
