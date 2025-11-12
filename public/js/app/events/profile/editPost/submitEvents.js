import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { submitEditedPost } from "/js/utils/source/api/posts/actions/edit.js";
import { deletePost } from "/js/utils/source/api/posts/actions/delete.js";
import { closeModal } from "/js/app/components/modal/closeModal.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";

/**
 * Attaches event listeners to handle editing and deleting a post.
 *
 * This function sets up:
 * - A submit event listener on the edit form to submit edited post data.
 * - A click event listener on the delete button that shows a confirmation prompt,
 *   and upon confirmation, deletes the post.
 * - Automatically reloads the current page upon successful update or deletion.
 *
 * @async
 * @function editPostFormEventHandlers
 * @param {HTMLFormElement} form - The form element used for editing the post.
 * @param {Object} postData - The post data object to be submitted or deleted.
 * @param {string|number} postData.id - The ID of the post.
 * @param {{ url: string }} postData.media - Media object containing the image URL.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The caption/body of the post.
 * @param {HTMLButtonElement} deleteButton - The button element that triggers the delete action.
 * @param {HTMLDivElement} confirmMessage - A div that displays a confirmation message.
 * @param {HTMLElement} confirmDeletion - An element the user clicks to confirm deletion.
 * @param {HTMLElement} denyDeletion - An element the user clicks to cancel deletion.
 *
 * @returns {void}
 *
 * @example
 * editPostFormEventHandlers(
 *   document.getElementById("edit-post-form"),
 *   { id: 1, media: { url: "img.jpg" }, title: "New", body: "Updated body" },
 *   document.getElementById("delete-btn"),
 *   document.getElementById("confirm-message"),
 *   document.getElementById("confirm-yes"),
 *   document.getElementById("confirm-no")
 * );
 */
export const editPostFormEventHandlers = async (
  form,
  postData,
  deleteButton,
  confirmMessage,
  confirmDeletion,
  denyDeletion
) => {
  const submitEditedPostEvents = () => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const updatedPost = {
          id: postData.id,
          title: form.querySelector("#title").value.trim(),
          body: form.querySelector("#caption").value.trim(),
          media: {
            url: form.querySelector("#image_url").value.trim(),
          },
        };
        await submitEditedPost(updatedPost);
        userMessage("success", "Post updated!");
        closeModal();

        setTimeout(() => {
          clearUserMessage();
          window.location.href = window.location.href;
        }, 1000);
      } catch (error) {
        userMessage("warning", "Couldn't update post.");

        setTimeout(clearUserMessage, 1000);

        console.error(error);
        throw Error;
      }
    });
  };

  const deleteBtnEvents = () => {
    deleteButton.addEventListener("click", async () => {
      confirmMessage.classList.remove("hidden");

      if (!confirmMessage.contains(confirmDeletion)) {
        confirmMessage.appendChild(confirmDeletion);
      }
      if (!confirmMessage.contains(denyDeletion)) {
        confirmMessage.appendChild(denyDeletion);
      }
      if (!form.contains(confirmMessage)) {
        form.appendChild(confirmMessage);
      }

      confirmDeletion.addEventListener("click", async () => {
        userMessage("warning", "Deleting post..");

        try {
          setTimeout(async () => {
            await deletePost(postData);
            userMessage("success", "Post deleted.");
            closeModal();

            setTimeout(async () => {
              clearUserMessage();

              const currentUser = await getCurrentUser();
              const username = currentUser.name;
              const currentPath = window.location.pathname;

              if (currentPath.startsWith("/user/post/")) {
                window.location.href = `/user/profile/?id=${username}`;
              } else {
                const deletedPostToHide = document.querySelector(
                  `[data-id='${postData.id}']`
                );
                deletedPostToHide.classList.add("hidden");
              }
            }, 1500);
          }, 1000);
        } catch (error) {
          userMessage("warning", "Couldn't delete post.");

          setTimeout(clearUserMessage, 3000);

          console.error(error);
          throw Error;
        }
      });

      denyDeletion.addEventListener("click", (e) => {
        if (e.target === denyDeletion) confirmMessage.classList.add("hidden");
      });
    });
  };

  submitEditedPostEvents();
  deleteBtnEvents();
};
