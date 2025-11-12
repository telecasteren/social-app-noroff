/**
 * Creates an <h1> element with a typing animation for the provided text.
 * Appends a colored dot at the end after typing is complete.
 *
 * @param {string} text - The text to type out in the title.
 * @returns {HTMLHeadingElement} The <h1> element with the typing animation applied.
 */
export const typeTitle = (text) => {
  const title = document.createElement("h1");
  title.className = "text-center font-brand";

  const dot = document.createElement("span");
  dot.style.color = "var(--accent)";
  dot.textContent = ".";

  let index = 0;
  const typeLetters = () => {
    if (index < text.length) {
      title.textContent += text.charAt(index);
      index++;
      setTimeout(typeLetters, 100);
    } else if (index === text.length) {
      title.appendChild(dot);
    }
  };

  typeLetters();

  setTimeout(() => {
    title.style.border = "transparent";
  }, 3000);

  return title;
};

/**
 * Creates an <h2> element that cycles through an array of texts with a typewriter animation.
 * Each text is typed out character by character and then erased before moving to the next text.
 *
 * @returns {HTMLHeadingElement} The <h2> element with the typewriter animation applied.
 */
export const typeText = () => {
  const title = document.createElement("h2");
  title.className = "text-center font-typewriter typewriter";

  const texts = [
    "Want to experience the world of food?",
    "Got any favourite food spots to share?",
    "Connect for a slice of life!",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  const typeEffect = () => {
    const currentText = texts[textIndex];
    const visibleText = currentText.slice(0, charIndex);

    title.textContent = visibleText;

    if (!isErasing && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeEffect, 80);
    } else if (isErasing && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 30);
    } else {
      if (!isErasing) {
        if (textIndex === texts.length - 1) {
          return;
        }
        isErasing = true;
        setTimeout(typeEffect, 2000);
      } else {
        if (textIndex === texts.length - 1) {
          return;
        }
        isErasing = false;
        textIndex++;
        setTimeout(typeEffect, 400);
      }
    }
  };

  typeEffect();
  return title;
};
