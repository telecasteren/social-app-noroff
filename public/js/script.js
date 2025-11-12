import setTheme from "/js/utils/theme/colorMode.js";
import Navbar from "/js/app/components/navbar/Navbar.js";
import Footer from "/js/app/components/footer/footer.js";
import renderContent from "/js/app/ui/renderContent.js";
import { setMetaDescriptions } from "/js/utils/general/setMetaDesc.js";
import { setPageTitles } from "/js/utils/general/setPageTitles.js";
import { isAuthenticated } from "/js/utils/source/api/auth/isAuthenticated.js";
import { loadKey } from "/js/utils/storage/loadKey.js";

document.addEventListener("DOMContentLoaded", async () => {
  setTheme();

  // AUTH - check if user is logged in
  let auth = false;
  try {
    auth = await isAuthenticated();
  } catch (error) {
    console.warn("Auth check failed:", error);
  }

  if (auth) {
    const username = loadKey("profile")?.name;
    if (window.location.pathname === "/") {
      history.replaceState(null, "", `/user/profile/?id=${username}`);
    }

    try {
      setMetaDescriptions();
      setPageTitles();
    } catch (error) {
      console.warn("Setting up meta failed:", error);
    }
  }

  // CONTENT - render main content
  Navbar(auth);
  Footer();
  renderContent();
});
