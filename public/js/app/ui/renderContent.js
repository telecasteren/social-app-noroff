import Dashboard from "/js/app/routes/dashboard/createDashboard.js";
import Feed from "/js/app/routes/feed/createFeed.js";
import Profile from "/js/app/routes/profile/createProfile.js";
import SinglePost from "/js/app/routes/profile/singlePost/singlePost.js";
import { updateUnderline } from "/js/app/components/navbar/utils/updateUnderline.js";
import { displayAuthForms } from "/js/app/events/authForm/displayAuthForms.js";
import { createPostMenuEvents } from "/js/app/events/newPost/formMenu/menuHandlers.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import { likePosts } from "/js/app/events/userActions/likes.js";
import { createSkeletonCards } from "/js/app/components/loader/skeletonCards.js";
import { createSkeletonProfile } from "/js/app/components/loader/skeletonProfile.js";
import { spinner } from "/js/app/components/loader/spinner.js";
import { isAuthenticated } from "/js/utils/source/api/auth/isAuthenticated.js";

/**
 * Renders the page content based on the current URL path.
 * Handles authentication checks, skeletons/spinner, and post interactions.
 *
 * @async
 * @returns {Promise<void>}
 */
export const renderPage = async () => {
  const authContent = document.getElementById("auth-content");
  const profileContent = document.getElementById("profile-content");
  const postContent = document.getElementById("post-content");
  const feedContent = document.getElementById("feed-content");
  const path = window.location.pathname;

  if (authContent) {
    authContent.innerHTML = "";
    authContent.style.display = "none";
  }
  if (profileContent) {
    profileContent.innerHTML = "";
    profileContent.style.display = "none";
  }
  if (postContent) {
    postContent.innerHTML = "";
    postContent.style.display = "none";
  }
  if (feedContent) {
    feedContent.innerHTML = "";
    feedContent.style.display = "none";
  }

  switch (path) {
    case "/":
      if (authContent) {
        authContent.style.display = "block";
        authContent.appendChild(Dashboard());
        displayAuthForms();
      }
      break;

    case "/user/feed/":
    case "/user/profile/":
    case "/user/post/":
      const authenticated = await isAuthenticated();
      if (!authenticated && path.startsWith("/user/")) {
        window.location.href = "/";
        return;
      }

      if (path === "/user/feed/" && feedContent) {
        feedContent.style.display = "block";
        const skeletons = createSkeletonCards();
        feedContent.appendChild(skeletons);

        setTimeout(async () => {
          const feedPage = await Feed();
          feedContent.prepend(feedPage);
          skeletons.remove();
          createPostMenuEvents();
          openPost();

          const scrollY = sessionStorage.getItem("restoreScroll");
          if (scrollY !== null) {
            requestAnimationFrame(() => {
              window.scrollTo(0, parseInt(scrollY, 10));
              sessionStorage.removeItem("restoreScroll");
            });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 500);
      }

      if (path === "/user/profile/" && profileContent) {
        profileContent.style.display = "block";
        const profileSkeleton = createSkeletonProfile();
        profileContent.appendChild(profileSkeleton);

        setTimeout(async () => {
          const profileElement = await Profile();
          profileContent.appendChild(profileElement);
          profileSkeleton.remove();
          createPostMenuEvents();
          openPost();
        }, 500);
      }

      if (path === "/user/post/" && postContent) {
        postContent.style.display = "block";
        const spinnerElement = spinner();
        spinnerElement.classList.add("mt-48");
        postContent.appendChild(spinnerElement);

        setTimeout(async () => {
          const post = await SinglePost();
          postContent.appendChild(post);
          spinnerElement.remove();
          likePosts();
        }, 500);
      }
      break;

    default:
      document.body.innerHTML = `<h1 class="flex justify-center items-center text-center text-white bg-black">404 - Page Not Found</h1>`;
      break;
  }

  const currentPath = window.location.pathname;
  const navId = `nav-${
    currentPath === "/"
      ? "dashboard"
      : currentPath.split("/").filter(Boolean).pop()
  }`;
  const currentNavEl = document.getElementById(navId);
  if (currentNavEl) updateUnderline(currentNavEl);
};

/**
 * Sets up the page rendering and popstate event listener.
 *
 * Initialized in `script.js`.
 *
 * @returns {void}
 */
const renderContent = () => {
  window.addEventListener("popstate", renderPage);
  renderPage();
};

export default renderContent;
