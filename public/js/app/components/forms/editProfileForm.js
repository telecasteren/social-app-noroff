import { NO_IMG_URL, sharedStyles } from "/js/utils/general/constants.js";
import { editProfileFormEventHandlers } from "/js/app/events/settings/submitProfileEvents.js";

export const editProfileForm = async (profile) => {
    const form = document.createElement("form");
    form.id = "edit-profile-form";
    form.className = "p-4 md:p-5 w-full";

    const grid = document.createElement("div");
    grid.className = "grid gap-4 mb-4";

    const formTitle = document.createElement("h3");
    formTitle.className = "text-lg font-semibold text-black";
    formTitle.textContent = "Edit profile.";

    const nameWrapper = document.createElement("div");
    const nameLabel = document.createElement("label");
    nameLabel.className = "block mb-2 text-sm font-medium text-gray-900";
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Username:";

    const name = document.createElement("input");
    name.className = `${sharedStyles} p-2 !pointer-events-none`;
    name.id = "name";
    name.readOnly = true;
    name.type = "text";
    name.value = profile.name || "Unknown username";

    nameWrapper.appendChild(nameLabel);
    nameWrapper.appendChild(name);

    const emailWrapper = document.createElement("div");
    const emailLabel = document.createElement("label");
    emailLabel.className = "block mb-2 text-sm font-medium text-gray-900";
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email:";

    const email = document.createElement("input");
    email.className = `${sharedStyles} p-2 !pointer-events-none`;
    email.id = "name";
    email.readOnly = true;
    email.type = "text";
    email.value = profile.email || "Unknown email";

    emailWrapper.appendChild(emailLabel);
    emailWrapper.appendChild(email);

    const bioWrapper = document.createElement("div");
    const bioLabel = document.createElement("label");
    bioLabel.className = "block mb-2 text-sm font-medium text-gray-900";
    bioLabel.setAttribute("for", "bio");
    bioLabel.textContent = "Bio:";

    const bio = document.createElement("textarea");
    bio.name = "bio";
    bio.id = "bio";
    bio.className = `${sharedStyles} p-4`;
    bio.maxLength = "180";
    bio.rows = 4;
    bio.placeholder = "No bio yet";
    bio.textContent = profile.bio || "";

    bioWrapper.appendChild(bioLabel);
    bioWrapper.appendChild(bio);

    const uploadWrapper = document.createElement("div");

    const label = document.createElement("label");
    label.className = "block mb-2 text-sm font-medium text-gray-900";
    label.setAttribute("for", "image_url");
    label.textContent = "Image URL:";

    const imgUrlInput = document.createElement("input");
    imgUrlInput.id = "image_url";
    imgUrlInput.type = "url";
    imgUrlInput.required = true;
    imgUrlInput.placeholder = "https://example.com/image.jpg";
    imgUrlInput.value = profile.avatar?.url || "";
    imgUrlInput.className = `${sharedStyles} p-2`;

    const helpText = document.createElement("p");
    helpText.className = "mt-1 text-sm text-gray-500 dark:text-gray-300";
    helpText.id = "image_url_help";
    helpText.textContent = "Valid format: PNG, JPG or GIF.";

    const svgPlaceholder = `
    <svg width="100%" height="100%" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect width="250" height="250" fill="#f3f4f6" rx="10"/>
      <path d="M50 170l40-40 40 40 40-60 40 60H50z" fill="#d1d5db"/>
      <circle cx="85" cy="90" r="15" fill="#9ca3af"/>
      <rect x="0.5" y="0.5" width="249" height="249" rx="9.5" stroke="#d1d5db"/>
    </svg>
  `;
    const encodedSVG = `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`;

    const imgContainer = document.createElement("div");
    imgContainer.style.backgroundImage = profile.avatar?.url
        ? "none"
        : `url("${encodedSVG}")`;
    imgContainer.style.backgroundSize = "contain";
    imgContainer.style.backgroundRepeat = "no-repeat";
    imgContainer.style.backgroundPosition = "center";
    imgContainer.className =
        "relative justify-center w-[250px] h-[250px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden";

    const profileImage = document.createElement("img");
    profileImage.alt = "Edit profile image";
    profileImage.className =
        "absolute rounded-lg object-contain w-full h-full " +
        (profile.avatar?.url ? "" : "hidden");
    profileImage.src = profile.avatar?.url || NO_IMG_URL;
    imgContainer.appendChild(profileImage);

    imgUrlInput.addEventListener("input", () => {
        const url = imgUrlInput.value.trim();
        if (url) {
            profileImage.src = url;
            profileImage.classList.remove("hidden");
            imgContainer.style.backgroundImage = "none";
        } else {
            profileImage.classList.add("hidden");
            imgContainer.style.backgroundImage = `url("${encodedSVG}")`;
        }
    });

    uploadWrapper.appendChild(label);
    uploadWrapper.appendChild(imgUrlInput);
    uploadWrapper.appendChild(helpText);

    grid.appendChild(nameWrapper);
    grid.appendChild(emailWrapper);
    grid.appendChild(bioWrapper);
    grid.appendChild(imgContainer);
    grid.appendChild(uploadWrapper);

    const submitButton = document.createElement("button");
    submitButton.id = "submit-btn";
    submitButton.type = "submit";
    submitButton.className = `text-text-light inline-flex items-center mb-2
  bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-hidden focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

    submitButton.innerHTML =
        '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> Save changes';

    form.appendChild(formTitle);
    form.appendChild(grid);
    form.appendChild(submitButton);

    editProfileFormEventHandlers(form, profile);
    return form;
};
