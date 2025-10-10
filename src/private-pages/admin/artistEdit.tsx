import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
/* import { useNavigate } from "react-router-dom" */
import Button from "../../components/Button"
import Collapse from "../../components/Collapse"
import { FaArrowCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal"

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
        setupTimeInMin: number
        soundcheck: string
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

//Composant de la page de mofication des artistes
export function ArtistEdit(){
    const { id: artistId } = useParams() //Var pour récupérer l'id de l'artiste dans envoyé dans l'URL

const [formData, setFormData] = useState<ArtistProps>({ //Initialise form data a vide et utilise les props déclarées
    _id: "",
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
    },
        adminInfo: {
        nbOfPerson: 0,
        stage: "",
        gigDateTime: "",
        soundcheckDayTime: "",
        arrivedRun: "",
        departRun: "",
        accomodation: "",
        bookingFee: 0,
        travelExpense: 0,
        totalFees: 0,
        contract: false,
        invoice: false,
        roadMap: false,
        paiementInfo: "",
        sacemForm: false,
        specialInfo: "",
    }
})
    const [loading, setLoading]=useState(true) //Indicateur de chargement pendant la récupération des données
    const [modal, setModal]=useState(false) //Etat de la modale lorsque le form est soumis

    const token = localStorage.getItem("authToken") //Récupération du token pour accèder à cette page

    /* const navigate = useNavigate() */

    ////Fonction pour récupérer l'artiste par son id
    const fetchArtist = async (artistId:string) => {
        try {
        const req = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/${artistId}`,
            {method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            })
        if (!req.ok) throw new Error("Erreur lors du chargement de l'artiste")
        const data: ArtistProps = await req.json() //reçoit les données en json avec le type attendu
        setFormData(data) //le form est peuplé des données de l'artiste sélectionné
        } catch (error) {
        console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { // Avec le useEffect cela s’exécute après le rendu initial et à chaque fois que le tableau de dépendance change
        if (artistId){
            fetchArtist(artistId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artistId])

    //Fonction pour gérer les changer dans les inputs avec l'évènement e venant des input ou textarea HTML
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target //On récupére le nom et la valeur du champ de l'évènement e

        setFormData((prev)=>{ //On met a jour formData avec la version précédente, si c'est différent
            if(!prev) return prev //Si prev n'existe pas, on ne fait rien
            return{
                ...prev, 
                personalInfo: {//On copie la version précédente de prev et de la partie personalInfo
                    ...prev.personalInfo,
                    [name]: value, //On met a jour les nouvelles valeurs qui correspondent aux names (cela permet de modifier chaque valeur séparément)
                },               
            }
        })
    }

    //Fonction pour envoyer les modification au back
    const handleSubmit = async (e:React.FormEvent) => { //e correspond à l'évenement du formulaire quand il est soumis
        e.preventDefault()
        if(!artistId || !formData) return 

        try { //fetch a l'API avec l'id de l'artiste
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/${artistId}`,
                {method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, //sécurisation par le token
                },
                body: JSON.stringify(formData) //Transforme les données envoyées en json
            })
            if(!res.ok) throw new Error("Erreur lors de la mise à jour")

            const updatedData = await res.json() //On récupère les données modifiées dans le nouvel état du formulaire
            setFormData(updatedData)
            setModal(true) //Et on modifie l'etat de la modale a true

        } catch (error) {
            console.log(error)
        }
    }
if (loading) return <p>Chargement...</p> //Si ça charge...
    //On retourne le rendu si pas d'erreur
    return(
        <main className="artist-edit">
            <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link> {/* Lien pour revenir sur le tableau des artistes */}
            <h1>Modifier : {formData?.personalInfo?.projectName || ""}</h1>
        {/* Le ? permet d'accéder aux propriétés meme si elles ne sont pas définies ou vides */}

            <Collapse title="Infos provenant du questionnaire rempli par l'artiste">
                <div> {/* Composant Collapse ses paramètres (titre et children) */}
                    {/* Affichage conditionnel d'un msg (si le form est soumis), sinon on affiche le form */}
{/*                     {submitted ? (
                    <div className="form-success-msg">                    
                        <BsHandThumbsUpFill />
                        <p>Infos personnelles de l'artiste mis à jour</p>
                    </div>
            ) : ( */}

            <form onSubmit={handleSubmit}> {/* Active la fonction handleSubmit lorsque le form est soumis */}
            {/* Fonction onChange s'active à chaque changement d'input */}
                <div>
                    <label>Nom</label>
                    <input name="lastName" value={formData?.personalInfo?.lastName || ""} onChange={handleChange} />
                </div>

                <div>
                    <label>Prénom</label>
                    <input name="firstName" value={formData?.personalInfo?.firstName || ""} onChange={handleChange} />
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData?.personalInfo?.email || ""} onChange={handleChange}/>
                </div>

                <div>
                    <label>Téléphone</label>
                    <input name="phone" value={formData?.personalInfo?.phone || ""} onChange={handleChange} />
                        </div>

                    <div>
                        <label>Nom du projet</label>
                        <input name="projectName" value={formData?.personalInfo?.projectName || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Nom invité</label>
                        <input name="invitName" value={formData?.personalInfo?.invitName || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Demande runs artiste</label>
                        <textarea name="infoRun" value={formData?.personalInfo?.infoRun || ""} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Temps d'installation</label>
                    <input type="number" min={0} max={100} name="setupTimeInMin" value={formData?.personalInfo?.setupTimeInMin || ""} onChange={handleChange} />
                    </div>

                        <div>
                            <label>Besoin soundcheck artiste</label>
                            <input name="soundcheck" value={formData?.personalInfo?.soundcheck || ""} onChange={handleChange} />
                        </div>

                    <div>
                    <label>Est ce que l'artiste est Ok pour qu'on l'enregistre</label>
                    <input name="record" value={formData?.personalInfo?.record || ""} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Set up de l'artiste</label>
                    <input name="setup" value={formData?.personalInfo?.setup || ""} onChange={handleChange} />
                    </div>

                    <div>
                    <label>Commentaire artiste</label>
                    <textarea name="artistComments" value={formData?.personalInfo?.artistComments || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Lien photo artiste</label>
                        <input type="text" name="pics" value={formData?.personalInfo?.pics || ""} onChange={handleChange} />
                    </div>

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
            {/* )} */}

            </div>
            </Collapse>

            <Collapse title="Infos admin">
            <p>En construction...</p>
            </Collapse>
            

            <Collapse title="Infos techniques">
            <p>En construction...</p>
            </Collapse>

        </main>
    )

}

export default ArtistEdit
//TODO: Modifier le handleChange pour pouvoir update partie admin et partie technique 