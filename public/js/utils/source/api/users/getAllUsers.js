import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export const getAllUsersFromApi = async () => {
  const response = await authFetch(API_BASE_URL + API_USERS);

  if (!response.ok) {
    throw new Error("Fetching users failed.");
  }

  const users = await response.json();
  return users;
};
