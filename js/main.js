// ===== ANIMACIONES DE ENTRADA =====
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos al entrar en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    document.querySelectorAll('.card, .service-card, .page-section').forEach(el => {
        observer.observe(el);
    });

    // ===== VALIDACIÓN DE FORMULARIO =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validaciones básicas
            if (!nombre || !correo || !mensaje) {
                alert('Por favor, completa los campos obligatorios: Nombre, Correo y Mensaje.');
                return;
            }

            if (!isValidEmail(correo)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Simular envío (en producción, enviar a servidor)
            alert('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
            contactForm.reset();
        });
    }

    // ===== MENÚ MÓVIL =====
    const nav = document.querySelector('nav ul');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';

    const headerInner = document.querySelector('.header-inner');
    headerInner.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Mostrar/ocultar toggle en móvil
    const checkMobile = () => {
        if (window.innerWidth <= 760) {
            menuToggle.style.display = 'block';
            nav.classList.add('mobile');
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('mobile', 'active');
        }
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    // ===== SCROLL SUAVE PARA ANCLAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== FUNCIONES AUXILIARES =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}