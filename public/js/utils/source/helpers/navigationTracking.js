/**
 * @function trackNavigation tracks navigation by storing the current path and scroll position
 * in sessionStorage before navigating to a new page.
 */
export const trackNavigation = () => {
  const currentPath = window.location.pathname + window.location.search;
  const scrollY = window.scrollY || 0;

  const navigationData = {
    cameFrom: currentPath,
    scrollY,
  };

  sessionStorage.setItem("previousPage", JSON.stringify(navigationData));
};

/**
 * @function addNavTracking adds the navigation tracking to all profile and internal links.
 * Skips other links if already handled by profileLinks.
 */
export const addNavTracking = () => {
  const profileLinks = document.querySelectorAll('a[href*="/user/profile/"]');
  profileLinks.forEach((link) => {
    if (!link.dataset.navTracked) {
      link.addEventListener("click", trackNavigation);
      link.dataset.navTracked = "true";
    }
  });

  const internalLinks = document.querySelectorAll('a[href^="/user/"]');
  internalLinks.forEach((link) => {
    if (link.href.includes("/user/profile/")) return;

    if (!link.dataset.navTracked) {
      link.addEventListener("click", trackNavigation);
      link.dataset.navTracked = "true";
    }
  });
};
