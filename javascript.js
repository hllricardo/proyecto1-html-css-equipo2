// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("divEquipo");
const textSobre = document.getElementsByClassName("divSobre");

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  for (let i = 0; i < textEquipo.length; i++) {
    textEquipo[i].classList.toggle("dark-mode-equipo");
  }
  for (let i = 0; i < textSobre.length; i++) {
    textSobre[i].classList.toggle("dark-mode-equipo");
  }
});
//---------------------------------------------------
// Codigo para el menu lateral
function openNav() {
  document.getElementById("id_navigation_container").style.display = "block";
  document.querySelector(".nav_container").style.padding = "0 10px";
}

function closeNav() {
  document.getElementById("id_navigation_container").style.display = "";
  document.querySelector(".nav_container").style.padding = "10px 30px";
}
//---------------------------------------------------

// Input validation for form in contacto.html
function validateInput(id, regex, errorMessage, minLength = 0) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById(`${id}_msg_error`);
  const value = input.value;

  if (!value) {
    errorEl.innerText = "";
    return false;
  }

  if (
    (minLength && value.length < minLength) ||
    (regex && !regex.test(value))
  ) {
    errorEl.innerText = errorMessage;
    errorEl.classList.add("error");
    return false;
  }

  errorEl.innerText = "";
  return true;
}

function name_validation() {
  return validateInput(
    "name",
    /^[\p{L}]+$/u,
    "Name cannot contain numbers or symbols",
  );
}

function surname_validation() {
  return validateInput(
    "surname",
    /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u,
    "Surname cannot contain numbers or symbols",
  );
}

function email_validation() {
  return validateInput(
    "email",
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Enter a valid email address (e.g., name@example.com)",
  );
}

function message_validation() {
  return validateInput(
    "message",
    null,
    "Message must be at least 10 characters",
    10,
  );
}

function button_activation() {
  const sendButton = document.getElementById("send_button");
  sendButton.disabled = !(
    name_validation() &&
    surname_validation() &&
    email_validation() &&
    message_validation()
  );
}

//---------------------------------------------------
