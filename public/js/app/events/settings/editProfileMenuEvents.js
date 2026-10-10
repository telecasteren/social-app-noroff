import { toggleModal } from "/js/app/components/modal/toggleModal.js";
import { editProfileForm } from "/js/app/components/forms/editProfileForm.js";

/**
 * Opens a modal with the edit profile form for the current user
 * @param {Object} profile - profile data with name, avatar, and bio
 */
export const editProfileMenuEvents = async (profile) => {
    const form = await editProfileForm(profile);
    toggleModal(form);
};
