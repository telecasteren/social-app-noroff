import { loadKey } from "/js/utils/storage/loadKey.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
  POSTS_PER_PAGE,
} from "/js/utils/source/api/general/constants.js";

export const getUserPosts = async (limit = POSTS_PER_PAGE, page = 1) => {
  const activeUser = loadKey("profile") || {};
  const loggedInUsername = activeUser.name || "";

  const urlParams = new URLSearchParams(window.location.search);
  const currentProfile = urlParams.get("id");

  const profileName =
    currentProfile && currentProfile !== loggedInUsername
      ? currentProfile
      : loggedInUsername;

  const url = `${API_BASE_URL}${API_USERS}/${profileName}/posts/?limit=${limit}&page=${page}`;
  const response = await authFetch(url);

  if (!response.ok) {
    throw new Error(`Fetching posts for user ${profileName} failed.`);
  }

  return await response.json();
};
