import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { AdminHeader } from "../../components/AdminHeader"
import type { Artist } from "../../types/Artist"

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)

  const token = localStorage.getItem("authToken") //Récupération du token pour accèder à cette page

  const formatPhone = (phone:string) =>{
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ')
  }
//Fonction pour récupérer tous les artistes depuis l'API
  const fetchArtists = async () => {
    try { 
      setLoading(true)
      const req = await fetch(`${import.meta.env.VITE_API_URL}artists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Sécurisation par le token
        },
      })
      if (!req.ok) throw new Error("Erreur lors du chargement des artistes")
      const datas: Artist[] = await req.json()
      datas.sort((a,b)=>{
        if(a===b) return 0
        return (a.projectName || '').toLowerCase() < (b.projectName || '').toLowerCase() ? -1 :1
      })
      setArtists(datas)
      setFilteredArtists(datas) 
    } catch (error) {
      const err = error as Error
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  //Fonction pour supprimer l'artiste sélectionné (par son ID)
  const deleteArtist = async (id: string) => {
    if(!window.confirm("Tu veux vraiment supprimer cet artiste de la base de données ?")) return //On lance une fonction native windows.confirm qui ouvre une fenetre de confirmation qui retournera false (car on inverse la valeur) si l'utilisateur clic sur confirmer

    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}artists/${id}`,{
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!req.ok) throw new Error("Erreur sur la suppression de l'artiste")

      // Mise a jour de l'état local de setArtists aprés la suppression.
      // prev pour le state précédent donc la liste avant la supression
      //.filter crée et retourne un nouveau tableau d'artistes sans celui qui a l'id selectionné
      setArtists((prev) => prev.filter((artist) => artist._id !== id))
    setSelectedArtist(null)
    alert("Artiste supprimé avec succès ✅") //Faire une modale
    } catch (error) {
      const err = error as Error
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    const filtered = artists.filter(artist => 
      (artist.projectName || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredArtists(filtered)
  }, [searchTerm, artists])

  //Gestion des affichages si la page est en cours de chargement ou si il y a une erreur
  if (loading) return <p>Chargement des artistes en cours…</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  //On retourne le rendu s'il n'y a pas d'erreur
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
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
              <th>EMAIL</th>
              <th>TEL</th>
              <th>Nb de pers</th>
              <th>SCÈNE</th>
              <th>Date/heure de jeu</th>
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map((artist) => (
              <tr
                key={artist._id}
                onClick={() => setSelectedArtist(artist)} //Ouvre le panneau latéral si on clic sur la ligne
                className="clickable-row"
              >
                <td><strong>{artist.projectName || "-"}</strong></td>
                <td>{artist.lastName || "-"}</td>
                <td>{artist.firstName || "-"}</td>
                <td>{artist.email || "-"}</td>
                <td>
                  {artist.phone ? (
                    <a href={`tel:${artist.phone}`}>{formatPhone(artist.phone)}</a>
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
            className="artist-card"
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

{/* Affichage conditionnel pour le panneau latéral qui donne les infos sur l'artiste sélectionné */}
      {selectedArtist && (
        <>
          <div className="overlay" onClick={() => setSelectedArtist(null)} />  {/* Permet de fermer le panneau latéral si on clic dedans et de remettre l'état de l'artiste sélectionné à nul */}
          <aside className="side-panel">
            <button className="close-btn" onClick={() => setSelectedArtist(null)} aria-label="Fermer">✕</button>
            {selectedArtist.promoPhoto && (
              <img 
                src={`http://localhost:5001/${selectedArtist.promoPhoto.startsWith('uploads/') ? selectedArtist.promoPhoto : `uploads/artists/${selectedArtist.promoPhoto}`}`} 
                alt={selectedArtist.projectName} 
                className="artist-photo"
                onError={(e) => { e.currentTarget.style.display = 'none'; console.log('Image non trouvée:', selectedArtist.promoPhoto) }}
              />
            )}
            <h2>{selectedArtist.projectName}</h2>
              <div className="tableBtns">
                {/* Boutons pour modifier ou supprimer l'artiste */}
              <Button type="button" className="btn" to={`/admin/artist-edit/${selectedArtist._id}`}>Modifier</Button>

              <Button type="button"  className="btn btn-delete" onClick={() => deleteArtist(selectedArtist._id)}>Supprimer</Button> {/* Fonction de rappel qui sera déclenchée au clic */}
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
                  ? JSON.parse(selectedArtist.socialLinks) 
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

            {/* Bouton pour fermer qui ré initialise l'artiste sélectionné a nul */}
            <Button onClick={() => setSelectedArtist(null)} className="btn">Fermer</Button> 
          </aside>
        </>
      )}
      </div>
    </main>
    </>
  )
}
