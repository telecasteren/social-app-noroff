import { showTooltip } from "/js/app/components/tooltip/tooltip.js";
import { hideTooltip } from "/js/app/components/tooltip/hideTooltip.js";

/**
 * Creates a user details section displaying username, number of posts, followers, and following.
 *
 * Each statistic is presented in a circular badge, and tooltips are shown when hovering
 * over the followers and following counts to list the respective users.
 *
 * @async
 * @function
 * @param {Object} user - The user whose details are being displayed.
 * @param {string} user.name - The username of the profile owner.
 * @param {Object} user._count - Object containing counts of posts, followers, and following.
 * @param {number} user._count.posts - The number of posts by the user.
 * @param {number} user._count.followers - The number of followers the user has.
 * @param {number} user._count.following - The number of users this user is following.
 * @param {Array<Object>} user.followers - Array of follower objects (each containing a `name`).
 * @param {Array<Object>} user.following - Array of following objects (each containing a `name`).
 * @returns {Promise<HTMLElement>} A container `<div>` element containing the username,
 *                                 circular stats, and tooltip functionality for followers/following.
 *
 * @fires showTooltip Displays a tooltip listing followers or following on hover.
 * @fires hideTooltip Hides the tooltip when the mouse leaves a circle.
 */
const Details = async (user) => {
  const numberOfPosts = user._count.posts;
  const numberOfFollowers = user._count.followers;
  const numberOfFollowing = user._count.following;
  const usernameText = user.name || "Unknown user";
  const usersFollowers = user.followers || [];
  const usersFollowing = user.following || [];

  const userDetails = document.createElement("div");
  userDetails.className = "flex flex-wrap justify-center mr-0 gap-2 md:ml-24";

  const username = document.createElement("p");
  username.textContent = usernameText;
  username.className = "text-sm m-4";

  const statsWrapper = document.createElement("div");
  statsWrapper.className = "flex flex-wrap gap-2";

  const createWrapper = (number, label) => {
    const container = document.createElement("div");
    container.className = "flex flex-col items-center";

    const wrapper = document.createElement("div");
    wrapper.className = `relative inline-flex items-center justify-center
      w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light
      dark:bg-gray-600 dark:ring-accent-dark`;

    const text = document.createElement("div");
    text.className = "font-medium text-tiny text-gray-600 dark:text-gray-300";
    text.innerText = number;
    text.setAttribute("data-label", label);

    const labelText = document.createElement("div");
    labelText.className = "text-xs text-gray-900 dark:text-gray-400 mt-1";
    labelText.innerText = label;

    wrapper.appendChild(text);
    container.appendChild(wrapper);
    container.appendChild(labelText);
    return container;
  };

  const postsCircle = createWrapper(numberOfPosts, "posts");
  const followersCircle = createWrapper(numberOfFollowers, "followers");
  const followingCircle = createWrapper(numberOfFollowing, "following");

  statsWrapper.appendChild(postsCircle);
  statsWrapper.appendChild(followersCircle);
  statsWrapper.appendChild(followingCircle);

  userDetails.appendChild(username);
  userDetails.appendChild(statsWrapper);

  const followers = usersFollowers.map((f) => f.name);
  const following = usersFollowing.map((f) => f.name);

  followersCircle.addEventListener("mouseover", () => {
    showTooltip(followersCircle, "Followers", followers);
  });
  followersCircle.addEventListener("mouseout", hideTooltip);

  followingCircle.addEventListener("mouseover", () => {
    showTooltip(followingCircle, "Following", following);
  });
  followingCircle.addEventListener("mouseout", hideTooltip);

  return userDetails;
};
export default Details;
