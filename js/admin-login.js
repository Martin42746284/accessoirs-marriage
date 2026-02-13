// Configuration API
const API_BASE = '/.netlify/functions';

// Éléments du formulaire
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');
const loginBtn = document.querySelector('.btn-login');

// Événement de soumission du formulaire
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showMessage('Veuillez remplir tous les champs', 'error');
    return;
  }

  try {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Connexion en cours...';

    const response = await fetch(`${API_BASE}/auth-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Erreur de connexion', 'error');
      return;
    }

    // Sauvegarder le token et les infos utilisateur
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));

    showMessage('Connexion réussie, redirection...', 'success');
    
    // Rediriger vers le dashboard après 1 seconde
    setTimeout(() => {
      window.location.href = 'admin/index.html';
    }, 1000);

  } catch (error) {
    console.error('Erreur:', error);
    showMessage('Erreur de connexion. Veuillez réessayer.', 'error');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Se connecter';
  }
});

// Fonction pour afficher les messages
function showMessage(message, type) {
  loginMessage.textContent = message;
  loginMessage.className = `login-message ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      loginMessage.className = 'login-message hidden';
    }, 3000);
  }
}

// Vérifier si l'utilisateur est déjà connecté
window.addEventListener('load', () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    window.location.href = 'admin/index.html';
  }
});
