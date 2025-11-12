import {
  displayFormErrorMessage,
  clearFormErrorMessage,
} from "/js/utils/messages/formMessage.js";
import { getAuthInputs } from "./getFormInputs.js";

/**
 * Adds a validation listener to the email input field.
 * Checks for proper email format and ensures it ends with
 * either "@noroff.no" or "@stud.noroff.no".
 * @returns {string} A message indicating whether the email format is valid or not.
 */
export const emailValidation = () => {
  const { emailInput } = getAuthInputs();
  const validDomains = ["@noroff.no", "@stud.noroff.no"];

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const cleanEmail = emailInput.value.trim();
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!pattern.test(cleanEmail)) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        displayFormErrorMessage(
          emailInput,
          `Email must contain a "@" and a "." to be valid.`
        );
        return;
      }

      const emailDomainIsValid = validDomains.some((domain) =>
        cleanEmail.endsWith(domain)
      );

      if (!emailDomainIsValid) {
        displayFormErrorMessage(
          emailInput,
          `Please enter a valid email ending with ${validDomains.join(" or ")}.`
        );
        return;
      }

      emailInput.setCustomValidity("");
      clearFormErrorMessage(emailInput);
    });
  }
};

/**
 * Validates user password with these criteria:
 * - At least 8 characters long
 * - Includes lowercase and uppercase letters
 * - Contains a number
 * - Includes at least one special character
 *
 * @returns {string} A message indicating whether the password is valid or what criteria are missing.
 */
export const passwordValidation = () => {
  const { passwordInput, confirmPassInput } = getAuthInputs();

  if (!passwordInput) {
    console.warn("passwordInput not found in DOM.");
    return "Password input is missing.";
  }

  if (passwordInput) {
    const password = passwordInput.value;
    const errors = [];

    if (password.length < 8) {
      errors.push("contain at least 8 characters");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("contain at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("contain at least 1 uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("contain at least 1 number");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push("contain at least 1 special sign (Ex. !@#$%^&*)");
    }

    if (errors.length > 0) {
      return "Password not valid. It must:\n- " + errors.join("\n- ");
    }

    if (confirmPassInput && confirmPassInput.value !== password) {
      displayFormErrorMessage(confirmPassInput, "Passwords must match.");
    }

    return "The password is valid";
  }
};
