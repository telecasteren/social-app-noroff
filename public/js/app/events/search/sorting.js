const getPostsAndContainers = () => {
  const container = document.querySelector("#posts-container");
  const posts = Array.from(container.querySelectorAll(".user-post"));
  return { container, posts };
};

export const sortByCreated = () => {
  const { container, posts } = getPostsAndContainers();

  posts.sort(
    (a, b) => new Date(b.dataset.created) - new Date(a.dataset.created)
  );
  posts.forEach((post) => container.appendChild(post));
};

export const sortByLikes = () => {
  const { container, posts } = getPostsAndContainers();

  posts.sort((a, b) => Number(b.dataset.likes) - Number(a.dataset.likes));
  posts.forEach((post) => container.appendChild(post));
};

export const sortByComments = () => {
  const { container, posts } = getPostsAndContainers();

  posts.sort((a, b) => Number(b.dataset.comments) - Number(a.dataset.comments));
  posts.forEach((post) => container.appendChild(post));
};
