// ============================================
// GESTION DU PANIER (localStorage)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    let cart = loadCart();
    
    // ============================================
    // CHARGER LE PANIER DEPUIS localStorage
    // ============================================
    
    function loadCart() {
        const savedCart = localStorage.getItem('mariageCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    // ============================================
    // SAUVEGARDER LE PANIER DANS localStorage
    // ============================================
    
    function saveCart() {
        localStorage.setItem('mariageCart', JSON.stringify(cart));
    }
    
    // ============================================
    // AJOUTER UN PRODUIT AU PANIER
    // ============================================
    
    window.addToCart = function(product) {
        // Vérifier si le produit existe déjà
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
        showCartNotification(product.name);
        attachCheckoutEvent();
        
        // Animation du bouton
        const btn = document.querySelector(`[data-product-id="${product.id}"] .add-to-cart`);
        if (btn) {
            btn.classList.add('pulse');
            setTimeout(() => btn.classList.remove('pulse'), 500);
        }
    };
    
    // ============================================
    // SUPPRIMER UN PRODUIT DU PANIER
    // ============================================
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }
    
    // ============================================
    // METTRE À JOUR LA QUANTITÉ
    // ============================================
    
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                saveCart();
                updateCartUI();
            }
        }
    }
    
    // ============================================
    // METTRE À JOUR L'INTERFACE DU PANIER
    // ============================================
    
    function updateCartUI() {
        updateCartCount();
        updateCartItems();
        updateCartTotal();
    }
    
    // ============================================
    // METTRE À JOUR LE COMPTEUR DU PANIER
    // ============================================
    
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Animation
            if (totalItems > 0) {
                cartCount.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }
    
    // ============================================
    // AFFICHER LES ARTICLES DU PANIER
    // ============================================
    function updateCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: #7a7a7a;">
                    <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>Votre panie.r est vide</p>
                </div>
            `;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => {
            const formattedPrice = item.price.toLocaleString('fr-FR');
            return `
                <div class="cart-item" data-item-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${formattedPrice} Ar</p>
                        <div class="quantity-controls">
                            <butt.on class="qty-btn minus" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </butt.on>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
        
        // Ajouter les événements
        attachCartEvents();
    }
    
    // ============================================
    // ACTION DU BOUTON COMMANDER
    // ============================================

    function attachCheckoutEvent() {
        const checkoutBtn = document.getElementById('btn-commande');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');

        if (!checkoutBtn) {
            console.warn('⚠️ Bouton Commander introuvable');
            return;
        }

        checkoutBtn.addEventListener('click', async () => {

            if (!cart || cart.length === 0) {
                alert('Votre panier est vide. Ajoutez des articles avant de commander.');
                return;
            }

            // Demander les informations du client
            const customerName = prompt('Nom complet:');
            if (!customerName) return;

            const customerEmail = prompt('Adresse email:');
            if (!customerEmail) return;

            const customerPhone = prompt('Numéro de téléphone:');

            // Préparer les items de la commande
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            // Calculer le total
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            try {
                // Soumettre la commande via l'API
                const result = await submitOrder(
                    customerName,
                    customerEmail,
                    customerPhone || '',
                    items,
                    totalAmount
                );

                if (result.success) {
                    alert(`${result.message}\n\nN° de commande: ${result.orderNumber}`);

                    // Vider le panier
                    cart = [];
                    saveCart();
                    updateCartUI();

                    // Fermer le panier
                    if (cartSidebar) cartSidebar.classList.remove('active');
                    if (cartOverlay) cartOverlay.classList.remove('active');
                } else {
                    alert(`Erreur: ${result.message}`);
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la création de la commande. Veuillez réessayer.');
            }
        });

        console.log('🟢 checkout attaché');
    }

    // ============================================
    // ATTACHER LES ÉVÉNEMENTS DU PANIER
    // ============================================

    function attachCartEvents() {

        // ===============================
        // Suppression d’un article
        // ===============================
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = () => {
                const productId = parseInt(btn.dataset.id);
                removeFromCart(productId);
            };
        });

        // ===============================
        // Diminuer quantité
        // ===============================
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.onclick = () => {
                const productId = parseInt(btn.dataset.id);
                const item = cart.find(i => i.id === productId);
                if (item) updateQuantity(productId, item.quantity - 1);
            };
        });

        // ===============================
        // Augmenter quantité
        // ===============================
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.onclick = () => {
                const productId = parseInt(btn.dataset.id);
                const item = cart.find(i => i.id === productId);
                if (item) updateQuantity(productId, item.quantity + 1);
            };
        });

        // ===============================
        // 🛒 Bouton COMMANDER
        // ===============================
        // Ce bouton est déjà géré dans attachCheckoutEvent()
    }

    
    // ============================================
    // METTRE À JOUR LE TOTAL DU PANIER
    // ============================================
    
    function updateCartTotal() {
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const formattedTotal = total.toLocaleString('fr-FR');
            cartTotalElement.textContent = `${formattedTotal} Ar`;
        }
    }
    
    // ============================================
    // NOTIFICATION D'AJOUT AU PANIER
    // ============================================
    
    function showCartNotification(productName) {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} ajouté au panier!</span>
        `;
        
        // Styles inline
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ============================================
    // VIDER LE PANIER
    // ============================================
    
    window.clearCart = function() {
        if (confirm('Êtes-vous sûr de vouloir vider votre panier?')) {
            cart = [];
            saveCart();
            updateCartUI();
        }
    };
    
    // ============================================
    // INITIALISATION
    // ============================================
    
    updateCartUI();
    
    // Ajouter les styles pour les contrôles de quantité
    const style = document.createElement('style');
    style.textContent = `
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-top: 0.5rem;
        }
        
        .qty-btn {
            width: 28px;
            height: 28px;
            border: 1px solid var(--border-color);
            background: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .qty-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .qty-btn i {
            font-size: 0.75rem;
        }
        
        .quantity {
            font-weight: 600;
            min-width: 30px;
            text-align: center;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Panier initialisé:', cart.length, 'article(s)');
});
