import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";

export const updateUserBio = async (user) => {
  const form = document.querySelector("#bio-form");
  if (!form) return;

  const newBio = form.querySelector("#bio").value.trim();
  const bio = user.bio || newBio;

  const profile = await getUserParams();
  const userId = profile.name;

  try {
    const response = await authFetch(`${API_BASE_URL}${API_USERS}/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ bio }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error("Updating profile bio failed.");
  }
};

export const clearUserBio = async () => {
  const profile = await getUserParams();
  const userId = profile.name;

  try {
    const response = await authFetch(`${API_BASE_URL}${API_USERS}/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ bio: "" }),
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
    throw new Error("Deleting profile bio failed.");
  }
};
