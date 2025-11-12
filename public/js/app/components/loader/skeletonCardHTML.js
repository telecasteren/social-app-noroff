/**
 * Creates a single skeleton card element to display a placeholder for a post or content item.
 *
 * The card includes:
 * - A placeholder for the image with a simple SVG illustration.
 * - Multiple text line placeholders representing title, description, or content.
 * - A placeholder for avatar and username.
 * - ARIA attributes to indicate loading status.
 *
 * The card uses CSS classes for the pulse animation and dark mode support.
 *
 * @function createSkeletonCard
 * @returns {HTMLDivElement} A skeleton card element for loading states.
 *
 * @sideeffects
 * - Constructs DOM elements with placeholder content and ARIA attributes.
 */
export const createSkeletonCard = () => {
  const loaderContainer = document.createElement("div");
  loaderContainer.setAttribute("role", "status");
  loaderContainer.className = `justify-self-center w-full max-w-sm p-4 border border-gray-200 rounded-md
  shadow-sm animate-pulse md:p-6 dark:border-gray-700`;

  const imagePlaceholder = document.createElement("div");
  imagePlaceholder.className =
    "flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-md dark:bg-bg-dark3";

  const svgIcon1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgIcon1.setAttribute("class", "w-10 h-10 text-gray-200 dark:text-bg-dark2");
  svgIcon1.setAttribute("aria-hidden", "true");
  svgIcon1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIcon1.setAttribute("fill", "currentColor");
  svgIcon1.setAttribute("viewBox", "0 0 16 20");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
  );

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
  );

  svgIcon1.appendChild(path1);
  svgIcon1.appendChild(path2);
  imagePlaceholder.appendChild(svgIcon1);

  const textPlaceholder1 = document.createElement("div");
  textPlaceholder1.className =
    "h-2.5 bg-gray-200 rounded-full dark:bg-bg-dark3 w-48 mb-4";

  const textPlaceholder2 = document.createElement("div");
  textPlaceholder2.className =
    "h-2 bg-gray-200 rounded-full dark:bg-bg-dark3 mb-2.5";

  const textPlaceholder3 = document.createElement("div");
  textPlaceholder3.className =
    "h-2 bg-gray-200 rounded-full dark:bg-bg-dark3 mb-2.5";

  const textPlaceholder4 = document.createElement("div");
  textPlaceholder4.className = "h-2 bg-gray-200 rounded-full dark:bg-bg-dark3";

  const flexContainer = document.createElement("div");
  flexContainer.className = "flex items-center mt-4 mb-4";

  const svgIcon2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgIcon2.setAttribute(
    "class",
    "w-10 h-10 me-3 text-gray-200 dark:text-bg-dark3"
  );
  svgIcon2.setAttribute("aria-hidden", "true");
  svgIcon2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIcon2.setAttribute("fill", "currentColor");
  svgIcon2.setAttribute("viewBox", "0 0 20 20");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
  );

  svgIcon2.appendChild(path3);

  const textContainer = document.createElement("div");

  const textPlaceholder5 = document.createElement("div");
  textPlaceholder5.className =
    "h-2.5 bg-gray-200 rounded-full dark:bg-bg-dark3 w-32 mb-2";

  textContainer.appendChild(textPlaceholder5);

  flexContainer.appendChild(svgIcon2);
  flexContainer.appendChild(textContainer);

  const srText = document.createElement("span");
  srText.className = "sr-only";
  srText.textContent = "Loading...";

  loaderContainer.appendChild(imagePlaceholder);
  loaderContainer.appendChild(flexContainer);
  loaderContainer.appendChild(textPlaceholder1);
  loaderContainer.appendChild(textPlaceholder2);
  loaderContainer.appendChild(textPlaceholder3);
  loaderContainer.appendChild(textPlaceholder4);

  loaderContainer.appendChild(srText);

  return loaderContainer;
};
