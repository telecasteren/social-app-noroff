import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const queryPosts = async (query) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/search?q=${query}&_author=true`
  );

  if (!response.ok) {
    throw new Error(`Searching in posts failed.`);
  }

  return await response.json();
};
