import {
    API_BASE_URL,
    API_USERS,
} from "/js/utils/source/api/general/constants.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";

export const updateUserProfile = async ({ name, bio, avatar }) => {
    const body = {
        bio,
        avatar: { url: avatar.url, alt: `Profile image for ${name}` },
    };

    const response = await authFetch(`${API_BASE_URL}${API_USERS}/${name}`, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Updating profile failed: ${response.status}`);
    }

    return await response.json();
};
