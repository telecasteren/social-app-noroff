const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    const isDark =
        storedTheme === "dark" || storedTheme === "light"
            ? storedTheme === "dark"
            : prefersDarkTheme.matches;
    document.documentElement.classList.toggle("dark", isDark);
};
export default setTheme;

prefersDarkTheme.addEventListener("change", setTheme);
