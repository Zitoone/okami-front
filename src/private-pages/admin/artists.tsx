import { useEffect, useState } from "react"
import Button from "../../components/button"

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
    setupTimeInMin: number
    soundcheck: number
    record: string
    setup: string
    artistComments: string
    pics: string
  }
  adminInfo: {
    nbOfPerson: number
    stage: string
    gigDateTime: string
    soundcheckDayTime: string
    arrivedRun: string
    departRun: string
    accomodation: string
    bookingFee: number
    travelExpense: number
    totalFees: number
    contract: boolean
    invoice: boolean
    roadMap: boolean
    paiementInfo: string
    sacemForm: boolean
    specialInfo: string
  }
}

export default function ArtistPage() {
  const [artists, setArtists] = useState<ArtistProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<ArtistProps | null>(null)

  const token = localStorage.getItem("authToken")

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const req = await fetch("http://localhost:3000/api/admin/artists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!req.ok) throw new Error("Erreur lors du chargement des artistes")
      const datas: ArtistProps[] = await req.json()
      setArtists(datas)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  if (loading) return <p>Chargement des artistes en cours…</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <main className="artist-page table-page">
      <h1>Artistes 2026</h1>

      <div className="table-list">
        <table>
          <thead>
            <tr>
              <th>Projet</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Nb de pers</th>
              <th>Scène</th>
              <th>Date/heure de jeu</th>
              <th>TOTAL TTC</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr
                key={artist._id}
                onClick={() => setSelectedArtist(artist)}
                className="clickable-row"
              >
                <td><strong>{artist.personalInfo.projectName}</strong></td>
                <td>{artist.personalInfo.lastName}</td>
                <td>{artist.personalInfo.firstName}</td>
                <td>{artist.personalInfo.email}</td>
                <td>{artist.personalInfo.phone}</td>
                <td>{artist.adminInfo.nbOfPerson}</td>
                <td>{artist.adminInfo.stage}</td>
                <td>{artist.adminInfo.gigDateTime}</td>
                <td>{artist.adminInfo.totalFees} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedArtist && (
        <>
          <div className="overlay" onClick={() => setSelectedArtist(null)} />
          <aside className="side-panel">
            <h2>{selectedArtist.personalInfo.projectName}</h2>
              <div className="tableBtns">
              <Button type="button" className="btn" to={`/admin/artist-edit/${selectedArtist._id}`}>Modifier</Button>

              <Button type="button"  className="btn btn-delete">Supprimer</Button>
              </div>
            <p><strong>Cachet :</strong> {selectedArtist.adminInfo.bookingFee} €</p>
            <p><strong>Frais déplacement :</strong> {selectedArtist.adminInfo.travelExpense} €</p>
            <p><strong>Nom invité :</strong>{selectedArtist.personalInfo.invitName}</p>
            <p><strong>Run arrivée :</strong>{selectedArtist.adminInfo.arrivedRun}</p>
            <p><strong>Run départ :</strong>{selectedArtist.adminInfo.departRun}</p>
            <p><strong>Logement :</strong>{selectedArtist.adminInfo.accomodation}</p>
            <p><strong>Contrat :</strong> {selectedArtist.adminInfo.contract ? "Oui" : "Non"}</p>
            <p><strong>Facture :</strong> {selectedArtist.adminInfo.invoice ? "Oui" : "Non"}</p>
            <p><strong>Feuille de route :</strong> {selectedArtist.adminInfo.roadMap ? "Oui" : "Non"}</p>
            <p><strong>Infos paiement :</strong> {selectedArtist.adminInfo.paiementInfo}</p>
            <p><strong>Commentaire admin :</strong> {selectedArtist.adminInfo.specialInfo}</p>
            <p><strong>Fiche Sacem :</strong> {selectedArtist.adminInfo.sacemForm ? "Oui" : "Non"}</p>
            <p><strong>Matériel Setup :</strong> {selectedArtist.personalInfo.setup}</p>
            <p><strong>Temps Setup (en min) :</strong> {selectedArtist.personalInfo.setupTimeInMin}</p>
            <p><strong>Soundcheck :</strong> {selectedArtist.personalInfo.soundcheck}</p>
            <p><strong>Soundcheck date et heure:</strong> {selectedArtist.adminInfo.soundcheckDayTime}</p>
            <p><strong>Accord pour enregistrer la prestation :</strong> {selectedArtist.personalInfo.record}</p>
            <p><strong>Lien photo :</strong> {selectedArtist.personalInfo.pics}</p>
            <p><strong>Commentaire artiste :</strong> {selectedArtist.personalInfo.artistComments}</p>
            
            
            <Button onClick={() => setSelectedArtist(null)} className="btn">Fermer</Button>
          </aside>
        </>
      )}
    </main>
  )
}
