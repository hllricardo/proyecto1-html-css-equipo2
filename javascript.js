const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});