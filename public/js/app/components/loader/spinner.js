/**
 * Creates and appends a spinning loader (spinner) to the document body.
 *
 * The spinner includes:
 * - An SVG animated with `animate-spin` to indicate loading.
 * - ARIA attributes (`role="status"` and `sr-only` text) for accessibility.
 *
 * @function spinner
 * @returns {HTMLDivElement} The container element holding the spinner.
 *
 * @sideeffects
 * - Appends the spinner element directly to `document.body`.
 * - Constructs DOM elements with CSS classes for animation and styling.
 *
 * @example
 * const loader = spinner();
 * // Later, you can remove it with loader.remove();
 */
export const spinner = () => {
  const container = document.createElement("div");
  container.className = "text-center";

  const statusDiv = document.createElement("div");
  statusDiv.setAttribute("role", "status");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", "0 0 100 101");
  svg.setAttribute("style", `fill: var(--accent);`);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.classList.add(
    "inline",
    "w-16",
    "h-16",
    "text-gray-200",
    "animate-spin",
    "dark:text-gray-600"
  );

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("fill", "currentColor");
  path1.setAttribute(
    "d",
    "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  );

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("fill", "currentFill");
  path2.setAttribute(
    "d",
    "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  );

  svg.appendChild(path1);
  svg.appendChild(path2);

  const srText = document.createElement("span");
  srText.className = "sr-only";
  srText.textContent = "Loading...";

  statusDiv.appendChild(svg);
  statusDiv.appendChild(srText);
  container.appendChild(statusDiv);

  document.body.appendChild(container);

  return container;
};
