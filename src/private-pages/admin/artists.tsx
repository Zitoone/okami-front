import { useEffect, useState } from "react";

type ArtistProps = {
  _id: string;
  personalInfo: {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    projectName: string;
    artistComments: string;
  };
  adminInfo: {
    nbOfPerson: number;
    stage: string;
    gigDateTime: Date;
    bookingFee: number;
    travelExpense: number;
    totalFees: number;
    contract: boolean;
    invoice: boolean;
    roadMap: boolean;
    paiementInfo: string;
    adminComments: string;
  };
};

export default function ArtistPage() {
  const [artists, setArtists] = useState<ArtistProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistProps | null>(null);

  const token = localStorage.getItem("authToken");

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const req = await fetch("http://www.localhost:3000/api/admin/artists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!req.ok) throw new Error("Erreur lors du chargement des artistes");

      const datas: ArtistProps[] = await req.json();
      setArtists(datas);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  if (loading) return <p>Chargement des artistes en cours…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main>
      <h1>Artistes 2026</h1>

      <div className="artists-list" style={{ overflowX: "auto" }}>
        <table border={1} cellPadding={5} style={{ borderCollapse: "collapse", minWidth: "800px" }}>
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
              <th>Commentaire artiste</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist._id} onClick={() => setSelectedArtist(artist)} style={{ cursor: "pointer" }}>
                <td>{artist.personalInfo.projectName}</td>
                <td>{artist.personalInfo.lastName}</td>
                <td>{artist.personalInfo.firstName}</td>
                <td>{artist.personalInfo.email}</td>
                <td>{artist.personalInfo.phone}</td>
                <td>{artist.adminInfo.nbOfPerson}</td>
                <td>{artist.adminInfo.stage}</td>
                <td>{new Date(artist.adminInfo.gigDateTime).toLocaleString()}</td>
                <td>{artist.adminInfo.bookingFee}</td>
                <td>{artist.personalInfo.artistComments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section détail artiste */}
      {selectedArtist && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h2>Détails pour {selectedArtist.personalInfo.projectName}</h2>
          <p><strong>Nom / Prénom :</strong> {selectedArtist.personalInfo.lastName} {selectedArtist.personalInfo.firstName}</p>
          <p><strong>Email :</strong> {selectedArtist.personalInfo.email}</p>
          <p><strong>Téléphone :</strong> {selectedArtist.personalInfo.phone}</p>
          <p><strong>Nb de personnes :</strong> {selectedArtist.adminInfo.nbOfPerson}</p>
          <p><strong>Scène :</strong> {selectedArtist.adminInfo.stage}</p>
          <p><strong>Date/heure jeu :</strong> {new Date(selectedArtist.adminInfo.gigDateTime).toLocaleString()}</p>
          <p><strong>Cachet :</strong> {selectedArtist.adminInfo.bookingFee}</p>
          <p><strong>Frais déplacement :</strong> {selectedArtist.adminInfo.travelExpense}</p>
          <p><strong>Total :</strong> {selectedArtist.adminInfo.totalFees}</p>
          <p><strong>Contrat :</strong> {selectedArtist.adminInfo.contract ? "Oui" : "Non"}</p>
          <p><strong>Facture :</strong> {selectedArtist.adminInfo.invoice ? "Oui" : "Non"}</p>
          <p><strong>Feuille de route :</strong> {selectedArtist.adminInfo.roadMap ? "Oui" : "Non"}</p>
          <p><strong>Commentaire artiste :</strong> {selectedArtist.personalInfo.artistComments}</p>
          <p><strong>Commentaire admin :</strong> {selectedArtist.adminInfo.adminComments}</p>
          <p><strong>Infos paiement :</strong> {selectedArtist.adminInfo.paiementInfo}</p>
          <button onClick={() => setSelectedArtist(null)} style={{ marginTop: "10px" }}>Fermer</button>
        </div>
      )}
    </main>
  );
}
