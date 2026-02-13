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
    // GET - Récupérer un produit spécifique
    if (event.httpMethod === 'GET' && id) {
      const result = await query(
        `SELECT 
          p.id, p.name, p.description, p.price, p.badge, p.featured,
          p.collection_id, c.name as collection_name,
          json_agg(
            json_build_object(
              'id', pi.id,
              'image_url', pi.image_url
            ) ORDER BY pi.sort_order
          ) as images
        FROM products p
        LEFT JOIN collections c ON p.collection_id = c.id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE p.id = $1
        GROUP BY p.id, c.id`,
        [id]
      );

      if (result.rows.length === 0) {
        return createErrorResponse(404, 'Produit non trouvé');
      }

      return createResponse(200, { product: result.rows[0] });
    }

    // POST - Créer un nouveau produit
    if (event.httpMethod === 'POST') {
      const { name, collectionId, description, price, badge, featured, images } = 
        JSON.parse(event.body || '{}');

      if (!name || !price) {
        return createErrorResponse(400, 'Name et price sont requis');
      }

      const result = await query(
        `INSERT INTO products (name, collection_id, description, price, badge, featured)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [name, collectionId || null, description || '', price, badge || null, featured || false]
      );

      const productId = result.rows[0].id;

      // Insérer les images si fournies
      if (images && Array.isArray(images)) {
        for (let i = 0; i < images.length; i++) {
          await query(
            'INSERT INTO product_images (product_id, image_url, sort_order) VALUES ($1, $2, $3)',
            [productId, images[i], i]
          );
        }
      }

      return createResponse(201, {
        message: 'Produit créé avec succès',
        productId,
      });
    }

    // PUT - Mettre à jour un produit
    if (event.httpMethod === 'PUT' && id) {
      const { name, collectionId, description, price, badge, featured, images } = 
        JSON.parse(event.body || '{}');

      // Mettre à jour le produit
      await query(
        `UPDATE products 
         SET name = COALESCE($1, name),
             collection_id = COALESCE($2, collection_id),
             description = COALESCE($3, description),
             price = COALESCE($4, price),
             badge = COALESCE($5, badge),
             featured = COALESCE($6, featured),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7`,
        [name, collectionId, description, price, badge, featured, id]
      );

      // Gérer les images
      if (images !== undefined) {
        // Supprimer les anciennes images
        await query('DELETE FROM product_images WHERE product_id = $1', [id]);
        
        // Ajouter les nouvelles images
        if (Array.isArray(images)) {
          for (let i = 0; i < images.length; i++) {
            await query(
              'INSERT INTO product_images (product_id, image_url, sort_order) VALUES ($1, $2, $3)',
              [id, images[i], i]
            );
          }
        }
      }

      return createResponse(200, {
        message: 'Produit mis à jour avec succès',
      });
    }

    // DELETE - Supprimer un produit
    if (event.httpMethod === 'DELETE' && id) {
      await query('DELETE FROM products WHERE id = $1', [id]);

      return createResponse(200, {
        message: 'Produit supprimé avec succès',
      });
    }

    return createErrorResponse(405, 'Méthode non autorisée');

  } catch (error) {
    console.error('Erreur dans products-crud:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
