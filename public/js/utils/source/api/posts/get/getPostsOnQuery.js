import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const getPostsByQuery = async (page = 1, query) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}?_author=true&_comments=true&page=${page}&search?q=${query}`
  );

  if (!response.ok) {
    throw new Error(`Fetching posts with search for: "${query}" failed.`);
  }

  return await response.json();
};
