export const loadKey = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
