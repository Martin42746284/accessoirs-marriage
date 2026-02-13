import { query, createResponse, createErrorResponse, corsHeaders } from './lib/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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
    const { username, password } = JSON.parse(event.body || '{}');

    if (!username || !password) {
      return createErrorResponse(400, 'Username et password sont requis');
    }

    // Récupérer l'utilisateur
    const result = await query(
      'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return createErrorResponse(401, 'Identifiants invalides');
    }

    const user = result.rows[0];

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return createErrorResponse(401, 'Identifiants invalides');
    }

    // Créer le JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return createResponse(200, {
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
