// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("divEquipo");
const textSobre = document.getElementsByClassName("divSobre");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark-mode") {
  body.classList.toggle("dark-mode");
  for (let i = 0; i < textEquipo.length; i++) {
    textEquipo[i].classList.toggle("dark-mode-subdiv");
  }
  for (let i = 0; i < textSobre.length; i++) {
    textSobre[i].classList.toggle("dark-mode-subdiv");
  }
}

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  for (let i = 0; i < textEquipo.length; i++) {
    textEquipo[i].classList.toggle("dark-mode-subdiv");
  }
  for (let i = 0; i < textSobre.length; i++) {
    textSobre[i].classList.toggle("dark-mode-subdiv");
  }
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.setItem("theme", "light-mode");
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

// Codigo para sobre.html
document.querySelectorAll(".divSobre").forEach((box) => {
  const text = box.querySelector(".extraTextSobre");
  const fullHTML = text.innerHTML.replace(/\n\s*/g, " ");
  let typingInterval = null;
  let typingTimeout = null;
  console.log(fullHTML);

  box.addEventListener("mouseenter", () => {
    text.innerHTML = "";
    let i = 0;

    typingTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        const char = fullHTML[i];

        if (fullHTML.slice(i, i + 4) === "<br>") {
          text.innerHTML += "<br>";
          i += 4;
        } else if (fullHTML.slice(i, i + 5) === "<br />") {
          text.innerHTML += "<br />";
          i += 5;
        } else {
          text.innerHTML += char;
          i++;
        }

        if (i >= fullHTML.length) {
          clearInterval(typingInterval);
          typingInterval = null;
        }
      }, 20);
    }, 950);
  });

  box.addEventListener("mouseleave", () => {
    text.innerHTML = "";
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  });
});

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

function send_form_sim() {
  alert(
    "Button Test Successful. This alert confirms the button works. The final feature is still under development and will be released shortly.",
  );
}

//---------------------------------------------------
