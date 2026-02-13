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

  if (event.httpMethod !== 'GET') {
    return createErrorResponse(405, 'Méthode non autorisée');
  }

  try {
    const { category, featured } = event.queryStringParameters || {};

    let sql = `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.badge,
        p.featured,
        c.id as collection_id,
        c.name as collection_name,
        c.slug as collection_slug,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'image_url', pi.image_url,
              'sort_order', pi.sort_order
            ) ORDER BY pi.sort_order
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) as images
      FROM products p
      LEFT JOIN collections c ON p.collection_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
    `;

    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('c.slug = $' + (params.length + 1));
      params.push(category);
    }

    if (featured === 'true') {
      conditions.push('p.featured = true');
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' GROUP BY p.id, c.id ORDER BY p.created_at DESC';

    const result = await query(sql, params);

    return createResponse(200, {
      products: result.rows,
      count: result.rows.length,
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
