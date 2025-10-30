import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/Button"
import Collapse from "../../components/Collapse"
import CustomInput from "../../components/CustomInput"
import { FaArrowCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal"
import { useNavigate } from 'react-router-dom'

type ArtistData = {
    personalInfo: {
        lastName: string
        firstName: string
        email: string
        phone: string
        projectName: string
        invitName: string
        infoRun: string
        setupTimeInMin: number
        soundcheck: string
        record: string
        setup: string
        artistComments: string
        pics: string
        socials: string
        promoText: string
    }
    adminInfo: {
        nbOfPerson: number
        stage: string
        gigDateTime: string
        soundcheckDayTime: string
        arrivedRun: string
        departRun: string
        accommodation: string
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

function ArtistEdit() {
    const { id: artistId } = useParams<{ id: string }>()
    const [artistData, setArtistData] = useState<ArtistData>({
        personalInfo: {
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            projectName: "",
            invitName: "",
            infoRun: "",
            setupTimeInMin: 0,
            soundcheck: "",
            record: "",
            setup: "",
            artistComments: "",
            pics: "",
            socials: "",
            promoText: ""
        },
        adminInfo: {
            nbOfPerson: 0,
            stage: "",
            gigDateTime: "",
            soundcheckDayTime: "",
            arrivedRun: "",
            departRun: "",
            accommodation: "",
            bookingFee: "",
            travelExpense: "",
            totalFees: "",
            contract: "",
            invoice: "",
            roadMap: "",
            paiementInfo: "",
            sacemForm: "",
            specialInfo: "",
            descriptionFr: "",
            descriptionEng: "",
            style: ""
        },
    })
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)

    const token = localStorage.getItem("authToken")
    const navigate = useNavigate()

    const fetchArtist = async (artistId: string) => {
        try {
            const req = await fetch(`${import.meta.env.VITE_API_URL}artists/${artistId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (!req.ok) throw new Error("Erreur lors du chargement de l'artiste")
            const data = await req.json()

            setArtistData({
                personalInfo: data.personalInfo || artistData.personalInfo,
                adminInfo: data.adminInfo || artistData.adminInfo
            })

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if (artistId) {
            fetchArtist(artistId)
        }
    }, [artistId])

    const handleChange = (section: keyof ArtistData, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setArtistData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const upload = new FormData()
        upload.append('personalInfo', JSON.stringify(artistData.personalInfo))
        upload.append('adminInfo', JSON.stringify(artistData.adminInfo))
        if (file) upload.append('pics', file)

        if (!artistId || !artistData) return

        try {
            const req = await fetch(`${import.meta.env.VITE_API_URL}artists/${artistId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: upload
            })
            if (!req.ok) throw new Error("Erreur lors de la mise à jour de l'artiste")
            const updatedData = await req.json()

            setArtistData(prev => ({
                personalInfo: updatedData.personalInfo || prev.personalInfo,
                adminInfo: updatedData.adminInfo || prev.adminInfo
            }))
            setModal(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <main className="artist-edit">
            <div className='all-forms'>
                <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link>
                <h1>Modifier {artistData.personalInfo.projectName}</h1>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <form onSubmit={handleSubmit} className='artist-form' action="artist-pics" method='post' encType="multipart/form-data" >

                    <Collapse title="Infos artiste">
                        <CustomInput label="Nom" name="lastName" value={artistData.personalInfo.lastName} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Prénom" name="firstName" value={artistData.personalInfo.firstName} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Email" type="email" name="email" value={artistData.personalInfo.email} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Téléphone" name="phone" value={artistData.personalInfo.phone} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Nom du projet" name="projectName" value={artistData.personalInfo.projectName} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Nom invité" name="invitName" value={artistData.personalInfo.invitName} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Demande runs artiste" name="infoRun" value={artistData.personalInfo.infoRun} onChange={(e) => handleChange("personalInfo", e)} />
                        <div className="input-container">
                            <label>Commentaire artiste</label>
                            <textarea name="artistComments" value={artistData.personalInfo.artistComments} onChange={(e) => handleChange("personalInfo", e)} className="all-inputs" />
                        </div>
                        
                        <div className="input-container">
                            <label>Photo artiste</label>
                            <input type="file" name="pics" onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setFile(e.target.files[0])
                                }
                            }} className="pics-file" />
                        </div>
                        <CustomInput label="Lien(s) réseaux sociaux" name="socials" value={artistData.personalInfo.socials} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Texte de promotion" name="promoText" value={artistData.personalInfo.promoText} onChange={(e) => handleChange("personalInfo", e)} />
                    </Collapse>

                    <Collapse title="Infos admin">
                        <CustomInput label="Nombre de personnes dans le projet" name="nbOfPerson" value={artistData.adminInfo.nbOfPerson} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Scène" name="stage" value={artistData.adminInfo.stage} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Date et heure de passage" name="gigDateTime" value={artistData.adminInfo.gigDateTime} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Si balances, date et heure" name="soundcheckDayTime" value={artistData.adminInfo.soundcheckDayTime} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Infos run d'arrivée" name="arrivedRun" value={artistData.adminInfo.arrivedRun} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Infos run de départ" name="departRun" value={artistData.adminInfo.departRun} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Infos logement" name="accommodation" value={artistData.adminInfo.accommodation} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Contrat" name="contract" value={artistData.adminInfo.contract} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Facture" name="invoice" value={artistData.adminInfo.invoice} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Cachet" name="bookingFee" value={artistData.adminInfo.bookingFee} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Frais de déplacement" name="travelExpense" value={artistData.adminInfo.travelExpense} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Total" name="totalFees" value={artistData.adminInfo.totalFees} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Infos paiement" name="paiementInfo" value={artistData.adminInfo.paiementInfo} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Feuille de route" name="roadMap" value={artistData.adminInfo.roadMap} onChange={(e) => handleChange("adminInfo", e)} />
                        <CustomInput label="Formulaire SACEM" name="sacemForm" value={artistData.adminInfo.sacemForm} onChange={(e) => handleChange("adminInfo", e)} />
                        <div className="input-container">
                            <label>Infos supplémentaire</label>
                            <textarea name="specialInfo" value={artistData.adminInfo.specialInfo} onChange={(e) => handleChange("adminInfo", e)} className="all-inputs"/>
                        </div>                                                 
                        <div className="input-container">
                            <label>Texte promo en Française</label>
                            <textarea name="descriptionFr" value={artistData.adminInfo.descriptionFr} onChange={(e) => handleChange("adminInfo", e)} className="all-inputs" />
                        </div>
                        <div className="input-container">
                            <label>Texte promo en Anglais</label>
                            <textarea name="descriptionEng" value={artistData.adminInfo.descriptionEng} onChange={(e) => handleChange("adminInfo", e)} className="all-inputs" />
                        </div>                       
                        <CustomInput label="Style" name="style" value={artistData.adminInfo.style} onChange={(e) => handleChange("adminInfo", e)} />
                    </Collapse>

                    <Collapse title="Infos techniques">
                        <CustomInput label="Temps d'installation" name="setupTimeInMin" value={artistData.personalInfo.setupTimeInMin} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Besoin soundcheck artiste" name="soundcheck" value={artistData.personalInfo.soundcheck} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Est ce que l'artiste est Ok pour qu'on l'enregistre" name="record" value={artistData.personalInfo.record} onChange={(e) => handleChange("personalInfo", e)} />
                        <CustomInput label="Set up de l'artiste" name="setup" value={artistData.personalInfo.setup} onChange={(e) => handleChange("personalInfo", e)} />
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
    )
}

export default ArtistEdit
