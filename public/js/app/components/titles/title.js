/**
 * Creates a title element for the provided text.
 * Appends a colored dot at the end of the title.
 *
 * @param {string} text - The text to type out in the title.
 * @returns {HTMLHeadingElement} The <h1> element with the text and colored dot.
 */
export const createTitle = (text) => {
  const title = document.createElement("h1");
  title.className = "text-center";
  title.textContent = text;

  const dot = document.createElement("span");
  dot.style.color = "var(--accent)";
  dot.textContent = ".";
  title.appendChild(dot);

  return title;
};
