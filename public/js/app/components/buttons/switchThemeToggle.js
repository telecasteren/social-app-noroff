import { endDot } from "/js/utils/general/constants.js";

export const switchThemeToggle = () => {
    const toggleContainer = document.createElement("div");
    toggleContainer.className =
        "toggle-container flex items-center justify-between";

    const toggleTitle = document.createElement("p");
    toggleTitle.innerHTML = "Switch theme" + endDot;

    const toggleLabel = document.createElement("label");
    toggleLabel.className = "switch-label";

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";

    const toggleSpan = document.createElement("span");
    toggleSpan.className = "slider-span round";

    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSpan);
    toggleContainer.appendChild(toggleTitle);
    toggleContainer.appendChild(toggleLabel);

    toggleInput.checked = document.documentElement.classList.contains("dark");
    toggleInput.addEventListener("change", () => {
        document.documentElement.classList.toggle("dark", toggleInput.checked);
        localStorage.setItem("theme", toggleInput.checked ? "dark" : "light");
    });

    return toggleContainer;
};
