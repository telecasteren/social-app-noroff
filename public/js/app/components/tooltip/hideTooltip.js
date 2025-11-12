import { tooltip } from "./tooltip.js";

/**
 * @function hideTooltip hides the tooltip again when user stops hovering the target element.
 */
export const hideTooltip = () => {
  tooltip.classList.add("opacity-0");
};
