import { toggleFollowing } from "/js/app/events/userActions/following/follows.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { editDescription } from "/js/app/components/forms/bioForm.js";
import { createEditIcon } from "/js/app/components/buttons/editIconBtn.js";

/**
 * Creates a user description section including the bio and follow/edit options.
 *
 * If the current user is viewing another user's profile, a follow/unfollow button
 * is included. If the current user is viewing their own profile, an edit icon
 * is added to allow editing the bio.
 *
 * @async
 * @function
 * @param {Object} user - The user whose description is being displayed.
 * @param {string} user.name - The username of the profile owner.
 * @param {string} [user.bio] - The bio of the user (optional). Defaults to "No bio yet.." if missing.
 * @returns {Promise<HTMLElement>} A container `<div>` element containing the user description
 *                                 and appropriate follow/edit controls.
 *
 * @fires toggleFollowing Adds follow/unfollow functionality if viewing another user's profile.
 * @fires createEditIcon Creates an edit icon for the bio if viewing own profile.
 * @fires editDescription Opens a bio edit form and replaces the description on submission.
 */
const Description = async (user) => {
  const currentUser = loadKey("profile");
  const profileOwnerName = user.name;
  const profileOwnerBio = user.bio || "No bio yet..";

  let followBtn = null;
  if (currentUser.name !== profileOwnerName) {
    followBtn = await toggleFollowing(user);
  }

  const userDescription = document.createElement("div");
  userDescription.className = "grid grid-cols-1 mt-16 mb-16";

  const bioRow = document.createElement("div");
  bioRow.className = "flex items-center justify-center gap-4";

  const description = document.createElement("p");
  description.innerText = profileOwnerBio;
  description.className = "text-sm m-2";
  bioRow.appendChild(description);

  if (currentUser.name === profileOwnerName) {
    const editBioIcon = createEditIcon({
      label: "Edit",
      classes: `
    edit-post pl-2 pr-2 w-10 hover:w-24 h-10
    bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
    rounded shadow-md cursor-pointer flex items-center justify-start
    overflow-hidden transition-all duration-300 group
    `,
    });
    bioRow.appendChild(editBioIcon);

    editBioIcon.addEventListener("click", async () => {
      const bioEditForm = await editDescription(user);
      userDescription.replaceWith(bioEditForm);
    });
  }
  userDescription.appendChild(bioRow);

  if (followBtn) {
    userDescription.appendChild(followBtn);
  }

  return userDescription;
};
export default Description;
