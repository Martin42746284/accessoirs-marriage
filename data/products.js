// ============================================
// DONNÉES STATIQUES DES PRODUITS
// ============================================

const products = [
    // VOILES
    {
        id: 1,
        name: "Voile de mariée élégant",
        category: "voiles",
        price: 750000,
        images: [
            "images/products/voile.jpeg",
            "images/products/voile-(4).jpeg",
            "images/products/voile-(5).jpeg"
        ],
        description: "Voile raffiné pour compléter votre tenue de mariée",
        badge: "Nouveau",
        featured: true
    },
    {
        id: 2,
        name: "Voile romantique délicat",
        category: "voiles",
        price: 630000,
        images: [
            "images/products/voile-(6).jpeg",
            "images/products/voile-(9).jpeg"
        ],
        description: "Voile délicat au style romantique",
        featured: true
    },
    {
        id: 3,
        name: "Voile classique intemporel",
        category: "voiles",
        price: 550000,
        images: [
            "images/products/voile-(10).jpeg",
            "images/products/voile-(11).jpeg",
            "images/products/voile-(12).jpeg"
        ],
        description: "Voile classique pour une élégance intemporelle"
    },
    {
        id: 4,
        name: "Voile moderne raffiné",
        category: "voiles",
        price: 670000,
        images: [
            "images/products/voile-(14).jpeg"
        ],
        description: "Voile au design moderne et raffiné"
    },
    
    // ACCESSOIRES
    {
        id: 5,
        name: "Diadème élégant",
        category: "accessoires",
        price: 990000,
        images: [
            "images/products/diame-(2).jpeg",
            "images/products/diame.jpeg"
        ],
        description: "Diadème raffiné pour sublimer votre coiffure",
        badge: "Bestseller",
        featured: true
    },
    {
        id: 6,
        name: "Accessoire de mariée chic",
        category: "accessoires",
        price: 515000,
        images: [
            "images/products/accessoire.jpeg",
            "images/products/accessoire-(2).jpeg"
        ],
        description: "Accessoire élégant pour compléter votre look",
        featured: true
    },
    {
        id: 7,
        name: "Bijou délicat",
        category: "accessoires",
        price: 355000,
        images: [
            "images/products/accessoire-(3).jpeg",
            "images/products/accessoire-(4).jpeg"
        ],
        description: "Bijou raffiné aux détails délicats"
    },
    {
        id: 8,
        name: "Parure élégante",
        category: "accessoires",
        price: 590000,
        images: [
            "images/products/accessoire-(5).jpeg",
            "images/products/accessoire-(6).jpeg"
        ],
        description: "Parure sophistiquée pour votre jour spécial"
    },
    {
        id: 9,
        name: "Accessoire raffiné",
        category: "accessoires",
        price: 315000,
        images: [
            "images/products/accessoire-(7).jpeg",
            "images/products/accessoire-(8).jpeg"
        ],
        description: "Accessoire raffiné au style élégant"
    },
    {
        id: 10,
        name: "Ornement précieux",
        category: "accessoires",
        price: 395000,
        images: [
            "images/products/accessoire-(9).jpeg",
            "images/products/accessoire-(10).jpeg"
        ],
        description: "Ornement précieux pour une touche de glamour"
    },
    {
        id: 11,
        name: "Bijou sophistiqué",
        category: "accessoires",
        price: 475000,
        images: [
            "images/products/accessoire-(11).jpeg",
            "images/products/accessoire-(12).jpeg"
        ],
        description: "Bijou sophistiqué aux finitions soignées"
    },
    {
        id: 12,
        name: "Accessoire luxe",
        category: "accessoires",
        price: 750000,
        images: [
            "images/products/accessoire-(7).jpeg",
            "images/products/accessoire-(8).jpeg"
        ],
        description: "Accessoire de luxe pour un look exceptionnel"
    },
    {
        id: 13,
        name: "Parure délicate",
        category: "accessoires",
        price: 435000,
        images: [
            "images/products/accessoire-(9).jpeg",
            "images/products/accessoire-(10).jpeg"
        ],
        description: "Parure délicate au charme intemporel"
    },
    
    // CHAUSSURES
    {
        id: 14,
        name: "Escarpins élégants",
        category: "chaussures",
        price: 475000,
        images: [
            "images/products/chaussure-(2).jpeg",
            "images/products/chaussure-(4).jpeg"
        ],
        description: "Escarpins raffinés pour un confort optimal",
        badge: "Promo",
        featured: true
    },
    {
        id: 15,
        name: "Chaussures raffinées",
        category: "chaussures",
        price: 515000,
        images: [
            "images/products/chaussure-(5).jpeg",
            "images/products/chaussure-(6).jpeg"
        ],
        description: "Chaussures élégantes au style raffiné"
    },
    {
        id: 16,
        name: "Escarpins classiques",
        category: "chaussures",
        price: 435000,
        images: [
            "images/products/chaussure-(7).jpeg",
            "images/products/chaussure-(8).jpeg"
        ],
        description: "Escarpins classiques intemporels"
    },
    {
        id: 17,
        name: "Chaussures confort",
        category: "chaussures",
        price: 395000,
        images: [
            "images/products/chaussure-(9).jpeg",
            "images/products/chaussure-(10).jpeg"
        ],
        description: "Chaussures confortables pour toute la journée"
    },
    {
        id: 18,
        name: "Sandales élégantes",
        category: "chaussures",
        price: 355000,
        images: [
            "images/products/chaussure-(11).jpeg",
            "images/products/chaussure-(12).jpeg"
        ],
        description: "Sandales raffinées au style chic"
    },
    {
        id: 19,
        name: "Escarpins sophistiqués",
        category: "chaussures",
        price: 555000,
        images: [
            "images/products/chaussure-(13).jpeg",
            "images/products/chaussure-(14).jpeg"
        ],
        description: "Escarpins sophistiqués pour une allure parfaite"
    },
    {
        id: 20,
        name: "Chaussures modernes",
        category: "chaussures",
        price: 475000,
        images: [
            "images/products/chaussure-(15).jpeg",
            "images/products/chaussure-(16).jpeg"
        ],
        description: "Chaussures au design moderne et élégant"
    },
    {
        id: 21,
        name: "Escarpins luxe",
        category: "chaussures",
        price: 595000,
        images: [
            "images/products/chaussure-(17).jpeg",
            "images/products/chaussure-(18).jpeg"
        ],
        description: "Escarpins de luxe aux finitions impeccables"
    },
    {
        id: 22,
        name: "Chaussures glamour",
        category: "chaussures",
        price: 535000,
        images: [
            "images/products/chaussure-(19).jpeg",
            "images/products/chaussure.jpeg"
        ],
        description: "Chaussures glamour pour briller"
    },
    {
        id: 23,
        name: "Escarpins délicats",
        category: "chaussures",
        price: 455000,
        images: [
            "images/products/chaussure-(3).jpeg"
        ],
        description: "Escarpins délicats au style raffiné"
    },
    
    // BOUQUETS
    {
        id: 24,
        name: "Bouquet romantique",
        category: "bouquets",
        price: 635000,
        images: [
            "images/products/bouquet.jpeg",
            "images/products/bouquet-(3).jpeg",
            "images/products/bouquet-(5).jpeg"
        ],
        description: "Bouquet romantique aux fleurs délicates",
        badge: "Bestseller",
        featured: true
    },
    {
        id: 25,
        name: "Bouquet élégant",
        category: "bouquets",
        price: 590000,
        images: [
            "images/products/bouquet-(6).jpeg",
            "images/products/bouquet-(7).jpeg"
        ],
        description: "Bouquet élégant au style raffiné",
        featured: true
    },
    {
        id: 26,
        name: "Bouquet champêtre",
        category: "bouquets",
        price: 515000,
        images: [
            "images/products/bouquet-(9).jpeg",
            "images/products/bouquet-(10).jpeg"
        ],
        description: "Bouquet champêtre au charme naturel"
    },
    {
        id: 27,
        name: "Bouquet luxe",
        category: "bouquets",
        price: 750000,
        images: [
            "images/products/bouquet-(11).jpeg",
            "images/products/bouquet-(12).jpeg"
        ],
        description: "Bouquet luxueux aux compositions raffinées"
    },
    {
        id: 28,
        name: "Bouquet classique",
        category: "bouquets",
        price: 550000,
        images: [
            "images/products/bouquet-(13).jpeg",
            "images/products/bouquet-(14).jpeg"
        ],
        description: "Bouquet classique intemporel"
    },
    {
        id: 29,
        name: "Bouquet sophistiqué",
        category: "bouquets",
        price: 670000,
        images: [
            "images/products/bouquet-(15).jpeg",
            "images/products/bouquet-(16).jpeg"
        ],
        description: "Bouquet sophistiqué aux détails soignés"
    },
    {
        id: 30,
        name: "Bouquet moderne",
        category: "bouquets",
        price: 610000,
        images: [
            "images/products/bouquet-(17).jpeg",
            "images/products/bouquet-(18).jpeg"
        ],
        description: "Bouquet au design moderne et épuré"
    },
    {
        id: 31,
        name: "Bouquet délicat",
        category: "bouquets",
        price: 570000,
        images: [
            "images/products/bouquet-(20).jpeg",
            "images/products/bouquet-(3).jpeg"
        ],
        description: "Bouquet délicat aux nuances subtiles"
    },
    {
        id: 32,
        name: "Bouquet printemps",
        category: "bouquets",
        price: 535000,
        images: [
            "images/products/bouquet-(4).jpeg"
        ],
        description: "Bouquet printanier aux couleurs vives"
    },
    
    // ROBES
    {
        id: 33,
        name: "Robe de mariée élégante",
        category: "robes",
        price: 5150000,
        images: [
            "images/products/rbf.jpeg",
            "images/products/rbf-(2).jpeg",
            "images/products/rbf-(3).jpeg"
        ],
        description: "Robe de mariée élégante au style raffiné",
        badge: "Nouveau",
        featured: true
    },
    {
        id: 34,
        name: "Robe romantique",
        category: "robes",
        price: 5550000,
        images: [
            "images/products/rbf-(4).jpeg",
            "images/products/rbf-(5).jpeg"
        ],
        description: "Robe romantique aux détails délicats",
        badge: "Bestseller",
        featured: true
    },
    {
        id: 35,
        name: "Robe classique",
        category: "robes",
        price: 4750000,
        images: [
            "images/products/rbf-(6).jpeg",
            "images/products/rbf-(7).jpeg"
        ],
        description: "Robe classique intemporelle"
    },
    {
        id: 36,
        name: "Robe princesse",
        category: "robes",
        price: 5950000,
        images: [
            "images/products/rbf-(8).jpeg",
            "images/products/rbf-(9).jpeg"
        ],
        description: "Robe de princesse pour un jour magique"
    },
    {
        id: 37,
        name: "Robe sophistiquée",
        category: "robes",
        price: 5350000,
        images: [
            "images/products/rbf-(10).jpeg",
            "images/products/rbf-(12).jpeg"
        ],
        description: "Robe sophistiquée aux finitions soignées"
    },
    {
        id: 38,
        name: "Robe moderne chic",
        category: "robes",
        price: 4950000,
        images: [
            "images/products/rbf-(13).jpeg",
            "images/products/rbf-(14).jpeg"
        ],
        description: "Robe moderne au style chic et contemporain"
    },
    {
        id: 39,
        name: "Robe bohème",
        category: "robes",
        price: 3950000,
        images: [
            "images/products/rbf-(16).jpeg",
            "images/products/rbf-(18).jpeg"
        ],
        description: "Robe bohème au charme décontracté"
    },
    {
        id: 40,
        name: "Robe sirène",
        category: "robes",
        price: 5750000,
        images: [
            "images/products/rbf-(19).jpeg",
            "images/products/rbf-(20).jpeg"
        ],
        description: "Robe sirène pour une silhouette sculptée"
    },
    {
        id: 41,
        name: "Robe empire",
        category: "robes",
        price: 4550000,
        images: [
            "images/products/rbf-(21).jpeg",
            "images/products/rbf-(22).jpeg"
        ],
        description: "Robe empire délicate et fluide"
    },
    {
        id: 42,
        name: "Robe dentelle",
        category: "robes",
        price: 5150000,
        images: [
            "images/products/rbf-(23).jpeg",
            "images/products/rbf-(24).jpeg"
        ],
        description: "Robe ornée de dentelle raffinée"
    },
    {
        id: 43,
        name: "Robe bustier",
        category: "robes",
        price: 4750000,
        images: [
            "images/products/rbf-(25).jpeg",
            "images/products/rbf-(26).jpeg"
        ],
        description: "Robe bustier élégante et structurée"
    },
    {
        id: 44,
        name: "Robe tulle",
        category: "robes",
        price: 5350000,
        images: [
            "images/products/rbf-(29).jpeg",
            "images/products/rbf-(30).jpeg"
        ],
        description: "Robe en tulle aérien et romantique"
    },
    {
        id: 45,
        name: "Robe luxe",
        category: "robes",
        price: 6750000,
        images: [
            "images/products/rbf-(31).jpeg",
            "images/products/rbm.jpeg"
        ],
        description: "Robe de luxe aux détails exceptionnels"
    },
    {
        id: 46,
        name: "Robe brodée",
        category: "robes",
        price: 6150000,
        images: [
            "images/products/rbm-(3).jpeg",
            "images/products/rbm-(6).jpeg"
        ],
        description: "Robe brodée avec finitions artisanales"
    },
    {
        id: 47,
        name: "Robe évasée",
        category: "robes",
        price: 4950000,
        images: [
            "images/products/rbm-(8).jpeg",
            "images/products/rbm-(9).jpeg"
        ],
        description: "Robe évasée au tombé parfait"
    },
    {
        id: 48,
        name: "Robe ajustée",
        category: "robes",
        price: 5550000,
        images: [
            "images/products/rbm-(10).jpeg",
            "images/products/rbm-(11).jpeg"
        ],
        description: "Robe ajustée pour une silhouette sublime"
    },
    {
        id: 49,
        name: "Robe traîne",
        category: "robes",
        price: 6350000,
        images: [
            "images/products/rbm-(12).jpeg",
            "images/products/rbm-(13).jpeg"
        ],
        description: "Robe majestueuse avec traîne élégante"
    },
    {
        id: 50,
        name: "Robe perles",
        category: "robes",
        price: 6950000,
        images: [
            "images/products/rbm-(14).jpeg",
            "images/products/rbm-(15).jpeg"
        ],
        description: "Robe ornée de perles délicates"
    },
    {
        id: 51,
        name: "Robe vintage",
        category: "robes",
        price: 4550000,
        images: [
            "images/products/rbm-(16).jpeg",
            "images/products/rbm-(17).jpeg"
        ],
        description: "Robe au charme vintage intemporel"
    },
    {
        id: 52,
        name: "Robe minimaliste",
        category: "robes",
        price: 3550000,
        images: [
            "images/products/rbm-(18).jpeg",
            "images/products/rbm-(19).jpeg"
        ],
        description: "Robe minimaliste au design épuré"
    },
    {
        id: 53,
        name: "Robe col V",
        category: "robes",
        price: 4750000,
        images: [
            "images/products/rbm-(20).jpeg",
            "images/products/rbm-(21).jpeg"
        ],
        description: "Robe avec décolleté en V élégant"
    },
    {
        id: 54,
        name: "Robe dos nu",
        category: "robes",
        price: 5350000,
        images: [
            "images/products/rbm-(23).jpeg",
            "images/products/rbm-(24).jpeg"
        ],
        description: "Robe audacieuse avec dos nu raffiné"
    },
    {
        id: 55,
        name: "Robe manches longues",
        category: "robes",
        price: 5150000,
        images: [
            "images/products/rbm-(27).jpeg",
            "images/products/rbm-(29).jpeg"
        ],
        description: "Robe élégante à manches longues"
    },
    {
        id: 56,
        name: "Robe courte",
        category: "robes",
        price: 2750000,
        images: [
            "images/products/rbm-(30).jpeg",
            "images/products/rbm-(31).jpeg"
        ],
        description: "Robe courte pour un mariage civil ou réception"
    },
    {
        id: 57,
        name: "Robe transparence",
        category: "robes",
        price: 5750000,
        images: [
            "images/products/rbm-(32).jpeg",
            "images/products/rbm-(33).jpeg"
        ],
        description: "Robe avec détails en transparence"
    },
    {
        id: 58,
        name: "Robe volants",
        category: "robes",
        price: 4950000,
        images: [
            "images/products/rbm-(34).jpeg",
            "images/products/rbm-(36).jpeg"
        ],
        description: "Robe romantique avec volants délicats"
    },
    {
        id: 59,
        name: "Robe asymétrique",
        category: "robes",
        price: 4750000,
        images: [
            "images/products/rbm-(37).jpeg",
            "images/products/rbm-(38).jpeg"
        ],
        description: "Robe au design asymétrique moderne"
    },
    {
        id: 60,
        name: "Robe cathédrale",
        category: "robes",
        price: 7150000,
        images: [
            "images/products/rbm-(39).jpeg",
            "images/products/rbm-(40).jpeg"
        ],
        description: "Robe majestueuse style cathédrale"
    }
];

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
