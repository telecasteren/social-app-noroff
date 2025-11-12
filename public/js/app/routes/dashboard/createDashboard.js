import { typeTitle, typeText } from "/js/app/components/titles/typewriter.js";
import createButton from "/js/app/components/buttons/primaryBtn.js";
import { SITE_NAME, SITE_LOGO_PIZZA } from "/js/utils/general/constants.js";

/**
 * Creates the main dashboard page for the application.
 *
 * This function dynamically generates the dashboard layout, including:
 * - A header with the site title animated via `typeTitle`.
 * - A content container displaying a caption with a typewriter effect using `typeText`.
 * - A logo image for branding.
 * - "Log in" and "Sign up" buttons with basic click prevention (to be hooked with auth handlers).
 *
 * @function
 * @returns {HTMLElement} The fully constructed dashboard container element, ready to be appended to the DOM.
 */
const Dashboard = () => {
  const dashboardContainer = document.createElement("div");
  dashboardContainer.className =
    "dashboard-container justify-items-center min-h-screen p-8 gap-16";

  const header = document.createElement("header");
  const title = typeTitle(SITE_NAME);
  title.classList.add("text-bigger", "md:text-[4.5rem]", "typewriter");
  header.appendChild(title);

  const contentContainer = document.createElement("div");
  contentContainer.className = "justify-center items-center m-2 h-[50px]";

  const logoIcon = document.createElement("img");
  logoIcon.className = "w-18 h-18 dark:invert";
  logoIcon.src = SITE_LOGO_PIZZA;
  logoIcon.alt = "Logo icon of a Pizza character";

  setTimeout(() => {
    const caption = typeText();
    caption.classList.add(
      "flex",
      "flex-wrap",
      "break-words",
      "whitespace-normal",
      "max-w-full",
      "text-center"
    );
    contentContainer.appendChild(caption);
  }, 2000);

  const loginBtn = createButton({
    text: "Log in.",
    href: "#",
    newTab: false,
  });
  loginBtn.id = "loginBtn";
  loginBtn.classList.add("btn-primary");
  loginBtn.addEventListener("click", (e) => e.preventDefault());

  const signupBtn = createButton({
    text: "Sign up.",
    href: "#",
    newTab: false,
  });
  signupBtn.id = "signupBtn";
  signupBtn.classList.add("btn-secondary");
  signupBtn.addEventListener("click", (e) => e.preventDefault());

  dashboardContainer.appendChild(header);
  dashboardContainer.appendChild(logoIcon);
  dashboardContainer.appendChild(contentContainer);

  dashboardContainer.appendChild(loginBtn);
  dashboardContainer.appendChild(signupBtn);

  return dashboardContainer;
};
export default Dashboard;
