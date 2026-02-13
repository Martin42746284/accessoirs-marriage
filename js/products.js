// ============================================
// AFFICHAGE ET GESTION DES PRODUITS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    let allProducts = products; // Depuis data/products.js
    let filteredProducts = [...allProducts];
    let currentFilters = {
        category: 'all',
        price: 'all',
        sort: 'default'
    };
    
    // Intervalles pour les diaporamas
    const slideIntervals = new Map();
    
    // ============================================
    // AFFICHER LES PRODUITS VEDETTES (PAGE ACCUEIL)
    // ============================================
    
    const featuredContainer = document.getElementById('products-container');
    if (featuredContainer) {
        const featuredProducts = allProducts.filter(p => p.featured).slice(0, 6);
        displayProducts(featuredProducts, featuredContainer);
    }
    
    // ============================================
    // AFFICHER TOUS LES PRODUITS (PAGE PRODUITS)
    // ============================================
    
    const allProductsContainer = document.getElementById('all-products-container');
    if (allProductsContainer) {
        displayProducts(filteredProducts, allProductsContainer);
        updateProductCount(filteredProducts.length);
    }
    
    // ============================================
    // FONCTION D'AFFICHAGE DES PRODUITS
    // ============================================
    
    function displayProducts(productsArray, container) {
        if (!container) return;
        
        // Nettoyer les anciens intervalles
        slideIntervals.forEach(interval => clearInterval(interval));
        slideIntervals.clear();
        
        container.innerHTML = '';
        
        if (productsArray.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #7a7a7a;">Aucun produit trouvé.</p>';
            return;
        }
        
        productsArray.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
            
            // Initialiser le diaporama automatique pour ce produit
            if (product.images.length > 1) {
                initProductSlideshow(product.id, product.images);
            }
        });
    }
    
    // ============================================
    // CRÉER UNE CARTE PRODUIT
    // ============================================
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id);
        
        // Formater le prix en Ariary
        const formattedPrice = product.price.toLocaleString('fr-FR');
        
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img 
                    src="${product.images[0]}" 
                    alt="${product.name}" 
                    class="product-image"
                    data-product-id="${product.id}"
                    onerror="this.src='images/placeholder.jpg'"
                >
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${product.images.length > 1 ? `
                    <div class="image-indicators">
                        ${product.images.map((_, index) => 
                            `<span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryLabel(product.category)}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formattedPrice} Ar</p>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
            </div>
        `;
        
        // Événement : ouvrir la modal au clic sur la carte
        card.addEventListener('click', (e) => {
            // Ne pas ouvrir si on clique sur le bouton "Ajouter au panier"
            if (!e.target.closest('.add-to-cart') && !e.target.closest('.indicator')) {
                console.log('Card clicked, opening modal for:', product.name);
                window.openProductModal(product);
            }
        });
        
        // Ajouter un curseur pointer
        card.style.cursor = 'pointer';
        
        // Ajouter l'événement au bouton
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product);
        });
        
        return card;
    }
    
    // ============================================
    // DIAPORAMA AUTOMATIQUE DES IMAGES PRODUIT
    // ============================================
    
    function initProductSlideshow(productId, images) {
        let currentIndex = 0;
        const imgElement = document.querySelector(`img[data-product-id="${productId}"]`);
        const indicators = document.querySelectorAll(`[data-product-id="${productId}"] .indicator`);
        const card = document.querySelector(`[data-product-id="${productId}"]`);
        
        if (!imgElement || !card) return;
        
        // Fonction pour changer l'image
        function changeImage() {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
            
            // Mettre à jour les indicateurs
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Démarrer le diaporama (toutes les 5 secondes)
        let interval = setInterval(changeImage, 5000);
        slideIntervals.set(productId, interval);
        
        // Pause au survol
        card.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Reprendre au départ de la souris
        card.addEventListener('mouseleave', () => {
            interval = setInterval(changeImage, 5000);
            slideIntervals.set(productId, interval);
        });
        
        // Click sur les indicateurs pour changer manuellement
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                imgElement.src = images[currentIndex];
                indicators.forEach((ind, i) => {
                    ind.classList.toggle('active', i === currentIndex);
                });
                
                // Réinitialiser l'intervalle
                clearInterval(interval);
                interval = setInterval(changeImage, 5000);
                slideIntervals.set(productId, interval);
            });
        });
    }
    
    // ============================================
    // FILTRES PAR CATÉGORIE
    // ============================================
    
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();p
        });
    });
    
    // ============================================
    // FILTRES PAR PRIX
    // ============================================
    
    const priceFilters = document.querySelectorAll('input[name="price"]');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            currentFilters.price = e.target.value;
            applyFilters();
        });
    });
    
    // ============================================
    // TRI DES PRODUITS
    // ============================================
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
    
    // ============================================
    // APPLIQUER LES FILTRES
    // ============================================

    function applyFilters() {
        let results = [...allProducts];
        
        // Filtrer par catégorie
        if (currentFilters.category !== 'all') {
            results = results.filter(p => p.category === currentFilters.category);
        }
        
        // Filtrer par prix (en Ariary)
        if (currentFilters.price !== 'all') {
            results = results.filter(p => {
                const price = p.price;
                switch(currentFilters.price) {
                    case '0-500000': return price < 500000;
                    case '500000-1000000': return price >= 500000 && price < 1000000;
                    case '1000000-3000000': return price >= 1000000 && price < 3000000;
                    case '3000000-5000000': return price >= 3000000 && price < 5000000;
                    case '5000000+': return price >= 5000000;
                    default: return true;
                }
            });
        }
        
        // Trier
        switch(currentFilters.sort) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        filteredProducts = results;
        
        if (allProductsContainer) {
            displayProducts(filteredProducts, allProductsContainer);
            updateProductCount(filteredProducts.length);
        }
    }
    
    // ============================================
    // METTRE À JOUR LE COMPTEUR DE PRODUITS
    // ============================================
    
    function updateProductCount(count) {
        const countElement = document.getElementById('products-count');
        if (countElement) {
            countElement.textContent = `Affichage de ${count} produit${count > 1 ? 's' : ''}`;
        }
    }
    
    // ============================================
    // UTILITAIRES
    // ============================================

    function getCategoryLabel(category) {
        const labels = {
            'voiles': 'Voiles',
            'accessoires': 'Accessoires',
            'chaussures': 'Chaussures',
            'bouquets': 'Bouquets',
            'robes': 'Robes de Mariée'
        };
        return labels[category] || category;
    }
    
    // Ajouter des styles pour les indicateurs d'images
    const style = document.createElement('style');
    style.textContent = `
        .image-indicators {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            z-index: 10;
        }
        
        .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .indicator.active {
            background: var(--primary-color);
            width: 24px;
            border-radius: 4px;
        }
        
        .indicator:hover {
            background: rgba(255, 255, 255, 0.8);
        }
    `;
    document.head.appendChild(style);
});