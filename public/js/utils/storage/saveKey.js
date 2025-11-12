export const saveKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
