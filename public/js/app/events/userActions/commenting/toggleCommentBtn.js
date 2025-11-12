/**
 * Reveals the "toggle comment form" button by removing its `hidden` class
 * if the button exists in the DOM.
 *
 * @function toggleCommentBtn
 * @returns {void} This function does not return a value.
 *
 * @sideeffects
 * - Mutates the DOM by changing the visibility of the comment toggle button.
 */
export const toggleCommentBtn = () => {
  const commentBtn = document.getElementById("toggle-comment-form-btn");
  if (commentBtn) {
    commentBtn.classList.remove("hidden");
  }
};
