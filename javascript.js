// Codigo para el boton de modo oscuro/claro
const themeSwitch = document.getElementById("theme-switch");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("divEquipo");
const textSobre = document.getElementsByClassName("divSobre");
const textServicios = document.getElementsByClassName("divServices");
const currentTheme = localStorage.getItem("theme");

// He cambiado un poco esto porque al cambiar a modo oscuro
// y luego vamos a otra página, aunque el modo oscuro se mantiene
// el switch se resetea.
if (currentTheme === "dark-mode") {
  body.classList.add("dark-mode");
  for (let i = 0; i < textEquipo.length; i++) {
    textEquipo[i].classList.add("dark-mode-subdiv");
  }
  for (let i = 0; i < textSobre.length; i++) {
    textSobre[i].classList.add("dark-mode-subdiv");
  }
  for (let i = 0; i < textServicios.length; i++) {
    console.log("bucle servicios");
    textServicios[i].classList.add("dark-mode-subdiv");
  }
  themeSwitch.checked = true;
} else {
  themeSwitch.checked = false;
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
// Codigo para servicios.html
// Función para categorizar servicios según el título (ya no hace falta)
/*function getCategory(title) {
  if (title.includes("Cloud")) return "cloud";
  if (title.includes("Data")) return "data";
  if (title.includes("Security")) return "security";
  if (title.includes("Development")) return "development";
  return "general";
}*/

// Información de cursos
const courseInfo = {
  "Full Stack Development": {
    duration: "6 meses",
    level: "Intermedio",
    topics: ["HTML, CSS, JavaScript", "React.js", "Node.js", "Bases de datos"],
  },
  Cybersecurity: {
    duration: "8 meses",
    level: "Intermedio",
    topics: ["Seguridad de redes", "Ethical Hacking", "DFIR"],
  },
  "Artificial Intelligence": {
    duration: "10 meses",
    level: "Avanzado",
    topics: ["Machine Learning", "Deep Learning", "NLP"],
  },
  Databases: {
    duration: "4 meses",
    level: "Básico",
    topics: ["SQL", "NoSQL", "Modelado de datos"],
  },
  "Data Science": {
    duration: "6 meses",
    level: "Intermedio",
    topics: [
      "Estadística",
      "Python para Data Science",
      "Visualización de datos",
    ],
  },
  "Cloud Computing": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["AWS", "Azure", "Google Cloud"],
  },
  "Frontend Development": {
    duration: "4 meses",
    level: "Intermedio",
    topics: ["HTML", "CSS", "JavaScript", "React", "Vue"],
  },
  "Backend Development": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["Node.js", "Express", "Django", "Flask", "Databases"],
  },
  "Mobile App Development": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  "Game Development": {
    duration: "6 meses",
    level: "Intermedio",
    topics: ["Unity", "Unreal Engine", "C#", "Game Physics"],
  },
  "DevOps & CI/CD": {
    duration: "4 meses",
    level: "Intermedio",
    topics: ["Jenkins", "GitHub Actions", "Docker", "CI/CD Pipelines"],
  },
  "Ethical Hacking": {
    duration: "6 meses",
    level: "Avanzado",
    topics: [
      "Penetration Testing",
      "Metasploit",
      "Reconnaissance",
      "Exploitation",
    ],
  },
  "Network Security": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["Firewalls", "IDS/IPS", "VPN", "Network Protocols"],
  },
  "Cloud Security": {
    duration: "4 meses",
    level: "Intermedio",
    topics: ["IAM", "Encryption", "Compliance", "Security Monitoring"],
  },
  "Incident Response": {
    duration: "3 meses",
    level: "Intermedio",
    topics: ["Detection", "Containment", "Eradication", "Recovery"],
  },
  "Malware Analysis": {
    duration: "4 meses",
    level: "Avanzado",
    topics: [
      "Static Analysis",
      "Dynamic Analysis",
      "Reverse Engineering",
      "Sandboxing",
    ],
  },
  "Big Data Analytics": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["Hadoop", "Spark", "Data Lakes", "ETL Processes"],
  },
  "Machine Learning": {
    duration: "6 meses",
    level: "Avanzado",
    topics: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Neural Networks",
      "Model Evaluation",
    ],
  },
  "Data Visualization": {
    duration: "3 meses",
    level: "Intermedio",
    topics: ["Tableau", "Power BI", "Matplotlib", "D3.js"],
  },
  "Statistics for Data Science": {
    duration: "4 meses",
    level: "Intermedio",
    topics: [
      "Probability",
      "Distributions",
      "Hypothesis Testing",
      "Regression",
    ],
  },
  "Business Intelligence": {
    duration: "4 meses",
    level: "Intermedio",
    topics: ["Dashboards", "KPIs", "Data Warehousing", "Reporting"],
  },
  "AWS Fundamentals": {
    duration: "3 meses",
    level: "Básico",
    topics: ["EC2", "S3", "IAM", "VPC"],
  },
  "Azure Fundamentals": {
    duration: "3 meses",
    level: "Básico",
    topics: ["Azure VM", "Blob Storage", "Azure AD", "Resource Groups"],
  },
  "Google Cloud Platform": {
    duration: "3 meses",
    level: "Básico",
    topics: ["Compute Engine", "Cloud Storage", "IAM", "BigQuery"],
  },
  "Cloud Automation": {
    duration: "4 meses",
    level: "Intermedio",
    topics: ["Terraform", "Ansible", "CloudFormation", "Scripting"],
  },
  "Containerization & Kubernetes": {
    duration: "5 meses",
    level: "Intermedio",
    topics: ["Docker", "Kubernetes", "Helm", "Container Orchestration"],
  },
};

