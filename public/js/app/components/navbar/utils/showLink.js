/**
 * Determines whether a navigation link should be displayed based on authentication state.
 *
 * @function showLink
 * @param {Object} link - The link object to evaluate.
 * @param {boolean} [link.authOnly] - True if the link should only be shown to authenticated users.
 * @param {boolean} [link.guestOnly] - True if the link should only be shown to unauthenticated users.
 * @param {boolean} auth - Whether the current user is authenticated.
 * @returns {boolean} True if the link should be displayed for the current authentication state, false otherwise.
 */
export const showLink = (link, auth) => {
  if (link.authOnly && !auth) return false;
  if (link.guestOnly && auth) return false;
  return true;
};
