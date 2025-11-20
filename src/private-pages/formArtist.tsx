
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
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
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
    const [loading, setLoading] = useState(false)


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

    // Gère le changement de fichier
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
        }
    }

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'socialLinks') {
                data.append(key, JSON.stringify(value))
            } else if (typeof value === 'boolean') {
                data.append(key, value.toString())
            } else if (value) {
                data.append(key, value.toString())
            }
        })
        if (file) data.append('promoPhoto', file)

        try {
            await artistApi.submitForm(data)
            setModal(true)
        } catch (error) {
            console.error("❌ Erreur:", error)
        } finally {
            setLoading(false)
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
                            <label htmlFor='projectName'>{t("artistForm.projectName")} *</label>
                            <input id='projectName' name="projectName" value={formData.projectName} onChange={handleChange} required />
                        </div>
                        
                        <div>
                            <label htmlFor='lastName'>{t("artistForm.lastName")} *</label>
                            <input id='lastName' name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor='firstName'>{t("artistForm.firstName")} *</label>
                            <input id='firstName' name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor='email'>{t("artistForm.email")} *</label>
                            <input type="email" id='email' name="email" value={formData.email} onChange={handleChange} autoComplete='off' required />
                        </div>

                        <div>
                            <label htmlFor='phone'>{t("artistForm.phone")} *</label>
                            <input type='tel' id='phone' name="phone" value={formData.phone} onChange={handleChange} autoComplete='off' required />
                        </div>

                        <div>
                            <label htmlFor='guestName'>{t("artistForm.invitName")}</label>
                            <input id='guestName' name="guestName" value={formData.guestName || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor='runInfo'>{t("artistForm.infoRun")}</label>
                            <textarea id='runInfo' name="runInfo" value={formData.runInfo || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor='setupTime'>{t("artistForm.setupTime")}</label>
                            <input id='setupTime' name="setupTime" value={formData.setupTime || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor='setup'>{t("artistForm.setup")}</label>
                            <textarea id='setup' name="setup" value={formData.setup || ''} onChange={handleChange} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label htmlFor="needsSoundcheck" style={{ margin: 0 }}>{t("artistForm.soundcheck")}</label>
                            <input type="checkbox" id="needsSoundcheck" name="needsSoundcheck" checked={formData.needsSoundcheck || false} onChange={handleChange} style={{ width: 'auto' }} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label htmlFor="canRecordSet" style={{ margin: 0 }}>{t("artistForm.record")}</label>
                            <input type="checkbox" id="canRecordSet" name="canRecordSet" checked={formData.canRecordSet || false} onChange={handleChange} style={{ width: 'auto' }} />
                        </div>

                        <div>
                            <label htmlFor='comments' >{t("artistForm.artistComments")}</label>
                            <textarea id='comments' name="comments" value={formData.comments || ''} onChange={handleChange} />
                        </div>

                        <h2>{t("artistForm.promoTitle")}</h2>
                        
                        <div>
                            <label htmlFor='instagram'>Instagram</label>
                            <input id='instagram' name="instagram" placeholder="https://instagram.com/xxx" value={formData.socialLinks?.instagram || ''} onChange={handleSocialLinkChange} />

                            <label htmlFor='soundcloud'>Soundcloud</label>
                            <input id='soundcloud' name="soundcloud" placeholder="https://soundcloud.com/xxx" value={formData.socialLinks?.soundcloud || ''} onChange={handleSocialLinkChange} />

                            <label htmlFor='website'>Website</label>
                            <input id='website' name="website" placeholder="https://monsite.com" value={formData.socialLinks?.website || ''} onChange={handleSocialLinkChange} />
                        </div>

                        <div>
                            <label htmlFor='musicalStyle'>{t("artistForm.style")}</label>
                            <input id='musicalStyle' name="musicalStyle" value={formData.musicalStyle || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor='promoText'>{t("artistForm.promoText")}</label>
                            <textarea id='promoText' name='promoText' value={formData.promoText} onChange={handleChange}></textarea>
                        </div>

                        <div>
                            <label htmlFor='promoPhoto'>{t("artistForm.pics")}</label>
                            {preview && (
                                <img 
                                    src={preview} 
                                    alt="Aperçu" 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                                />
                            )}
                            <input id='promoPhoto' type="file" accept="image/*" onChange={handleFileChange} />
                        </div>

                    <Button type="submit" className="btn form-btn" disabled={loading}>
                        {loading ? t("btn.loading") : t("btn.submit")}
                    </Button>


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