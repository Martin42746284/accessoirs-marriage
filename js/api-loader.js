// ============================================
// CHARGEMENT DES PRODUITS DEPUIS LA BASE DE DONNÉES
// ============================================

const API_BASE = '/.netlify/functions';

// Variable globale pour stocker les produits
let products = [];
let collections = [];

// Fonction pour charger les produits depuis l'API
async function loadProductsFromAPI() {
  try {
    const response = await fetch(`${API_BASE}/products-list`);
    const data = await response.json();
    
    if (data.products) {
      // Transformer les données de la base de données au format attendu par l'app
      products = data.products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.collection_slug || 'accessoires',
        price: product.price,
        images: product.images ? product.images.map(img => img.image_url) : [],
        description: product.description,
        badge: product.badge,
        featured: product.featured
      }));
      
      // Dispatcher un événement pour notifier que les produits sont chargés
      window.dispatchEvent(new CustomEvent('productsLoaded', { detail: { products } }));
    }
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    // Fallback: charger depuis le fichier statique
    console.log('Utilisation des produits statiques...');
  }
}

// Fonction pour charger les collections depuis l'API
async function loadCollectionsFromAPI() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    const data = await response.json();
    
    if (data.collections) {
      collections = data.collections;
      return collections;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des collections:', error);
  }
  return [];
}

// Charger les produits au chargement de la page
window.addEventListener('load', () => {
  loadProductsFromAPI();
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
