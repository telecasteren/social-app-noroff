/**
 * Converts a Date object into a human-readable "time ago" string.
 *
 * @param {Date} date - The date to convert to a relative time string.
 * @returns {string} A string representing the relative time since the date,
 *  e.g., "5 minutes ago", "2 days ago", or "just now". Returns "Unknown" if
 *  the date is not provided.
 *
 * @example
 * const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
 * console.log(timeAgo(fiveMinutesAgo)); // "5 minutes ago"
 */
const timeAgo = (date) => {
  if (!date) return "Unknown";

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

/**
 * Creates a styled badge element displaying the relative time since a given date.
 *
 * @param {Date} createdAt - The date to display in the badge.
 * @param {string} bgColor - The background color class (e.g., "blue-500").
 * @param {string} textColor - The text color class (e.g., "white").
 * @param {string} borderColor - The border color class (e.g., "blue-700").
 * @returns {HTMLSpanElement} A span element styled as a badge with the "time ago" text.
 *
 * @example
 * const badge = dateBadge(new Date(), "blue-500", "white", "blue-700");
 * document.body.appendChild(badge);
 */
export const dateBadge = (createdAt, bgColor, textColor, borderColor) => {
  const span = document.createElement("span");
  span.className = `bg-${bgColor} text-${textColor} text-xs font-medium inline-flex items-center
  px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-${textColor} border border-${borderColor}`;

  span.appendChild(document.createTextNode(timeAgo(createdAt)));

  return span;
};
