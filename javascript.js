// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
//---------------------------------------------------
// Codigo para el menu lateral
function openNav() {
  document.getElementById("id_navigation_container").style.display = "block";
}

function closeNav() {
  document.getElementById("id_navigation_container").style.display = "none";
}
//---------------------------------------------------