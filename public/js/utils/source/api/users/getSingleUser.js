import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { userMessage } from "/js/utils/messages/userMessage.js";

export const getSingleUserProfile = async (username) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/${username}?_posts=true&_followers=true&_following=true`
  );

  if (!response.ok) {
    userMessage("error", "Could not fetch user.");
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};
