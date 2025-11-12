import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const submitReaction = async () => {
  const { id: postId } = await getPostParams();

  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_POSTS}/${postId}/react/❤️`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    userMessage(
      "warning",
      "An error occurred when you tried to like this post. Please try again."
    );
    console.error("Error submitting reaction:", error);
    throw error;
  }
};
