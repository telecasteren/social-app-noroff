import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export const submitEditedPost = async (post) => {
  try {
    const response = await authFetch(`${API_BASE_URL}${API_POSTS}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        media: {
          url: post.media.url,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    userMessage(
      "warning",
      "Error occurred when trying to submit the updated version of the post. Please try again."
    );
    console.error("Error submitting updated post:", error);
    throw error;
  }
};
