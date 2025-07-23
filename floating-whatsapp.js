/**
 * Floating WhatsApp Button with Scroll Animation
 * Este script maneja el comportamiento del botón flotante de WhatsApp
 * que se anima al hacer scroll en la página.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón flotante
    const floatingWhatsApp = document.getElementById('floating-whatsapp');
    
    if (!floatingWhatsApp) return;
    
    // URL de WhatsApp para la consulta
    const whatsappURL = 'https://wa.me/+13033068798?text=NECESITO%20AYUDA';
    
    // Variables para controlar el scroll
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    let isAnimating = false;
    let scrollTimer;
    
    // Añadir evento de clic al botón
    floatingWhatsApp.addEventListener('click', function() {
        window.open(whatsappURL, '_blank');
    });
    
    // Función para manejar el scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determinar la dirección del scroll
        if (scrollTop > lastScrollTop) {
            if (scrollDirection !== 'down') {
                scrollDirection = 'down';
                animateButton();
            }
        } else {
            if (scrollDirection !== 'up') {
                scrollDirection = 'up';
                animateButton();
            }
        }
        
        // Actualizar la posición del último scroll
        lastScrollTop = scrollTop;
        
        // Mostrar u ocultar el botón según la posición del scroll
        if (scrollTop > 300) {
            floatingWhatsApp.classList.add('visible');
            floatingWhatsApp.classList.remove('hidden');
        } else {
            floatingWhatsApp.classList.add('hidden');
            floatingWhatsApp.classList.remove('visible');
        }
        
        // Reiniciar el temporizador para la animación de rebote
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            if (!isAnimating) {
                floatingWhatsApp.classList.add('bounce');
                setTimeout(function() {
                    floatingWhatsApp.classList.remove('bounce');
                }, 500);
            }
        }, 1000);
    }
    
    // Función para animar el botón
    function animateButton() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Aplicar clase de animación según la dirección
        if (scrollDirection === 'down') {
            floatingWhatsApp.classList.add('hidden');
            floatingWhatsApp.classList.remove('visible');
            // Añadir animación de giro
            floatingWhatsApp.classList.add('rotate');
        } else {
            floatingWhatsApp.classList.add('visible');
            floatingWhatsApp.classList.remove('hidden');
            // Añadir animación de giro
            floatingWhatsApp.classList.add('rotate');
        }
        
        // Restablecer el estado de animación después de un tiempo
        setTimeout(function() {
            isAnimating = false;
            // Quitar la clase de rotación después de completar la animación
            floatingWhatsApp.classList.remove('rotate');
        }, 1000); // Aumentado a 1000ms para que coincida con la duración de la animación
    }
    
    // Optimizar el evento de scroll con debounce
    let debounceTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleScroll, 10);
    });
    
    // Inicializar el estado del botón
    if (window.pageYOffset > 300) {
        floatingWhatsApp.classList.add('visible');
    } else {
        floatingWhatsApp.classList.add('hidden');
    }
    
    // Añadir animación inicial después de 2 segundos
    setTimeout(function() {
        floatingWhatsApp.classList.add('bounce');
        setTimeout(function() {
            floatingWhatsApp.classList.remove('bounce');
        }, 500);
    }, 2000);
});