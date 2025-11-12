import { updateUnderline } from "/js/app/components/navbar/utils/updateUnderline.js";

/**
 * Sets the initial underline position for a navigation menu based on the current URL.
 *
 * - Finds the first visible `<li>` element whose `<a>` matches the current pathname.
 * - Calls `updateUnderline` to animate the underline to that element.
 * - Skips if on `/user/post`.
 *
 * @function initialUnderline
 * @param {HTMLAnchorElement[]} links - An array of navigation link elements to check.
 */
export const initialUnderline = (links) => {
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  if (currentPath === "/user/post") return;

  const liElements = Array.from(
    document.querySelectorAll("ul.active li")
  ).filter((el) => el.offsetParent !== null);

  for (const li of liElements) {
    const a = li.querySelector("a");
    if (!a) continue;

    const linkPath = new URL(a.href, window.location.origin).pathname.replace(
      /\/+$/,
      ""
    );
    if (linkPath === currentPath) {
      updateUnderline(li);
      break;
    }
  }
};
