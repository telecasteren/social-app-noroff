const setTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
};
export default setTheme;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setTheme);
