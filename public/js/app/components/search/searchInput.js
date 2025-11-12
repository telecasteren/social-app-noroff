/**
 * Creates and returns a search input form for posts.
 *
 * - Includes a visually hidden label for accessibility.
 * - Contains a search icon inside the input field.
 * - Input field is styled for both light and dark modes.
 * - Includes a submit button to trigger the search.
 *
 * @function searchInput
 * @returns {HTMLFormElement} A form element containing a search input and submit button.
 */
const searchInput = () => {
  const form = document.createElement("form");
  form.className = "max-w-md";

  const label = document.createElement("label");
  label.htmlFor = "default-search";
  label.className =
    "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white";
  label.textContent = "Search";

  const divWrapper = document.createElement("div");
  divWrapper.className =
    "relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px]";

  const divIcon = document.createElement("div");
  divIcon.className =
    "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "w-4 h-4 text-gray-500 dark:text-gray-400");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 20 20");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z");

  svg.appendChild(path);
  divIcon.appendChild(svg);

  const input = document.createElement("input");
  input.type = "search";
  input.id = "default-search";
  input.className = `block w-full p-4 ps-10
  text-sm text-gray-900 border border-gray-300 rounded-lg
  bg-gray-50 focus:ring-blue-500 focus:border-blue-500
  dark:border-none dark:bg-[#0f0c29] dark:placeholder-gray-400 dark:text-white
  dark:focus:ring-blue-500 dark:focus:border-blue-500`;
  input.placeholder = "Search posts..";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.id = "search-btn";
  button.className =
    "absolute inset-y-0 end-0 flex items-center m-2 pl-2 pr-2 bg-[var(--accent)] hover:brightness-110 text-sm text-black rounded-md transition duration-300";
  button.textContent = "Search";

  divWrapper.appendChild(divIcon);
  divWrapper.appendChild(input);
  divWrapper.appendChild(button);

  form.appendChild(label);
  form.appendChild(divWrapper);

  return form;
};
export default searchInput;
