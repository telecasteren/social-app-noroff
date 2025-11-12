/**
 * This is the create new post menu.
 * @returns menuWrapper that holds the speed dial menu for creating new posts.
 */

const createPostMenu = () => {
  const menuWrapper = document.createElement("div");
  menuWrapper.className = "fixed bottom-6 right-24 group z-50";

  const menu = document.createElement("div");
  menu.id = "speed-dial-menu-dropdown";
  menu.className = `flex flex-col justify-end hidden mb-4 bg-white
  rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600`;

  const ul = document.createElement("ul");
  ul.className = "text-sm text-gray-500 dark:text-gray-300";

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.className = `flex items-center px-4 py-2 bg-white
  rounded-md shadow-sm text-sm dark:bg-[#0f0c29]`;

  a.appendChild(document.createTextNode("Create new post."));
  li.appendChild(a);
  ul.appendChild(li);
  menu.appendChild(ul);
  menuWrapper.appendChild(menu);

  const button = document.createElement("button");
  button.type = "button";
  button.id = "create-post";
  button.setAttribute("aria-controls", "speed-dial-menu-dropdown");
  button.className = `flex items-center justify-center text-center ml-auto
  text-white bg-accent-light rounded-full w-16 h-16 hover:brightness-110 dark:bg-accent-dark
  hover:scale-105 transition-transform duration-300`;

  const buttonIcon = document.createElement("p");
  buttonIcon.className = "font-medium text-bigger dark:text-bg-dark1";
  buttonIcon.innerText = "+";
  button.appendChild(buttonIcon);

  const span = document.createElement("span");
  span.className = "sr-only";
  span.textContent = "Open actions menu";
  button.appendChild(span);

  menuWrapper.appendChild(button);

  return menuWrapper;
};
export default createPostMenu;
