import { userMessage } from "/js/utils/messages/userMessage.js";

export const getPostParams = () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const id = urlParams.get("id");

  if (!id) {
    userMessage("warning", "Missing id in URL.");
    throw new Error(`No ID in URL.`);
  }

  return { id };
};
