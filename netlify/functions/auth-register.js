import { query, createResponse, createErrorResponse, corsHeaders } from './lib/db.js';
import bcrypt from 'bcryptjs';

// Cette fonction est protégée et ne devrait être appelée que par un admin existant
// ou lors de l'initialisation du premier admin
export async function handler(event) {
  // Gérer les requêtes OPTIONS pour CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return createErrorResponse(405, 'Méthode non autorisée');
  }

  try {
    const { username, email, password } = JSON.parse(event.body || '{}');

    if (!username || !email || !password) {
      return createErrorResponse(400, 'Username, email et password sont requis');
    }

    // Vérifier que l'utilisateur n'existe pas
    const existingUser = await query(
      'SELECT id FROM admin_users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return createErrorResponse(400, 'Cet utilisateur existe déjà');
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const result = await query(
      'INSERT INTO admin_users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );

    return createResponse(201, {
      message: 'Utilisateur créé avec succès',
      user: result.rows[0],
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
