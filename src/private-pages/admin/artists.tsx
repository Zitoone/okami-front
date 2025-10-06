import { useEffect, useState } from "react"

type ArtistProps = {
  _id: string
  personalInfo: {
    lastName: string
    firstName: string
    email: string
    phone: string
    projectName: string
    artistComments: string
  }
  adminInfo: {
    nbOfPerson: number
    stage: string
    gigDateTime: string
    soundcheckTime: string
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
  };
};

export default function ArtistPage() {
  const [artists, setArtists] = useState<ArtistProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  const token = localStorage.getItem("authToken")

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const req = await fetch("http://localhost:3000/api/admin/artists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!req.ok) throw new Error("Erreur lors du chargement des artistes")

      const datas: ArtistProps[] = await req.json();
      setArtists(datas)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchArtists()
  }, [])

  if (loading) return <p>Chargement des artistes en cours…</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

const toggleDetails = (artistId: string) => {
  setSelectedArtist(selectedArtist === artistId  ? null : artistId)
}

  return (
  <main>
    <h1>Artistes 2026</h1>

    <div className="artists-list">
      <table>
        <thead>
          <tr>
            <th>Projet</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Nb pers</th>
            <th>Scène</th>
            <th>Date/heure jeu</th>
            <th>Cachet TTC</th>
          </tr>
        </thead>

        <tbody>
        {artists.map((artist) => {
          const rows = [
            <tr key={artist._id} onClick={() => toggleDetails(artist._id)}>
              <td>{artist.personalInfo.projectName}</td>
              <td>{artist.personalInfo.lastName}</td>
              <td>{artist.personalInfo.firstName}</td>
              <td>{artist.personalInfo.email}</td>
              <td>{artist.personalInfo.phone}</td>
              <td>{artist.adminInfo.nbOfPerson}</td>
              <td>{artist.adminInfo.stage}</td>
              <td>{artist.adminInfo.gigDateTime}</td>
              <td>{artist.adminInfo.bookingFee}</td>
            </tr>
          ]

          if (selectedArtist === artist._id) {
            rows.push(
              <tr key={artist._id + "details"} className="details">
                <td>
                  <div>
                    <h2>Détails {artist.personalInfo.projectName}</h2>
                    <p><strong>Cachet :</strong> {artist.adminInfo.bookingFee}</p>
                    <p><strong>Frais déplacement :</strong> {artist.adminInfo.travelExpense}</p>
                    <p><strong>Total :</strong> {artist.adminInfo.totalFees}</p>
                    <p><strong>Contrat :</strong> {artist.adminInfo.contract ? "Oui" : "Non"}</p>
                    <p><strong>Facture :</strong> {artist.adminInfo.invoice ? "Oui" : "Non"}</p>
                    <p><strong>Feuille de route :</strong> {artist.adminInfo.roadMap ? "Oui" : "Non"}</p>
                    <p><strong>Infos paiement :</strong> {artist.adminInfo.paiementInfo}</p>
                    <p><strong>Commentaire artiste :</strong> {artist.personalInfo.artistComments}</p>
                    <p><strong>Commentaire admin :</strong> {artist.adminInfo.specialInfo}</p>
                    <button onClick={() => setSelectedArtist(null)}>Fermer</button>
                  </div>
                </td>
              </tr>
            )
          }
          return rows
        })}
        </tbody>
      </table>
    </div>
  </main>
  )
}

