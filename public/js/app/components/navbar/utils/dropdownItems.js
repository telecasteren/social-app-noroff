import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
/**
 * Returns an array of options for a user's settings menu.
 *
 * Each option includes a `text` label and optionally an `action` function to execute.
 * Currently, "Edit profile" has a placeholder `action`, that later will handle editing of profile information.
 * "Logout" does not have an associated action,
 * as it is handled separately in `logout.js` and `navbarHandlers.js`.
 *
 * @function settingsOptions
 * @returns {Array<{text: string, action?: Function}>} An array of settings menu items.
 *
 * @example
 * const options = settingsOptions();
 * options.forEach(option => console.log(option.text));
 */
export const settingsOptions = () => {
  const items = [
    {
      text: "Edit profile",
      action: (e) => {
        /* will later handle editing username, name, avatar, email, etc. */
        e.addEventListener("click", () => {
          userMessage("alert", "This feature is coming soon.");
          setTimeout(() => clearUserMessage(), 2000);
        });
      },
    },
    {
      text: "Logout",
    },
  ];
  return items;
};
