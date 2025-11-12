import createButton from "/js/app/components/buttons/primaryBtn.js";

/**
 * Creates a follow button element using the primaryBtn utility createButton.
 *
 * @returns {HTMLAnchorElement} - The follow button element.
 */
export const createFollowButton = () => {
  const followBtn = createButton({
    text: "Follow",
    href: "#",
    newTab: false,
  });
  followBtn.classList.add("follow-btn", "btn-secondary", "justify-self-center");
  return followBtn;
};
