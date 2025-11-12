import { initialUnderline } from "/js/app/components/navbar/utils/initialUnderline.js";
import { MobileNav } from "/js/app/components/navbar/MobileNav.js";
import { DesktopNav } from "/js/app/components/navbar/DesktopNav.js";

/**
 * Initializes and renders the website's navigation bars (desktop and mobile) based on the user's authentication status.
 *
 * - Dynamically creates desktop and mobile navigation bars using `DesktopNav` and `MobileNav`.
 * - Prepends both navigation elements to the document body.
 * - Sets up link underlines for the current page and updates them on window resize.
 * - Toggles visibility of desktop vs mobile nav depending on screen width.
 * - Changes nav background on scroll for visual feedback, reverting to transparent at the top.
 *
 * @async
 * @function Navbar
 * @param {boolean} auth - Indicates whether the user is authenticated.
 * @returns {Promise<void>} Resolves when navigation bars are created and event listeners are attached.
 */
const Navbar = async (auth) => {
  const links = [
    { href: "/", text: "Welcome", authOnly: false, guestOnly: true },
    { href: "/user/feed/", text: "Feed", authOnly: true },
    { href: "/user/profile/", text: "Profile", authOnly: true },
    { text: "Settings", authOnly: true, isDropdown: true },
  ];

  const desktopNav = DesktopNav(auth, links);
  const mobileNav = MobileNav(auth, links);

  document.body.prepend(mobileNav);
  document.body.prepend(desktopNav);

  initialUnderline(links);
  window.addEventListener("resize", () => initialUnderline(links));

  const handleScreenChange = () => {
    if (window.innerWidth > 767) {
      desktopNav.classList.remove("hidden");
      mobileNav.classList.add("hidden");
    } else {
      desktopNav.classList.add("hidden");
      mobileNav.classList.remove("hidden");
    }
  };
  window.addEventListener("resize", handleScreenChange);
  handleScreenChange();

  let scrollStarted = false;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (!scrollStarted) {
      scrollStarted = true;
      mobileNav.classList.remove("bg-transparent");
      mobileNav.classList.add("bg-stone-50", "dark:bg-bg-dark3");

      desktopNav.classList.remove("bg-transparent");
      desktopNav.classList.add("bg-stone-50", "dark:bg-bg-dark3");
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollStarted = false;
      if (scrollPosition === 0) {
        mobileNav.classList.remove("bg-stone-50", "dark:bg-bg-dark3");
        mobileNav.classList.add("bg-transparent");

        desktopNav.classList.remove("bg-stone-50", "dark:bg-bg-dark3");
        desktopNav.classList.add("bg-transparent");
      }
    }, 100);
  });
};
export default Navbar;
