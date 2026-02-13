import { query, createResponse, createErrorResponse, corsHeaders } from './lib/db.js';

function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

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
    // GET - Récupérer toutes les commandes
    if (event.httpMethod === 'GET' && !id) {
      const result = await query(
        `SELECT o.*, 
           json_agg(
             json_build_object(
               'id', oi.id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'price', oi.price
             )
           ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         GROUP BY o.id
         ORDER BY o.created_at DESC`
      );

      return createResponse(200, {
        orders: result.rows,
      });
    }

    // GET - Récupérer une commande spécifique
    if (event.httpMethod === 'GET' && id) {
      const result = await query(
        `SELECT o.*, 
           json_agg(
             json_build_object(
               'id', oi.id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'price', oi.price
             )
           ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.id = $1
         GROUP BY o.id`,
        [id]
      );

      if (result.rows.length === 0) {
        return createErrorResponse(404, 'Commande non trouvée');
      }

      return createResponse(200, { order: result.rows[0] });
    }

    // POST - Créer une nouvelle commande
    if (event.httpMethod === 'POST') {
      const { customerName, customerEmail, customerPhone, items, totalAmount } = 
        JSON.parse(event.body || '{}');

      if (!customerName || !customerEmail || !items || items.length === 0) {
        return createErrorResponse(400, 'Données incomplètes');
      }

      const orderNumber = generateOrderNumber();

      const orderResult = await query(
        `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [orderNumber, customerName, customerEmail, customerPhone || null, totalAmount]
      );

      const orderId = orderResult.rows[0].id;

      // Insérer les articles de la commande
      for (const item of items) {
        await query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      return createResponse(201, {
        message: 'Commande créée avec succès',
        orderId,
        orderNumber,
      });
    }

    // PUT - Mettre à jour le statut d'une commande
    if (event.httpMethod === 'PUT' && id) {
      const { status } = JSON.parse(event.body || '{}');

      if (!status) {
        return createErrorResponse(400, 'Statut requis');
      }

      await query(
        'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [status, id]
      );

      return createResponse(200, {
        message: 'Commande mise à jour avec succès',
      });
    }

    // DELETE - Supprimer une commande
    if (event.httpMethod === 'DELETE' && id) {
      await query('DELETE FROM orders WHERE id = $1', [id]);

      return createResponse(200, {
        message: 'Commande supprimée avec succès',
      });
    }

    return createErrorResponse(405, 'Méthode non autorisée');

  } catch (error) {
    console.error('Erreur dans orders:', error);
    return createErrorResponse(500, 'Erreur serveur');
  }
}
