// Import nécessaire à la page
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import { AdminHeader } from "../../components/AdminHeader"
import type { Artist } from "../../types/Artist"
import { artistApi } from "../../services/api"

export default function ArtistPage() {
  // Gestion des états pour stocker des données  
  const [artists, setArtists] = useState<Artist[]>([]) // Artistes récupérés depuis l'API
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]) // Liste filtrée selon la recherche (affichée à l'écran)
  const [searchTerm, setSearchTerm] = useState('') // Texte tapé dans la barre de recherche
  const [loading, setLoading] = useState(true) // Chargement en cours ou terminé
  const [error, setError] = useState<string | null>(null) // Stocke le message d'erreur 
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null) // Artiste sélectionné pour afficher le panneau latéral
  const [showDeleteModal, setShowDeleteModal] = useState(false) // modal de suppression
  const [showConfirmationModal, setShowConfirmationModal] = useState(false) //modal de confirmation de suppression
  const [artistToDelete, setArtistToDelete] = useState<string | null>(null) // ID de l'artiste à supprimer

  // Fonction pour formater les numéros de téléphone
  const formatPhone = (phone: string) => {
    if (!phone) return "" // Si vide, retourne vide
    // Retire espaces, tirets, points, parenthèses
    const clean = phone.replace(/[\s\-().]/g, "")
    // Groupe les chiffres par 2 avec un espace
    return clean.replace(/(\d{2})/g, "$1 ").trim()
  }

  // Fonction qui récupère la liste d'artiste
  const fetchArtists = async () => {
    try { 
      setLoading(true)
      const datas = await artistApi.getAll()
      
      setArtists(datas) // Stocke la liste complète
      setFilteredArtists(datas) // Initialise la liste filtrée avec tous les artistes
    } catch (error) {
      const err = error as Error
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour appeler la modal de confirmation de suppression
  const confirmDelete = (id: string) => {
    setArtistToDelete(id) // Stocke l'ID de l'artiste à supprimer
    setShowDeleteModal(true)
  }

  // Fonction pour supprimer l'artiste
  const deleteArtist = async () => {
    if (!artistToDelete) return // Si pas d'ID, on arrête la fonction

    try {
      await artistApi.delete(artistToDelete)
      
      // Mise à jour de l'état local (sans recharger la page)
      setArtists((prev) => prev.filter((artist) => artist._id !== artistToDelete)) // Filtre pour garder tous les artistes SAUF celui supprimé
      
      setSelectedArtist(null)
      setShowDeleteModal(false)
      setShowConfirmationModal(true) 
      setArtistToDelete(null)
    } catch (error) {
      const err = error as Error
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchArtists() // UseEffect qui récupère les artistes dès que la page s'affiche
  }, [])

  useEffect(() => {
    // Filtre les artistes dont le nom contient le texte recherché
    const filtered = artists.filter(artist => 
      (artist.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) // Comparaison en minuscules
    )
    setFilteredArtists(filtered) // Met à jour la liste affichée
  }, [searchTerm, artists]) // Dépendances : se déclenche quand searchTerm ou artists change


  if (loading) return <p>Chargement des artistes en cours…</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  // Si pas de chargement ni d'erreur, on affiche la page complète
  return (
    <>
    <AdminHeader />
    <main className="artists-page">
      <div className="main-wrap">
      <h1>Artistes 2026</h1>

      <div className="actions-bar">
        <input 
          type="text" 
          placeholder="Rechercher un artiste..."
          value={searchTerm} // Valeur affichée = état searchTerm
          onChange={(e) => setSearchTerm(e.target.value)} // À chaque frappe, met à jour searchTerm
          className="search-input"
          id="search"
          name="search"
        />
        <Button to={("/admin/artists/new")} className="btn add-btn">+ Ajouter un artiste</Button>
      </div>


{/* Tableau desktop */}
      <div className="table-list desktop-view">
        <table> 
          <thead>
            <tr>
              <th>PROJET</th>
              <th>NOM</th>
              <th>PRÉNOM</th>
              <th>TEL</th>
              <th>Nb de pers</th>
              <th>SCÈNE</th>
              <th>Date/heure de jeu</th>
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map((artist) => (
              <tr //ligne
                key={artist._id} // key unique obligatoire
                onClick={() => setSelectedArtist(artist)} // Au clic on stocke l'artiste dans selectedArtist
                className="clickable-row"
              >
                <td><strong>{artist.projectName || "-"}</strong></td> 
                <td>{artist.lastName || "-"}</td>
                <td>{artist.firstName || "-"}</td>
                <td>
                  {artist.phone ? (
                    <a href={`tel:${artist.phone}`}>{formatPhone(artist.phone)}</a> // Lien cliquable pour appeler
                  ) : "-"}
                </td>
                <td>{artist.numberOfPeople || "-"}</td>
                <td>{artist.stage || "-"}</td>
                <td>{artist.performanceDateTime || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Cards mobile/tablette */}
      <div className="cards-list mobile-view">
        {filteredArtists.map((artist) => (
          <div
            key={artist._id}
            className="cards"
            onClick={() => setSelectedArtist(artist)}
          >
            <h3>{artist.projectName || "-"}</h3>
            <p><strong>Nom :</strong> {artist.lastName || "-"}</p>
            <p><strong>Prénom :</strong> {artist.firstName || "-"}</p>
            <p><strong>Email :</strong> {artist.email || "-"}</p>
            <p><strong>Tél :</strong> {artist.phone ? <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()}>{formatPhone(artist.phone)}</a> : "-"}</p>
            <p><strong>Nb de pers :</strong> {artist.numberOfPeople || "-"}</p>
            <p><strong>Scène :</strong> {artist.stage || "-"}</p>
            <p><strong>Date/heure de jeu :</strong> {artist.performanceDateTime || "-"}</p>
          </div>
        ))}
      </div>

{/* Panneau latéral  */}
      {selectedArtist && (
        <>
          <div className="overlay" onClick={() => setSelectedArtist(null)} />
          <aside className="side-panel">
            <button className="close" onClick={() => setSelectedArtist(null)} aria-label="Fermer">✕</button>           
            {/* Affiche la photo uniquement si elle existe */}
            {selectedArtist.promoPhoto && (
              <img 
                src={selectedArtist.promoPhoto}
                alt={selectedArtist.projectName} 
                className="artist-photo"
              />
            )}
            <h2>{selectedArtist.projectName}</h2>
            <p id='email'>{selectedArtist.email || "-"}</p>
            <div className="tableBtns">
              <Button type="button" className="btn" to={`/admin/artist-edit/${selectedArtist._id}`}>Modifier</Button>

              <Button type="button"  className="btn btn-delete" onClick={() => confirmDelete(selectedArtist._id)}>Supprimer</Button>
            </div>
            {/* Liste des infos détaillés de l'artiste sélectionné */}
            <h3>Logistique</h3>
            <p><strong>Run arrivée :</strong>{selectedArtist.arrivalRun || "-"}</p>
            <p><strong>Run départ :</strong>{selectedArtist.departureRun || "-"}</p>
            <p><strong>Logement :</strong>{selectedArtist.accommodation || "-"}</p>

            <h3>Technique</h3>

            <p><strong>Matériel Setup :</strong> {selectedArtist.setup || "-"}</p>
            <p><strong>Temps Setup :</strong> {selectedArtist.setupTime || "-"}</p>
            <p><strong>Soundcheck :</strong> {selectedArtist.needsSoundcheck ? 'Oui' : 'Non'}</p>
            <p><strong>Soundcheck date et heure:</strong> {selectedArtist.soundcheckDateTime || "-"}</p>
            <p><strong>Accord pour enregistrer la prestation :</strong> {selectedArtist.canRecordSet ? 'Oui' : 'Non'}</p>
            <p><strong>Rider technique :</strong></p>
              {selectedArtist.riderTechUrl ? (
                // Cas 1 : L'artiste a fourni une URL
                <a
                  href={selectedArtist.riderTechUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.85rem",color: "#666"}}
                >
                  Ouvrir le rider technique (URL)
                </a>
              ) : selectedArtist.riderTechUpload ? (
                // Cas 2 : Un fichier a été uploadé
                  <p>Fichier uploadé dispo dans le Kdrive</p>
              ) : (
                // Cas 3 : Rien du tout
                <span>-</span>
              )}

            <p><strong>Commentaire artiste :</strong> {selectedArtist.comments || "-"}</p>

            <h3>Administratif</h3>
            <p><strong>Infos admin : </strong>{selectedArtist.specialInfo || "-"}</p>
            <p><strong>Nom invité :</strong>{selectedArtist.guestName || "-"}</p>
            <p><strong>Contrat :</strong> {selectedArtist.contract || "-"}</p>
            <p><strong>Feuille de route :</strong> {selectedArtist.roadmap || "-"}</p>
            <p><strong>Fiche Sacem :</strong> {selectedArtist.sacemForm || "-"}</p>

            <p><strong>Infos paiement :</strong> {selectedArtist.paymentInfo || "-"}</p>
            <p><strong>Facture :</strong> {selectedArtist.invoice || "-"}</p>
            <p><strong>Cachet :</strong> {selectedArtist.fee || "-" } €</p>
            <p><strong>Frais déplacement :</strong> {selectedArtist.travelExpenses || "-"} €</p>
            <p><strong>Total TTC :</strong> {selectedArtist.totalTTC || "-"}</p>

            <h3>Promo</h3>
            <p><strong>Style :</strong> {selectedArtist.musicalStyle || "-"}</p>
            <p><strong>Réseaux sociaux :</strong></p>
            <ul>
              {(() => {
              // Étape 1 : Transformation des données si nécessaire
              // Les réseaux sociaux peuvent arriver sous 2 formats différents :
              // - Soit comme un objet JavaScript : { instagram: "...", soundcloud: "..." }
              // - Soit comme du texte JSON : '{"instagram":"...","soundcloud":"..."}'
              // On vérifie le type et on convertit en objet si besoin
              const links = typeof selectedArtist.socialLinks === 'string'
                ? JSON.parse(selectedArtist.socialLinks) // Convertit le texte en objet
                : selectedArtist.socialLinks; // Déjà un objet, on le garde

              // Étape 2 : Liste de tous les réseaux sociaux qu'on veut afficher
              const socialFields = ['instagram', 'soundcloud', 'spotify', 'facebook', 'website', 'youtube'];

              // Étape 3 : Vérifie si au moins UN réseau social existe
              // some() retourne true si au moins un élément du tableau remplit la condition
              const hasAnyLink = socialFields.some(field => links?.[field]);

              return (
                <>
                  {hasAnyLink ? (
                    // Si au moins un lien existe, on parcourt tous les réseaux
                    socialFields.map((field) =>
                      links?.[field] ? ( // Si ce réseau spécifique a un lien
                        <li key={field}>
                          <a href={links[field]} target="_blank" rel="noopener noreferrer">
                            {links[field]}
                          </a>
                        </li>
                      ) : null // Si pas de lien pour ce réseau, on n'affiche rien
                    )
                  ) : (
                    // Si aucun lien n'existe, on affiche juste un tiret
                    <li>-</li>
                  )}
                </>
              );
            })()}
            </ul>            
            <p><strong>Statut :</strong> {selectedArtist.isValidated ? '✅ Validé' : '❌ Non validé'}</p>

            <h3>Métadonnées</h3>
            <p><strong>Source des données :</strong> {selectedArtist.dataSource || '-'}</p>
            <p><strong>Dernière modification par :</strong> {selectedArtist.lastModifiedBy || '-'}</p>
            <p><strong>Créé le :</strong> {selectedArtist.createdAt ? new Date(selectedArtist.createdAt).toLocaleString('fr-FR') : '-'}</p>
            <p><strong>Modifié le :</strong> {selectedArtist.updatedAt ? new Date(selectedArtist.updatedAt).toLocaleString('fr-FR') : '-'}</p>

            <div className='close-btn'>
              <Button onClick={() => setSelectedArtist(null)} className="btn">Fermer</Button>
            </div> 
          </aside>
        </>
      )}

      {/* Modal de confirmation de suppression si showDeleteModal = true */}
      {showDeleteModal && (
        <Modal
          text="Veux-tu vraiment supprimer cet artiste de la base de données ?"
          onConfirm={deleteArtist} // Fonction appelée si on clique sur "Confirmer"
          onClose={() => { // Fonction appelée si on clique sur fermer
            setShowDeleteModal(false) // Ferme le modal 
          }}
        />
      )}

      {showConfirmationModal && (
        <Modal text="L'artiste a bien été supprimé"
        onClose={()=>{
          setArtistToDelete(null) // Réinitialise l'ID
          setShowConfirmationModal(false)
        }}
        />
      )}
      </div>
    </main>
    </>
  )
}

//TODO : fermer toutes les modales en cliquant en dehors → ajouter un onClick sur l’overlay et stopper la propagation sur le contenu du panneau.
//réutiliser le même composant Modal pour toutes tes modales (suppr, confirmation…) pour réduire le code répété.