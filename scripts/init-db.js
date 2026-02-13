import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function initializeDatabase() {
  try {
    console.log('📦 Initialisation de la base de données...');

    // Créer les tables
    const createTablesSQL = `
      -- Table des utilisateurs admin
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des collections/catégories
      CREATE TABLE IF NOT EXISTS collections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des produits
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        collection_id INTEGER REFERENCES collections(id) ON DELETE SET NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        badge VARCHAR(100),
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des images de produits
      CREATE TABLE IF NOT EXISTS product_images (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        image_url VARCHAR(500) NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des commandes
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20),
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des articles de commande
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Table des messages clients
      CREATE TABLE IF NOT EXISTS customer_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Créer des index pour les performances
      CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_id);
      CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
      CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
      CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
      CREATE INDEX IF NOT EXISTS idx_customer_messages_email ON customer_messages(email);
    `;

    const statements = createTablesSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }

    console.log('✅ Tables créées avec succès!');

    // Insérer les données existantes des produits
    const productsData = await import('../data/products.js');
    const products = productsData.products || [];

    // Créer les collections d'abord
    const collectionsMap = {};
    const categories = ['robes', 'voiles', 'accessoires', 'chaussures', 'bouquets'];
    
    for (const category of categories) {
      const result = await pool.query(
        'INSERT INTO collections (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO UPDATE SET name = $1 RETURNING id',
        [
          category.charAt(0).toUpperCase() + category.slice(1),
          category
        ]
      );
      collectionsMap[category] = result.rows[0].id;
    }

    console.log('✅ Collections créées!');

    // Insérer les produits
    for (const product of products) {
      const collectionId = collectionsMap[product.category];
      
      const productResult = await pool.query(
        'INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING id',
        [
          product.name,
          collectionId,
          product.description || '',
          product.price,
          product.badge || null,
          product.featured || false
        ]
      );

      if (productResult.rows.length > 0) {
        const productId = productResult.rows[0].id;
        
        // Insérer les images
        if (product.images && Array.isArray(product.images)) {
          for (let i = 0; i < product.images.length; i++) {
            await pool.query(
              'INSERT INTO product_images (product_id, image_url, sort_order) VALUES ($1, $2, $3)',
              [productId, product.images[i], i]
            );
          }
        }
      }
    }

    console.log('✅ Produits et images importés!');
    console.log('🎉 Base de données initialisée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initializeDatabase();
