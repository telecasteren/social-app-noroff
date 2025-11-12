import { editPostFormEventHandlers } from "/js/app/events/profile/editPost/submitEvents.js";
import { NO_IMG_URL, sharedStyles } from "/js/utils/general/constants.js";

/**
 * Creates and returns a dynamic HTML form for editing an existing post.
 *
 * This function:
 * - Builds a form with pre-filled inputs for image URL, title, and caption.
 * - Displays a preview image, with support for fallback and live updates on URL input.
 * - Adds "Save changes" and "Delete post" buttons.
 * - Includes confirmation UI for deletions.
 * - Binds submit and delete logic using `editPostFormEventHandlers`.
 *
 * @async
 * @function editPostForm
 * @param {Object} post - The post data used to populate the form.
 * @param {number|string} post.id - The unique identifier of the post.
 * @param {Object} [post.media] - The media object containing the image URL.
 * @param {string} [post.media.url] - The URL of the image associated with the post.
 * @param {string} [post.title] - The title of the post.
 * @param {string} [post.body] - The caption/body content of the post.
 *
 * @returns {Promise<HTMLFormElement>} The constructed and event-bound form element for editing the post.
 *
 * @example
 * const form = await editPostForm({
 *   id: 123,
 *   media: { url: "https://example.com/photo.jpg" },
 *   title: "My Post",
 *   body: "This is my updated caption."
 * });
 * document.body.appendChild(form);
 */
const editPostForm = async (post) => {
  const form = document.createElement("form");
  form.id = "edit-post-form";
  form.className = "p-4 md:p-5 w-full";

  const grid = document.createElement("div");
  grid.className = "grid gap-4 mb-4";

  const formTitle = document.createElement("h3");
  formTitle.className = "text-lg font-semibold text-black";
  formTitle.textContent = "Edit post.";

  const uploadWrapper = document.createElement("div");

  const label = document.createElement("label");
  label.className = "block mb-2 text-sm font-medium text-gray-900";
  label.setAttribute("for", "image_url");
  label.textContent = "Image URL:";

  const imgUrlInput = document.createElement("input");
  imgUrlInput.id = "image_url";
  imgUrlInput.type = "url";
  imgUrlInput.placeholder = "https://example.com/image.jpg";
  imgUrlInput.value = post.media?.url || NO_IMG_URL;
  imgUrlInput.className = `${sharedStyles} p-2`;
  imgUrlInput.required = true;

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
  imgContainer.style.backgroundImage = post.media?.url
    ? "none"
    : `url("${encodedSVG}")`;
  imgContainer.style.backgroundSize = "contain";
  imgContainer.style.backgroundRepeat = "no-repeat";
  imgContainer.style.backgroundPosition = "center";
  imgContainer.className =
    "relative justify-center w-[250px] h-[250px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden";

  const postImage = document.createElement("img");
  postImage.alt = "Edit post image";
  postImage.className =
    "absolute rounded-lg object-contain w-full h-full " +
    (post.media?.url ? "" : "hidden");
  postImage.src = post.media?.url || NO_IMG_URL;
  imgContainer.appendChild(postImage);

  imgUrlInput.addEventListener("input", () => {
    const url = imgUrlInput.value.trim();
    if (url) {
      postImage.src = url;
      postImage.classList.remove("hidden");
      imgContainer.style.backgroundImage = "none";
    } else {
      postImage.classList.add("hidden");
      imgContainer.style.backgroundImage = `url("${encodedSVG}")`;
    }
  });

  uploadWrapper.appendChild(label);
  uploadWrapper.appendChild(imgUrlInput);
  uploadWrapper.appendChild(helpText);

  const titleWrapper = document.createElement("div");

  const titleLabel = document.createElement("label");
  titleLabel.className = "block mb-2 text-sm font-medium text-gray-900";
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title:";

  const title = document.createElement("input");
  title.className = `${sharedStyles} p-2`;
  title.id = "title";
  title.type = "text";
  title.maxLength = "30";
  title.value = post.title || "";

  titleWrapper.appendChild(titleLabel);
  titleWrapper.appendChild(title);

  const captionWrapper = document.createElement("div");
  const captionLabel = document.createElement("label");
  captionLabel.className = "block mb-2 text-sm font-medium text-gray-900";
  captionLabel.setAttribute("for", "caption");
  captionLabel.textContent = "Caption:";

  const caption = document.createElement("textarea");
  caption.name = "caption";
  caption.id = "caption";
  caption.className = `${sharedStyles} p-4`;
  caption.maxLength = "180";
  caption.rows = 4;
  caption.textContent = post.body || "";

  captionWrapper.appendChild(captionLabel);
  captionWrapper.appendChild(caption);

  grid.appendChild(uploadWrapper);
  grid.appendChild(imgContainer);
  grid.appendChild(titleWrapper);
  grid.appendChild(captionWrapper);

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.type = "submit";
  submitButton.className = `text-text-light inline-flex items-center mb-2
  bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  submitButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> Save changes';

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-btn";
  deleteButton.type = "button";
  deleteButton.className = `text-white inline-flex items-center ml-2
  bg-[#181438e3] hover:brightness-150 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  deleteButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> Delete post';

  const confirmMessage = document.createElement("div");
  confirmMessage.className =
    "hidden max-w-96 rounded bg-red-100 mt-2 p-2 border border-red-600 text-red-600";
  confirmMessage.textContent = "Are you sure you want to delete this post?";

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

  const errorText = document.createElement("p");
  errorText.className = "hidden mb-2 text-sm text-red-600";
  errorText.id = "error-text";
  errorText.textContent = "Missing image, title or caption.";

  form.appendChild(formTitle);
  form.appendChild(grid);
  form.appendChild(errorText);
  form.appendChild(submitButton);
  form.appendChild(deleteButton);
  form.appendChild(confirmMessage);

  const postData = {
    id: post.id,
    media: { url: imgUrlInput.value.trim() },
    title: title.value.trim(),
    body: caption.value.trim(),
  };

  editPostFormEventHandlers(
    form,
    postData,
    deleteButton,
    confirmMessage,
    confirmDeletion,
    denyDeletion
  );
  return form;
};

export default editPostForm;
