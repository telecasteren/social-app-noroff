import { createUserSettings } from "/js/app/components/settings/createUserSettings.js";

/**
 *
 * @returns {string} The user settings trigger text used in the navbar, see `createNavLink.js`
 */
export const userSettings = () => {
  return createUserSettings({
    triggerType: "button",
    triggerText: "Settings",
  });
};
