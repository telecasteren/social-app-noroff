import { createSkeletonCard } from "/js/app/components/loader/skeletonCardHTML.js";

/**
 * Creates a container element holding multiple skeleton cards for loading states.
 *
 * The container uses a grid layout and ARIA attributes to indicate a loading status.
 * By default, it generates 3 skeleton cards using `createSkeletonCard`.
 *
 * @function createSkeletonCards
 * @returns {HTMLDivElement} A container element with skeleton cards appended.
 *
 * @requires createSkeletonCard
 *
 * @sideeffects
 * - Constructs DOM elements for the skeleton loading UI.
 */
export const createSkeletonCards = () => {
  const container = document.createElement("div");
  container.className =
    "grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 md:m-20";
  container.setAttribute("role", "status");
  container.setAttribute("aria-busy", "true");

  const cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push(createSkeletonCard());
  }
  cards.forEach((card) => container.appendChild(card));
  return container;
};
