import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import CustomInput from "../components/CustomInput"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { emailApi } from "../services/api"
import { useTranslation } from "react-i18next"

type FormData = {
    name?: string
    email?: string
    object?: string
    message?: string
    isAgree?: boolean
}

const Contact: React.FC=()=>{
    const { t } = useTranslation()
    const [formData, setFormData] = useState<FormData>({
        name:"",
        email:"",
        object:"",
        message:"",
        isAgree: false
    })
    const [modal, setModal]= useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    setFormData({
        ...formData,
        [target.name]: 
            target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value
    })
}
    const handleSubmit= async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await emailApi.send(formData)
            setModal(true)
        } catch (error: any) {
            console.error("❌ Erreur :", error)
            if (error.response?.status === 500) {
                setError(t('contact.errorServer'))
            } else {
                setError(t('contact.errorGeneral'))
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
        <Header />
        <main className="contact-page">
            <div className="main-wrap">
            <h1>{t('contact.title')}</h1>
            <p>{t('contact.intro')}</p>
        
            <form onSubmit={handleSubmit}>
                <CustomInput label={t('contact.name')} name="name" value={formData.name} onChange={(handleChange)} required={true} />
                <CustomInput label={t('contact.email')} name="email" value={formData.email} onChange={(handleChange)} required={true}  />
                <CustomInput label={t('contact.object')} name="object" value={formData.object} onChange={(handleChange)} />
                <div className="input-container">
                    <label htmlFor="message">{t('contact.message')}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="rgpd">
                    <input type="checkbox" name="isAgree" id="rgpd" checked={formData.isAgree} onChange={handleChange} required/>
                    <label htmlFor="rgpd">{t('contact.rgpd')}</label>
                </div>

                {error && <p role="alert" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

                <Button type="submit" className="form-btn btn" disabled={loading}>
                    {loading ? t('btn.loading') : t('btn.submit')}
                </Button>

                {modal && (
                    <Modal
                        text={t('contact.successMessage')}
                        type="success"
                        onClose={()=>{
                            setModal(false)
                            navigate('/')
                        }} />
                )}

            </form>   
            </div>


            <div className="img-wrap" >
                <div/>
            </div>

        </main>
        <Footer />
        </>
    )
}
export default Contact
