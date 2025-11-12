import { getAuthInputs } from "./getFormInputs.js";
import { handleAuth } from "./handleAuth.js";

/**
 * Attaches a submit event listener to the authentication form.
 *
 * When the form is submitted, it prevents the default behavior
 * and calls `handleAuth` to perform login or signup based on the `isSignup` flag.
 *
 * @param {boolean} isSignup - Determines whether the form submission should trigger a signup (`true`) or login (`false`) flow.
 */
export const setAuthFormEvents = (isSignup) => {
  const { form } = getAuthInputs();
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAuth(isSignup);
    });
  }
};
