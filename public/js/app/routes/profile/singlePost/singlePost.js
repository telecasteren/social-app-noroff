import { dateBadge } from "/js/app/routes/profile/singlePost/createBadge.js";
import Comments from "/js/app/routes/profile/singlePost/comments/displayComments.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { createTitle } from "/js/app/components/titles/title.js";
import { editPostMenuEvents } from "/js/app/events/profile/editPost/menuHandlers.js";
import { toggleCommentFormBtn } from "/js/app/routes/profile/singlePost/comments/toggleCommentFormBtn.js";
import { commentForm } from "/js/app/components/forms/commentForm.js";
import { goBackBtn } from "/js/app/components/buttons/goBackBtn.js";
import { NO_IMG_URL } from "/js/utils/general/constants.js";

/**
 * Generates and returns a DOM element representing a detailed view of a single post.
 *
 * @function SinglePost extracts the post ID from the URL query parameters, retrieves the corresponding
 * post and author data, and dynamically creates a card layout displaying:
 * - Post image, title, caption, and metadata
 * - Author's avatar and profile link
 * - Number of likes from API
 * - Comments section (rendered via the `Comments()` component)
 * - A button that provides the ability to add comments
 *
 * @returns {HTMLElement} A container <div> element with the complete single post UI,
 * including post details and comments.
 */
const SinglePost = async () => {
  const post = await getSinglePost();
  const loggedInUser = await getCurrentUser();
  const loggedInUserName = loggedInUser.name || "Unknown user";

  const author = post.author.name || "Unknown author";
  const postImgUrl = post.media?.url || NO_IMG_URL;
  const postImgAlt = post.media?.alt || "Default post image";

  const backBtn = goBackBtn();

  const cardContainer = document.createElement("div");
  cardContainer.className =
    "grid grid-cols-1 xl:grid-cols-[2fr,1.5fr] justify-self-center mt-5 max-w-[95vw] md:max-w-[60vw]";

  const card = document.createElement("div");
  card.className = `relative flex flex-col bg-stone-50 border border-gray-200 rounded-l-sm
    shadow-sm dark:bg-[#0f0c29] dark:border-none`;

  const image = document.createElement("img");
  image.className = "rounded-l-sm w-full h-[500px] object-cover";
  image.src = postImgUrl;
  image.alt = postImgAlt;

  const contentDiv = document.createElement("div");
  contentDiv.className = "p-5 flex-1 overflow-y-auto";

  const userContainer = document.createElement("div");
  userContainer.className = "flex flex-wrap items-center justify-between mb-2";

  const authorContainer = document.createElement("div");
  authorContainer.className = "flex flex-wrap items-center gap-2";

  const authorIMG = document.createElement("img");
  authorIMG.setAttribute("data-userId", author);
  authorIMG.className =
    "w-8 h-8 object-cover rounded-full border border-accent-light dark:border-accent-dark";
  authorIMG.src = post.author.avatar.url;
  authorIMG.alt = post.author.avatar.alt;
  authorContainer.appendChild(authorIMG);

  const linkTitle = document.createElement("a");
  linkTitle.href = `/user/profile/?id=${author}`;

  const authorName = document.createElement("h5");
  authorName.setAttribute("data-userId", author);
  authorName.className = `text-2xl tracking-tight text-gray-900 dark:text-gray-200
  hover:text-accent-light hover:dark:text-accent-dark flex-grow`;
  authorName.textContent = author;
  linkTitle.appendChild(authorName);
  authorContainer.appendChild(linkTitle);

  const actionContainer = document.createElement("div");
  actionContainer.className = "flex flex-wrap gap-2 items-center justify-end";

  const allLikes = loadKey("likes") || {};
  const usersWhoLiked = allLikes[post.id] || [];

  const currentUser = loadKey("profile");
  const currentUserId = currentUser?.name;
  const hasLiked = currentUser && usersWhoLiked.includes(currentUserId);

  const likes = document.createElement("div");
  likes.id = "likes-icon";
  likes.innerHTML = `<i class="${
    hasLiked ? "fa-solid" : "fa-regular"
  } fa-heart cursor-pointer" style="color: var(--accent)"></i>`;
  actionContainer.appendChild(likes);

  const numbOfLikes = document.createElement("div");
  numbOfLikes.id = "numb-likes";

  const displayedLikes = post._count.reactions;
  numbOfLikes.textContent = displayedLikes;
  actionContainer.appendChild(numbOfLikes);

  const title = document.createElement("h5");
  title.className =
    "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  title.textContent = post.title;

  const paragraph = document.createElement("p");
  paragraph.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  paragraph.textContent = post.body;

  const helpText = createTitle("Edit");
  helpText.className = `ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 text-[0.8rem]`;

  const editPostIcon = document.createElement("div");
  editPostIcon.setAttribute("data-id", post.id);
  editPostIcon.className = `
  edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10
  bg-gray-200 hover:bg-gray-400 text-black rounded shadow-md cursor-pointer
  flex items-center justify-start overflow-hidden transition-all duration-300 group
`;

  const svgIcon = document.createElement("div");
  svgIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z"/>
</svg>
`;

  userContainer.appendChild(authorContainer);
  userContainer.appendChild(actionContainer);

  contentDiv.appendChild(userContainer);
  contentDiv.appendChild(title);
  contentDiv.appendChild(paragraph);

  if (post.created) {
    const createdDate = dateBadge(
      new Date(post.created),
      "gray-100",
      "gray-100",
      "gray-500"
    );
    contentDiv.appendChild(createdDate);
  }

  const commentSection = document.createElement("div");
  commentSection.id = "comments-section";
  commentSection.className = `flex flex-col xl:w-96 rounded-r-sm
  border border-solid border-gray-200 dark:border-[#0f0c29] p-0`;

  const commentsContainer = document.createElement("div");
  commentsContainer.className =
    "sm:max-h-[40vh] sm:min-h-[20vh] xl:max-h-[80vh] xl:min-h-[80vh] p-5 overflow-y-auto";
  const comment = await Comments();
  commentsContainer.appendChild(comment);

  const formDiv = document.createElement("div");
  formDiv.className = "relative bottom-0 p-5 m-0 bg-stone-50 dark:bg-[#0f0c29]";

  const form = await commentForm();
  formDiv.appendChild(form);

  const commentBtn = toggleCommentFormBtn();
  commentBtn.classList.add("mt-2");
  commentBtn.classList.remove("hidden");
  formDiv.appendChild(commentBtn);

  commentSection.appendChild(commentsContainer);
  commentSection.appendChild(formDiv);

  commentBtn.addEventListener("click", (event) => {
    event.preventDefault();
    commentBtn.classList.add("hidden");
    form.classList.toggle("hidden");
  });

  if (loggedInUserName === author) {
    helpText.classList.add("group-hover:opacity-100");

    editPostIcon.appendChild(svgIcon);
    editPostIcon.appendChild(helpText);
    card.appendChild(editPostIcon);

    editPostIcon.addEventListener("click", async () => {
      const postData = {
        id: post.id,
        media: {
          url: post.media?.url || "",
        },
        title: post.title || "",
        body: post.body || "",
      };
      await editPostMenuEvents(postData);
    });
  }

  card.appendChild(image);
  card.appendChild(contentDiv);
  cardContainer.appendChild(card);
  cardContainer.appendChild(commentSection);
  cardContainer.appendChild(backBtn);

  return cardContainer;
};
export default SinglePost;
