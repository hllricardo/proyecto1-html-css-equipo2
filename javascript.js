// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("divEquipo");

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  for(let i=0; i<textEquipo.length; i++){
    /*textEquipo[i].style.backgroundColor = "red";*/
    textEquipo[i].classList.toggle("dark-mode-equipo");
  }
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