import { loadKey } from "/js/utils/storage/loadKey.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

/**
 * Fetches the currently logged-in user's profile from the API.
 *
 * Retrieves the user profile stored in local storage, checks for a valid
 * authentication token, and fetches the user's full data from the backend,
 * including their posts. Returns `null` if no token is found, the fetch fails,
 * or an error occurs.
 *
 * @async
 * @returns {Promise<Object|null>} The current user's data object if available, otherwise `null`.
 *
 * @example
 * const user = await getCurrentUser();
 * if (user) {
 *   console.log(`Logged in as: ${user.name}`);
 * } else {
 *   console.log("No user logged in.");
 * }
 */
export const getCurrentUser = async () => {
  try {
    const currentUser = loadKey("profile");
    const userName = currentUser.name;

    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${userName}?_posts=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.warn("Failed to fetch current user:", response.status);
      return null;
    }

    const data = await response.json();
    return data.data ?? null;
  } catch (error) {
    return null;
  }
};
