import { userMessage } from "/js/utils/messages/userMessage.js";
import { createSingleCard } from "/js/app/routes/feed/cards/createSingleCard.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { submitPost } from "/js/utils/source/api/posts/submitPost.js";

/**
 * Retrieves the input values from the "create new post" form,
 * converts the image to a base64 string, creates a new post object,
 * updates the local storage, and uses the {@link createSingleCard}
 * function to render and prepend the new post to the DOM.
 * Submits the new post to the server using the {@link submitPost} function.
 * @function submitHandler
 * @returns {void}
 */
export const submitHandler = async () => {
  const imgUrlInput = document.getElementById("image_url");
  const title = document.getElementById("title");
  const body = document.getElementById("caption");
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    userMessage("error", "You must be logged in to post.");
    return;
  }

  if (!imgUrlInput.value.trim() || !body.value.trim()) {
    userMessage("warning", "Please enter image URL and write a caption.");
    return;
  }

  const newPostCard = {
    title: title ? title.value.trim() : "New Post",
    body: body.value.trim(),
    media: {
      url: imgUrlInput.value.trim(),
      alt: `Post image titled: ${title ? title.value.trim() : "New Post"}`,
    },
  };

  try {
    const createdPost = await submitPost(newPostCard);
    createSingleCard(createdPost);
  } catch (error) {
    throw error;
  }
};
