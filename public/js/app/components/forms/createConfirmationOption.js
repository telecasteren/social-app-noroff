export const createConfirmationOption = (text) => {
    const option = document.createElement("p");
    option.className =
        "mt-2 max-w-content text-sm text-red-600 hover:underline hover:font-bold cursor-pointer";
    option.id = "error-text";
    option.textContent = text;
    return option;
};
