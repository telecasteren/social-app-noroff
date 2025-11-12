import {
  emailValidation,
  passwordValidation,
} from "/js/app/events/authForm/handlers/validation.js";
import { setAuthFormEvents } from "/js/app/events/authForm/handlers/setAuthEvents.js";
import { SITE_NAME } from "/js/utils/general/constants.js";
import { forgotPasswordRoute } from "/js/app/events/authForm/forgotPassword/forgotPasswordRoute.js";

/**
 * Renders an authentication form (login or signup) inside the `#auth-content` container.
 *
 * The form dynamically adapts depending on whether it is used for signup or login:
 * - **Login form**: Includes email, password, and "Forgot password?" link.
 * - **Signup form**: Includes username, email, password, confirm password, and hides the "Forgot password?" link.
 *
 * Input fields are validated using the imported `emailValidation` and `passwordValidation` utilities,
 * and event handlers are attached via `setAuthFormEvents`.
 *
 * @function AuthForm
 * @param {boolean} [isSignup=false] - Determines whether to render a signup form (`true`) or a login form (`false`).
 *
 * @returns {void} This function does not return a value; it directly modifies the DOM.
 *
 * @requires emailValidation
 * @requires passwordValidation
 * @requires setAuthFormEvents
 * @requires SITE_NAME
 *
 * @sideeffects
 * - Clears and re-renders the content of the `#auth-content` container.
 * - Injects a new form and associated elements into the DOM.
 * - Attaches input validation and form event listeners.
 */
const AuthForm = (isSignup = false) => {
  const authContainer = document.getElementById("auth-content");
  authContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className =
    "mx-auto w-96 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8";

  const logoContainer = document.createElement("div");
  logoContainer.className = "sm:mx-auto sm:w-full sm:max-w-sm";

  const logo = document.createElement("img");
  logo.className = "mx-auto h-10 w-auto dark:invert";
  logo.src = "/resources/logo/logo-pizza.png";
  logo.alt = `${SITE_NAME} logo`;

  const title = document.createElement("h2");
  title.className = "auth-title mt-10 text-center text-bigger tracking-tight";
  title.textContent = isSignup
    ? "Create your account."
    : "Log in to your account.";

  logoContainer.appendChild(logo);
  logoContainer.appendChild(title);

  const formContainer = document.createElement("div");
  formContainer.className = "mt-10 sm:mx-auto sm:w-full sm:max-w-sm";

  const form = document.createElement("form");
  form.id = "auth-form";
  form.className = "space-y-6";
  form.setAttribute("action", "/user/profile/");
  form.setAttribute("method", "POST");

  const emailDiv = document.createElement("div");
  const emailLabel = document.createElement("label");
  emailLabel.className = "block text-sm font-medium";
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email address.";

  const emailInputDiv = document.createElement("div");
  emailInputDiv.className = "mt-2";

  const emailInput = document.createElement("input");
  emailInput.className = "input-field input-border";
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("autocomplete", "email");
  emailInput.setAttribute("required", "true");

  emailInputDiv.appendChild(emailInput);
  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(emailInputDiv);

  const passwordDiv = document.createElement("div");
  const passwordLabelContainer = document.createElement("div");
  passwordLabelContainer.className = "flex items-center justify-between";

  const passwordLabel = document.createElement("label");
  passwordLabel.className = "block text-sm font-medium";
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password.";

  const forgotPassword = document.createElement("a");
  forgotPassword.className =
    "text-sm font-semibold text-accent-light hover:text-black dark:text-accent-dark dark:hover:text-white";
  forgotPassword.setAttribute("href", "#");
  forgotPassword.textContent = "Forgot password?";

  passwordLabelContainer.appendChild(passwordLabel);
  passwordLabelContainer.appendChild(forgotPassword);

  const passwordInputDiv = document.createElement("div");
  passwordInputDiv.className = "mt-2";

  const passwordInput = document.createElement("input");
  passwordInput.className = "input-field input-border";
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("autocomplete", "current-password");
  passwordInput.setAttribute("required", "true");
  passwordInput.minLength = 8;

  passwordInputDiv.appendChild(passwordInput);
  passwordDiv.appendChild(passwordLabelContainer);
  passwordDiv.appendChild(passwordInputDiv);

  const submitDiv = document.createElement("div");
  const submitButton = document.createElement("button");
  submitButton.id = "submit-auth";
  submitButton.className = "submit-btn btn-primary";
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = isSignup ? "Sign up." : "Log in.";
  submitDiv.appendChild(submitButton);

  form.appendChild(emailDiv);
  form.appendChild(passwordDiv);
  form.appendChild(submitDiv);

  if (isSignup) {
    const usernameDiv = document.createElement("div");
    const usernameLabel = document.createElement("label");
    usernameLabel.className = "block text-sm font-medium";
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username.";

    const usernameInputDiv = document.createElement("div");
    usernameInputDiv.className = "mt-2";

    const usernameInput = document.createElement("input");
    usernameInput.className = "input-field input-border";
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("id", "username");
    usernameInput.setAttribute("name", "username");
    usernameInput.setAttribute("autocomplete", "name");
    usernameInput.setAttribute("required", "false");

    usernameInputDiv.appendChild(usernameInput);
    usernameDiv.appendChild(usernameLabel);
    usernameDiv.appendChild(usernameInputDiv);
    form.insertBefore(usernameDiv, emailDiv);

    const confirmPasswordDiv = document.createElement("div");
    const confirmPasswordLabel = document.createElement("label");
    confirmPasswordLabel.className = "block text-sm font-medium";
    confirmPasswordLabel.setAttribute("for", "confirm-password");
    confirmPasswordLabel.textContent = "Confirm password";

    const confirmPasswordInputDiv = document.createElement("div");
    confirmPasswordInputDiv.className = "mt-2";

    const confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.className = "input-field input-border";
    confirmPasswordInput.setAttribute("type", "password");
    confirmPasswordInput.setAttribute("id", "confirm-password");
    confirmPasswordInput.setAttribute("name", "confirm-password");
    confirmPasswordInput.setAttribute("required", "true");
    confirmPasswordInput.minLength = 8;

    confirmPasswordInputDiv.appendChild(confirmPasswordInput);
    confirmPasswordDiv.appendChild(confirmPasswordLabel);
    confirmPasswordDiv.appendChild(confirmPasswordInputDiv);
    form.insertBefore(confirmPasswordDiv, submitDiv);

    forgotPassword.style.display = "none";
  } else {
    forgotPassword.style.display = "block";
  }

  formContainer.appendChild(form);
  wrapper.appendChild(logoContainer);
  wrapper.appendChild(formContainer);
  authContainer.appendChild(wrapper);

  // Input validation
  if (emailInput) emailValidation(emailInput);
  if (passwordInput) passwordValidation(passwordInput);
  if (isSignup) {
    const confirmPassword = document.getElementById("confirm-password");
    if (confirmPassword) passwordValidation(confirmPassword);
  }

  forgotPassword.addEventListener(
    "click",
    forgotPasswordRoute(AuthForm, authContainer)
  );

  setAuthFormEvents(isSignup);
};
export default AuthForm;
