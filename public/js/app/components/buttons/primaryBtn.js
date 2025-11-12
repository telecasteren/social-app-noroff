/**
 * Creates and returns a styled anchor element that functions as a button.
 *
 * Supports opening links in the same tab or a new tab. If `newTab` is true,
 * security attributes (`rel="noopener noreferrer"`) are applied.
 *
 * @function createButton
 * @param {Object} options - Configuration for the button.
 * @param {string} options.text - The visible text of the button.
 * @param {string} [options.href="#"] - The destination URL for the button.
 * @param {boolean} [options.newTab=false] - Whether the link should open in a new browser tab.
 *
 * @returns {HTMLAnchorElement} A styled anchor element with the `btn` class.
 */
const createButton = ({ text, href, newTab = false }) => {
  const button = document.createElement("a");
  button.className = "btn";

  button.href = href || "#";
  button.target = newTab ? "_blank" : "_self";

  if (newTab) {
    button.rel = "noopener noreferrer";
  }

  button.textContent = text;

  return button;
};
export default createButton;
