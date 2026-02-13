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
    // GET - Récupérer toutes les collections
    if (event.httpMethod === 'GET' && !id) {
      const result = await query(
        `SELECT c.*, COUNT(p.id) as product_count
         FROM collections c
         LEFT JOIN products p ON c.id = p.collection_id
         GROUP BY c.id
         ORDER BY c.created_at DESC`
      );

      return createResponse(200, {
        collections: result.rows,
      });
    }

    // GET - Récupérer une collection spécifique
    if (event.httpMethod === 'GET' && id) {
      const result = await query(
        `SELECT c.*, COUNT(p.id) as product_count
         FROM collections c
         LEFT JOIN products p ON c.id = p.collection_id
         WHERE c.id = $1
         GROUP BY c.id`,
        [id]
      );

      if (result.rows.length === 0) {
        return createErrorResponse(404, 'Collection non trouvée');
      }

      return createResponse(200, { collection: result.rows[0] });
    }

    // POST - Créer une nouvelle collection
    if (event.httpMethod === 'POST') {
      const { name, slug, description, imageUrl } = JSON.parse(event.body || '{}');

      if (!name || !slug) {
        return createErrorResponse(400, 'Name et slug sont requis');
      }

      const result = await query(
        `INSERT INTO collections (name, slug, description, image_url)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [name, slug, description || null, imageUrl || null]
      );

      return createResponse(201, {
        message: 'Collection créée avec succès',
        collectionId: result.rows[0].id,
      });
    }

    // PUT - Mettre à jour une collection
    if (event.httpMethod === 'PUT' && id) {
      const { name, slug, description, imageUrl } = JSON.parse(event.body || '{}');

      await query(
        `UPDATE collections 
         SET name = COALESCE($1, name),
             slug = COALESCE($2, slug),
             description = COALESCE($3, description),
             image_url = COALESCE($4, image_url),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $5`,
        [name, slug, description, imageUrl, id]
      );

      return createResponse(200, {
        message: 'Collection mise à jour avec succès',
      });
    }

    // DELETE - Supprimer une collection
    if (event.httpMethod === 'DELETE' && id) {
      await query('DELETE FROM collections WHERE id = $1', [id]);

      return createResponse(200, {
        message: 'Collection supprimée avec succès',
      });
    }

    return createErrorResponse(405, 'Méthode non autorisée');

  } catch (error) {
    console.error('Erreur dans collections:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
