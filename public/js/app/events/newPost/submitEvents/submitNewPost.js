import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { submitHandler } from "./submitHandler.js";

/**
 * Attaches the submit event listener to the "create new post" form.
 * When the form is submitted, this function prevents the default submission,
 * calls the {@link submitHandler} function to process the form data
 * and create a new post, closes the modal and then loads the profile with the new post.
 * @function submitPost
 * @returns {void}
 * Displays an error message to user if inputs are empty.
 * @example
 * errorText: Missing image, title or caption.;
 */
export const submitPost = () => {
  const form = document.getElementById("new-post-form");
  const modal = document.querySelector(".modal");

  if (!form) {
    userMessage("error", "Couldn't find the form.");
    return;
  }

  const error = document.getElementById("error-text");

  ["title", "caption"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        error.classList.add("hidden");
      });
    }
  });

  const imgInput = document.getElementById("image_url");
  if (imgInput) {
    imgInput.addEventListener("change", () => {
      error.classList.add("hidden");
    });
  }

  form.addEventListener("submit", (event) => {
    if (event) event.preventDefault();

    const img = document.getElementById("image_url").value;
    const title = document.getElementById("title").value;
    const caption = document.getElementById("caption").value;

    if (img && title && caption) {
      submitHandler();
      modal.style.display = "none";
      userMessage("success", "Your post was submitted successfully!");
      setTimeout(() => {
        clearUserMessage();
        window.location.href = window.location.href;
      }, 2000);
    } else {
      error.classList.remove("hidden");
    }
  });
};
