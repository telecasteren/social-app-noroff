import { editAvatarFormEventHandlers } from "/js/app/events/profile/editAvatar/submitHandlers.js";
import { NO_IMG_URL } from "/js/utils/general/constants.js";

/**
 * Creates and returns an avatar editing form for a user profile.
 *
 * The form includes:
 * - A text input pre-filled with the user’s current avatar URL (or a fallback image).
 * - A label, cancel button, and save button with an inline SVG icon.
 * - A cancel action that restores the original avatar element.
 *
 * The form is wired up with `editAvatarFormEventHandlers` to handle submission logic.
 *
 * @async
 * @function editAvatar
 * @param {Object} user - The user object containing avatar data.
 * @param {Object} [user.avatar] - Avatar object for the user.
 * @param {string} [user.avatar.url] - The URL of the user’s avatar.
 * @param {HTMLElement} originalAvatar - The original avatar element to restore when canceling.
 *
 * @returns {Promise<HTMLFormElement>} A form element for editing the user’s avatar.
 *
 * @throws {Error} If `user` is not provided.
 *
 * @requires editAvatarFormEventHandlers
 *
 * @sideeffects
 * - Attaches event listeners to the cancel button and form submission.
 * - Replaces the avatar element in the DOM when the form is active.
 */
export const editAvatar = async (user, originalAvatar) => {
  const avatarUrl = user.avatar?.url || NO_IMG_URL;

  if (!user) {
    throw new Error("User data is required to display profile img form.");
  }

  const form = document.createElement("form");
  form.id = "avatar-form";

  const avatarContainer = document.createElement("div");
  avatarContainer.className = "";

  const formContainer = document.createElement("div");
  formContainer.className =
    "flex items-center justify-between mb-2 flex-wrap gap-x-2";

  const avatarLabel = document.createElement("label");
  avatarLabel.className = "text-sm font-medium dark:text-white";
  avatarLabel.setAttribute("for", "avatar");
  avatarLabel.textContent = "Enter profile image:";

  const closeButton = document.createElement("span");
  closeButton.id = "cancel";
  closeButton.innerHTML = "Cancel";
  closeButton.className = `close-modal text-[var(--accent)]
  text-[12px] font-bold cursor-pointer hover:text-black ml-4`;

  formContainer.appendChild(avatarLabel);
  formContainer.appendChild(closeButton);

  const avatar = document.createElement("input");
  avatar.className = `
  w-full sm:w-[320px] md:w-[360px] lg:w-[100%]
  rounded p-2 text-black text-sm mt-2 mb-2 justify-self-center
  border border-gray-800
`;
  avatar.type = "text";
  avatar.name = "avatar";
  avatar.id = "avatar";
  avatar.placeholder = "No image uploaded";
  avatar.value = avatarUrl;

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.type = "submit";
  submitButton.className = `text-text-light inline-flex items-center mb-2 justify-center
  bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  submitButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> Save';

  avatarContainer.appendChild(formContainer);
  avatarContainer.appendChild(avatar);

  form.appendChild(avatarContainer);
  form.appendChild(submitButton);

  closeButton.addEventListener("click", () => {
    form.replaceWith(originalAvatar);
  });

  editAvatarFormEventHandlers(form, user);

  return form;
};