// Modal para información de cursos
function openCourseModal(courseName) {
  const course = courseInfo[courseName];
  if (!course) {
    alert("Información del curso no disponible");
    return;
  }

  const message = `
CURSO: ${courseName}
Duración: ${course.duration}
Nivel: ${course.level}
Temas: ${course.topics.join(", ")}

  ¿Te gustaría inscribirte en este curso? Contáctanos para más información.`;

  if (confirm(message)) {
    window.location.href =
      "contacto.html?curso=" + encodeURIComponent(courseName);
  }
}

// Filtrar servicios
function filterServices(category) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.getElementById(category).classList.add("active");

  document.querySelectorAll(".divServices").forEach((service) => {
    const serviceCategory = service.getAttribute("data-category");
    if (category === "all" || serviceCategory === category) {
      service.style.display = "flex";
      setTimeout(() => {
        service.style.opacity = "1";
        service.style.transform = "translateY(0)";
      }, 50);
    } else {
      service.style.opacity = "0";
      service.style.transform = "translateY(20px)";
      setTimeout(() => {
        service.style.display = "none";
      }, 300);
    }
  });
}

// Efecto hover en tarjetas
function enhanceHoverEffects() {
  document.querySelectorAll(".divServices").forEach((service) => {
    service.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
    });

    service.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
    });
  });
}

// Botón scroll to top
function createScrollToTop() {
  const scrollBtn = document.createElement("button");
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

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Lazy loading de imágenes
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Tracking de cursos populares
function trackPopularCourses() {}

// Animaciones y eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
  const services = document.querySelectorAll(".divServices");

  services.forEach((service, index) => {
    setTimeout(() => {
      service.classList.add("show");
      service.style.opacity = "1";
      service.style.transform = "translateY(0)";
    }, index * 200);
  });

  /* Ya no hace falta */
  /*  services.forEach((service) => {
    const title = service.querySelector("h2").textContent.trim();
    service.setAttribute("data-category", getCategory(title));
  });*/

  document.querySelectorAll(".sign-up-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseName = btn.getAttribute("data-course");
      openCourseModal(courseName);
    });
  });

  enhanceHoverEffects();
  createScrollToTop();
  trackPopularCourses();
  lazyLoadImages();
});

// Secret
let clicks = 0;
//const logo = document.getElementById("logo");
const logo = document.getElementsByClassName("navigation")[0].childNodes[3];

logo.addEventListener("click", () => {
  clicks++;
  clearTimeout(window.resetClicks);
  window.resetClicks = setTimeout(() => (clicks = 0), 2000);

  if (clicks === 5) {
    clicks = 0;
    showTerminal();
  }
});

function showTerminal() {
  alert("🎊 Congratulations! You found the easter egg! 🎊");
  const originalBg = document.body.style.background;
  document.body.classList.add("glitch");

  setTimeout(() => {
    document.body.classList.remove("glitch");
    document.body.style.background = "#111";

    const term = document.createElement("div");
    term.className = "fake-terminal";
    document.body.appendChild(term);

    const lines = [
      "> Secret mode unlocked 🧠",
      "> Initializing secret protocol",
      ".loading",
      "> Verifying credentials",
      ".loading",
      "> Access granted ✅",
      "\u00A0",
      "# Welcome, developer! #",
    ];

    let i = 0;
    const typer = setInterval(() => {
      if (i < lines.length) {
        const line = lines[i++];
        const p = document.createElement("p");

        if (line === ".loading") {
          p.textContent = ".";
          term.appendChild(p);

          let dots = 1;
          const dotAnim = setInterval(() => {
            p.textContent += ".";
          }, 40);
          setTimeout(() => clearInterval(dotAnim), 900);
        } else if (line.includes("Welcome")) {
          p.className = "big-msg";
          p.textContent = line;
          term.appendChild(p);
        } else {
          p.textContent = line;
          term.appendChild(p);
        }
      } else {
        clearInterval(typer);
        setTimeout(() => {
          term.remove();
          document.body.style.background = originalBg;
        }, 4000);
      }
    }, 1000);
  }, 1500);
}

document.getElementById("btnImg").addEventListener("click", function (e) {
  let checkEl = document.getElementById("img-gallery");
  const imgList = [
    "public/classrooms_01.jpg",
    "public/classrooms_02.jpg",
    "public/classrooms_03.jpg",
    "public/classrooms_04.jpg",
    "public/classrooms_05.jpg",
  ];
  const gallery = document.getElementById("img-gallery");
  let dir = imgList[checkEl.children.length % imgList.length];
  let img = document.createElement("img");
  img.src = dir;
  img.alt = `Gallery Image`;
  gallery.appendChild(img);
});
// estrellas reseñas //
/*var logID = 'log',
log = $('<div id="'+logID'"></div>');
>>>>>>> 3ee13f5 (feat: gallery)
$('body').append(log);
$('[type*="radio"]').change(function () {
  var me = $(this);
  log.html(me.attr('value'));
});*/
