import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import {
  updateUserBio,
  clearUserBio,
} from "/js/utils/source/api/users/bio/updateBio.js";

/**
 * Attaches event listeners to handle editing and deleting user bio's.
 *
 * @param {HTMLFormElement} form - The form element for editing bio.
 * @param {Object} user - The user object (should contain at least the username).
 * @param {HTMLButtonElement} deleteButton - Button to trigger bio deletion.
 * @param {HTMLDivElement} confirmMessage - Confirmation message container.
 * @param {HTMLElement} confirmDeletion - Element the user clicks to confirm deletion.
 * @param {HTMLElement} denyDeletion - Element to cancel deletion.
 */
export const editBioFormEventHandlers = (
  form,
  user,
  deleteButton,
  confirmMessage,
  confirmDeletion,
  denyDeletion
) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const newBio = form.querySelector("#bio").value.trim();
      const username = user.name;

      await updateUserBio(username, newBio);
      userMessage("success", "Bio updated. Great job!");

      setTimeout(() => {
        clearUserMessage();
        window.location.href = window.location.href;
      }, 1000);
    } catch (error) {
      userMessage("warning", "Couldn't update bio..");
      setTimeout(() => {
        clearUserMessage();
      }, 1000);

      throw error;
    }
  });

  deleteButton.addEventListener("click", () => {
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
      try {
        await clearUserBio(username);
        userMessage("success", "Bio deleted. You can start a fresh one!");

        setTimeout(() => {
          clearUserMessage();
          window.location.href = window.location.href;
        }, 2000);
      } catch (error) {
        userMessage("warning", "Couldn't delete bio..");
        setTimeout(() => {
          clearUserMessage();
        }, 3000);
        throw error;
      }
    });

    denyDeletion.addEventListener("click", (e) => {
      if (e.target === denyDeletion) confirmMessage.classList.add("hidden");
    });
  });
};
