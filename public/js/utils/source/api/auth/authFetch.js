import { headers } from "../general/headers.js";

export const authFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
};
