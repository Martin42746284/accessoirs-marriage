-- ============================================
-- INSERTION DES COLLECTIONS (ignorer les doublons)
-- ============================================

INSERT INTO collections (name, slug, description) VALUES
('Robes de Mariée', 'robes', 'Robes de mariée élégantes et raffinées'),
('Voiles', 'voiles', 'Voiles de mariée délicats'),
('Accessoires', 'accessoires', 'Accessoires de mariage précieux'),
('Chaussures', 'chaussures', 'Chaussures élégantes pour le mariage'),
('Bouquets', 'bouquets', 'Bouquets de fleurs pour le grand jour')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- INSERTION DES PRODUITS ET IMAGES
-- ============================================

-- VOILES
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile de mariée élégant', (SELECT id FROM collections WHERE slug='voiles'), 'Voile raffiné pour compléter votre tenue de mariée', 750000, 'Nouveau', true)
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile.jpeg', 0),
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile-(4).jpeg', 1),
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile-(5).jpeg', 2)
ON CONFLICT DO NOTHING;

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile romantique délicat', (SELECT id FROM collections WHERE slug='voiles'), 'Voile délicat au style romantique', 630000, NULL, true)
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile romantique délicat' LIMIT 1), 'images/products/voile-(6).jpeg', 0),
((SELECT id FROM products WHERE name='Voile romantique délicat' LIMIT 1), 'images/products/voile-(9).jpeg', 1)
ON CONFLICT DO NOTHING;

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile classique intemporel', (SELECT id FROM collections WHERE slug='voiles'), 'Voile classique pour une élégance intemporelle', 550000, NULL, false)
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(10).jpeg', 0),
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(11).jpeg', 1),
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(12).jpeg', 2)
ON CONFLICT DO NOTHING;

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile moderne raffiné', (SELECT id FROM collections WHERE slug='voiles'), 'Voile au design moderne et raffiné', 670000, NULL, false)
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile moderne raffiné' LIMIT 1), 'images/products/voile-(14).jpeg', 0)
ON CONFLICT DO NOTHING;
