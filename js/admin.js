// Configuration API
const API_BASE = '/.netlify/functions';
let currentUser = null;
let currentEditingId = null;

// ============================================
// INITIALISATION
// ============================================

window.addEventListener('load', () => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');

  if (!token || !user) {
    window.location.href = '../admin-login.html';
    return;
  }

  currentUser = JSON.parse(user);
  document.getElementById('user-name').textContent = currentUser.username;

  loadDashboard();
});

// ============================================
// NAVIGATION
// ============================================

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = link.getAttribute('data-section');
    if (section && section !== 'logout') {
      showSection(section);
    }
  });
});

function showSection(section) {
  // Hide all sections
  document.querySelectorAll('.admin-content').forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Show selected section
  const contentElement = document.getElementById(`${section}-content`);
  if (contentElement) {
    contentElement.classList.add('active');
  }

  // Add active class to clicked nav link
  const navLink = document.querySelector(`.nav-link[data-section="${section}"]`);
  if (navLink) {
    navLink.classList.add('active');
  }

  // Load data for the section
  if (section === 'products') loadProducts();
  else if (section === 'collections') loadCollections();
  else if (section === 'orders') loadOrders();
  else if (section === 'messages') loadMessages();
}

// ============================================
// DÉCONNEXION
// ============================================

document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('logout-btn-header').addEventListener('click', logout);

function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  window.location.href = '../admin-login.html';
}

// ============================================
// MODALES
// ============================================

document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modalId = btn.getAttribute('data-modal');
    if (modalId) {
      closeModal(modalId);
    }
  });
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// ============================================
// DASHBOARD
// ============================================

async function loadDashboard() {
  try {
    const [productsRes, ordersRes, messagesRes] = await Promise.all([
      fetch(`${API_BASE}/products-list`),
      fetch(`${API_BASE}/orders`),
      fetch(`${API_BASE}/messages`)
    ]);

    const productsData = await productsRes.json();
    const ordersData = await ordersRes.json();
    const messagesData = await messagesRes.json();

    document.getElementById('total-products').textContent = productsData.count || 0;
    document.getElementById('total-orders').textContent = ordersData.orders?.length || 0;
    
    const unreadMessages = (messagesData.messages || []).filter(m => m.status === 'unread').length;
    document.getElementById('unread-messages').textContent = unreadMessages;

  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error);
  }
}

// ============================================
// PRODUITS
// ============================================

document.getElementById('btn-add-product').addEventListener('click', () => {
  currentEditingId = null;
  resetProductForm();
  document.getElementById('product-modal-title').textContent = 'Ajouter un produit';
  openModal('product-modal');
});

document.getElementById('product-submit').addEventListener('click', submitProduct);

async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE}/products-list`);
    const data = await response.json();
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = '';

    if (!data.products || data.products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucun produit trouvé</td></tr>';
      return;
    }

    data.products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.collection_name || '-'}</td>
        <td>${product.price.toFixed(2)} €</td>
        <td>${product.featured ? '<span style="color: #27ae60;">✓</span>' : '-'}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editProduct(${product.id})">Éditer</button>
            <button class="btn-delete" onclick="deleteProduct(${product.id})">Supprimer</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Load collections for the form
    loadCollectionsForForm();
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
  }
}

async function loadCollectionsForForm() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    const data = await response.json();
    const select = document.getElementById('product-collection');
    select.innerHTML = '<option value="">Sélectionner une collection</option>';

    data.collections?.forEach(collection => {
      const option = document.createElement('option');
      option.value = collection.id;
      option.textContent = collection.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des collections:', error);
  }
}

async function editProduct(id) {
  try {
    const response = await fetch(`${API_BASE}/products-crud?id=${id}`);
    const data = await response.json();
    const product = data.product;

    currentEditingId = id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-collection').value = product.collection_id || '';
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-badge').value = product.badge || '';
    document.getElementById('product-featured').checked = product.featured;
    
    const imageUrls = product.images.map(img => img.image_url).join('\n');
    document.getElementById('product-images').value = imageUrls;

    document.getElementById('product-modal-title').textContent = 'Éditer le produit';
    openModal('product-modal');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors du chargement du produit');
  }
}

async function submitProduct() {
  const name = document.getElementById('product-name').value.trim();
  const collectionId = document.getElementById('product-collection').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const description = document.getElementById('product-description').value.trim();
  const badge = document.getElementById('product-badge').value.trim();
  const featured = document.getElementById('product-featured').checked;
  const imagesText = document.getElementById('product-images').value.trim();
  const images = imagesText ? imagesText.split('\n').filter(img => img.trim()) : [];

  if (!name || !price) {
    alert('Veuillez remplir les champs obligatoires');
    return;
  }

  const method = currentEditingId ? 'PUT' : 'POST';
  const url = currentEditingId 
    ? `${API_BASE}/products-crud?id=${currentEditingId}`
    : `${API_BASE}/products-crud`;

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        collectionId: collectionId || null,
        price,
        description,
        badge: badge || null,
        featured,
        images
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

    closeModal('product-modal');
    resetProductForm();
    loadProducts();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la sauvegarde du produit');
  }
}

async function deleteProduct(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) return;

  try {
    const response = await fetch(`${API_BASE}/products-crud?id=${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');

    loadProducts();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la suppression');
  }
}

