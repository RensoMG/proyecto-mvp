// ========== CATÁLOGO RENDERER ==========
class CatalogoRenderer {
    constructor(containerId, productos, config = {}) {
        this.container = document.getElementById(containerId);
        this.productos = productos;
        this.config = {
            cardsPerRow: 4,
            animationDelay: 80,
            showCategory: true,
            ...config
        };
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        this.productos.forEach((producto, index) => {
            const card = this.createCard(producto, index);
            this.container.appendChild(card);
        });
    }

    createCard(producto, index) {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', String(index * this.config.animationDelay));
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="producto-card-inner">
                <div class="producto-card-image">
                    <div class="producto-image-placeholder">
                        <i class="fas ${producto.icono || 'fa-box'}"></i>
                    </div>
                    ${this.config.showCategory && producto.categoria ? 
                        `<span class="producto-categoria-tag">${producto.categoria}</span>` : ''}
                    <button class="producto-quick-view" title="Vista rápida">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
                <div class="producto-card-info">
                    <h3 class="producto-card-nombre">${producto.nombre}</h3>
                    <p class="producto-card-desc">${producto.descripcion.substring(0, 80)}...</p>
                    <div class="producto-card-footer">
                        <span class="producto-card-precio">${producto.precio}</span>
                        <button class="btn-ver-mas">
                            Ver más <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Evento click para abrir modal
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.producto-quick-view')) {
                abrirModal(producto);
            }
        });

        // Botón de vista rápida
        const quickViewBtn = card.querySelector('.producto-quick-view');
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModal(producto);
        });

        return card;
    }
}

// ========== INICIALIZACIÓN DE CATÁLOGOS ==========
// Esta función se llama desde cada página de negocio
function inicializarCatalogo(containerId, productosData, config = {}) {
    return new CatalogoRenderer(containerId, productosData, config);
}