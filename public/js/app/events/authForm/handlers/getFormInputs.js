export const getAuthInputs = () => {
  const form = document.getElementById("auth-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  return { form, usernameInput, emailInput, passwordInput, confirmPassInput };
};
