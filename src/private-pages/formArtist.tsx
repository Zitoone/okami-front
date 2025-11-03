
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'
import FormHeader from '../components/FormHeader'
import type { Artist } from '../types/Artist'
import { artistApi } from '../services/api'

export const ArtistForm = () => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    
    // États du formulaire
    const [file, setFile] = useState<File | null>(null) // Photo de l'artiste
    const [modal, setModal] = useState(false) // Affichage modal succès
    const [formData, setFormData] = useState<Partial<Artist>>({
        projectName: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        guestName: "",
        runInfo: "",
        setup: "",
        setupTime: "",
        needsSoundcheck: false,
        canRecordSet: false,
        comments: "",
        socialLinks: {},
        promoText: "",
        musicalStyle: "",
        dataSource: "artist"
    })
    

    // Gère les changements des champs normaux (texte, checkbox)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // Gère les changements des réseaux sociaux
    const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }))
    }

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Préparation des données pour l'envoi
        const upload = new FormData()
        
        // Ajout de tous les champs sauf socialLinks
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== 'socialLinks') {
                upload.append(key, String(value))
            }
        })
        
        // Ajout des réseaux sociaux en JSON
        if (formData.socialLinks) {
            upload.append('socialLinks', JSON.stringify(formData.socialLinks))
        }
        
        // Ajout de la photo si elle existe
        if (file) {
            upload.append('promoPhoto', file)
        }

        // Envoi au backend
        try {
            await artistApi.submitForm(upload)
            setModal(true) // Affiche la modal de succès
        } catch (error) {
            console.error("❌ Erreur:", error)
        }
    }
    return (
        <>
            <FormHeader />
            <main className='form'>

            <div className="language-switcher">
                <button onClick={() => i18n.changeLanguage("fr")} >
                <ReactCountryFlag countryCode="FR" className="btn" aria-label="French" />
                </button>
                <button onClick={() => i18n.changeLanguage("en")}>
                <ReactCountryFlag countryCode="GB" className="btn" aria-label="English" />
                </button>
            </div>

                <div className='all-forms'>
                    <h1>{t("artistForm.title")}</h1>
                    <p>{t("artistForm.intro")}</p>

                    <form onSubmit={handleSubmit} className='artist-form'>

                        <h2>{t("artistForm.mainTitle")}</h2>

                        <div>
                            <label>{t("artistForm.projectName")} *</label>
                            <input name="projectName" value={formData.projectName} onChange={handleChange} required />
                        </div>
                        
                        <div>
                            <label>{t("artistForm.lastName")} *</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.firstName")} *</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.email")} *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.phone")} *</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.invitName")}</label>
                            <input name="guestName" value={formData.guestName || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.infoRun")}</label>
                            <textarea name="runInfo" value={formData.runInfo || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.setupTime")}</label>
                            <input name="setupTime" value={formData.setupTime || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.setup")}</label>
                            <input name="setup" value={formData.setup || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>
                                <input type="checkbox" name="needsSoundcheck" checked={formData.needsSoundcheck || false} onChange={handleChange} />
                                {t("artistForm.soundcheck")}
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="checkbox" name="canRecordSet" checked={formData.canRecordSet || false} onChange={handleChange} />
                                {t("artistForm.record")}
                            </label>
                        </div>

                        <div>
                            <label>{t("artistForm.artistComments")}</label>
                            <textarea name="comments" value={formData.comments || ''} onChange={handleChange} />
                        </div>

                        <h2>{t("artistForm.promoTitle")}</h2>
                        
                        <div>
                            <label>Instagram</label>
                            <input name="instagram" placeholder="https://instagram.com/xxx" value={formData.socialLinks?.instagram || ''} onChange={handleSocialLinkChange} />
{/*                         </div>

                        <div> */}
                            <label>Soundcloud</label>
                            <input name="soundcloud" placeholder="https://soundcloud.com/xxx" value={formData.socialLinks?.soundcloud || ''} onChange={handleSocialLinkChange} />
{/*                         </div>

                        <div> */}
                            <label>Website</label>
                            <input name="website" placeholder="https://monsite.com" value={formData.socialLinks?.website || ''} onChange={handleSocialLinkChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.style")}</label>
                            <input name="musicalStyle" value={formData.musicalStyle || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.promoText")}</label>
                            <textarea name='promoText' value={formData.promoText} onChange={handleChange}></textarea>
                        </div>

                        <div>
                            <label>{t("artistForm.pics")}</label>
                            <input 
                                type="file" 
                                name="promoPhoto" 
                                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} 
                                className='pics-file'
                            />
                        </div>

                        <Button type="submit" className="btn form-btn">{t("artistForm.submit")} </Button>

                        {modal && (
                            <Modal
                                text={t("form.successMsg")}
                                type="success"
                                onClose={() => {
                                    setModal(false)
                                    navigate('/')
                                }}
                            />
                        )}
                    </form>
                </div>
            </main>
        </>
    )
}

export default ArtistForm