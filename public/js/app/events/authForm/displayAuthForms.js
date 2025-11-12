import AuthForm from "/js/app/components/forms/authForm.js";

export const displayAuthForms = () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  if (loginBtn) loginBtn.addEventListener("click", () => AuthForm(false));
  if (signupBtn) signupBtn.addEventListener("click", () => AuthForm(true));
};
