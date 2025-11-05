import { useState } from "react"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal"
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"
import type { Artist } from "../../types/Artist"
import { artistApi } from "../../services/api"

export default function ArtistNew() {
    const [formData, setFormData] = useState<Partial<Artist>>({
        projectName: "",
        lastName: "",
        firstName: "",
        email: "",
        dataSource: "admin"
    })

    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    // Fonction pour gérer les changements dans les input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }))
    }

    //Fonction pour envoyer un nouvel artiste au back
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        try {
            await artistApi.create(formData)
            setModal(true)
        } catch (error) {
            console.error("❌ Erreur:", error)
        }
    }

    return(
        <main className="artist-new">
            <div className="main-wrap">
                <Link to="/admin/artists"><FaArrowCircleLeft /> Retour sur le tableau des artistes</Link>
                <h1>Ajout d'un nouvel artiste pour Okami 2026</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nom du projet</label>
                        <input name="projectName" value={formData.projectName || ''} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Nom</label>
                        <input name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Prénom</label>
                        <input name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    </div>

                    <Button type="submit" className="btn form-btn">Envoyer</Button>
                    
                    {modal && (
                        <Modal
                        text="🩷 Artiste ajouté avec succès 💚 "
                        type="success"
                        onClose={()=>{
                            setModal(false)
                            navigate(-1)
                        }}
                        />
                    )}
                </form>
            </div>
        </main>
    )

}