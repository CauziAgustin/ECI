// Seleccionar todos los elementos con la clase .auspiciar-item para mostrar la información en el modal
const items = document.querySelectorAll('.auspiciar-item');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

// Mostrar modal al hacer clic en cada elemento de auspiciar-item
items.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        // Mostrar el modal con la clase de animación
        modal.classList.add('show');
    });
});

// Cerrar el modal al hacer clic en el botón de cierre
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
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
