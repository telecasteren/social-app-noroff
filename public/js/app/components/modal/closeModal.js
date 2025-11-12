/**
 * Hides the modal if it exists, and removes any lingering event listeners
 * that were set up for closing the modal.
 *
 * Intended to close the modal by setting its `display` style to `none`
 * and detaching event listeners for the close button and outside clicks.
 */
export const closeModal = () => {
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".close-modal");

  modal.style.display = "none";

  const onCloseClick = (event) => {
    if (event.target === closeButton) {
      closeModal();
    }
  };

  const onClickOutside = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  closeButton.removeEventListener("click", onCloseClick);
  window.removeEventListener("click", onClickOutside);
};
