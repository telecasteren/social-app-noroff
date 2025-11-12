import { editBioFormEventHandlers } from "/js/app/events/profile/editBio/submitEvents.js";
import Description from "/js/app/routes/profile/sections/description.js";

/**
 * Creates and returns a form for editing a user's biography (bio).
 *
 * The form includes:
 * - A textarea pre-filled with the user's current bio.
 * - A "Save changes" button to submit updates.
 * - A "Delete bio" button with a confirmation step ("Yes" / "No").
 * - A close button to cancel editing and restore the original description view.
 *
 * The form is initialized with `editBioFormEventHandlers` to handle submission,
 * deletion, and confirmation logic.
 *
 * @async
 * @function editDescription
 * @param {Object} user - The user object containing bio data.
 * @param {string} [user.bio=""] - The current biography text of the user.
 *
 * @returns {Promise<HTMLFormElement>} A form element for editing the user’s bio.
 *
 * @requires editBioFormEventHandlers
 * @requires Description
 *
 * @sideeffects
 * - Attaches event listeners for form submission, deletion, and cancel actions.
 * - Replaces the bio section in the DOM while editing is active.
 */
export const editDescription = async (user) => {
  const userBio = user.bio || "";

  const form = document.createElement("form");
  form.id = "bio-form";
  form.className = `
  grid grid-cols-1 mt-4 mb-4 w-full max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[40%]
  justify-self-center
`;

  const bioContainer = document.createElement("div");
  bioContainer.className = "";

  const container = document.createElement("div");
  container.className =
    "flex items-center justify-between mb-2 flex-wrap gap-x-2";

  const bioLabel = document.createElement("label");
  bioLabel.className = "text-sm font-medium dark:text-white";
  bioLabel.setAttribute("for", "bio");
  bioLabel.textContent = "Biography:";

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.className = `close-modal text-[var(--accent)]
  text-[28px] font-bold cursor-pointer hover:text-black ml-4`;

  container.appendChild(bioLabel);
  container.appendChild(closeButton);

  const bio = document.createElement("textarea");
  bio.className = `
  w-full sm:w-[320px] md:w-[360px] lg:w-[100%]
  rounded p-2 text-black text-sm mt-2 mb-2 justify-self-center
  border border-gray-800
`;
  bio.name = "bio";
  bio.id = "bio";
  bio.maxLength = "180";
  bio.rows = 4;
  bio.placeholder = "No bio here yet";
  bio.innerText = userBio;

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.type = "submit";
  submitButton.className = `text-text-light inline-flex items-center mb-2 justify-center
  bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  submitButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> Save changes';

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-btn";
  deleteButton.type = "button";
  deleteButton.className = `text-white inline-flex items-center justify-center
  bg-[#181438e3] hover:brightness-150 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  deleteButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> Delete bio';

  const confirmMessage = document.createElement("div");
  confirmMessage.className =
    "hidden max-w-[100%] rounded bg-red-100 mt-2 p-2 border border-red-600 text-red-600";
  confirmMessage.textContent = "Are you sure you want to delete this bio?";

  const createConfirmationOption = (text) => {
    const option = document.createElement("p");
    option.className =
      "mt-2 max-w-content text-sm text-red-600 hover:underline hover:font-bold cursor-pointer";
    option.id = "error-text";
    option.textContent = text;
    return option;
  };

  const confirmDeletion = createConfirmationOption("Yes");
  const denyDeletion = createConfirmationOption("No");

  confirmMessage.appendChild(confirmDeletion);
  confirmMessage.appendChild(denyDeletion);
  bioContainer.appendChild(container);
  bioContainer.appendChild(bio);

  form.appendChild(bioContainer);
  form.appendChild(submitButton);
  form.appendChild(deleteButton);
  form.appendChild(confirmMessage);

  editBioFormEventHandlers(
    form,
    user,
    deleteButton,
    confirmMessage,
    confirmDeletion,
    denyDeletion
  );

  closeButton.addEventListener("click", async () => {
    const bio = await Description(user);
    form.replaceWith(bio);
  });

  return form;
};
