import { useState } from "react"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal"
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"
import type { Artist } from "../../types/Artist"

export default function ArtistNew() {
    const [formData, setFormData] = useState<Partial<Artist>>({
        projectName: "",
        lastName: "",
        firstName: "",
        email: "",
    })

    const [modal, setModal] = useState(false)

    const token = localStorage.getItem("authToken")

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
        /* if(!formData) return */

        try {
            const req = await fetch(`${import.meta.env.VITE_API_URL}artists/new`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            })
            if(!req.ok) throw new Error("Impossible d'ajouter l'artiste")

            setModal(true)
            
        } catch (error) {
    const err = error as Error
    console.log(err.message)
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
                        <input name="projectName" value={formData.projectName} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Nom</label>
                        <input name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Prénom</label>
                        <input name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
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