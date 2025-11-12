/**
 * Inserts an error message after each input field.
 * @param field represents the sibling to insert the message after.
 * @param message holds the message text of the error message.
 * @example
 * ```js
 displayFormErrorMessage(
        emailInput,
        `Please enter a valid email address.`
      );
      ```
 */
export const displayFormErrorMessage = (field, message) => {
  let isExistingError = field.nextElementSibling;
  if (isExistingError && isExistingError.classList.contains("formError")) {
    isExistingError.innerText = message;
  } else {
    const errorDiv = document.createElement("div");
    errorDiv.className = "formError text-red-600 mt-2";
    errorDiv.innerText = message;

    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
};

/**
 * Removes an existing error message from an input field.
 * @param field represents the field to clear the error from.
 * @example
 * ```js
 clearFormErrorMessage(emailInput);
      ```
 */
export const clearFormErrorMessage = (field) => {
  const existingError = field.nextElementSibling;
  if (existingError && existingError.classList.contains("formError")) {
    existingError.remove();
  }
};
