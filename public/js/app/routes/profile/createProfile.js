import Heading from "/js/app/routes/profile/sections/heading.js";
import Details from "/js/app/routes/profile/sections/details.js";
import Description from "/js/app/routes/profile/sections/description.js";
import Posts from "/js/app/routes/profile/sections/posts/posts.js";
import createPostMenu from "/js/app/routes/feed/newPosts/createPostMenu.js";
import { createSortOptions } from "/js/app/components/search/sortOptions.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { resetPagination } from "/js/utils/source/api/posts/get/loadMorePosts.js";
import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";
import { renderPosts } from "/js/app/routes/profile/sections/posts/renderPosts.js";
import { setScrollHandler } from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
import { goBackBtn } from "/js/app/components/buttons/goBackBtn.js";
import { addNavTracking } from "/js/utils/source/helpers/navigationTracking.js";

/**
 * Renders the full profile page for a user, including their heading, stats,
 * bio/description, posts, and interactive features.
 *
 * This function handles:
 * - Fetching the currently logged-in user and the profile user.
 * - Resetting pagination and setting up infinite scroll for posts.
 * - Rendering the profile heading (avatar and username), details (posts, followers, following),
 *   and description (bio and follow button).
 * - Displaying the user's posts with sorting options.
 * - Adding navigation and back button functionality.
 * - Conditionally showing the "create post" menu if the logged-in user is viewing their own profile.
 *
 * @async
 * @function
 * @returns {Promise<HTMLDivElement>} A container div element representing the complete user profile page.
 *
 * @example
 * const profilePage = await Profile();
 * document.body.appendChild(profilePage);
 */
const Profile = async () => {
  const loggedInUser = await getCurrentUser();
  const user = await getUserParams();
  if (!user) return;

  resetPagination();

  const profileContainer = document.createElement("div");
  profileContainer.className =
    "profile-container w-[100vw] min-h-screen p-8 gap-16";

  const userHeading = await Heading(user);
  const userDetails = await Details(user);
  const userDescription = await Description(user);
  const newPost = createPostMenu();
  const sortOptions = createSortOptions({
    triggerType: "p",
    triggerText: "Sort posts →",
  });
  const postsList = await Posts(POSTS_PER_PAGE, 1);

  const postsContainer = document.createElement("div");
  postsContainer.id = "posts-container";
  postsContainer.className = "w-[90%] mx-auto";
  postsContainer.appendChild(sortOptions);
  postsContainer.appendChild(postsList);

  const cameFrom = sessionStorage.getItem("previousPage");
  if (cameFrom) {
    const backBtn = goBackBtn();
    postsContainer.appendChild(backBtn);
  }

  profileContainer.appendChild(userHeading);
  profileContainer.appendChild(userDetails);
  profileContainer.appendChild(userDescription);
  profileContainer.appendChild(postsContainer);

  const scrollHandler = createScrollHandler(
    getUserPosts,
    postsList,
    renderPosts
  );
  setScrollHandler(scrollHandler);

  if (loggedInUser?.name === user?.name) {
    profileContainer.appendChild(newPost);
  }

  setTimeout(() => {
    addNavTracking();
  }, 100);

  return profileContainer;
};
export default Profile;
