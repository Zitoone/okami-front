import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"


// Définition du type ArtistProps:
// Permet de typer les données des artistes (leurs infos personnelles d'un coté et les infos saisies par les admin) afin de décrire la structure exacte des données telles qu'elles sont reçues depuis l'API.

type ArtistProps = {
  _id: string
  personalInfo: {
    lastName: string
    firstName: string
    email: string
    phone: string
    projectName: string
    invitName: string
    infoRun: string
    setupTimeInMin: string
    soundcheck: string
    record: string
    setup: string
    artistComments: string
    pics: string
    socials: string
    promoText: string
  }
  adminInfo: {
    nbOfPerson: string
    stage: string
    gigDateTime: string
    soundcheckDayTime: string
    arrivedRun: string
    departRun: string
    accomodation: string
    bookingFee: string
    travelExpense: string
    totalFees: string
    contract: string
    invoice: string
    roadMap: string
    paiementInfo: string
    sacemForm: string
    specialInfo: string
    descriptionFr: string
    descriptionEng: string
    style: string
  }
}

export default function ArtistPage() {
  //Gestion des états avec useState ou chacune de ces variables représente une donnée qui sera dynamique:
  const [artists, setArtists] = useState<ArtistProps[]>([]) //Liste complète des artiste récupéré depuis le back
  const [loading, setLoading] = useState(true) //Indicateur de chargement pendant la récupération des données
  const [error, setError] = useState<string | null>(null) // Afficher un message d'erreur si besoin
  const [selectedArtist, setSelectedArtist] = useState<ArtistProps | null>(null) // Contient l'artiste sélectionné par son id

  const token = localStorage.getItem("authToken") //Récupération du token pour accèder à cette page

//Fonction pour récupérer tous les artistes depuis l'API
  const fetchArtists = async () => {
    try { 
      setLoading(true)
      const req = await fetch(`${import.meta.env.VITE_APP_API_URL}artists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Sécurisation par le token
        },
      })
      if (!req.ok) throw new Error("Erreur lors du chargement des artistes")
      const datas: ArtistProps[] = await req.json()
      datas.sort((a,b)=>{ // Méthode .sort pour trier les nom d'artistes par ordre alphabétique qu'il soit écrit en MAJ ou en min
        if(a===b){
          return 0
        }
        return a.personalInfo.projectName.toLowerCase() < b.personalInfo.projectName.toLowerCase() ? -1 :1
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
      const req = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/${id}`,{
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
                <td><strong>{artist.personalInfo?.projectName || "-"}</strong></td>
                <td>{artist.personalInfo?.lastName || "-"}</td>
                <td>{artist.personalInfo?.firstName || "-"}</td>
                <td>{artist.personalInfo?.email || "-"}</td>
                <td>{artist.personalInfo?.phone || "-"}</td>
                <td>{artist.adminInfo?.nbOfPerson || "-"}</td>
                <td>{artist.adminInfo?.stage || "-"}</td>
                <td>{artist.adminInfo?.gigDateTime || "-"}</td>
                <td>{artist.adminInfo?.totalFees || "-"} €</td>
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
            <h2>{selectedArtist.personalInfo.projectName}</h2>
              <div className="tableBtns">
                {/* Boutons pour modifier ou supprimer l'artiste */}
              <Button type="button" className="btn" to={`/admin/artist-edit/${selectedArtist._id}`}>Modifier</Button>

              <Button type="button"  className="btn btn-delete" onClick={() => deleteArtist(selectedArtist._id)}>Supprimer</Button> {/* Fonction de rappel qui sera déclenchée au clic */}
              </div>
              {/* Liste des infos détaillés de l'artiste sélectionné */}
            <p><strong>Infos admin </strong>{selectedArtist.adminInfo?.specialInfo || "-"}</p>
            <p><strong>Cachet :</strong> {selectedArtist.adminInfo?.bookingFee || "-" } €</p>
            <p><strong>Frais déplacement :</strong> {selectedArtist.adminInfo?.travelExpense || "-"} €</p>
            <p><strong>Nom invité :</strong>{selectedArtist.personalInfo?.invitName || "-"}</p>
            <p><strong>Run arrivée :</strong>{selectedArtist.adminInfo?.arrivedRun || "-"}</p>
            <p><strong>Run départ :</strong>{selectedArtist.adminInfo?.departRun || "-"}</p>
            <p><strong>Logement :</strong>{selectedArtist.adminInfo?.accomodation || "-"}</p>
            <p><strong>Contrat :</strong> {selectedArtist.adminInfo?.contract || "-"}</p>
            <p><strong>Facture :</strong> {selectedArtist.adminInfo?.invoice || "-"}</p>
            <p><strong>Feuille de route :</strong> {selectedArtist.adminInfo?.roadMap || "-"}</p>
            <p><strong>Infos paiement :</strong> {selectedArtist.adminInfo?.paiementInfo || "-"}</p>
            <p><strong>Fiche Sacem :</strong> {selectedArtist.adminInfo?.sacemForm || "-"}</p>
            <p><strong>Matériel Setup :</strong> {selectedArtist.personalInfo?.setup || "-"}</p>
            <p><strong>Temps Setup :</strong> {selectedArtist.personalInfo?.setupTimeInMin || "-"}</p>
            <p><strong>Soundcheck date et heure:</strong> {selectedArtist.adminInfo?.soundcheckDayTime || "-"}</p>
            <p><strong>Accord pour enregistrer la prestation :</strong> {selectedArtist.personalInfo?.record || "-"}</p>
{/*             <p><strong>Lien photo :</strong> {selectedArtist.personalInfo.pics}</p> */}
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
