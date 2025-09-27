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
});

// Modal para información de cursos
function openCourseModal(courseName) {
    const courseInfo = {
        'Full Stack Development': {
            duration: "6 meses",
            level: "Intermedio",
            topics: ["HTML, CSS, JavaScript", "React.js", "Node.js", "Bases de datos"]
        }

    "Cibersecurity": {
            duration: "8 meses",
            level: "Intermedio",
            topics: ["Seguridad de redes", "Ethical Hacking", "DFIR"]
        }

    "Artificial Intelligence": {
            duration: "10 meses",
            level: "Avanzado",
            topics: ["Machine Learning", "Deep Learning", "NLP"]
        }
   
    "Databases": {
        duration: "4 meses",
        level: "Básico",
        topics: ["SQL", "NoSQL", "Modelado de datos"]
        }

    "Data Science": {
        duration: "6 meses",
            level: "Intermedio",
                topics: ["Estadística", "Python para Data Science", "Visualización de datos"]
    }

    "Cloud Computing": {
        duration: "5 meses",
            level: "Intermedio",
                topics: ["AWS", "Azure", "Google Cloud"]
    }
};
const course = courseInfo[courseName];
const message =
    CURSO: ${ courseName }
Duración: ${ course.duration }
Nivel: ${ course.level }
Temas: ${ course.topics.join(', ') }
    ¿Te gustaría inscribirte en este curso ? Contáctanos para más información.
    if(confirm(message)) {
    window.location.href = 'contacto.html{curso=' + encodeURIComponent(courseName);
}

//Añadir categorías 
const categories = {
    "Desarrollo Web": ["Full Stack Development"],
    "Ciberseguridad": ["Cibersecurity"],
    "Inteligencia Artificial": ["Artificial Intelligence"],
    "Bases de Datos": ["Databases"],
    "Data Science": ["Data Science"],
    "Cloud Computing": ["Cloud Computing"]
};

Document.querySelectorAll('..divServices').forEach(service => {
    const title = service.querySelector('h2').textContent;
    service.setAttribute('data-category', categoriesategory(title));
});
    function filterServices(category) {
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}

function filterServices(category) {
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');


        //Filtrar servicios
        document.querySelectorAll('.divServices').forEach(service => {
            const serviceCategory = service.getAttribute('data-category');
            if (category === 'All' || serviceCategory === category) {
                service.style.display = 'flex';
                service.style.opacity = '1';
            } else {
                service.style.display = 'none';
                service.style.opacity = '0';
                setTimeout(() => {
                    service.style.display = 'none';
                }, 300);
        };
    });
    



//Efecto hover en tarjetas
function enhanceHoverEffects() {
        document.querySelectorAll('.divServices').forEach(service => {
            service.addEventListener('mouseenter', function () {
                this.style.transform = "translate Y(-10px) scale(1.05)";
                this.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
            });
        });
    }

//Scroll 
function createScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollBtn.innerHTML = "\u2191"; document.createElement('button');
        scrollBtn.style.cssText = {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #fff;
        color: #fff;
        border: none;
        border - radius: 50 %;
        width: 50px;
        height: 50px;
        font - size: 20px;
        cursor: pointer;
        display: none;
        z - index: 1000;
        transition: all 0.3s ease;
    };
}



        //Mostrar u Ocultar
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });



        //Scroll
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    

//Inicializar funciones
document.addEventListener('DOMContentLoaded', () => {
        enhanceHoverEffects();
        createScrollToTop();
        trackPopularCourses();
        lazyLoadImages();
    });











