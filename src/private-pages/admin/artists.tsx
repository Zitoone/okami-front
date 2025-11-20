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

// Fonction pour obtenir un n° de tel lisible
/*   const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '') 
    return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ')  
  } */
  const formatPhone = (phone: string) => {
  if (!phone) return ""
  const raw = phone.trim();
  // 1) 00 → + (ex: 001514... → +1514...)
  const normalized = raw.startsWith("00") ? "+" + raw.slice(2) : raw
  // 2) Indicatif explicite : commence par +
  if (normalized.startsWith("+")) {
    const indic = normalized.match(/^\+\d{1,3}/)[0]
    const rest = normalized.slice(indic.length).replace(/\D/g, "")
    // Cas spécial +1 (USA/Canada) : format 3-3-4
    if (indic === "+1" && rest.length >= 10) {
      const r = rest.slice(-10);
      return `${indic} ${r.slice(0,3)} ${r.slice(3,6)} ${r.slice(6)}`.trim()
    }
    // Autres pays → format par 2
    return indic + (rest ? " " + rest.replace(/(\d{2})(?=\d)/g, "$1 ").trim() : "")
  }
  // 3) Pas de + : si 11 chiffres et commence par 1 → on traite comme USA/Canada
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    const r = digits.slice(1)
    return `+1 ${r.slice(0,3)} ${r.slice(3,6)} ${r.slice(6)}`.trim()
  }
  // 4) Fallback simple FR-ish : groupe par 2
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim()
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
              <tr
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
            <p><strong>Infos run demandé par l'artiste :</strong>{selectedArtist.runInfo || "-"}</p>

            <h3>Technique</h3>

            <p><strong>Matériel Setup :</strong> {selectedArtist.setup || "-"}</p>
            <p><strong>Temps Setup :</strong> {selectedArtist.setupTime || "-"}</p>
            <p><strong>Soundcheck :</strong> {selectedArtist.needsSoundcheck ? 'Oui' : 'Non'}</p>
            <p><strong>Soundcheck date et heure:</strong> {selectedArtist.soundcheckDateTime || "-"}</p>
            <p><strong>Accord pour enregistrer la prestation :</strong> {selectedArtist.canRecordSet ? 'Oui' : 'Non'}</p>
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
                const links = typeof selectedArtist.socialLinks === 'string' 
                  ? JSON.parse(selectedArtist.socialLinks) //Convertir en objet utilisable
                  : selectedArtist.socialLinks;
                return (
                  <>
                    {links?.instagram && <li><a href={links.instagram} target="_blank" rel="noopener noreferrer">{links.instagram}</a></li>}
                    {links?.soundcloud && <li><a href={links.soundcloud} target="_blank" rel="noopener noreferrer">{links.soundcloud}</a></li>}
                    {links?.website && <li><a href={links.website} target="_blank" rel="noopener noreferrer">{links.website}</a></li>}
                    {!links?.instagram && !links?.soundcloud && !links?.website && <li>-</li>}
                  </>
                );
              })()}
            </ul>            
            <p><strong>Texte promo artiste :</strong> {selectedArtist.promoText || "-"}</p>
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

//TODO : fermer toutes les modales si on clique en dehors