import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Button from "../../components/Button"
import Collapse from "../../components/Collapse"
import CustomInput from "../../components/CustomInput"
import { FaArrowCircleLeft } from "react-icons/fa"
import Modal from "../../components/Modal"
import { useNavigate } from 'react-router-dom'
import { AdminHeader } from "../../components/AdminHeader"
import type { Artist } from "../../types/Artist"
import { artistApi } from "../../services/api"

function ArtistEdit() {
    const { id: artistId } = useParams<{ id: string }>()
    const [artistData, setArtistData] = useState<Partial<Artist>>({ // Partial pour que les champs soient facultatifs
        projectName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        guestName: "",
        setup: "",
        setupTime: "",
        needsSoundcheck: "",
        canRecordSet: false,
        comments: "",
        promoPhoto: "",
        socialLinks: {},
        musicalStyle: "",
        numberOfPeople: 0,
        stage: "",
        performanceDateTime: "",
        soundcheckDateTime: "",
        arrivalRun: "",
        departureRun: "",
        accommodation: "",
        contract: "",
        invoice: "",
        roadmap: "",
        sacemForm: "",
        specialInfo: "",
        fee: 0,
        travelExpenses: 0,
        totalTTC: "",
        paymentInfo: "",
        isValidated: false
    })

    const [file, setFile] = useState<File | null>(null) // Stocker la photo à uploader
    const [preview, setPreview] = useState<string | null>(null) // Aperçu image temporaire
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    // Récupération des données artiste
    const fetchArtist = async (artistId: string) => {
        try {
            setLoading(true)
            const data = await artistApi.getOne(artistId)
            setArtistData(data)

            // Si l'artiste a déjà une promoPhoto, on peut créer une preview initiale
            if (data.promoPhoto) {
                setPreview(data.promoPhoto) // URL directe Cloudinary
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => { // Déclenche la récupération de l'artiste (et si l'artiste change aussi)
        if (artistId) {
            fetchArtist(artistId)
        }
        // Nettoyage mémoire des blobs quand le composant se démonte
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview)
            }
        }
    }, [artistId])

    // Gestion automatique selon le type de champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        
        // Gestion des socialLinks
        if (['instagram', 'soundcloud', 'website', 'facebook', 'spotify'].includes(name)) {
            setArtistData((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value // Pour admin, pas besoin de normaliser
                }
            }))
        } else {
            // Gestion des autres champs (checkbox / number / string)
            setArtistData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
            }))
        }
    }

    // Gestion de la sélection d'une nouvelle promoPhoto avec preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileSelected = e.target.files?.[0]
        if (!fileSelected) return

        // On libère la preview précédente si c'était un blob
        if (preview && preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview)
        }

        const newPreview = URL.createObjectURL(fileSelected)
        setPreview(newPreview)
        setFile(fileSelected)
    }

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const upload = new FormData()

        // Ajout des champs dans FormData
        Object.entries(artistData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== 'socialLinks') {
                upload.append(key, String(value))
            }
        })

        if (artistData.socialLinks) {
            upload.append('socialLinks', JSON.stringify(artistData.socialLinks))
        }

        if (file) upload.append('promoPhoto', file)

        if (!artistId) return

        try {
            // Try-catch ajouté pour gérer les erreurs du back
            const updatedData = await artistApi.updateWithFile(artistId, upload)
            setArtistData(updatedData)
            setModal(true)
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'artiste :", error)
        }
    }

    return (
        <>
        <AdminHeader />
        <main className="artist-edit">
            <div className='all-forms'>
                <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link>
                <h1>Modifier {artistData.projectName}</h1>

                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <form onSubmit={handleSubmit} className='artist-form' encType="multipart/form-data">

                        <Collapse title="Infos artiste">
                            <CustomInput label="Nom du projet" name="projectName" value={artistData.projectName || ''} onChange={handleChange} />
                            <CustomInput label="Nom" name="lastName" value={artistData.lastName || ''} onChange={handleChange} />
                            <CustomInput label="Prénom" name="firstName" value={artistData.firstName || ''} onChange={handleChange} />
                            <CustomInput label="Email" type="email" name="email" value={artistData.email || ''} onChange={handleChange} />
                            <CustomInput label="Téléphone" name="phone" value={artistData.phone || ''} onChange={handleChange} />
                            <CustomInput label="Nom invité" name="guestName" value={artistData.guestName || ''} onChange={handleChange} />

                            <div className="input-container">
                                <label>Commentaire artiste</label>
                                <textarea name="comments" value={artistData.comments || ''} onChange={handleChange} className="all-inputs" />
                            </div>

                            <div className="input-container">
                                <label>Photo artiste</label>
                                <div className="photo-upload-container">
                                    <input type="file" name="promoPhoto" onChange={handleFileChange} className="pics-file" />
                                    {/* Preview image */}
                                    {preview && (
                                        <img 
                                            src={preview}
                                            alt="Aperçu / Photo actuelle" 
                                            className="artist-photo"
                                        />
                                    )}
                                </div>
                            </div>

                            <CustomInput label="Style musical" name="musicalStyle" value={artistData.musicalStyle || ''} onChange={handleChange} />

                            <h3>Réseaux sociaux</h3>
                            <CustomInput label="Instagram" name="instagram" value={artistData.socialLinks?.instagram || ''} onChange={handleChange} />
                            <CustomInput label="Soundcloud" name="soundcloud" value={artistData.socialLinks?.soundcloud || ''} onChange={handleChange} />
                            <CustomInput label="Website" name="website" value={artistData.socialLinks?.website || ''} onChange={handleChange} />
                            <CustomInput label="Facebook" name="facebook" value={artistData.socialLinks?.facebook || ''} onChange={handleChange} />
                            <CustomInput label="Spotify" name="spotify" value={artistData.socialLinks?.spotify || ''} onChange={handleChange} />
                            <CustomInput label="Youtube" name="youtube" value={artistData.socialLinks?.youtube || ''} onChange={handleChange} />
                        </Collapse>

                        <Collapse title="Infos admin">
                            <div className="input-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <label htmlFor="isValidated" style={{ margin: 0 }}>Artiste validé (visible sur le site public)</label>
                                <input type="checkbox" name="isValidated" checked={artistData.isValidated || false} onChange={handleChange} style={{ width: 'auto' }} />
                            </div>
                            <CustomInput label="Nombre de personnes" type="number" name="numberOfPeople" onChange={handleChange} />
                            <CustomInput label="Scène" name="stage" value={artistData.stage || ''} onChange={handleChange} />
                            <CustomInput label="Date et heure de passage" name="performanceDateTime" value={artistData.performanceDateTime || ''} onChange={handleChange} />
                            <CustomInput label="Date et heure soundcheck" name="soundcheckDateTime" value={artistData.soundcheckDateTime || ''} onChange={handleChange} />
                            <CustomInput label="Run d'arrivée" name="arrivalRun" value={artistData.arrivalRun || ''} onChange={handleChange} />
                            <CustomInput label="Run de départ" name="departureRun" value={artistData.departureRun || ''} onChange={handleChange} />
                            <CustomInput label="Logement" name="accommodation" value={artistData.accommodation || ''} onChange={handleChange} />
                            <CustomInput label="Contrat" name="contract" value={artistData.contract || ''} onChange={handleChange} />
                            <CustomInput label="Facture" name="invoice" value={artistData.invoice || ''} onChange={handleChange} />
                            <CustomInput label="Cachet" type="number" name="fee" onChange={handleChange} />
                            <CustomInput label="Frais de déplacement" type="number" name="travelExpenses" onChange={handleChange} />
                            <CustomInput label="Total TTC" name="totalTTC" value={artistData.totalTTC || ''} onChange={handleChange} />
                            <CustomInput label="Infos paiement" name="paymentInfo" value={artistData.paymentInfo || ''} onChange={handleChange} />
                            <CustomInput label="Feuille de route" name="roadmap" value={artistData.roadmap || ''} onChange={handleChange} />
                            <CustomInput label="Formulaire SACEM" name="sacemForm" value={artistData.sacemForm || ''} onChange={handleChange} />
                            <div className="input-container">
                                <label>Infos supplémentaires</label>
                                <textarea name="specialInfo" value={artistData.specialInfo || ''} onChange={handleChange} className="all-inputs"/>
                            </div>
                        </Collapse>

                        <Collapse title="Infos techniques">
                            <CustomInput label="Temps d'installation" name="setupTime" value={artistData.setupTime || ''} onChange={handleChange} />
                            <div className="input-container">
                                <label>Set up de l'artiste</label>
                                <textarea name="setup" value={artistData.setup || ''} onChange={handleChange} className="all-inputs" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="needsSoundcheck">Besoin balance</label>
                                <input type="text" id="needsSoundcheck" name="needsSoundcheck" value={artistData.needsSoundcheck || ''} onChange={handleChange} className="all-inputs" />
                            </div>
                            <div className="input-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <label htmlFor="canRecordSet" style={{ margin: 0 }}>Autorisation d'enregistrement</label>
                                <input type="checkbox" id="canRecordSet" name="canRecordSet" checked={artistData.canRecordSet || false} onChange={handleChange} style={{ width: 'auto' }} />
                            </div>
                        </Collapse>

                        <Button type="submit" className="btn form-btn">Mettre à jour</Button>

                        {modal && (
                            <Modal
                                text="🩷 Artiste modifié avec succès 💚"
                                type="success"
                                onClose={() => {
                                    setModal(false)
                                    navigate('/admin/artists')
                                }}/>
                        )}

                    </form>
                )}
            </div>
        </main>
        </>
    )
}

export default ArtistEdit

// TODO: Voir pour la latence entre le la validation de la mise à jour et la modale de confirmation
