import {
    userMessage,
    clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { updateUserProfile } from "/js/utils/source/api/users/updateProfile.js";
import { closeModal } from "/js/app/components/modal/closeModal.js";

/**
 * Attaches a submit event listener to handle editing the user's profile.
 *
 * On submit, this function:
 * - Reads the current bio and avatar URL values from the form.
 * - Sends the updated profile data to the API via `updateUserProfile`.
 * - Shows a success message, closes the modal and reloads the current page.
 * - Shows a warning message and logs the error if the update fails.
 *
 * @function editProfileFormEventHandlers
 * @param {HTMLFormElement} form - The form element used for editing the profile.
 * @param {Object} profileData - The current user's profile data.
 * @param {string} profileData.name - The username, used to identify the profile to update.
 */
export const editProfileFormEventHandlers = (form, profileData) => {
    const submitEditedProfileEvents = () => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
                const updatedProfile = {
                    name: profileData.name,
                    bio: form.querySelector("#bio").value.trim(),
                    avatar: {
                        url: form.querySelector("#image_url").value.trim(),
                    },
                };
                await updateUserProfile(updatedProfile);
                userMessage("success", "Profile updated!");
                closeModal();

                setTimeout(() => {
                    clearUserMessage();
                    window.location.href = window.location.href;
                }, 1000);
            } catch (error) {
                userMessage("warning", "Couldn't update profile.");
                setTimeout(clearUserMessage, 1000);

                console.error(error);
            }
        });
    };

    submitEditedProfileEvents();
};
