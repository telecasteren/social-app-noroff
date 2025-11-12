import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    const token = localStorage.getItem("token");

    if (!user || !token) {
      userMessage("info", "Please login or sign up to continue.");
      setTimeout(clearUserMessage, 2000);
      return false;
    }

    return true;
  } catch (error) {
    userMessage("error", "An error occurred while authenticating.");
    throw error;
  }
};
