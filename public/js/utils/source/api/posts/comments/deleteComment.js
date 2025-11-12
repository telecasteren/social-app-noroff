import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const deleteComment = async (commentId) => {
  const { id: postId } = getPostParams();

  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_POSTS}/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      userMessage("success", "Comment deleted successfully");

      setTimeout(() => clearUserMessage(), 2000);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    userMessage("error", "Failed to delete your comment. Please try again.");
    console.error(
      `deleteComment(): couldn't delete comment: ${commentId}, "Error:" ${error.message}`
    );
    return;
  }
};
