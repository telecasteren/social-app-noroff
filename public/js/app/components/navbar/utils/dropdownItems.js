import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { switchThemeToggle } from "/js/app/components/buttons/switchThemeToggle.js";
import { editProfileMenuEvents } from "/js/app/events/settings/editProfileMenuEvents.js";
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
                e.addEventListener("click", async () => {
                    const profile = await getCurrentUser();
                    if (!profile) return;
                    await editProfileMenuEvents(profile);
                });
            },
        },
        {
            action: (el) => {
                el.appendChild(switchThemeToggle());
            },
        },
        {
            text: "Logout",
        },
    ];
    return items;
};
