/**
 * Creates and returns a hidden modal element with a close button.
 *
 * The modal consists of a container `div` with class `modal`, a nested
 * `div` with class `modal-content`, and a `span` element that serves
 * as the close button.
 *
 * @returns {HTMLDivElement} The constructed modal element.
 */
export const createModal = () => {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.className = `close-modal relative m-0 ml-2 text-[var(--accent)] max-w-[50px]
  flex justify-center text-[38px] font-bold cursor-pointer hover:text-black`;

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  return modal;
};
