// ============================================
// CHARGEMENT DES PRODUITS DEPUIS LA BASE DE DONNÉES
// ============================================

const API_BASE = '/.netlify/functions';

// Variables globales pour stocker les produits
// Utiliser window pour les rendre accessibles globalement
window.products = window.products || [];
window.collections = window.collections || [];

// Fonction pour charger les produits depuis l'API
async function loadProductsFromAPI() {
  try {
    console.log('Chargement des produits depuis l\'API...');
    const response = await fetch(`${API_BASE}/products-list`, {
      signal: AbortSignal.timeout(5000) // Timeout de 5 secondes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse API:', data);

    if (data.products && data.products.length > 0) {
      // Transformer les données de la base de données au format attendu par l'app
      window.products = data.products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.collection_slug || 'accessoires',
        price: product.price,
        images: product.images && product.images.length > 0
          ? product.images.map(img => img.image_url)
          : ['images/placeholder.jpg'],
        description: product.description,
        badge: product.badge,
        featured: product.featured
      }));

      console.log(`✅ ${window.products.length} produits chargés depuis l'API`);
      notifyProductsLoaded();
      return true;
    } else {
      console.warn('Aucun produit reçu de l\'API');
      return false;
    }
  } catch (error) {
    console.warn('⚠️ Impossible de charger depuis l\'API, utilisation des produits statiques:', error.message);
    return false;
  }
}

// Fonction pour notifier que les produits sont chargés
function notifyProductsLoaded() {
  // Dispatcher un événement pour notifier que les produits sont chargés
  window.dispatchEvent(new CustomEvent('productsLoaded', { detail: { products: window.products } }));

  // Recharger l'affichage si les produits sont déjà en cours d'affichage
  if (window.displayProducts) {
    const container = document.getElementById('all-products-container');
    if (container) {
      window.displayProducts(window.products, container);
      if (typeof updateProductCount === 'function') {
        updateProductCount(window.products.length);
      }
    }
  }
}

// Fonction pour charger les collections depuis l'API
async function loadCollectionsFromAPI() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    const data = await response.json();

    if (data.collections) {
      window.collections = data.collections;
      return window.collections;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des collections:', error);
  }
  return [];
}

// Charger les produits immédiatement (avant DOMContentLoaded)
loadProductsFromAPI().then(success => {
  // Si le chargement API a échoué, attendre les produits statiques de data/products.js
  if (!success) {
    // Attendre que data/products.js charge les données statiques
    const checkStaticProducts = setInterval(() => {
      if (typeof window.staticProducts !== 'undefined' && window.staticProducts.length > 0) {
        clearInterval(checkStaticProducts);
        window.products = window.staticProducts;
        console.log(`✅ ${window.products.length} produits chargés depuis les données statiques`);
        notifyProductsLoaded();
      }
    }, 100);

    // Timeout après 5 secondes si les produits statiques ne sont pas chargés
    setTimeout(() => {
      clearInterval(checkStaticProducts);
      if (window.products.length === 0) {
        console.error('❌ Impossible de charger les produits (API et données statiques)');
      }
    }, 5000);
  }
});

// ============================================
// ENVOYER UN MESSAGE DE CONTACT
// ============================================

async function submitContactForm(name, email, phone, subject, message) {
  try {
    const response = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'envoi du message');
    }

    return { success: true, message: 'Message envoyé avec succès!' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// ============================================
// CRÉER UNE COMMANDE
// ============================================

async function submitOrder(customerName, customerEmail, customerPhone, items, totalAmount) {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        items,
        totalAmount
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création de la commande');
    }

    return { 
      success: true, 
      message: 'Commande créée avec succès!',
      orderNumber: data.orderNumber,
      orderId: data.orderId
    };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}
