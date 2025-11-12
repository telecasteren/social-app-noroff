/**
 * Removes the currently displayed user alert message from the DOM, if it exists.
 * Useful for clearing any existing messages before showing a new one and
 * is good to combine with setInterval.
 *
 * @function clearUserMessage
 * @returns {void}
 */
export const clearUserMessage = () => {
  const existingAlert = document.querySelector(".user-message");
  if (existingAlert) existingAlert.remove();
};

/**
 * Displays a custom user message alert at the top of the screen.
 * Automatically removes any previous message. Can be dismissed by clicking outside of it.
 *
 * @function userMessage
 * @param {"info" | "error" | "success" | "warning" | "alert"} type - The type of message to display, which affects styling.
 * @param {string} message - The message text content to display to the user.
 * @returns {void}
 *
 * @example
 * userMessage("success", "Your post was submitted successfully!");
 */
export const userMessage = (type, message) => {
  clearUserMessage();

  const alertTypes = {
    info: {
      text: "text-blue-800",
      bg: "bg-blue-50",
      darkText: "dark:text-blue-400",
    },
    error: {
      text: "text-red-800",
      bg: "bg-red-50",
      darkText: "dark:text-red-400",
    },
    success: {
      text: "text-green-800",
      bg: "bg-green-50",
      darkText: "dark:text-green-400",
    },
    warning: {
      text: "text-yellow-800",
      bg: "bg-yellow-50",
      darkText: "dark:text-yellow-300",
    },
    alert: {
      text: "text-gray-800",
      bg: "bg-gray-50",
      darkText: "dark:text-gray-300",
    },
  };

  const { text, bg, darkText } = alertTypes[type] || alertTypes.dark;

  const div = document.createElement("div");
  div.setAttribute("role", "alert");
  div.className = `user-message fixed top-5 left-1/2 transform -translate-x-1/2 w-96 p-4 mb-4
  text-sm ${text} text-center rounded-lg ${bg} dark:bg-gray-800 ${darkText} shadow-lg z-50`;

  const span = document.createElement("span");
  span.className = "font-medium";
  span.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}! `;

  div.appendChild(span);
  div.appendChild(document.createTextNode(message));
  document.body.prepend(div);

  const closeAlert = (event) => {
    if (!div.contains(event.target)) {
      div.remove();
      document.removeEventListener("click", closeAlert);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", closeAlert);
  }, 500);
};
