import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import CustomInput from "../components/CustomInput"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { emailApi } from "../services/api"

type FormData = {
    name?: string
    email?: string
    object?: string
    message?: string
    isAgree?: boolean
}

const Contact: React.FC=()=>{
    const [formData, setFormData] = useState<FormData>({
        name:"",
        email:"",
        object:"",
        message:"",
        isAgree: false
    })
    const [modal, setModal]= useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    setFormData({
        ...formData,
        [target.name]: 
            target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value //Pour confirmer a TS que la checkbox est bien un input
    })
}
    const handleSubmit= async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await emailApi.send(formData)
            setModal(true)
        } catch (error) {
            console.error("❌ Erreur :", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
        <Header />
        <main className="contact-page">
            <div className="main-wrap">
            <h1>Nous contacter</h1>
            <p>Une question, une info, une suggestion ?
Tu es au bon endroit !
Remplis le formulaire de contact et notre équipe te répondra rapidement par email.
Merci de nous aider à faire du Okami Festival une aventure toujours plus magique 💫</p>
        
            <form onSubmit={handleSubmit}>
                <CustomInput label="Nom & prénom" name="name" value={formData.name} onChange={(handleChange)} required={true} />
                <CustomInput label="Email" name="email" value={formData.email} onChange={(handleChange)} required={true}  />
                <CustomInput label="Objet" name="object" value={formData.object} onChange={(handleChange)} />
                <div className="input-container">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="rgpd">
                    <input type="checkbox" name="isAgree" id="rgpd" checked={formData.isAgree} onChange={handleChange} required/>
                    <label htmlFor="rgpd">J'accepte que mes informations soient traitées conformément à la politique de confidentialité.</label>
                </div>

                <Button type="submit" className="form-btn btn" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer'}
                </Button>

                {modal && (
                    <Modal
                        text='Message envoyé, nous te répondrons dans les plus brefs délais'
                        type="success"
                        onClose={()=>{
                            setModal(false)
                            navigate('/')
                        }} />
                )}

            </form>   
            </div>
        </main>
        <Footer />
        </>
    )
}
export default Contact