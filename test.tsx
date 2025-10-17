import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/Button.js"
import Collapse from "../../components/Collapse.js"
import CustomInput from "../../components/CustomInput.js"
import { FaArrowCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal.js"

function ArtistEdit(){
    const { id: artistId} = useParams()
    const [artistData, setArtistData] = useState({
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
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)

    const token = localStorage.getItem("authToken")

    const fetchArtist = async (artistId) => {
        try{
            const req = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/${artistId}`,
                {headers:{"Content-Type": "application/json",
                    Authorization: `Bearer ${token}`}
                })
            if(!req.ok) throw new Error("Erreur lors du chargement de l'artiste")
            const data = await req.json()
            setArtistData({
        personalInfo: data.personalInfo || {
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
        adminInfo: data.adminInfo || {
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
        }     
})
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (artistId){
            setModal(false)
            fetchArtist(artistId)
        }
    },[artistId])

    const handleChange = (section, e) => {
        const { name, value } = e.target
        setArtistData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }))
    }

    //Fonction pour envoyer les modifs au back
    const handleSubmit = async (e) => {
        e.preventDefault()
        const upload = new FormData()
        upload.append('personalInfo', JSON.stringify(artistData.personalInfo))
        upload.append('adminInfo', JSON.stringify(artistData.adminInfo))
        if(file){
            upload.append('pics', file)
        }

        if(!artistId || !artistData) return

        try {
            const req = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/${artistId}`,
                {method: "PATCH",
                headers:{
                    Authorization: `Bearer ${token}`,
                },
                body: upload
            })
            if(!req.ok) throw new Error("Erreur lors de la mise à jour de l'artiste")
                const updatedData = await req.json()
            setArtistData(updatedData)
/*             setArtistData(prev => ({
personalInfo: updatedData.personalInfo || prev.personalInfo,
adminInfo: updatedData.adminInfo || prev.adminInfo
})) */
            setModal(true)

        } catch (error) {
            console.log(error)
        }
    }
    return(
        <main className="artist-edit">
            <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link>

            {loading ? (
    <p>Chargement...</p>
) : ( 
    

            <form onSubmit={handleSubmit}>
                <h1>Modifier {artistData.personalInfo.projectName}</h1>

            <Collapse title="Infos provenant du questionnaire rempli par l'artiste">           
                <CustomInput label="Nom" name="lastName" value={artistData.personalInfo.lastName} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Prénom" name="firstName" value={artistData.personalInfo.firstName} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Email" type="email" name="email" value={artistData.personalInfo.email} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Téléphone" name="phone" value={artistData.personalInfo.phone} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Nom du projet" name="projectName" value={artistData.personalInfo.projectName} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Nom invité" name="invitName" value={artistData.personalInfo.invitName} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Demande runs artiste" name="infoRun" value={artistData.personalInfo.infoRun} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Temps d'installation" name="setupTimeInMin" value={artistData.personalInfo.setupTimeInMin} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Besoin soundcheck artiste" name="soundcheck" value={artistData.personalInfo.soundcheck} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Est ce que l'artiste est Ok pour qu'on l'enregistre" name="record" value={artistData.personalInfo.record} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Set up de l'artiste" name="setup" value={artistData.personalInfo.setup} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Commentaire artiste" name="artistComments" value={artistData.personalInfo.artistComments} onChange={(e) => handleChange("personalInfo", e)}/>
                <div className="input-container">
                    <label>Photo artiste</label>
                    <input type="file" name="pics" onChange={(e) => {
                    if(e.target.files && e.target.files.length > 0){
                        setFile(e.target.files[0])
                    }
                }} className="pics-file" />
                </div>
                <CustomInput label="Lien(s) réseaux sociaux" name="socials" value={artistData.personalInfo.socials} onChange={(e) => handleChange("personalInfo", e)}/>
                <CustomInput label="Texte de promotion" name="promoText" value={artistData.personalInfo.promoText} onChange={(e) => handleChange("personalInfo", e)}/>
            </Collapse>

            <Collapse title="Infos admin">           
                <CustomInput label="Nombre de personnes dans le projet" name="nbOfPerson" value={artistData.adminInfo.nbOfPerson} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Scène" name="stage" value={artistData.adminInfo.stage} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Date et heure de passage" name="gigDateTime" value={artistData.adminInfo.gigDateTime} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Si balances, date et heure" name="soundcheckDayTime" value={artistData.adminInfo.soundcheckDayTime} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Infos run d'arrivée" name="arrivedRun" value={artistData.adminInfo.arrivedRun} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Infos run de départ" name="departRun" value={artistData.adminInfo.departRun} onChange={(e) => handleChange("adminInfo", e)}/>               
                <CustomInput label="Infos logement" name="accommodation" value={artistData.adminInfo.accommodation} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Contrat" name="contract" value={artistData.adminInfo.contract} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Facture" name="invoice" value={artistData.adminInfo.invoice} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Cachet" name="bookingFee" value={artistData.adminInfo.bookingFee} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Frais de déplacement" name="travelExpense" value={artistData.adminInfo.travelExpense} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Total" name="totalFees" value={artistData.adminInfo.totalFees} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Infos paiement" name="paiementInfo" value={artistData.adminInfo.paiementInfo} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Formulaire SACEM" name="sacemForm" value={artistData.adminInfo.sacemForm} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Infos supplémentaire" name="specialInfo" value={artistData.adminInfo.specialInfo} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Texte promo en Français" name="descriptionFr" value={artistData.adminInfo.descriptionFr} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Texte promo en Anglais" name="descriptionEng" value={artistData.adminInfo.descriptionEng} onChange={(e) => handleChange("adminInfo", e)}/>
                <CustomInput label="Style" name="style" value={artistData.adminInfo.style} onChange={(e) => handleChange("adminInfo", e)}/>       
            </Collapse>

            <Collapse title="Infos techniques">
                <CustomInput label="Feuille de route" name="roadMap" value={artistData.adminInfo.roadMap} onChange={(e) => handleChange("adminInfo", e)}/>
            
            </Collapse>

            <Button type="submit" className="btn form-btn">Mettre à jour</Button>
            {modal && (
                    <Modal
                    text="🩷 Artiste modifié avec succès 💚 "
                    type="success"
                    onClose = {() => {
                        setModal(false)
                    }}
                    />
                    )
            }
            
            </form>
        )}
        </main>
    )




}
export default ArtistEdit