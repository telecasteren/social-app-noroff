/**
 * Creates and returns a skeleton loader for a user profile page.
 *
 * The loader includes:
 * - Pulsing bars representing profile content placeholders.
 * - A circular SVG placeholder for the profile avatar.
 * - ARIA attributes to indicate loading status for accessibility.
 *
 * @function createSkeletonProfile
 * @returns {HTMLDivElement} A skeleton loader element representing a user profile.
 *
 * @sideeffects
 * - Constructs DOM elements styled for a loading animation.
 * - Adds ARIA attributes for accessibility (`role="status"` and `aria-hidden` elements).
 */
export const createSkeletonProfile = () => {
  const loaderContainer = document.createElement("div");
  loaderContainer.setAttribute("role", "status");
  loaderContainer.className = "animate-pulse w-full p-5 mt-20 md:mt-40";

  const bar1 = document.createElement("div");
  bar1.className =
    "h-2.5 bg-gray-300 rounded-full dark:bg-bg-dark3 max-w-[640px] md:w-[840px] mb-2.5 mx-auto";

  const bar2 = document.createElement("div");
  bar2.className =
    "h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-bg-dark3 max-w-[540px] mb-2.5 md:w-[740px]";

  const flexContainer = document.createElement("div");
  flexContainer.className = "flex items-center justify-center mb-4";

  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.setAttribute(
    "class",
    "w-28 h-28 text-gray-200 dark:text-bg-dark3 me-4"
  );
  svgIcon.setAttribute("aria-hidden", "true");
  svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIcon.setAttribute("fill", "currentColor");
  svgIcon.setAttribute("viewBox", "0 0 20 20");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
  );
  svgIcon.appendChild(path);

  const bar4 = document.createElement("div");
  bar4.className = "w-24 md:w-48 h-2 bg-gray-200 rounded-full dark:bg-bg-dark3";

  const bar3 = document.createElement("div");
  bar3.className =
    "w-20 md:w-40 h-2.5 bg-gray-200 rounded-full dark:bg-bg-dark3 me-3";

  const srText = document.createElement("span");
  srText.className = "sr-only";
  srText.textContent = "Loading...";

  flexContainer.appendChild(svgIcon);
  flexContainer.appendChild(bar3);
  flexContainer.appendChild(bar4);

  loaderContainer.appendChild(flexContainer);
  loaderContainer.appendChild(bar2);
  loaderContainer.appendChild(bar1);

  loaderContainer.appendChild(srText);

  return loaderContainer;
};
