-- ============================================
-- INSERTION DES COLLECTIONS
-- ============================================

INSERT INTO collections (name, slug, description) VALUES
('Robes de Mariée', 'robes', 'Robes de mariée élégantes et raffinées'),
('Voiles', 'voiles', 'Voiles de mariée délicats'),
('Accessoires', 'accessoires', 'Accessoires de mariage précieux'),
('Chaussures', 'chaussures', 'Chaussures élégantes pour le mariage'),
('Bouquets', 'bouquets', 'Bouquets de fleurs pour le grand jour');

-- ============================================
-- INSERTION DES PRODUITS ET IMAGES
-- ============================================

-- VOILES
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile de mariée élégant', (SELECT id FROM collections WHERE slug='voiles'), 'Voile raffiné pour compléter votre tenue de mariée', 750000, 'Nouveau', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile.jpeg', 0),
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile-(4).jpeg', 1),
((SELECT id FROM products WHERE name='Voile de mariée élégant' LIMIT 1), 'images/products/voile-(5).jpeg', 2);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile romantique délicat', (SELECT id FROM collections WHERE slug='voiles'), 'Voile délicat au style romantique', 630000, NULL, true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile romantique délicat' LIMIT 1), 'images/products/voile-(6).jpeg', 0),
((SELECT id FROM products WHERE name='Voile romantique délicat' LIMIT 1), 'images/products/voile-(9).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile classique intemporel', (SELECT id FROM collections WHERE slug='voiles'), 'Voile classique pour une élégance intemporelle', 550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(10).jpeg', 0),
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(11).jpeg', 1),
((SELECT id FROM products WHERE name='Voile classique intemporel' LIMIT 1), 'images/products/voile-(12).jpeg', 2);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Voile moderne raffiné', (SELECT id FROM collections WHERE slug='voiles'), 'Voile au design moderne et raffiné', 670000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Voile moderne raffiné' LIMIT 1), 'images/products/voile-(14).jpeg', 0);

