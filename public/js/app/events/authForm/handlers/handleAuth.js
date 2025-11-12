import { getAuthInputs } from "./getFormInputs.js";
import { displayFormErrorMessage } from "/js/utils/messages/formMessage.js";
import { register } from "/js/utils/source/api/auth/registerUser.js";
import { login } from "/js/utils/source/api/auth/loginUser.js";

/**
 * Handles user authentication, supporting both login and signup flows.
 *
 * For signup:
 *  - Validates password confirmation.
 *  - Registers a new user.
 *  - Logs in the new user and redirects to their profile page.
 *
 * For login:
 *  - Authenticates an existing user.
 *  - Redirects to the user's profile page upon successful login.
 *
 * Displays appropriate error messages if registration or login fails.
 *
 * @param {boolean} [isSignup=false] - If true, performs user registration; otherwise, performs login.
 * @returns {Promise<void>} Resolves when the authentication process completes, or throws an error on failure.
 */
export const handleAuth = async (isSignup = false) => {
  const { usernameInput, emailInput, passwordInput, confirmPassInput } =
    getAuthInputs();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (isSignup) {
    const confirmPassword = confirmPassInput?.value.trim();
    const username = usernameInput.value.replace(/\s+/g, "_").toLowerCase();

    if (!confirmPassword || password !== confirmPassword) {
      displayFormErrorMessage(confirmPassInput, "Passwords must match.");
      return;
    }

    try {
      const newUser = await register(username, email, password);
      const { name } = (await login(email, password)) || email.split("@")[0];

      window.location.href = `/user/profile/?id=${newUser.username || name}`;
    } catch (error) {
      displayFormErrorMessage(
        emailInput,
        "Registration failed. Email may be in use."
      );
      throw new Error();
    }
  } else {
    try {
      const { name } = await login(email, password);
      window.location.href = `/user/profile/?id=${name}`;
    } catch (error) {
      displayFormErrorMessage(
        emailInput,
        "Login failed. Invalid email or password."
      );
      throw new Error(error.message || "Login failed. Invalid credentials.");
    }
  }
};
