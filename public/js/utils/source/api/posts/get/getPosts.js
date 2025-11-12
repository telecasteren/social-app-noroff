import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
  POSTS_PER_PAGE,
} from "/js/utils/source/api/general/constants.js";

export const getPosts = async (limit = POSTS_PER_PAGE, page = 1) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}?_author=true&_comments=true&limit=${limit}&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Fetching posts failed.`);
  }

  return await response.json();
};
