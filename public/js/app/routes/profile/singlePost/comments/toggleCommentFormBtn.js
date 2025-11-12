import createButton from "/js/app/components/buttons/primaryBtn.js";

/**
 * Creates and returns a button element for toggling the comment form.
 * The button is styled with utility classes for layout and hover effects.
 * @function
 * @returns {HTMLButtonElement} The styled button element for toggling
 *  the comment form.
 *
 * @example
 * const commentBtn = toggleCommentFormBtn();
 * document.body.appendChild(commentBtn);
 */
export const toggleCommentFormBtn = () => {
  const button = createButton({ text: "Add Comment", href: "#" });
  button.id = "toggle-comment-form-btn";
  button.classList.add(
    "mx-auto",
    "mb-4",
    "mt-0",
    "max-w-[100px]",
    "border",
    "border-gray-300",
    "text-xs",
    "hover:scale-105",
    "transition",
    "duration-300",
    "ease-in-out"
  );
  return button;
};
