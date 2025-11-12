import { spinner } from "/js/app/components/loader/spinner.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

/**
 * Returns an event handler for handling "forgot password" actions on an authentication form.
 *
 * When triggered, this handler:
 * 1. Prevents the default form submission behavior.
 * 2. Clears the current authentication container.
 * 3. Displays a spinner and a user message informing them to sign up again.
 * 4. After a short delay, re-renders the authentication form in signup mode and removes the spinner.
 * 5. Clears the user message after a longer delay for better UX.
 *
 * @param {Function} AuthForm - The function used to render the authentication form.
 *                              Pass `true` to indicate signup mode.
 * @param {HTMLElement} authContainer - The DOM element where the authentication form is rendered.
 * @returns {Function} An event handler function for the "forgot password" action.
 *
 * @example
 * const authFormContainer = document.getElementById("auth-container");
 * const forgotPasswordHandler = forgotPasswordRoute(AuthForm, authFormContainer);
 * forgotPasswordEl.addEventListener("click", forgotPasswordHandler);
 */
export const forgotPasswordRoute = (AuthForm, authContainer) => {
  return (event) => {
    event.preventDefault();

    authContainer.innerHTML = "";
    const spinnerEL = spinner();
    spinnerEL.className = "flex justify-center items-center mt-48";
    authContainer.prepend(spinnerEL);

    userMessage("info", "Forgot your password? Please signup again.");

    setTimeout(() => {
      AuthForm(true);
      spinnerEL.remove();
    }, 1000);

    setTimeout(() => {
      clearUserMessage();
    }, 3000);
  };
};
