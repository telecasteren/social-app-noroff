import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const getSinglePost = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));

  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/${postId}?_author=true&_comments=true&_reactions=true`
  );

  if (!response.ok) {
    throw new Error(`Fetching single post failed.`);
  }

  const { data } = await response.json();
  return data;
};
