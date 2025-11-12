import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { updateUserAvatar } from "/js/utils/source/api/users/avatar/updateAvatar.js";

/**
 * Attaches event handlers to an avatar edit form to handle profile image updates.
 *
 * @param {HTMLFormElement} form - The form element for editing the user's avatar.
 * @param {Object} user - The user object containing relevant user information.
 * @fires userMessage Displays success or warning messages to the user.
 * @fires clearUserMessage Clears displayed messages after a delay.
 * @fires window.location.href Reloads the page after a successful avatar update.
 */
export const editAvatarFormEventHandlers = (form, user) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await updateUserAvatar(user);
      userMessage("success", "Profile image updated!");

      setTimeout(() => {
        clearUserMessage();
        window.location.href = window.location.href;
      }, 500);
    } catch (error) {
      console.error(error);
      userMessage("warning", "Couldn't update profile image.");

      setTimeout(clearUserMessage, 1000);
    }
  });
};
