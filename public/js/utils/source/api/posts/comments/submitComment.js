import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const submitComment = async (commentData) => {
  try {
    const { id: postId } = getPostParams();

    const response = await authFetch(
      `${API_BASE_URL}${API_POSTS}/${postId}/comment`,
      {
        method: "POST",
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      userMessage("Failed to submit comment. Please try again.");
      throw new Error("Failed to submit comment");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
