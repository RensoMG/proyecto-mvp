// ========== SISTEMA DE MODALES ==========
class ModalSystem {
    constructor() {
        this.modalOverlay = null;
        this.modalContent = null;
        this.modalClose = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        // Crear estructura del modal en el DOM
        this.createModalStructure();
        // Event listeners
        this.setupEventListeners();
    }

    createModalStructure() {
        const modalHTML = `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal-container">
                    <button class="modal-close-btn" id="modalCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-body" id="modalBody">
                        <!-- Contenido dinámico -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalClose = document.getElementById('modalCloseBtn');
        this.modalBody = document.getElementById('modalBody');
    }

    setupEventListeners() {
        // Cerrar con botón X
        this.modalClose.addEventListener('click', () => this.close());

        // Cerrar con click fuera del modal
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.close();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open(productData) {
        if (this.isOpen) return;

        // Construir contenido del modal
        const contentHTML = `
            <div class="modal-product-layout">
                <div class="modal-image-section">
                    <div class="modal-image-wrapper">
                        <div class="modal-image-placeholder">
                            <i class="fas ${productData.icono || 'fa-box'}"></i>
                        </div>
                        ${productData.imagen ? `<img src="${productData.imagen}" alt="${productData.nombre}" class="modal-product-image">` : ''}
                    </div>
                    ${productData.categoria ? `<span class="modal-categoria-badge">${productData.categoria}</span>` : ''}
                </div>
                <div class="modal-info-section">
                    <h2 class="modal-product-title">${productData.nombre}</h2>
                    <div class="modal-product-price">${productData.precio}</div>
                    <div class="modal-product-divider"></div>
                    <p class="modal-product-description">${productData.descripcion || 'Producto de alta calidad disponible en nuestro catálogo premium.'}</p>
                    ${productData.detalles ? `
                        <div class="modal-product-details">
                            <h4>Detalles del Producto</h4>
                            <p>${productData.detalles}</p>
                        </div>
                    ` : ''}
                    ${productData.caracteristicas ? `
                        <div class="modal-features-list">
                            ${productData.caracteristicas.map(f => `<span class="modal-feature-tag"><i class="fas fa-check-circle"></i> ${f}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="modal-actions">
                        <button class="btn btn-primary modal-action-btn">
                            <i class="fas fa-shopping-cart"></i> Solicitar Información
                        </button>
                        <button class="btn btn-outline modal-action-btn" onclick="document.getElementById('modalOverlay').dispatchEvent(new Event('click'))">
                            <i class="fas fa-arrow-left"></i> Volver
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.modalBody.innerHTML = contentHTML;
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Animación de entrada
        setTimeout(() => {
            this.modalOverlay.querySelector('.modal-container').classList.add('animated');
        }, 50);
    }

    close() {
        if (!this.isOpen) return;

        const container = this.modalOverlay.querySelector('.modal-container');
        container.classList.remove('animated');
        container.classList.add('closing');

        setTimeout(() => {
            this.modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            this.modalBody.innerHTML = '';
            container.classList.remove('closing');
            this.isOpen = false;
        }, 300);
    }
}

// Instancia global del sistema de modales
const modalSystem = new ModalSystem();

// Función global para abrir modal desde cualquier página
function abrirModal(productData) {
    modalSystem.open(productData);
}