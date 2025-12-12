# 🚀 Déploiement Frontend sur Vercel - Guide Complet

## 📋 Prérequis

- Node.js installé
- Compte Vercel créé
- Backend déjà déployé (Railway ou Vercel)
- Git configuré

---

## 🔧 Installation de Vercel CLI

### 1. Installer Vercel globalement
```bash
npm install -g vercel
```

### 2. Se connecter à Vercel
```bash
vercel login
```
Suis les instructions dans le navigateur pour te connecter.

---

## 🚀 Premier Déploiement

### 1. Se placer dans le dossier du projet
```bash
cd okami-front
```

### 2. Initialiser le projet Vercel
```bash
vercel
```

Réponds aux questions :
- **Set up and deploy?** → `Y`
- **Which scope?** → Choisis ton compte
- **Link to existing project?** → `N` (première fois)
- **What's your project's name?** → `okami-front` (ou autre)
- **In which directory is your code located?** → `./` (appuie sur Entrée)
- **Want to override the settings?** → `N`

Vercel va :
1. Créer le projet
2. Déployer en preview
3. Te donner une URL de preview

### 3. Déployer en production
```bash
vercel --prod
```

Ton site est maintenant en ligne ! 🎉

---

## ⚙️ Configuration des Variables d'Environnement

### Méthode 1 : Via le Dashboard Vercel (Recommandé)

1. Va sur [vercel.com](https://vercel.com)
2. Clique sur ton projet `okami-front`
3. Va dans **Settings** → **Environment Variables**
4. Ajoute la variable :
   - **Name:** `VITE_API_URL`
   - **Value:** `https://okami-back-production.up.railway.app/api/`
   - **Environments:** Coche `Production`, `Preview`, `Development`
5. Clique sur **Save**

⚠️ **IMPORTANT** : Le slash final `/api/` est obligatoire !

### Méthode 2 : Via CLI

```bash
vercel env add VITE_API_URL production
```
Colle la valeur : `https://okami-back-production.up.railway.app/api/`

### 4. Redéployer après ajout de variables
```bash
vercel --prod
```

---

## 🔄 Déploiements Suivants

### Déploiement automatique (recommandé)
Si tu as lié ton repo GitHub à Vercel :
```bash
git add .
git commit -m "ton message"
git push
```
Vercel déploie automatiquement ! ✨

### Déploiement manuel via CLI

**Preview (test) :**
```bash
vercel
```

**Production :**
```bash
vercel --prod
```

---

## 🔍 Vérifications Avant Déploiement

### 1. Test local
```bash
npm run dev
```
Vérifie que tout fonctionne en local.

### 2. Build de production
```bash
npm run build
```
Si ça build sans erreur, c'est bon ! ✅

### 3. Preview du build
```bash
npm run preview
```
Teste le build en local avant de déployer.

---

## 🐛 Résolution de Problèmes

### CORS Error
**Symptôme :** Erreur CORS dans la console

**Solution :**
1. Va dans les variables d'env de ton **backend** (Railway)
2. Vérifie que `FRONT_URL` = `https://okami-sigma.vercel.app`
3. Format : **sans** slash final
4. Redéploie le backend si modifié

### 404 sur les routes React
**Symptôme :** Refresh de page → 404

**Solution :**
✅ Déjà configuré dans `vercel.json` :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### API non joignable
**Symptôme :** Erreur Network ou 500

**Solution :**
1. Vérifie `VITE_API_URL` dans Vercel
2. Teste l'API directement :
   ```bash
   curl https://okami-back-production.up.railway.app/api/artists/public
   ```
3. Vérifie que le backend Railway est bien démarré

### Build échoue
**Symptôme :** Erreur pendant `npm run build`

**Solution :**
1. Vérifie les erreurs TypeScript localement
2. Corrige les erreurs
3. Teste `npm run build` en local
4. Redéploie

---

## 📝 Checklist Déploiement Complet

### Backend (Railway)
- [ ] Backend déployé et accessible
- [ ] `MONGO_URI` configurée
- [ ] `CLOUDINARY_*` configurées
- [ ] `FRONT_URL` = `https://okami-sigma.vercel.app`
- [ ] CORS configuré pour accepter le front

### Frontend (Vercel)
- [ ] Vercel CLI installé
- [ ] Projet initialisé avec `vercel`
- [ ] `VITE_API_URL` configurée dans Vercel
- [ ] Déployé en prod avec `vercel --prod`
- [ ] Test du formulaire artiste en production
- [ ] Test de la navigation (pas de 404)
- [ ] Test des images Cloudinary

---

## 🎯 Commandes Utiles

```bash
# Voir les déploiements
vercel ls

# Voir les logs en temps réel
vercel logs

# Supprimer un déploiement
vercel rm [deployment-url]

# Voir les variables d'env
vercel env ls

# Ouvrir le dashboard
vercel

# Aide
vercel --help
```

---

## 🔗 URLs Importantes

- **Dashboard Vercel :** https://vercel.com/dashboard
- **Frontend Prod :** https://okami-sigma.vercel.app
- **Backend Railway :** https://okami-back-production.up.railway.app
- **Documentation Vercel :** https://vercel.com/docs
