import { SITE_LOGO_NAME, SITE_NAME } from "/js/utils/general/constants.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footer = document.createElement("footer");
  footer.className =
    "footer mt-10 mb-10 text-tiny flex gap-6 flex-wrap items-center justify-center dark:text-dark";

  const copyright = document.createElement("p");
  copyright.id = "footer-copyright";
  copyright.textContent = `2025-${currentYear}`;

  const img = document.createElement("img");
  img.className = "dark:invert";
  img.src = SITE_LOGO_NAME;
  img.alt = `${SITE_NAME} logo`;
  img.width = 80;
  img.height = 80;

  footer.appendChild(copyright);
  footer.appendChild(img);

  document.body.appendChild(footer);
};
export default Footer;
