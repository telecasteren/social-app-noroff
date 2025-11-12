import {
  sortByComments,
  sortByCreated,
  sortByLikes,
} from "/js/app/events/search/sorting.js";

/**
 * Creates a sort options dropdown menu.
 *
 * @param {object} [options={}] - Configuration for the sort menu
 * @param {string} [options.triggerType="button"] - The type of element to use as the dropdown trigger ("button", "span" etc.)
 * @param {string} [options.triggerText="Sort options"] - The text content of the dropdown trigger
 * @param {string} [options.triggerClasses=""] - Additional CSS classes to apply to the dropdown trigger
 * @param {string} [options.containerClasses="sortOptions relative"] - CSS classes to apply to the main container of the sort options
 * @returns {HTMLDivElement} The container holding the sort options dropdown
 */
export const createSortOptions = ({
  triggerType = "button",
  triggerText = "Sort options",
  triggerClasses = "",
  containerClasses = "sortOptions relative w-fit",
}) => {
  const container = document.createElement("div");
  container.className = containerClasses;

  const trigger = document.createElement(triggerType);
  trigger.textContent = triggerText;
  trigger.id = "dropdownInformationButton";
  trigger.setAttribute("data-dropdown-toggle", "dropdownInformation");

  if (triggerType === "button") {
    // FEED
    trigger.className =
      triggerClasses ||
      `font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-gray-800
      bg-gray-50 hover:bg-gray-100 border border-gray-300 focus:ring-1 focus:outline-none focus:ring-blue-300
      dark:bg-[#0f0c29] dark:hover:brightness-110 dark:border-none dark:text-gray-400`;
    trigger.type = "button";
    trigger.innerHTML = `Sort options <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>`;
  } else {
    // PROFILE
    trigger.className = triggerClasses || "cursor-pointer hover:underline";
  }

  const dropdown = document.createElement("div");
  dropdown.id = "dropdownInformation";
  dropdown.className = `z-10 absolute hidden bg-white divide-y divide-gray-100 rounded-lg
  shadow-sm w-44 dark:bg-[#0f0c29] dark:divide-gray-600`;

  const userInfo = document.createElement("div");
  userInfo.className = "px-4 py-3 text-sm text-gray-900 dark:text-white";
  userInfo.innerHTML = `<div class="font-medium truncate">Filter posts by:</div>`;

  const menuList = document.createElement("ul");
  menuList.className = "py-2 text-sm text-gray-700 dark:text-gray-200";
  menuList.setAttribute("aria-labelledby", "dropdownInformationButton");

  const items = ["Most recent", "Most likes", "Most comments"];
  items.forEach((text, index) => {
    const li = document.createElement("li");
    li.id = index;
    li.className =
      "sort-options w-full text-black hover:text-accent-light dark:text-white dark:hover:text-accent-dark";
    const a = document.createElement("a");
    a.className = "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600";
    a.textContent = text;
    li.appendChild(a);
    menuList.appendChild(li);

    li.addEventListener("click", () => {
      if (index === 0) sortByCreated();
      if (index === 1) sortByLikes();
      if (index === 2) sortByComments();
      dropdown.classList.add("hidden");
    });
  });

  dropdown.appendChild(userInfo);
  dropdown.appendChild(menuList);

  container.appendChild(trigger);
  container.appendChild(dropdown);

  trigger.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !container.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  return container;
};

/**
 * Creates a wrapper containing the sort options
 *
 * @returns {HTMLDivElement} It's the wrapper for the sort options in Feed and Profile pages.
 */
export const sortOptions = () => {
  const sortWrapper = document.createElement("div");
  sortWrapper.className = "mt-20 mb-10 w-full flex flex-wrap justify-center";

  const sortingMenu = createSortOptions({
    triggerType: "button",
    triggerText: "Sort options",
  });
  sortWrapper.appendChild(sortingMenu);

  return sortWrapper;
};
