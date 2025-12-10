# 🚀 Déploiement Frontend sur Vercel

## ✅ Configuration

### Variables d'environnement sur Vercel
Dans les settings de ton projet front Vercel, ajoute :

```
VITE_API_URL=https://ton-backend.vercel.app/api/
```

⚠️ **IMPORTANT** : Le slash final `/api/` est obligatoire !

## 🔍 Vérifications

### 1. Test local avant déploiement
```bash
cd okami-front
npm run dev
```

Teste le formulaire artiste en local avec le backend local.

### 2. Build de production
```bash
npm run build
```

Si ça build sans erreur, c'est bon ! ✅

### 3. Déploiement 
```bash
vercel --prod
```
commande a faire a
à chaque changement

Ou via le dashboard Vercel (recommandé).

## 🐛 Problèmes courants

### CORS Error
- Vérifie que `FRONT_URL` dans le backend pointe vers ton front Vercel
- Format : `https://ton-front.vercel.app` (sans slash final)

### 404 sur les routes
- ✅ Déjà configuré dans `vercel.json` avec les rewrites

### API non joignable
- Vérifie `VITE_API_URL` dans les variables d'env Vercel
- Teste l'API directement : `curl https://ton-backend.vercel.app/`

## 📝 Checklist déploiement complet

1. ✅ Backend déployé et fonctionnel
2. ✅ Variables d'env backend configurées (CLOUDINARY, MONGO, etc.)
3. ✅ Variable `VITE_API_URL` configurée sur le front
4. ✅ Variable `FRONT_URL` configurée sur le back
5. ✅ Test du formulaire artiste en production
