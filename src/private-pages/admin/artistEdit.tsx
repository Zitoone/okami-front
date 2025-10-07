import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import Collapse from "../../components/Collapse"
import { FaArrowCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

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

export function ArtistEdit(){
    const { id: artistId } = useParams()

    const [formData, setFormData] = useState<ArtistProps | null>(null)

const token = localStorage.getItem("authToken")

    const fetchArtist = async (id:string) => {
        try {
        const req = await fetch(`http://localhost:3000/api/admin/artists/${id}`,
            {method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            })
        if (!req.ok) throw new Error("Erreur lors du chargement de l'artiste")
        const data: ArtistProps = await req.json()
        setFormData(data)
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        if (artistId){
            fetchArtist(artistId)
        }
    }, [artistId])

    //Fonction pour gérer les changer dans les inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        setFormData((prev)=>{
            if(!prev) return prev
            return{
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    [name]: value,
                },               
            }
        })
    }

    //Fonction pour envoyer les modification au back
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if(!artistId || !formData) return

        try {
            const res = await fetch(`http://localhost:3000/api/admin/artists/${artistId}`,
                {method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            })
            if(!res.ok) throw new Error("Erreur lors de la mise à jour")

            const updatedData = await res.json()
            setFormData(updatedData)
            alert("OK")
        } catch (error) {
            console.log(error)
        }
    }

    if(!formData) return <p>Chargement...</p>
    
    return(
        <main className="artist-edit">
            <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link>
            <h1>Modifier : {formData.personalInfo.projectName}</h1>

            <Collapse title="Infos provenant du questionnaire rempli par l'artiste">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input name="lastName" value={formData.personalInfo.lastName} onChange={handleChange} />
                </div>

                <div>
                    <label>Prénom</label>
                    <input name="firstName" value={formData.personalInfo.firstName} onChange={handleChange} />
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.personalInfo.email} onChange={handleChange}/>
                </div>

                <div>
                    <label>Téléphone</label>
                    <input name="phone" value={formData.personalInfo.phone} onChange={handleChange} />
                        </div>

                    <div>
                        <label>Nom du projet</label>
                        <input name="projectName" value={formData.personalInfo.projectName} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Nom invité</label>
                        <input name="invitName" value={formData.personalInfo.invitName} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Demande runs artiste</label>
                        <textarea name="infoRun" value={formData.personalInfo.infoRun} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Temps d'installation</label>
                    <input type="number" name="setupTimeInMin" value={formData.personalInfo.setupTimeInMin} onChange={handleChange} />
                    </div>

                        <div>
                            <label>Besoin soundcheck artiste</label>
                            <input name="soundcheck" value={formData.personalInfo.soundcheck} onChange={handleChange} />
                        </div>

                    <div>
                    <label>Est ce que l'artiste est Ok pour qu'on l'enregistre</label>
                    <input name="record" value={formData.personalInfo.record} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Set up de l'artiste</label>
                    <input name="setup" value={formData.personalInfo.setup} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Commentaire artiste</label>
                    <textarea name="artistComments" value={formData.personalInfo.artistComments} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Lien photo artiste</label>
                        <input type="text" name="pics" value={formData.personalInfo.pics} onChange={handleChange} />
                    </div>

                        <Button type="submit" className="btn form-btn">Mettre à jour</Button>
            </form>
            </Collapse>

            <Collapse title="Infos admin"></Collapse>

            <Collapse title="Infos techniques"></Collapse>

        </main>
    )

} // Fin function artistEdit

export default ArtistEdit