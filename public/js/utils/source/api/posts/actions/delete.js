import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const deletePost = async (post) => {
  try {
    const response = await authFetch(`${API_BASE_URL}${API_POSTS}/${post.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    userMessage("warning", "Error occurred when trying to delete the post.");
    console.error(`Error when deleting post with ID: ${post.id}`, error);
    throw error;
  }
};
