import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
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
    const [artistData, setArtistData] = useState<Partial<Artist>>({ //Partial pour que les champs soit facultatifs
        projectName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        guestName: "",
        runInfo: "",
        setup: "",
        setupTime: "",
        needsSoundcheck: false,
        canRecordSet: false,
        comments: "",
        promoPhoto: "",
        socialLinks: {},
        musicalStyle: "",
        promoText: "",
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
        paymentInfo: ""
    })
    const [file, setFile] = useState<File | null>(null) //Stocker la photo
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const fetchArtist = async (artistId: string) => {
        try {
            setLoading(true)
            const data = await artistApi.getOne(artistId)
            setArtistData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => { //Déclenche la récupération de l'artiste (et si l'artiste change aussi)
        if (artistId) {
            fetchArtist(artistId)
        }
    }, [artistId])

    //Gerer automatique le type de champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        
        // Gestion des socialLinks
        if (['instagram', 'soundcloud', 'website'].includes(name)) {
            setArtistData((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value
                }
            }))
        } else {
            // Gestion des autres champs
            setArtistData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const upload = new FormData()
        
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
            const updatedData = await artistApi.updateWithFile(artistId, upload)
            setArtistData(updatedData)
            setModal(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <AdminHeader />
        <main className="artist-edit">
            <div className='all-forms'>
                <button onClick={() => navigate("/admin/artists")}><FaArrowCircleLeft /> Retour sur le tableau des artistes</button>
                <h1>Modifier {artistData.projectName}</h1>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <form onSubmit={handleSubmit} className='artist-form' action="artist-pics" method='post' encType="multipart/form-data" >

                    <Collapse title="Infos artiste">
                        <CustomInput label="Nom du projet" name="projectName" value={artistData.projectName || ''} onChange={handleChange} />
                        <CustomInput label="Nom" name="lastName" value={artistData.lastName || ''} onChange={handleChange} />
                        <CustomInput label="Prénom" name="firstName" value={artistData.firstName || ''} onChange={handleChange} />
                        <CustomInput label="Email" type="email" name="email" value={artistData.email || ''} onChange={handleChange} />
                        <CustomInput label="Téléphone" name="phone" value={artistData.phone || ''} onChange={handleChange} />
                        <CustomInput label="Nom invité" name="guestName" value={artistData.guestName || ''} onChange={handleChange} />
                        <CustomInput label="Demande runs artiste" name="runInfo" value={artistData.runInfo || ''} onChange={handleChange} />
                        <div className="input-container">
                            <label>Commentaire artiste</label>
                            <textarea name="comments" value={artistData.comments || ''} onChange={handleChange} className="all-inputs" />
                        </div>
                        <div className="input-container">
                            <label>Photo artiste</label>
                            {artistData.promoPhoto && (
                                <img 
                                    src={`http://localhost:5001/${artistData.promoPhoto}`}
                                    alt="Photo actuelle" 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                                />
                            )}
                            <input type="file" name="promoPhoto" onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setFile(e.target.files[0])
                                }
                            }} className="pics-file" />
                        </div>
                        <CustomInput label="Style musical" name="musicalStyle" value={artistData.musicalStyle || ''} onChange={handleChange} />
                        <CustomInput label="Texte de promotion" name="promoText" value={artistData.promoText || ''} onChange={handleChange} />
                        
                        <h3>Réseaux sociaux</h3>
                        <CustomInput label="Instagram" name="instagram" value={artistData.socialLinks?.instagram || ''} onChange={handleChange} />
                        <CustomInput label="Soundcloud" name="soundcloud" value={artistData.socialLinks?.soundcloud || ''} onChange={handleChange} />
                        <CustomInput label="Website" name="website" value={artistData.socialLinks?.website || ''} onChange={handleChange} />
                    </Collapse>

                    <Collapse title="Infos admin">
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
                        <CustomInput label="Set up de l'artiste" name="setup" value={artistData.setup || ''} onChange={handleChange} />
                        <div className="input-container">
                            <label>
                                <input type="checkbox" name="needsSoundcheck" checked={artistData.needsSoundcheck || false} onChange={handleChange} />
                                {" "}Besoin de soundcheck
                            </label>
                        </div>
                        <div className="input-container">
                            <label>
                                <input type="checkbox" name="canRecordSet" checked={artistData.canRecordSet || false} onChange={handleChange} />
                                {" "}Autorisation d'enregistrement
                            </label>
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

//TODO: Voir pour refactoriser cette page
