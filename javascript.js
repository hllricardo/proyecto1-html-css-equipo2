// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("divEquipo");
const textSobre = document.getElementsByClassName("divSobre");
const textServicios = document.getElementsByClassName("divServices");
const currentTheme = localStorage.getItem("theme");
console.log(currentTheme);
if (currentTheme === "dark-mode") {
  console.log(textServicios.length)
  body.classList.toggle("dark-mode");
  for (let i = 0; i < textEquipo.length; i++) {
    textEquipo[i].classList.toggle("dark-mode-subdiv");
  }
  for (let i = 0; i < textSobre.length; i++) {
    textSobre[i].classList.toggle("dark-mode-subdiv");
  }
  for (let i = 0; i < textServicios.length; i++) {
    console.log("bucle servicios")
    textServicios[i].classList.toggle("dark-mode-subdiv");
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
  for (let i = 0; i < textServicios.length; i++) {
    textServicios[i].classList.toggle("dark-mode-subdiv");
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
// Codigo para servicios.html
// Animaciones al cargar
document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.divServices');
  services.forEach((service, index) => {
    setTimeout(() => {
      service.classList.add('show');
      service.style.opacity = '1';
      service.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Inicializar categorías cuando el DOM esté listo
  document.querySelectorAll('.divServices').forEach(service => {
    const title = service.querySelector('h2').textContent.trim();
    service.setAttribute('data-category', getCategory(title));
  });
});
function openCourseModal(courseName) {
  const courseInfo = {
    'Full Stack Development': {
      duration: "6 meses",
      level: "Intermedio",
      topics: ["HTML, CSS, JavaScript", "React.js", "Node.js", "Bases de datos"]
    },
    "Cybersecurity": {
      duration: "8 meses",
      level: "Intermedio",
      topics: ["Seguridad de redes", "Ethical Hacking", "DFIR"]
    },
    "Artificial Intelligence": {
      duration: "10 meses",
      level: "Avanzado",
      topics: ["Machine Learning", "Deep Learning", "NLP"]
    },
    "Databases": {
      duration: "4 meses",
      level: "Básico",
      topics: ["SQL", "NoSQL", "Modelado de datos"]
    },
    "Data Science": {
      duration: "6 meses",
      level: "Intermedio",
      topics: ["Estadística", "Python para Data Science", "Visualización de datos"]
    },
    "Cloud Computing": {
      duration: "5 meses",
      level: "Intermedio",
      topics: ["AWS", "Azure", "Google Cloud"]
    }
  };

  const course = courseInfo[courseName];
  if (!course) {
    alert('Información del curso no disponible');
    return;
  }

  const message = `
CURSO: ${courseName}
Duración: ${course.duration}
Nivel: ${course.level}
Temas: ${course.topics.join(', ')}

¿Te gustaría inscribirte en este curso? Contáctanos para más información.`;

  if (confirm(message)) {
    window.location.href = 'contacto.html?curso=' + encodeURIComponent(courseName);
  }
}// Modal para información de cursos
function filterServices(category) {
  // Remover clase active de todos los botones
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Añadir clase active al botón clickeado
  if (event && event.target) {
    event.target.classList.add('active');
  }

  // Filtrar servicios
  document.querySelectorAll('.divServices').forEach(service => {
    const serviceCategory = service.getAttribute('data-category');
    if (category === 'all' || serviceCategory === category) {
      service.style.display = 'flex';
      setTimeout(() => {
        service.style.opacity = '1';
        service.style.transform = 'translateY(0)';
      }, 50);
    } else {
      service.style.opacity = '0';
      service.style.transform = 'translateY(20px)';
      setTimeout(() => {
        service.style.display = 'none';
      }, 300);
    }
  });
}

// Efecto hover en tarjetas
function enhanceHoverEffects() {
  document.querySelectorAll('.divServices').forEach(service => {
    service.addEventListener('mouseenter', function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
    });

    service.addEventListener('mouseleave', function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
    });
  });
}

// Botón scroll to top
function createScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = "↑";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #004080;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(scrollBtn);

  // Mostrar/Ocultar botón según scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  // Scroll suave al hacer click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Función para lazy loading de imágenes
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Función para trackear cursos populares
function trackPopularCourses() {
  // Simulación de tracking - aquí podrías integrar analytics reales
  console.log('Tracking de cursos populares inicializado');
}

// Inicializar todas las funciones
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar animaciones y categorías
  const services = document.querySelectorAll('.divServices');
  services.forEach((service, index) => {
    setTimeout(() => {
      service.classList.add('show');
      service.style.opacity = '1';
      service.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Asignar categorías
  document.querySelectorAll('.divServices').forEach(service => {
    const title = service.querySelector('h2').textContent.trim();
    service.setAttribute('data-category', getCategory(title));
  });

  // Inicializar otras funcionalidades
  enhanceHoverEffects();
  createScrollToTop();
  trackPopularCourses();
  lazyLoadImages();
});