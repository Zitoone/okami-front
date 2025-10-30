import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"
import type { Artist } from "../../types/Artist"

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)

  const token = localStorage.getItem("authToken") //Récupération du token pour accèder à cette page

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
      setArtists(datas) //Si succès: Le tableau des artistes (qui contient les élément du type ArtistProps n'est plus vide mais peuplé par les données de l'API 
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

  // Utilisation de useEffect qui permet d'exécuter le fetchartist() une seule fois après le premier l'affichage du composant. La requête ne se lance donc pas à chaque rendu
  useEffect(() => {
    fetchArtists()
  }, [])

  //Gestion des affichages si la page est en cours de chargement ou si il y a une erreur
  if (loading) return <p>Chargement des artistes en cours…</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  //On retourne le rendu s'il n'y a pas d'erreur
  return (
    <main className="artist-page table-page">
      <div className="main-wrap">
      <Link to="/admin/dashboard"><FaArrowCircleLeft /> Retour sur le dashboad Admin</Link>
      <h1>Artistes 2026</h1>

      <Button to={("/admin/artists/new")} className="btn add-btn">+ Ajouter un artiste</Button>


{/* Tableau listant tous les artistes */}
      <div className="table-list">
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
              <th>TOTAL TTC</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr
                key={artist._id}
                onClick={() => setSelectedArtist(artist)} //Ouvre le panneau latéral si on clic sur la ligne
                className="clickable-row"
              >
                <td><strong>{artist.projectName || "-"}</strong></td>
                <td>{artist.lastName || "-"}</td>
                <td>{artist.firstName || "-"}</td>
                <td>{artist.email || "-"}</td>
                <td>{artist.phone || "-"}</td>
                <td>{artist.numberOfPeople || "-"}</td>
                <td>{artist.stage || "-"}</td>
                <td>{artist.performanceDateTime || "-"}</td>
                <td>{artist.totalTTC || "-"} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Affichage conditionnel pour le panneau latéral qui donne les infos sur l'artiste sélectionné */}
      {selectedArtist && (
        <>
          <div className="overlay" onClick={() => setSelectedArtist(null)} />  {/* Permet de fermer le panneau latéral si on clic dedans et de remettre l'état de l'artiste sélectionné à nul */}
          <aside className="side-panel">
            <h2>{selectedArtist.projectName}</h2>
              <div className="tableBtns">
                {/* Boutons pour modifier ou supprimer l'artiste */}
              <Button type="button" className="btn" to={`/admin/artist-edit/${selectedArtist._id}`}>Modifier</Button>

              <Button type="button"  className="btn btn-delete" onClick={() => deleteArtist(selectedArtist._id)}>Supprimer</Button> {/* Fonction de rappel qui sera déclenchée au clic */}
              </div>
              {/* Liste des infos détaillés de l'artiste sélectionné */}
            <p><strong>Infos admin </strong>{selectedArtist.specialInfo || "-"}</p>
            <p><strong>Cachet :</strong> {selectedArtist.fee || "-" } €</p>
            <p><strong>Frais déplacement :</strong> {selectedArtist.travelExpenses || "-"} €</p>
            <p><strong>Nom invité :</strong>{selectedArtist.guestName || "-"}</p>
            <p><strong>Run arrivée :</strong>{selectedArtist.arrivalRun || "-"}</p>
            <p><strong>Run départ :</strong>{selectedArtist.departureRun || "-"}</p>
            <p><strong>Logement :</strong>{selectedArtist.accommodation || "-"}</p>
            <p><strong>Contrat :</strong> {selectedArtist.contract || "-"}</p>
            <p><strong>Facture :</strong> {selectedArtist.invoice || "-"}</p>
            <p><strong>Feuille de route :</strong> {selectedArtist.roadmap || "-"}</p>
            <p><strong>Infos paiement :</strong> {selectedArtist.paymentInfo || "-"}</p>
            <p><strong>Fiche Sacem :</strong> {selectedArtist.sacemForm || "-"}</p>
            <p><strong>Matériel Setup :</strong> {selectedArtist.setup || "-"}</p>
            <p><strong>Temps Setup :</strong> {selectedArtist.setupTime || "-"}</p>
            <p><strong>Soundcheck date et heure:</strong> {selectedArtist.soundcheckDateTime || "-"}</p>
            <p><strong>Accord pour enregistrer la prestation :</strong> {selectedArtist.canRecordSet ? 'Oui' : 'Non'}</p>
{/*             <p><strong>Lien photo :</strong> {selectedArtist.promoPhoto || "-"}</p> */}
            <p><strong>Style :</strong> {selectedArtist.musicalStyle || "-"}</p>
            <p><strong>Réseaux sociaux :</strong> {selectedArtist.socialLinks?.instagram || selectedArtist.socialLinks?.soundcloud || "-"}</p>
            <p><strong>Demande runs artiste :</strong> {selectedArtist.runInfo || "-"}</p>
            <p><strong>Soundcheck :</strong> {selectedArtist.needsSoundcheck ? 'Oui' : 'Non'}</p>
            <p><strong>Commentaire artiste :</strong> {selectedArtist.comments || "-"}</p>
            <p><strong>Texte promo artiste :</strong> {selectedArtist.promoText || "-"}</p>
{/*lectedArtist.personalInfo.pics}</p> */}
            <p><strong>Style :</strong> {selectedArtist.adminInfo?.style || "-"}</p>
            <p><strong>Réseaux sociaux :</strong> {selectedArtist.personalInfo?.socials || "-"}</p>
{/*             <p><strong>Promo FR :</strong>{selectedArtist.adminInfo?.descriptionFr || "-"}</p>
            <p><strong>Promo ENG :</strong>{selectedArtist.adminInfo?.descriptionEng || "-"}</p> */}

            <p><strong>Nom invité :</strong> {selectedArtist.personalInfo?.invitName || "-"}</p>           
            <p><strong>Demande runs artiste :</strong> {selectedArtist.personalInfo?.infoRun || "-"}</p>
            <p><strong>Soundcheck :</strong> {selectedArtist.personalInfo?.soundcheck || "-"}</p>
            <p><strong>Commentaire artiste :</strong> {selectedArtist.personalInfo?.artistComments || "-"}</p>
            <p><strong>Texte promo artiste :</strong> {selectedArtist.personalInfo?.promoText || "-"}</p>

            {/* Bouton pour fermer qui ré initialise l'artiste sélectionné a nul */}
            <Button onClick={() => setSelectedArtist(null)} className="btn">Fermer</Button> 
          </aside>
        </>
      )}
      </div>
    </main>
  )
}
