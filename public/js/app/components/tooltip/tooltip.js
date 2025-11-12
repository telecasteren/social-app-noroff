import { hideTooltip } from "./hideTooltip.js";

export const tooltip = document.createElement("div");
tooltip.className = `absolute w-fit max-w-xs
  bg-gray-100 text-gray-800 p-2 rounded-md shadow-md text-sm
  opacity-0 transition-opacity duration-200 z-10 pointer-events-none`;

/** @type {HTMLElement}
 * @function showTooltip displays a tooltip with the specified content upon hovering an element,
 * it checks if the content is an array or just a single value and handles styling thereafter.
 */
export const showTooltip = (targetEl, label, content) => {
  tooltip.classList.remove("opacity-0");

  let actualContent = "";
  let isMultipleElements = false;

  if (Array.isArray(content)) {
    if (content.length > 1) {
      actualContent = content.join(", ");
      isMultipleElements = true;
    } else if (content.length === 1) {
      actualContent = content[0];
    }
  } else {
    actualContent = content || "None";
  }

  if (!actualContent) {
    hideTooltip();
    return;
  }

  if (actualContent) {
    actualContent = DOMPurify.sanitize(actualContent);
  }

  tooltip.innerHTML = content.length
    ? `<span class="font-medium">${label ? label + ": " : ""}</span>${
        isMultipleElements ? "<br />" : ""
      }${actualContent}`
    : [];

  targetEl.appendChild(tooltip);
};
