let productoActual = null;
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
    <div class="modal">
        <button class="modal__close">&times;</button>
        <img class="modal__imagen" src="" alt="">
        <h3 class="modal__nombre"></h3>
        <p class="modal__precio"></p>
        <p class="modal__descripcion"></p>
        <span class="modal__categoria"></span>
    </div>
`;
document.body.appendChild(modalOverlay);

const modal = modalOverlay.querySelector('.modal');
const modalImagen = modal.querySelector('.modal__imagen');
const modalNombre = modal.querySelector('.modal__nombre');
const modalPrecio = modal.querySelector('.modal__precio');
const modalDescripcion = modal.querySelector('.modal__descripcion');
const modalCategoria = modal.querySelector('.modal__categoria');
const modalClose = modal.querySelector('.modal__close');

function abrirModal(producto) {
    productoActual = producto;
    modalImagen.src = producto.imagen;
    modalImagen.alt = producto.nombre;
    modalNombre.textContent = producto.nombre;
    modalPrecio.textContent = producto.precio;
    modalDescripcion.textContent = producto.descripcion;
    // Puedes añadir categoría si existe en los datos
    modalCategoria.textContent = producto.categoria || 'Producto destacado';
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    productoActual = null;
}

modalClose.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});