import { query, createResponse, createErrorResponse, corsHeaders } from './lib/db.js';

export async function handler(event) {
  // Gérer les requêtes OPTIONS pour CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    };
  }

  const { id } = event.queryStringParameters || {};

  try {
    // GET - Récupérer tous les messages
    if (event.httpMethod === 'GET' && !id) {
      const result = await query(
        'SELECT * FROM customer_messages ORDER BY created_at DESC'
      );

      return createResponse(200, {
        messages: result.rows,
      });
    }

    // GET - Récupérer un message spécifique
    if (event.httpMethod === 'GET' && id) {
      const result = await query(
        'SELECT * FROM customer_messages WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return createErrorResponse(404, 'Message non trouvé');
      }

      return createResponse(200, { message: result.rows[0] });
    }

    // POST - Créer un nouveau message (côté client ou admin)
    if (event.httpMethod === 'POST') {
      const { name, email, phone, subject, message } = JSON.parse(event.body || '{}');

      if (!name || !email || !message) {
        return createErrorResponse(400, 'Nom, email et message sont requis');
      }

      const result = await query(
        `INSERT INTO customer_messages (name, email, phone, subject, message)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [name, email, phone || null, subject || null, message]
      );

      return createResponse(201, {
        message: 'Message envoyé avec succès',
        messageId: result.rows[0].id,
      });
    }

    // PUT - Mettre à jour le statut d'un message (admin)
    if (event.httpMethod === 'PUT' && id) {
      const { status } = JSON.parse(event.body || '{}');

      if (!status) {
        return createErrorResponse(400, 'Statut requis');
      }

      await query(
        'UPDATE customer_messages SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [status, id]
      );

      return createResponse(200, {
        message: 'Message mis à jour avec succès',
      });
    }

    // DELETE - Supprimer un message (admin)
    if (event.httpMethod === 'DELETE' && id) {
      await query('DELETE FROM customer_messages WHERE id = $1', [id]);

      return createResponse(200, {
        message: 'Message supprimé avec succès',
      });
    }

    return createErrorResponse(405, 'Méthode non autorisée');

  } catch (error) {
    console.error('Erreur dans messages:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
