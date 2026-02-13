// ============================================
// MODAL DE DÉTAILS PRODUIT
// ============================================

class ProductModal {
    constructor() {
        this.currentProductImages = [];
        this.currentImageIndex = 0;
        this.modalQuantity = 1;
        this.currentProductData = null;
        
        // Éléments du DOM
        this.modal = document.getElementById('product-modal');
        this.overlay = document.getElementById('modal-overlay');
        this.closeBtn = document.getElementById('close-modal');
        this.mainImage = document.getElementById('modal-main-image');
        this.thumbnailContainer = document.getElementById('thumbnail-container');
        this.prevBtn = document.getElementById('prev-image');
        this.nextBtn = document.getElementById('next-image');
        this.titleEl = document.getElementById('modal-title');
        this.categoryEl = document.getElementById('modal-category');
        this.badgeEl = document.getElementById('modal-badge');
        this.priceEl = document.getElementById('modal-price');
        this.descriptionEl = document.getElementById('modal-description');
        this.quantityInput = document.getElementById('modal-quantity');
        this.qtyMinusBtn = document.getElementById('modal-qty-minus');
        this.qtyPlusBtn = document.getElementById('modal-qty-plus');
        this.addToCartBtn = document.getElementById('modal-add-to-cart');
        
        this.init();
    }
    
    init() {
        if (!this.modal) {
            console.error('Modal element not found');
            return;
        }
        
        // Event Listeners
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.showPreviousImage());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.showNextImage());
        }
        
        if (this.qtyMinusBtn) {
            this.qtyMinusBtn.addEventListener('click', () => this.updateQuantity(-1));
        }
        
        if (this.qtyPlusBtn) {
            this.qtyPlusBtn.addEventListener('click', () => this.updateQuantity(1));
        }
        
        if (this.addToCartBtn) {
            this.addToCartBtn.addEventListener('click', () => this.addToCart());
        }
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Transition pour l'image
        if (this.mainImage) {
            this.mainImage.style.transition = 'opacity 0.3s ease';
        }
        
        console.log('✅ Product Modal initialisé');
    }
    
    open(product) {
        if (!product) {
            console.error('Product data is missing');
            return;
        }
        
        console.log('Opening modal for:', product.name);
        
        this.currentProductData = product;
        this.currentProductImages = product.images || [];
        this.currentImageIndex = 0;
        this.modalQuantity = 1;
        
        // Remplir les informations
        if (this.titleEl) this.titleEl.textContent = product.name;
        if (this.categoryEl) this.categoryEl.textContent = this.getCategoryLabel(product.category);
        if (this.priceEl) this.priceEl.textContent = product.price.toLocaleString('fr-FR') + ' Ar';
        if (this.descriptionEl) this.descriptionEl.textContent = product.description;
        if (this.quantityInput) this.quantityInput.value = 1;
        
        // Badge
        if (this.badgeEl) {
            if (product.badge) {
                this.badgeEl.textContent = product.badge;
                this.badgeEl.style.display = 'block';
            } else {
                this.badgeEl.style.display = 'none';
            }
        }
        
        // Afficher la première image
        if (this.mainImage && this.currentProductImages.length > 0) {
            this.mainImage.src = this.currentProductImages[0];
            this.mainImage.alt = product.name;
        }
        
        // Générer les thumbnails
        this.generateThumbnails();
        
        // Afficher la modal
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    generateThumbnails() {
        if (!this.thumbnailContainer) return;
        
        this.thumbnailContainer.innerHTML = '';
        
        this.currentProductImages.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Image ${index + 1}" onerror="this.src='images/placeholder.jpg'">`;
            
            thumbnail.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateMainImage();
                this.updateActiveThumbnail();
            });
            
            this.thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    updateMainImage() {
        if (!this.mainImage) return;
        
        this.mainImage.style.opacity = '0';
        
        setTimeout(() => {
            this.mainImage.src = this.currentProductImages[this.currentImageIndex];
            this.mainImage.style.opacity = '1';
        }, 150);
    }
    
    updateActiveThumbnail() {
        if (!this.thumbnailContainer) return;
        
        const thumbnails = this.thumbnailContainer.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }
    
    showPreviousImage() {
        if (this.currentProductImages.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProductImages.length) % this.currentProductImages.length;
        this.updateMainImage();
        this.updateActiveThumbnail();
    }
    
    showNextImage() {
        if (this.currentProductImages.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProductImages.length;
        this.updateMainImage();
        this.updateActiveThumbnail();
    }
    
    updateQuantity(change) {
        const newQuantity = this.modalQuantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            this.modalQuantity = newQuantity;
            if (this.quantityInput) {
                this.quantityInput.value = this.modalQuantity;
            }
        }
    }
    
    addToCart() {
        if (!this.currentProductData) return;
        
        // Vérifier que la fonction addToCart existe
        if (typeof window.addToCart === 'function') {
            // Ajouter la quantité sélectionnée
            for (let i = 0; i < this.modalQuantity; i++) {
                window.addToCart(this.currentProductData);
            }
            this.close();
        } else {
            console.error('addToCart function not found');
        }
    }
    
    handleKeyboard(e) {
        if (!this.modal || !this.modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.showPreviousImage();
                break;
            case 'ArrowRight':
                this.showNextImage();
                break;
        }
    }
    
    getCategoryLabel(category) {
        const labels = {
            'voiles': 'Voiles',
            'accessoires': 'Accessoires',
            'chaussures': 'Chaussures',
            'bouquets': 'Bouquets',
            'robes': 'Robes de Mariée'
        };
        return labels[category] || category;
    }
}

// Initialiser le modal au chargement de la page
let productModalInstance;

document.addEventListener('DOMContentLoaded', function() {
    productModalInstance = new ProductModal();
});

// Fonction globale pour ouvrir le modal
window.openProductModal = function(product) {
    if (productModalInstance) {
        productModalInstance.open(product);
    } else {
        console.error('Product modal not initialized');
    }
};
