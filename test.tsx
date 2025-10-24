const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// --- CONFIGURATION CLOUDINARY ---
cloudinary.config({
  cloud_name: 'dyjbhe4yp',
  api_key: '426266353793268', 
  api_secret: 'RubpVJIogM-bu7d0VOWNQt8bQNU' 
});

// --- DOSSIER À RÉCUPÉRER ---
const folder = '2023'; // Dossier Cloudinary où sont tes images

// --- RÉCUPÉRATION DES LIENS DIRECTS ---
cloudinary.api.resources({ prefix: folder, max_results: 500 }, (error, result) => {
  if (error) {
    console.error("❌ Erreur Cloudinary :", error);
    return;
  }

  // Récupère les URLs sécurisées de toutes les images
  const urls = result.resources.map(r => r.secure_url);

  // Prépare le JSON final
  const albums = { "2023": urls };

  // Écrit le fichier albums.json dans le même dossier
  fs.writeFileSync('albums.json', JSON.stringify(albums, null, 2));
  console.log(`✅ albums.json généré avec ${urls.length} images !`);
});