function resetProductForm() {
  document.getElementById('product-form').reset();
  currentEditingId = null;
}

// ============================================
// COLLECTIONS
// ============================================

document.getElementById('btn-add-collection').addEventListener('click', () => {
  currentEditingId = null;
  document.getElementById('collection-form').reset();
  document.getElementById('collection-modal-title').textContent = 'Ajouter une collection';
  openModal('collection-modal');
});

document.getElementById('collection-submit').addEventListener('click', submitCollection);

async function loadCollections() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    const data = await response.json();
    const tbody = document.getElementById('collections-tbody');
    tbody.innerHTML = '';

    if (!data.collections || data.collections.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Aucune collection trouvée</td></tr>';
      return;
    }

    data.collections.forEach(collection => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${collection.id}</td>
        <td>${collection.name}</td>
        <td>${collection.slug}</td>
        <td>${collection.product_count}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editCollection(${collection.id})">Éditer</button>
            <button class="btn-delete" onclick="deleteCollection(${collection.id})">Supprimer</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des collections:', error);
  }
}

async function editCollection(id) {
  try {
    const response = await fetch(`${API_BASE}/collections?id=${id}`);
    const data = await response.json();
    const collection = data.collection;

    currentEditingId = id;
    document.getElementById('collection-name').value = collection.name;
    document.getElementById('collection-slug').value = collection.slug;
    document.getElementById('collection-description').value = collection.description || '';
    document.getElementById('collection-image').value = collection.image_url || '';

    document.getElementById('collection-modal-title').textContent = 'Éditer la collection';
    openModal('collection-modal');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors du chargement de la collection');
  }
}

async function submitCollection() {
  const name = document.getElementById('collection-name').value.trim();
  const slug = document.getElementById('collection-slug').value.trim();
  const description = document.getElementById('collection-description').value.trim();
  const imageUrl = document.getElementById('collection-image').value.trim();

  if (!name || !slug) {
    alert('Veuillez remplir les champs obligatoires');
    return;
  }

  const method = currentEditingId ? 'PUT' : 'POST';
  const url = currentEditingId
    ? `${API_BASE}/collections?id=${currentEditingId}`
    : `${API_BASE}/collections`;

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        slug,
        description: description || null,
        imageUrl: imageUrl || null
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

    closeModal('collection-modal');
    document.getElementById('collection-form').reset();
    loadCollections();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la sauvegarde de la collection');
  }
}

