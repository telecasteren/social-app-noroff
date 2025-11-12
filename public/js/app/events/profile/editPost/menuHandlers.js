import editPostForm from "/js/app/components/forms/editPostForm.js";
import { createModal } from "/js/app/components/modal/createModal.js";
import { toggleModal } from "/js/app/components/modal/toggleModal.js";

/**
 * Opens a modal with the edit post form for the current post
 * @param {Object} post - post data with id, media, title, and body
 */
export const editPostMenuEvents = async (post) => {
  createModal();

  const form = await editPostForm(post);
  toggleModal(form);
};
