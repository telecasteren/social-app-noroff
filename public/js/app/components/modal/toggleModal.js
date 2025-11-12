import { createModal } from "./createModal.js";
import { closeModal } from "./closeModal.js";

/**
 * Displays a modal with dynamic content. If the modal doesn't exist
 * in the DOM, it will be created and appended to the body.
 *
 * The content passed in will be inserted into the modal, and the modal
 * will be made visible.
 *
 * @param {HTMLElement} content - The content to display inside the modal.
 */
export const toggleModal = (content) => {
  let modal = document.querySelector(".modal");

  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);
  }

  const modalContent = modal.querySelector(".modal-content");
  const closeButton = modal.querySelector(".close-modal");

  modalContent.innerHTML = "";
  modalContent.appendChild(closeButton);
  modalContent.appendChild(content);

  modal.style.display = "block";

  const onCloseClick = () => closeModal();
  const onClickOutside = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  closeButton.addEventListener("click", onCloseClick);
  window.addEventListener("click", onClickOutside);
};
