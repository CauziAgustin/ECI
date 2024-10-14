// Seleccionar todos los elementos con la clase .feature
const features = document.querySelectorAll('.feature');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

// Abrir modal y mostrar información con animación
features.forEach(feature => {
    feature.addEventListener('click', (event) => {
        const title = feature.getAttribute('data-title');
        const description = feature.getAttribute('data-description');

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        // Configurar posición de origen de la animación
        const rect = feature.getBoundingClientRect();
        modal.style.transformOrigin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;

        modal.classList.add('show'); // Agregar clase para mostrar el modal con animación
        modal.style.display = 'flex'; // Mostrar el modal
    });
});

// Cerrar modal al hacer clic en el botón de cierre
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Espera el tiempo de la animación para ocultar el modal
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Espera el tiempo de la animación para ocultar el modal
    }
});

// Animación del contador para la sección de números
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        // Velocidad de incremento
        const increment = target / 200; 

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 10); // Ajusta el tiempo de actualización
        } else {
            counter.innerText = target; // Asegura que el valor final sea exacto
        }
    };

    // Llama a la función cuando el elemento sea visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(counter); // Deja de observar una vez que comienza el conteo
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
});
