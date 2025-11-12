import { userMessage } from "../../messages/userMessage.js";
import { getSingleUserProfile } from "../api/users/getSingleUser.js";

export const getUserParams = async () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const username = urlParams.get("id");

  if (!username) {
    userMessage("warning", "Missing username in URL.");
    throw new Error(`No username in URL.`);
  }

  const user = await getSingleUserProfile(username);

  return user;
};
