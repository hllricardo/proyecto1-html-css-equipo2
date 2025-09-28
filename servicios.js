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
        service.addEventListener('mouseenter', function() {
            this.style.transform = "translateY(-10px) scale(1.05)";
            this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        });
        
        service.addEventListener('mouseleave', function() {
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










