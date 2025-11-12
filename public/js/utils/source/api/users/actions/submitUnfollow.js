import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export const submitUnfollow = async (user) => {
  const username = user.name;

  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${username}/unfollow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      let message = "Unknown error occurred";
      if (Array.isArray(errorData.errors)) {
        message =
          errorData.errors[0]?.message || JSON.stringify(errorData.errors);
      }
      userMessage("warning", message);
      throw new Error(message);
    }

    return { success: true };
  } catch (error) {
    userMessage(
      "error",
      "An error occurred when you tried to follow this user. Please try again."
    );

    throw error;
  }
};