async function deleteCollection(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette collection?')) return;

  try {
    const response = await fetch(`${API_BASE}/collections?id=${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');

    loadCollections();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la suppression');
  }
}

// ============================================
// COMMANDES
// ============================================

async function loadOrders() {
  try {
    const response = await fetch(`${API_BASE}/orders`);
    const data = await response.json();
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    if (!data.orders || data.orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Aucune commande trouvée</td></tr>';
      return;
    }

    data.orders.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString('fr-FR');
      const statusBadgeClass = `badge-${order.status}`;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.order_number}</td>
        <td>${order.customer_name}</td>
        <td>${order.customer_email}</td>
        <td>${order.total_amount.toFixed(2)} €</td>
        <td><span class="badge ${statusBadgeClass}">${order.status}</span></td>
        <td>${date}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editOrder(${order.id})">Voir</button>
            <button class="btn-delete" onclick="deleteOrder(${order.id})">Supprimer</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des commandes:', error);
  }
}

async function editOrder(id) {
  try {
    const response = await fetch(`${API_BASE}/orders?id=${id}`);
    const data = await response.json();
    const order = data.order;

    currentEditingId = id;
    const detailsDiv = document.getElementById('order-details');
    const itemsHTML = (order.items || []).map(item => `
      <p><strong>Produit ID:</strong> ${item.productId} - <strong>Quantité:</strong> ${item.quantity} - <strong>Prix:</strong> ${item.price} €</p>
    `).join('');

    detailsDiv.innerHTML = `
      <h4>${order.order_number}</h4>
      <p><strong>Client:</strong> ${order.customer_name}</p>
      <p><strong>Email:</strong> ${order.customer_email}</p>
      <p><strong>Téléphone:</strong> ${order.customer_phone || '-'}</p>
      <p><strong>Total:</strong> ${order.total_amount.toFixed(2)} €</p>
      <h5>Articles:</h5>
      ${itemsHTML}
    `;

    document.getElementById('order-status').value = order.status;
    openModal('order-modal');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors du chargement de la commande');
  }
}

document.getElementById('order-submit').addEventListener('click', submitOrderUpdate);

async function submitOrderUpdate() {
  const status = document.getElementById('order-status').value;

  try {
    const response = await fetch(`${API_BASE}/orders?id=${currentEditingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');

    closeModal('order-modal');
    loadOrders();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la mise à jour');
  }
}

async function deleteOrder(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) return;

  try {
    const response = await fetch(`${API_BASE}/orders?id=${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');

    loadOrders();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la suppression');
  }
}

// ============================================
// MESSAGES
// ============================================

async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE}/messages`);
    const data = await response.json();
    const tbody = document.getElementById('messages-tbody');
    tbody.innerHTML = '';

    if (!data.messages || data.messages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucun message trouvé</td></tr>';
      return;
    }

    data.messages.forEach(message => {
      const date = new Date(message.created_at).toLocaleDateString('fr-FR');
      const statusBadgeClass = `badge-${message.status}`;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${message.name}</td>
        <td>${message.email}</td>
        <td>${message.subject || '-'}</td>
        <td><span class="badge ${statusBadgeClass}">${message.status}</span></td>
        <td>${date}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editMessage(${message.id})">Voir</button>
            <button class="btn-delete" onclick="deleteMessage(${message.id})">Supprimer</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des messages:', error);
  }
}

async function editMessage(id) {
  try {
    const response = await fetch(`${API_BASE}/messages?id=${id}`);
    const data = await response.json();
    const message = data.message;

    currentEditingId = id;
    const detailsDiv = document.getElementById('message-details');
    detailsDiv.innerHTML = `
      <h4>${message.subject || 'Sans sujet'}</h4>
      <p><strong>De:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Téléphone:</strong> ${message.phone || '-'}</p>
      <hr>
      <p>${message.message}</p>
    `;

    document.getElementById('message-status').value = message.status;
    openModal('message-modal');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors du chargement du message');
  }
}

document.getElementById('message-submit').addEventListener('click', submitMessageUpdate);

async function submitMessageUpdate() {
  const status = document.getElementById('message-status').value;

  try {
    const response = await fetch(`${API_BASE}/messages?id=${currentEditingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');

    closeModal('message-modal');
    loadMessages();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la mise à jour');
  }
}

async function deleteMessage(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce message?')) return;

  try {
    const response = await fetch(`${API_BASE}/messages?id=${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');

    loadMessages();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la suppression');
  }
}
