function renderizarCatalogo(containerId, productos) {
    const container = document.getElementById(containerId);
    if (!container || !productos) return;

    let html = '';
    productos.forEach(producto => {
        html += `
            <div class="producto-card" data-aos="fade-up" data-producto-id="${producto.id}">
                <div class="producto-card__imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="producto-card__info">
                    <h3 class="producto-card__nombre">${producto.nombre}</h3>
                    <p class="producto-card__precio">${producto.precio}</p>
                    <p class="producto-card__descripcion">${producto.descripcion}</p>
                    <button class="btn btn--small btn--primary producto-card__btn" data-producto-id="${producto.id}">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Inicializar AOS nuevamente si se insertan elementos después de la carga
    if (typeof AOS !== 'undefined') {
        AOS.refreshHard();
    }

    // Eventos para abrir modal
    document.querySelectorAll(`#${containerId} .producto-card__btn, #${containerId} .producto-card`).forEach(element => {
        element.addEventListener('click', function(e) {
            // Evitar doble apertura si se hace click en el botón dentro de la card
            if (e.target.tagName === 'BUTTON' && this !== e.target) return;

            const id = parseInt(this.dataset.productoId);
            const producto = productos.find(p => p.id === id);
            if (producto && typeof abrirModal === 'function') {
                abrirModal(producto);
            }
        });
    });
}