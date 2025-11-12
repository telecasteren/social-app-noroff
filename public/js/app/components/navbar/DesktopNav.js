import { createNavLink } from "/js/app/components/navbar/utils/createNavLink.js";
import { showLink } from "/js/app/components/navbar/utils/showLink.js";
import { SITE_NAME, SITE_LOGO_NAME } from "/js/utils/general/constants.js";

/**
 * Creates a desktop navigation bar element.
 *
 * - Includes the site logo on the right, which navigates to the feed page on click.
 * - Dynamically generates navigation links based on the provided `links` array and authentication status.
 * - Only shows links that pass the `showLink` visibility check.
 * - Applies styling and classes for desktop layout, including dark mode support.
 *
 * @function DesktopNav
 * @param {boolean} auth - Indicates whether the user is authenticated.
 * @param {Array<Object>} links - Array of link objects with properties like `text`, `href`, `authOnly`, `guestOnly`.
 * @returns {HTMLElement} The constructed `<nav>` element for the desktop navigation.
 */
export const DesktopNav = (auth, links) => {
  const nav = document.createElement("nav");
  nav.id = "desktop-nav";
  nav.className = `fixed md:flex items-center justify-between flex-wrap
  p-[2.5rem] z-40 w-full bg-transparent transition-background-color duration-300`;

  const logo = document.createElement("div");
  logo.className = "";

  const logoImg = document.createElement("img");
  logoImg.className = "w-32 flex justify-end dark:invert";
  logoImg.src = SITE_LOGO_NAME;
  logoImg.alt = `Logo: ${SITE_NAME} | A slice of life`;
  logo.appendChild(logoImg);

  logoImg.addEventListener("click", () => {
    window.location.assign("/user/feed/");
  });

  const ul = document.createElement("ul");
  ul.className = "active flex space-x-8 dark:text-dark";

  links.forEach((link) => {
    if (!showLink(link, auth)) return;

    const li = document.createElement("li");
    li.id = `nav-${link.text.toLowerCase().replace(/\s+/g, "-")}`;
    li.appendChild(createNavLink(link));
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  nav.appendChild(logo);

  return nav;
};
