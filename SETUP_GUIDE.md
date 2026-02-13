# Guide de Configuration - Mariage Élégance Admin Dashboard

## 📋 Prérequis

- Un compte Netlify
- Un compte Neon (pour la base de données PostgreSQL)
- Node.js installé localement
- Git configuré

---

## 🗄️ Étape 1: Configuration de la Base de Données Neon

### 1.1 Créer une base de données sur Neon

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Sélectionnez PostgreSQL
5. Attendez la création de la base de données
6. Copiez la chaîne de connexion (DATABASE_URL)

### 1.2 Initialiser les tables

1. Dans votre terminal local, exécutez:
```bash
npm install
DATABASE_URL="votre-connection-string" npm run init-db
```

Cela créera toutes les tables nécessaires et importera les produits existants.

---

## 🔐 Étape 2: Variables d'Environnement

### 2.1 Créer un utilisateur admin initial

Avant de déployer, créez un utilisateur admin avec la curl:

```bash
curl -X POST https://accessoirs-marriage.netlify.app//.netlify/functions/auth-register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Ou utilisez Postman pour faire cette requête POST.

### 2.2 Configuration Netlify

1. Allez dans **Settings > Build & Deploy > Environment**
2. Ajoutez les variables d'environnement:

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | Votre chaîne de connexion Neon |
| `JWT_SECRET` | Une clé secrète aléatoire (ex: `$(openssl rand -base64 32)`) |

---

## 🚀 Étape 3: Déploiement sur Netlify

### 3.1 Connecter votre repository GitHub

1. Poussez votre code sur GitHub
2. Dans Netlify, cliquez sur **New site from Git**
3. Autorisez Netlify à accéder à votre repository
4. Sélectionnez votre repository
5. Configurez les paramètres de build:
   - **Build command**: `npm install`
   - **Publish directory**: `.` (racine du projet)
   - **Functions directory**: `netlify/functions`

### 3.2 Ajouter les variables d'environnement dans Netlify

1. Allez dans **Settings > Build & Deploy > Environment variables**
2. Ajoutez `DATABASE_URL` et `JWT_SECRET`
3. Déclenchez un redéploiement

---

## 🎯 Accès au Dashboard Admin

### URL de Connexion
```
https://votre-site.netlify.app/admin-login.html
```

### Identifiants par défaut
- **Username**: admin
- **Password**: Celle que vous avez définie

### Fonctionnalités disponibles:

1. **📊 Tableau de Bord**
   - Vue d'ensemble des statistiques
   - Nombre total de produits, commandes, messages

2. **💎 Gestion des Produits**
   - Ajouter, éditer, supprimer des produits
   - Gérer les images des produits
   - Définir les badges et statut vedette

3. **📂 Gestion des Collections**
   - Créer/modifier des catégories
   - Associer des produits aux collections

4. **📦 Gestion des Commandes**
   - Consulter toutes les commandes
   - Modifier le statut des commandes
   - Voir les détails des articles commandés

5. **💬 Messages Clients**
   - Consulter les messages reçus
   - Marquer comme lu/répondu
   - Supprimer les messages

---

## 🔗 API Endpoints

### Authentification
- **POST** `/.netlify/functions/auth-login` - Connexion admin
- **POST** `/.netlify/functions/auth-register` - Créer un utilisateur admin

### Produits
- **GET** `/.netlify/functions/products-list` - Lister les produits
- **GET** `/.netlify/functions/products-crud?id=1` - Récupérer un produit
- **POST** `/.netlify/functions/products-crud` - Créer un produit
- **PUT** `/.netlify/functions/products-crud?id=1` - Mettre à jour un produit
- **DELETE** `/.netlify/functions/products-crud?id=1` - Supprimer un produit

### Collections
- **GET** `/.netlify/functions/collections` - Lister les collections
- **GET** `/.netlify/functions/collections?id=1` - Récupérer une collection
- **POST** `/.netlify/functions/collections` - Créer une collection
- **PUT** `/.netlify/functions/collections?id=1` - Mettre à jour une collection
- **DELETE** `/.netlify/functions/collections?id=1` - Supprimer une collection

### Commandes
- **GET** `/.netlify/functions/orders` - Lister les commandes
- **GET** `/.netlify/functions/orders?id=1` - Récupérer une commande
- **POST** `/.netlify/functions/orders` - Créer une commande
- **PUT** `/.netlify/functions/orders?id=1` - Mettre à jour le statut
- **DELETE** `/.netlify/functions/orders?id=1` - Supprimer une commande

### Messages
- **GET** `/.netlify/functions/messages` - Lister les messages
- **GET** `/.netlify/functions/messages?id=1` - Récupérer un message
- **POST** `/.netlify/functions/messages` - Créer un message (formulaire de contact)
- **PUT** `/.netlify/functions/messages?id=1` - Mettre à jour le statut
- **DELETE** `/.netlify/functions/messages?id=1` - Supprimer un message

---

## 🔒 Sécurité

### Points importants:

1. **JWT Secret**: Changez le `JWT_SECRET` en production (ne pas laisser la valeur par défaut)
2. **CORS**: Les Netlify Functions ont CORS activé par défaut, à restreindre en production si nécessaire
3. **Authentification**: Tous les endpoints admin utilisent JWT
4. **Validation**: Les données sont validées côté serveur

---

## 🐛 Dépannage

### Erreur: "Impossible de se connecter à la base de données"
- Vérifiez que `DATABASE_URL` est correctement configurée
- Vérifiez la connection string sur Neon
- Assurez-vous que Neon permet les connexions SSL

### Erreur: "Produits ne chargent pas"
- Vérifiez que l'initialisation de la BD a fonctionné
- Vérifiez les logs Netlify: **Deploy > Logs > Functions**
- Vérifiez que les images des produits sont accessibles

### Produits ne s'affichent pas sur le site public
- Vérifiez que `api-loader.js` est chargé
- Vérifiez la console du navigateur pour les erreurs
- Attendez quelques secondes après le chargement de la page

---

## 📝 Notes Importantes

1. **Données existantes**: Les produits statiques (data/products.js) sont importés automatiquement lors de l'initialisation
2. **Images**: Les URLs des images doivent être accessibles publiquement
3. **Modifications**: Après chaque modification via l'admin, les changements sont immédiatement visibles sur le site public
4. **Sauvegarde**: Assurez-vous de faire des sauvegardes régulières de votre base de données Neon

---

## 📞 Support

Pour plus d'aide:
- Docs Neon: https://neon.tech/docs
- Docs Netlify: https://docs.netlify.com
- GitHub Issues: Créez une issue sur votre repository