-- ACCESSOIRES
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Diadème élégant', (SELECT id FROM collections WHERE slug='accessoires'), 'Diadème raffiné pour sublimer votre coiffure', 990000, 'Bestseller', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Diadème élégant' LIMIT 1), 'images/products/diame-(2).jpeg', 0),
((SELECT id FROM products WHERE name='Diadème élégant' LIMIT 1), 'images/products/diame.jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Accessoire de mariée chic', (SELECT id FROM collections WHERE slug='accessoires'), 'Accessoire élégant pour compléter votre look', 515000, NULL, true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Accessoire de mariée chic' LIMIT 1), 'images/products/accessoire.jpeg', 0),
((SELECT id FROM products WHERE name='Accessoire de mariée chic' LIMIT 1), 'images/products/accessoire-(2).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bijou délicat', (SELECT id FROM collections WHERE slug='accessoires'), 'Bijou raffiné aux détails délicats', 355000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bijou délicat' LIMIT 1), 'images/products/accessoire-(3).jpeg', 0),
((SELECT id FROM products WHERE name='Bijou délicat' LIMIT 1), 'images/products/accessoire-(4).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Parure élégante', (SELECT id FROM collections WHERE slug='accessoires'), 'Parure sophistiquée pour votre jour spécial', 590000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Parure élégante' LIMIT 1), 'images/products/accessoire-(5).jpeg', 0),
((SELECT id FROM products WHERE name='Parure élégante' LIMIT 1), 'images/products/accessoire-(6).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Accessoire raffiné', (SELECT id FROM collections WHERE slug='accessoires'), 'Accessoire raffiné au style élégant', 315000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Accessoire raffiné' LIMIT 1), 'images/products/accessoire-(7).jpeg', 0),
((SELECT id FROM products WHERE name='Accessoire raffiné' LIMIT 1), 'images/products/accessoire-(8).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Ornement précieux', (SELECT id FROM collections WHERE slug='accessoires'), 'Ornement précieux pour une touche de glamour', 395000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Ornement précieux' LIMIT 1), 'images/products/accessoire-(9).jpeg', 0),
((SELECT id FROM products WHERE name='Ornement précieux' LIMIT 1), 'images/products/accessoire-(10).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bijou sophistiqué', (SELECT id FROM collections WHERE slug='accessoires'), 'Bijou sophistiqué aux finitions soignées', 475000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bijou sophistiqué' LIMIT 1), 'images/products/accessoire-(11).jpeg', 0),
((SELECT id FROM products WHERE name='Bijou sophistiqué' LIMIT 1), 'images/products/accessoire-(12).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Accessoire luxe', (SELECT id FROM collections WHERE slug='accessoires'), 'Accessoire de luxe pour un look exceptionnel', 750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Accessoire luxe' LIMIT 1), 'images/products/accessoire-(7).jpeg', 0),
((SELECT id FROM products WHERE name='Accessoire luxe' LIMIT 1), 'images/products/accessoire-(8).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Parure délicate', (SELECT id FROM collections WHERE slug='accessoires'), 'Parure délicate au charme intemporel', 435000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Parure délicate' LIMIT 1), 'images/products/accessoire-(9).jpeg', 0),
((SELECT id FROM products WHERE name='Parure délicate' LIMIT 1), 'images/products/accessoire-(10).jpeg', 1);

-- CHAUSSURES
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Escarpins élégants', (SELECT id FROM collections WHERE slug='chaussures'), 'Escarpins raffinés pour un confort optimal', 475000, 'Promo', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Escarpins élégants' LIMIT 1), 'images/products/chaussure-(2).jpeg', 0),
((SELECT id FROM products WHERE name='Escarpins élégants' LIMIT 1), 'images/products/chaussure-(4).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Chaussures raffinées', (SELECT id FROM collections WHERE slug='chaussures'), 'Chaussures élégantes au style raffiné', 515000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Chaussures raffinées' LIMIT 1), 'images/products/chaussure-(5).jpeg', 0),
((SELECT id FROM products WHERE name='Chaussures raffinées' LIMIT 1), 'images/products/chaussure-(6).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Escarpins classiques', (SELECT id FROM collections WHERE slug='chaussures'), 'Escarpins classiques intemporels', 435000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Escarpins classiques' LIMIT 1), 'images/products/chaussure-(7).jpeg', 0),
((SELECT id FROM products WHERE name='Escarpins classiques' LIMIT 1), 'images/products/chaussure-(8).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Chaussures confort', (SELECT id FROM collections WHERE slug='chaussures'), 'Chaussures confortables pour toute la journée', 395000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Chaussures confort' LIMIT 1), 'images/products/chaussure-(9).jpeg', 0),
((SELECT id FROM products WHERE name='Chaussures confort' LIMIT 1), 'images/products/chaussure-(10).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Sandales élégantes', (SELECT id FROM collections WHERE slug='chaussures'), 'Sandales raffinées au style chic', 355000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Sandales élégantes' LIMIT 1), 'images/products/chaussure-(11).jpeg', 0),
((SELECT id FROM products WHERE name='Sandales élégantes' LIMIT 1), 'images/products/chaussure-(12).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Escarpins sophistiqués', (SELECT id FROM collections WHERE slug='chaussures'), 'Escarpins sophistiqués pour une allure parfaite', 555000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Escarpins sophistiqués' LIMIT 1), 'images/products/chaussure-(13).jpeg', 0),
((SELECT id FROM products WHERE name='Escarpins sophistiqués' LIMIT 1), 'images/products/chaussure-(14).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Chaussures modernes', (SELECT id FROM collections WHERE slug='chaussures'), 'Chaussures au design moderne et élégant', 475000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Chaussures modernes' LIMIT 1), 'images/products/chaussure-(15).jpeg', 0),
((SELECT id FROM products WHERE name='Chaussures modernes' LIMIT 1), 'images/products/chaussure-(16).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Escarpins luxe', (SELECT id FROM collections WHERE slug='chaussures'), 'Escarpins de luxe aux finitions impeccables', 595000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Escarpins luxe' LIMIT 1), 'images/products/chaussure-(17).jpeg', 0),
((SELECT id FROM products WHERE name='Escarpins luxe' LIMIT 1), 'images/products/chaussure-(18).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Chaussures glamour', (SELECT id FROM collections WHERE slug='chaussures'), 'Chaussures glamour pour briller', 535000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Chaussures glamour' LIMIT 1), 'images/products/chaussure-(19).jpeg', 0),
((SELECT id FROM products WHERE name='Chaussures glamour' LIMIT 1), 'images/products/chaussure.jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Escarpins délicats', (SELECT id FROM collections WHERE slug='chaussures'), 'Escarpins délicats au style raffiné', 455000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Escarpins délicats' LIMIT 1), 'images/products/chaussure-(3).jpeg', 0);

-- BOUQUETS
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet romantique', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet romantique aux fleurs délicates', 635000, 'Bestseller', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet romantique' LIMIT 1), 'images/products/bouquet.jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet romantique' LIMIT 1), 'images/products/bouquet-(3).jpeg', 1),
((SELECT id FROM products WHERE name='Bouquet romantique' LIMIT 1), 'images/products/bouquet-(5).jpeg', 2);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet élégant', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet élégant au style raffiné', 590000, NULL, true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet élégant' LIMIT 1), 'images/products/bouquet-(6).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet élégant' LIMIT 1), 'images/products/bouquet-(7).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet champêtre', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet champêtre au charme naturel', 515000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet champêtre' LIMIT 1), 'images/products/bouquet-(9).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet champêtre' LIMIT 1), 'images/products/bouquet-(10).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet luxe', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet luxueux aux compositions raffinées', 750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet luxe' LIMIT 1), 'images/products/bouquet-(11).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet luxe' LIMIT 1), 'images/products/bouquet-(12).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet classique', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet classique intemporel', 550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet classique' LIMIT 1), 'images/products/bouquet-(13).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet classique' LIMIT 1), 'images/products/bouquet-(14).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet sophistiqué', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet sophistiqué aux détails soignés', 670000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet sophistiqué' LIMIT 1), 'images/products/bouquet-(15).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet sophistiqué' LIMIT 1), 'images/products/bouquet-(16).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet moderne', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet au design moderne et épuré', 610000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet moderne' LIMIT 1), 'images/products/bouquet-(17).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet moderne' LIMIT 1), 'images/products/bouquet-(18).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet délicat', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet délicat aux nuances subtiles', 570000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet délicat' LIMIT 1), 'images/products/bouquet-(20).jpeg', 0),
((SELECT id FROM products WHERE name='Bouquet délicat' LIMIT 1), 'images/products/bouquet-(3).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Bouquet printemps', (SELECT id FROM collections WHERE slug='bouquets'), 'Bouquet printanier aux couleurs vives', 535000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Bouquet printemps' LIMIT 1), 'images/products/bouquet-(4).jpeg', 0);

-- ROBES (28 robes)
INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe de mariée élégante', (SELECT id FROM collections WHERE slug='robes'), 'Robe de mariée élégante au style raffiné', 5150000, 'Nouveau', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe de mariée élégante' LIMIT 1), 'images/products/rbf.jpeg', 0),
((SELECT id FROM products WHERE name='Robe de mariée élégante' LIMIT 1), 'images/products/rbf-(2).jpeg', 1),
((SELECT id FROM products WHERE name='Robe de mariée élégante' LIMIT 1), 'images/products/rbf-(3).jpeg', 2);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe romantique', (SELECT id FROM collections WHERE slug='robes'), 'Robe romantique aux détails délicats', 5550000, 'Bestseller', true);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe romantique' LIMIT 1), 'images/products/rbf-(4).jpeg', 0),
((SELECT id FROM products WHERE name='Robe romantique' LIMIT 1), 'images/products/rbf-(5).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe classique', (SELECT id FROM collections WHERE slug='robes'), 'Robe classique intemporelle', 4750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe classique' LIMIT 1), 'images/products/rbf-(6).jpeg', 0),
((SELECT id FROM products WHERE name='Robe classique' LIMIT 1), 'images/products/rbf-(7).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe princesse', (SELECT id FROM collections WHERE slug='robes'), 'Robe de princesse pour un jour magique', 5950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe princesse' LIMIT 1), 'images/products/rbf-(8).jpeg', 0),
((SELECT id FROM products WHERE name='Robe princesse' LIMIT 1), 'images/products/rbf-(9).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe sophistiquée', (SELECT id FROM collections WHERE slug='robes'), 'Robe sophistiquée aux finitions soignées', 5350000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe sophistiquée' LIMIT 1), 'images/products/rbf-(10).jpeg', 0),
((SELECT id FROM products WHERE name='Robe sophistiquée' LIMIT 1), 'images/products/rbf-(12).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe moderne chic', (SELECT id FROM collections WHERE slug='robes'), 'Robe moderne au style chic et contemporain', 4950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe moderne chic' LIMIT 1), 'images/products/rbf-(13).jpeg', 0),
((SELECT id FROM products WHERE name='Robe moderne chic' LIMIT 1), 'images/products/rbf-(14).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe bohème', (SELECT id FROM collections WHERE slug='robes'), 'Robe bohème au charme décontracté', 3950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe bohème' LIMIT 1), 'images/products/rbf-(16).jpeg', 0),
((SELECT id FROM products WHERE name='Robe bohème' LIMIT 1), 'images/products/rbf-(18).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe sirène', (SELECT id FROM collections WHERE slug='robes'), 'Robe sirène pour une silhouette sculptée', 5750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe sirène' LIMIT 1), 'images/products/rbf-(19).jpeg', 0),
((SELECT id FROM products WHERE name='Robe sirène' LIMIT 1), 'images/products/rbf-(20).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe empire', (SELECT id FROM collections WHERE slug='robes'), 'Robe empire délicate et fluide', 4550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe empire' LIMIT 1), 'images/products/rbf-(21).jpeg', 0),
((SELECT id FROM products WHERE name='Robe empire' LIMIT 1), 'images/products/rbf-(22).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe dentelle', (SELECT id FROM collections WHERE slug='robes'), 'Robe ornée de dentelle raffinée', 5150000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe dentelle' LIMIT 1), 'images/products/rbf-(23).jpeg', 0),
((SELECT id FROM products WHERE name='Robe dentelle' LIMIT 1), 'images/products/rbf-(24).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe bustier', (SELECT id FROM collections WHERE slug='robes'), 'Robe bustier élégante et structurée', 4750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe bustier' LIMIT 1), 'images/products/rbf-(25).jpeg', 0),
((SELECT id FROM products WHERE name='Robe bustier' LIMIT 1), 'images/products/rbf-(26).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe tulle', (SELECT id FROM collections WHERE slug='robes'), 'Robe en tulle aérien et romantique', 5350000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe tulle' LIMIT 1), 'images/products/rbf-(29).jpeg', 0),
((SELECT id FROM products WHERE name='Robe tulle' LIMIT 1), 'images/products/rbf-(30).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe luxe', (SELECT id FROM collections WHERE slug='robes'), 'Robe de luxe aux détails exceptionnels', 6750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe luxe' LIMIT 1), 'images/products/rbf-(31).jpeg', 0),
((SELECT id FROM products WHERE name='Robe luxe' LIMIT 1), 'images/products/rbm.jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe brodée', (SELECT id FROM collections WHERE slug='robes'), 'Robe brodée avec finitions artisanales', 6150000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe brodée' LIMIT 1), 'images/products/rbm-(3).jpeg', 0),
((SELECT id FROM products WHERE name='Robe brodée' LIMIT 1), 'images/products/rbm-(6).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe évasée', (SELECT id FROM collections WHERE slug='robes'), 'Robe évasée au tombé parfait', 4950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe évasée' LIMIT 1), 'images/products/rbm-(8).jpeg', 0),
((SELECT id FROM products WHERE name='Robe évasée' LIMIT 1), 'images/products/rbm-(9).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe ajustée', (SELECT id FROM collections WHERE slug='robes'), 'Robe ajustée pour une silhouette sublime', 5550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe ajustée' LIMIT 1), 'images/products/rbm-(10).jpeg', 0),
((SELECT id FROM products WHERE name='Robe ajustée' LIMIT 1), 'images/products/rbm-(11).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe traîne', (SELECT id FROM collections WHERE slug='robes'), 'Robe majestueuse avec traîne élégante', 6350000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe traîne' LIMIT 1), 'images/products/rbm-(12).jpeg', 0),
((SELECT id FROM products WHERE name='Robe traîne' LIMIT 1), 'images/products/rbm-(13).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe perles', (SELECT id FROM collections WHERE slug='robes'), 'Robe ornée de perles délicates', 6950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe perles' LIMIT 1), 'images/products/rbm-(14).jpeg', 0),
((SELECT id FROM products WHERE name='Robe perles' LIMIT 1), 'images/products/rbm-(15).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe vintage', (SELECT id FROM collections WHERE slug='robes'), 'Robe au charme vintage intemporel', 4550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe vintage' LIMIT 1), 'images/products/rbm-(16).jpeg', 0),
((SELECT id FROM products WHERE name='Robe vintage' LIMIT 1), 'images/products/rbm-(17).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe minimaliste', (SELECT id FROM collections WHERE slug='robes'), 'Robe minimaliste au design épuré', 3550000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe minimaliste' LIMIT 1), 'images/products/rbm-(18).jpeg', 0),
((SELECT id FROM products WHERE name='Robe minimaliste' LIMIT 1), 'images/products/rbm-(19).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe col V', (SELECT id FROM collections WHERE slug='robes'), 'Robe avec décolleté en V élégant', 4750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe col V' LIMIT 1), 'images/products/rbm-(20).jpeg', 0),
((SELECT id FROM products WHERE name='Robe col V' LIMIT 1), 'images/products/rbm-(21).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe dos nu', (SELECT id FROM collections WHERE slug='robes'), 'Robe audacieuse avec dos nu raffiné', 5350000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe dos nu' LIMIT 1), 'images/products/rbm-(23).jpeg', 0),
((SELECT id FROM products WHERE name='Robe dos nu' LIMIT 1), 'images/products/rbm-(24).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe manches longues', (SELECT id FROM collections WHERE slug='robes'), 'Robe élégante à manches longues', 5150000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe manches longues' LIMIT 1), 'images/products/rbm-(27).jpeg', 0),
((SELECT id FROM products WHERE name='Robe manches longues' LIMIT 1), 'images/products/rbm-(29).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe courte', (SELECT id FROM collections WHERE slug='robes'), 'Robe courte pour un mariage civil ou réception', 2750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe courte' LIMIT 1), 'images/products/rbm-(30).jpeg', 0),
((SELECT id FROM products WHERE name='Robe courte' LIMIT 1), 'images/products/rbm-(31).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe transparence', (SELECT id FROM collections WHERE slug='robes'), 'Robe avec détails en transparence', 5750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe transparence' LIMIT 1), 'images/products/rbm-(32).jpeg', 0),
((SELECT id FROM products WHERE name='Robe transparence' LIMIT 1), 'images/products/rbm-(33).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe volants', (SELECT id FROM collections WHERE slug='robes'), 'Robe romantique avec volants délicats', 4950000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe volants' LIMIT 1), 'images/products/rbm-(34).jpeg', 0),
((SELECT id FROM products WHERE name='Robe volants' LIMIT 1), 'images/products/rbm-(36).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe asymétrique', (SELECT id FROM collections WHERE slug='robes'), 'Robe au design asymétrique moderne', 4750000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe asymétrique' LIMIT 1), 'images/products/rbm-(37).jpeg', 0),
((SELECT id FROM products WHERE name='Robe asymétrique' LIMIT 1), 'images/products/rbm-(38).jpeg', 1);

INSERT INTO products (name, collection_id, description, price, badge, featured) VALUES
('Robe cathédrale', (SELECT id FROM collections WHERE slug='robes'), 'Robe majestueuse style cathédrale', 7150000, NULL, false);
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
((SELECT id FROM products WHERE name='Robe cathédrale' LIMIT 1), 'images/products/rbm-(39).jpeg', 0),
((SELECT id FROM products WHERE name='Robe cathédrale' LIMIT 1), 'images/products/rbm-(40).jpeg', 1);
