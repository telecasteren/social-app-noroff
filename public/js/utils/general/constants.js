// General
export const SITE_NAME = "Foodiegram";
export const SITE_LOGO_PIZZA = "/resources/logo/logo-pizza.png";
export const SITE_LOGO_NAME = "/resources/logo/foodiegram-logo.png";
export const NO_IMG_URL = "/resources/icons/no-image-icon.webp";

// Elements
export const MENU_ICON = "/resources/icons/hamburger-icon-f.png";
export const endDot = `<span style="color: var(--accent); font-size: 25px;">.</span>`;

// Styles
export const sharedStyles = `block w-[80%] cursor-pointer text-sm text-gray-900 border 
border-gray-300 rounded-lg bg-gray-50 placeholder-gray-800
focus:ring-blue-500 focus:border-blue-500`;

// Meta descriptions
export const defaultPostDesc = `${SITE_NAME}: stories from the cultural corners of the world!`;
export const defaultDescFallback =
  "Login or create you account to connect with fellow Foodies.";
export const defaultDescriptions = {
  "/user/profile/": "Follow and you might make a new friend.",
  "/user/post/": "Post. Like and comment.",
  "/user/feed/": "Explore for tips and recommendations.",
};
