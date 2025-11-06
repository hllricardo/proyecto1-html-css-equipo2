"use strict";

/* ===========================================================
   Global DOM references
   =========================================================== */
const themeSwitch = document.getElementById("toggle-theme");
const body = document.getElementById("body");
const textEquipo = document.getElementsByClassName("team-wrapper");
const textSobre = document.getElementsByClassName("about-wrapper");
const textServicios = document.getElementsByClassName("services-wrapper");

/* ===========================================================
   Helper utilities
   =========================================================== */
function forEachCollection(collection, cb) {
  if (!collection) return;
  Array.from(collection).forEach((el, idx) => cb(el, idx));
}

function safeQuery(selector, root = document) {
  return root.querySelector(selector);
}

function safeQueryAll(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/* ===========================================================
   THEME: Dark / Light mode (persisted in localStorage)
   =========================================================== */
const currentTheme = localStorage.getItem("theme");

function applyDarkSubdivs(add = true) {
  // add === true -> add class, otherwise remove
  const action = add ? "add" : "remove";
  forEachCollection(textEquipo, (el) =>
    el.classList[action]("dark-mode-subdiv"),
  );
  forEachCollection(textSobre, (el) =>
    el.classList[action]("dark-mode-subdiv"),
  );
  forEachCollection(textServicios, (el) =>
    el.classList[action]("dark-mode-subdiv"),
  );
}

function initThemeFromStorage() {
  if (!body) return;
  if (currentTheme === "dark-mode") {
    body.classList.add("dark-mode");
    applyDarkSubdivs(true);
    if (themeSwitch) themeSwitch.checked = true;
  } else {
    if (themeSwitch) themeSwitch.checked = false;
  }
}

function toggleThemeHandler() {
  if (!body) return;
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  applyDarkSubdivs(isDark);
  localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
}

/* attach theme listener (only if control exists) */
if (themeSwitch) {
  initThemeFromStorage();
  themeSwitch.addEventListener("change", toggleThemeHandler);
} else {
  // If there is no switch element, still initialize theme classes
  initThemeFromStorage();
}

/* ===========================================================
   NAV: open / close side nav (names preserved)
   =========================================================== */
function openNav() {
  const navById = document.getElementById("nav-wrapper");
  const navByClass = document.querySelector(".nav-wrapper");
  if (navById) navById.style.display = "block";
  if (navByClass) navByClass.style.padding = "0 10px";
}

function closeNav() {
  const navById = document.getElementById("nav-wrapper");
  const navByClass = document.querySelector(".nav-wrapper");
  if (navById) navById.style.display = "";
  if (navByClass) navByClass.style.padding = "10px 30px";
}

/* ===========================================================
   SOBRE (typing effect on about boxes)
   =========================================================== */
function initAboutTyping() {
  const aboutBoxes = safeQueryAll(".about-wrapper");
  if (!aboutBoxes.length) return;

  aboutBoxes.forEach((box) => {
    const text = box.querySelector(".about-extra-text");
    if (!text) return;
    const fullHTML = text.innerHTML.replace(/\n\s*/g, " ");
    let typingInterval = null;
    let typingTimeout = null;

    box.addEventListener("mouseenter", () => {
      // reset and start typing after delay
      text.innerHTML = "";
      let i = 0;

      typingTimeout = setTimeout(() => {
        typingInterval = setInterval(() => {
          // guard for out-of-range
          if (i >= fullHTML.length) {
            clearInterval(typingInterval);
            typingInterval = null;
            return;
          }

          // preserve <br> and <br /> tags
          if (fullHTML.slice(i, i + 4) === "<br>") {
            text.innerHTML += "<br>";
            i += 4;
            return;
          } else if (fullHTML.slice(i, i + 5) === "<br />") {
            text.innerHTML += "<br />";
            i += 5;
            return;
          }

          text.innerHTML += fullHTML[i++];
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
}

/* ===========================================================
   CONTACT: Validation helpers & form wiring
   =========================================================== */
function validateInput(id, regex, errorMessage, minLength = 0) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById(`${id}-error`);

  const value = input.value;

  // empty -> clear message and return false
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
  const sendButton = document.getElementById("btn-send");
  if (!sendButton) return;
  sendButton.disabled = !(
    name_validation() &&
    surname_validation() &&
    email_validation() &&
    message_validation()
  );
}

/* Attach input listeners safely for contact form */
function initContactFormValidation() {
  const form = document.getElementById("main-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    // attach relevant validations by id
    if (input.id === "name") input.addEventListener("input", name_validation);
    if (input.id === "surname")
      input.addEventListener("input", surname_validation);
    if (input.id === "email") input.addEventListener("input", email_validation);
    if (input.id === "message")
      input.addEventListener("input", message_validation);

    // always update button activation when any input changes
    input.addEventListener("input", button_activation);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // maintain original behavior (alert + reset)
    alert(
      "Button Test Successful. This alert confirms the button works. The final feature is still under development and will be released shortly.",
    );
    form.reset();
    button_activation();
  });

  // initial state
  button_activation();
}

/* ===========================================================
   SERVICIOS: courseInfo, modal and filter behaviour
   =========================================================== */
const courseInfo = {
  /* (mantengo exactamente tu objeto courseInfo tal cual) */
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

function filterServices(category) {
  const buttons = safeQueryAll(".btn-filter");
  buttons.forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(category);
  if (activeBtn) activeBtn.classList.add("active");

  const services = safeQueryAll(".services-wrapper");
  services.forEach((service) => {
    const serviceCategory = service.getAttribute("data-category");
    if (category === "all-items" || serviceCategory === category) {
      // show
      service.style.display = "flex";
      setTimeout(() => {
        service.style.opacity = "1";
        service.style.transform = "translateY(0)";
      }, 50);
    } else {
      // hide
      service.style.opacity = "0";
      service.style.transform = "translateY(20px)";
      setTimeout(() => {
        service.style.display = "none";
      }, 300);
    }
  });
}

/* ===========================================================
   Hover effects, scroll-to-top, lazy loading
   =========================================================== */
function enhanceHoverEffects() {
  const services = safeQueryAll(".services-wrapper");
  services.forEach((service) => {
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

function createScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
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

function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/* ===========================================================
   REVIEWS: initialization & star-rating behaviour
   - encapsulado en initReviews()
   =========================================================== */
function initReviews() {
  const form = document.getElementById("form-review");
  if (!form) return;

  const nameInput = form.querySelector("#name-rev");
  const messageInput = form.querySelector("#message-review");
  const ratingInput = form.querySelector("#rating");
  const sendButton = form.querySelector("#btn-send-review");
  const nameError = form.querySelector("#name-error-review");
  const stars = Array.from(form.querySelectorAll("#rating-stars img"));
  const ratingStarsContainer = form.querySelector("#rating-stars");

  // create rating error element only if container exists and not already present
  let ratingError = document.getElementById("rating_msg_error");
  if (!ratingError && ratingStarsContainer) {
    ratingError = document.createElement("section");
    ratingError.id = "rating_msg_error";
    ratingError.textContent = "You must select at least one star";
    ratingError.style.display = "none";
    ratingError.style.marginLeft = "120px";
    ratingStarsContainer.after(ratingError);
  }

  const updateButtonState = () => {
    const nameValid = nameInput?.value.trim().length > 2;
    const ratingValid = parseInt(ratingInput?.value || 0, 10) > 0;

    if (sendButton) sendButton.disabled = !(nameValid && ratingValid);
    if (nameError)
      nameError.textContent = nameValid
        ? ""
        : "Name must have more than 2 characters";
    if (ratingError) ratingError.style.display = ratingValid ? "none" : "block";
  };

  nameInput?.addEventListener("input", updateButtonState);

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => {
        s.src = i <= index ? "public/star_filled.png" : "public/star_empty.png";
      });
    });

    star.addEventListener("click", () => {
      if (ratingInput) ratingInput.value = star.dataset.value;
      updateButtonState();
    });
  });

  ratingStarsContainer?.addEventListener("mouseleave", () => {
    const currentRating = parseInt(ratingInput?.value || 0, 10);
    stars.forEach((s, i) => {
      s.src =
        i < currentRating ? "public/star_filled.png" : "public/star_empty.png";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sendButton && sendButton.disabled) {
      updateButtonState();
      return;
    }

    const name = nameInput?.value.trim() || "Anonymous";
    const rating = ratingInput?.value || "0";
    const message = messageInput?.value.trim();

    let alertMessage = `${name} has submitted a review with a rating of ${rating}/5`;
    if (message) alertMessage += ` and this message: "${message}"`;
    alert(alertMessage);

    form.reset();
    stars.forEach((s) => (s.src = "public/star_empty.png"));
    if (ratingInput) ratingInput.value = 0;
    updateButtonState();
  });

  // initial state
  updateButtonState();
}

/* ===========================================================
   CAROUSEL (equipo)
   - auto-scroll + click-to-show-member
   =========================================================== */
function initTeamCarousel() {
  const ul = document.getElementById("carousel-main");
  if (!ul) return;

  const items = Array.from(ul.querySelectorAll("li"));
  if (items.length === 0) return;

  let carouselIndex = 0;
  const interval = 3000;

  const itemWidth = items[0].offsetWidth;

  ul.scrollLeft = 0;

  const carouselInterval = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % items.length;

    ul.scrollTo({
      left: carouselIndex * itemWidth,
      behavior: "smooth",
    });
  }, interval);

  items.forEach((li, i) => {
    li.addEventListener("click", () => {
      const blocks = [
        document.getElementById("block-team-1"),
        document.getElementById("block-team-2"),
        document.getElementById("block-team-3"),
        document.getElementById("block-team-4"),
      ];

      blocks.forEach((b, idx) => {
        if (b) b.style.display = idx === i ? "block" : "none";
      });
    });
  });

  return carouselInterval;
}

/* ===========================================================
   SECRET / EASTER EGG (logo click -> showTerminal)
   =========================================================== */
let clicks = 0;
let logoEl = null;
(function locateLogo() {
  const navMain = document.querySelector(".nav-main");
  // prioritise a visible <img> inside nav-main
  if (navMain)
    logoEl = navMain.querySelector("img") || navMain.childNodes[3] || null;
})();

if (logoEl) {
  logoEl.addEventListener("click", () => {
    clicks++;
    clearTimeout(window.resetClicks);
    window.resetClicks = setTimeout(() => (clicks = 0), 2000);

    if (clicks === 5) {
      clicks = 0;
      showTerminal();
    }
  });
}

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

/* ===========================================================
   GALLERY (sobre.html)
   =========================================================== */
function initGallery() {
  const btnImg = document.getElementById("btn-img");
  const gallery = document.getElementById("img-gallery");
  if (btnImg && gallery) {
    btnImg.addEventListener("click", function () {
      const imgList = [
        "public/classrooms.jpg",
        "public/classrooms_01.jpg",
        "public/classrooms_02.jpg",
        "public/classrooms_03.jpg",
        "public/classrooms_04.jpg",
        "public/classrooms_05.jpg",
        "public/classrooms_06.jpg",
        "public/classrooms_07.jpg",
        "public/classrooms_08.jpg",
        "public/classrooms_09.jpg",
        "public/classrooms_10.jpg",
      ];
      if (gallery.children.length < imgList.length) {
        const dir = imgList[gallery.children.length % imgList.length];
        const img = document.createElement("img");
        img.src = dir;
        img.alt = `Gallery Image`;
        gallery.appendChild(img);
      }
    });

    // lightbox behaviour
    gallery.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") return;

      const lightboxImg = document.createElement("img");
      const lightbox = document.createElement("div");

      lightboxImg.className = "lightbox-img-content";
      lightbox.className = "lightbox-img";
      lightbox.id = "box-img";
      lightboxImg.src = e.target.src;

      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);

      lightbox.addEventListener("click", (ev) => {
        if (ev.target === lightbox) lightbox.remove();
      });
    });
  }
}

/* ===========================================================
   Delegated event for "Sign up" links in services container
   =========================================================== */
function initServiceSignups() {
  const container = document.getElementById("main-container-services");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    // Try to extract course name safely
    const serviceBlock = anchor.closest(".services-wrapper");
    if (!serviceBlock) return;
    const titleEl =
      serviceBlock.querySelector(".section-block h2") ||
      serviceBlock.querySelector("h2");
    const courseName = titleEl ? titleEl.innerText.trim() : null;
    if (courseName) openCourseModal(courseName);
  });
}

/* ===========================================================
   Application initialization
   =========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // SOBRE
  initAboutTyping();

  // CONTACT
  initContactFormValidation();

  // SERVICIOS: animate show
  safeQueryAll(".services-wrapper").forEach((service, idx) => {
    setTimeout(() => {
      service.classList.add("show");
      service.style.opacity = "1";
      service.style.transform = "translateY(0)";
    }, idx * 200);
  });

  enhanceHoverEffects();
  createScrollToTop();
  lazyLoadImages();

  initReviews();

  initTeamCarousel();

  initGallery();

  initServiceSignups();
});
