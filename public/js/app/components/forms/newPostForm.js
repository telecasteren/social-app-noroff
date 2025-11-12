import { sharedStyles } from "/js/utils/general/constants.js";
/**
 * Creates and returns a form for creating a new post with an image, title, and caption.
 *
 * The form includes:
 * - An **image upload field** (URL input) with live preview (or placeholder SVG if empty).
 * - A **title input** with a max length of 30 characters.
 * - A **caption textarea** with a max length of 180 characters.
 * - A **submit button** styled with an inline SVG icon.
 * - An **error message element** for validation feedback.
 *
 * Image preview updates dynamically as the user types into the URL input.
 *
 * @function newPost
 * @returns {HTMLFormElement} A fully constructed form element for creating a post.
 *
 * @sideeffects
 * - Attaches an input listener to the image URL field to toggle between
 *   showing a live preview and the placeholder image.
 *
 * @example
 * const form = newPost();
 * document.body.appendChild(form);
 */
const newPost = () => {
  const form = document.createElement("form");
  form.id = "new-post-form";
  form.className = "p-4 md:p-5 w-full";

  const grid = document.createElement("div");
  grid.className = "grid gap-4 mb-4";

  const formTitle = document.createElement("h3");
  formTitle.className = "text-lg font-semibold text-black";
  formTitle.textContent = "Create new post.";

  const uploadWrapper = document.createElement("div");

  const label = document.createElement("label");
  label.className = "block mb-2 text-sm font-medium text-gray-900";
  label.setAttribute("for", "image_url");
  label.textContent = "Upload image:";

  const imgUrlInput = document.createElement("input");
  imgUrlInput.id = "image_url";
  imgUrlInput.type = "url";
  imgUrlInput.placeholder = "https://example.com/image.jpg";
  imgUrlInput.className = `${sharedStyles} p-2`;
  imgUrlInput.setAttribute("aria-describedby", "image_url_help");
  imgUrlInput.setAttribute("aria-label", "Image URL");
  imgUrlInput.setAttribute("aria-required", "true");
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
  imgContainer.style.backgroundImage = `url("${encodedSVG}")`;
  imgContainer.style.backgroundSize = "contain";
  imgContainer.style.backgroundRepeat = "no-repeat";
  imgContainer.style.backgroundPosition = "center";
  imgContainer.className =
    "relative justify-center w-[250px] h-[250px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden";

  const postImage = document.createElement("img");
  postImage.alt = "New post-image";
  postImage.className =
    "absolute rounded-lg object-contain w-full h-full hidden";
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
  title.setAttribute("Type", "text");
  title.maxLength = "30";

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

  grid.appendChild(uploadWrapper);
  grid.appendChild(imgContainer);
  titleWrapper.appendChild(titleLabel);
  titleWrapper.appendChild(title);
  captionWrapper.appendChild(captionLabel);
  captionWrapper.appendChild(caption);
  grid.appendChild(titleWrapper);
  grid.appendChild(captionWrapper);

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.type = "submit";
  submitButton.className = `text-text-light inline-flex items-center
  bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

  submitButton.innerHTML =
    '<svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> Submit post.';

  const errorText = document.createElement("p");
  errorText.className = "hidden mb-2 text-sm text-red-600";
  errorText.id = "error-text";
  errorText.textContent = "Missing image, title or caption.";

  form.appendChild(formTitle);
  form.appendChild(grid);
  form.appendChild(errorText);
  form.appendChild(submitButton);

  return form;
};
export default newPost;
