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
    const [promoPhoto, setPromoPhoto] = useState<File | null>(null) // Stocker la photo choisie
    const [preview, setPreview] = useState<string | null>(null) // Pour la preview locale du fichier
    const [riderTech, setRiderTech] = useState<File | null>(null) // Stocker le rider technique
    const [modal, setModal] = useState(false) // Affichage modal succès
    const [error, setError] = useState<string | null>(null) // Erreur de formulaire
    const [formData, setFormData] = useState<Partial<Artist>>({ // Partial pour que les champs soient facultatifs
        projectName: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        guestName: "",
        setup: "",
        setupTime: "",
        needsSoundcheck: "",
        canRecordSet: false,
        comments: "",
        socialLinks: {},
        musicalStyle: "",
        dataSource: "artist"
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const normalizeUrl = (url: string): string => {
        if (!url) return ''
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`
        }
        return url
    }

    const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: normalizeUrl(value)
            }
        }))
    }

    const handlePromoPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
            setPromoPhoto(file)
            // Création d'un Blob local pour la preview (utilisation de URL.createObjectURL)
            setPreview(URL.createObjectURL(file))
            setError(null)
        } else {
            setPromoPhoto(null)
            setPreview(null)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setRiderTech(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Vérification obligatoire de la photo
        if(!promoPhoto){
            setError(t("artistForm.photoRequired"))
            return
        }
        setError(null)
        setLoading(true)

        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'socialLinks') {
                // On stringify socialLinks car c'est un objet
                data.append(key, JSON.stringify(value))
            } else if (typeof value === 'boolean') {
                data.append(key, value.toString())
            } else if (value) {
                data.append(key, value.toString())
            }
        })

        // Ajout des fichiers
        if (promoPhoto) data.append('promoPhoto', promoPhoto)
        if (riderTech) data.append('riderTechUpload', riderTech)

        try {
            await artistApi.submitForm(data)
            setModal(true)
        } catch (error) {
            // Gestion complète des erreurs
            console.error("❌ Erreur Axios :", error)
            setError(t("artistForm.submitFailed"))
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
                <p style={{ whiteSpace: 'pre-wrap' }}>{t("artistForm.intro")}</p>

                <form onSubmit={handleSubmit} className='artist-form'>

                    <h2>{t("artistForm.mainTitle")}</h2>

                    {/* Champs principaux */}
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
                        <label htmlFor='setupTime'>{t("artistForm.setupTime")}</label>
                        <input id='setupTime' name="setupTime" value={formData.setupTime || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='setup'>{t("artistForm.setup")}</label>
                        <textarea id='setup' name="setup" value={formData.setup || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="needsSoundcheck">{t("artistForm.soundcheck")}</label>
                        <input id="needsSoundcheck" name="needsSoundcheck" value={formData.needsSoundcheck || ''} onChange={handleChange} />
                    </div>

                    {/* Rider technique */}
                    <div>
                        <label htmlFor="riderTechUrl">{t("artistForm.riderTech1")}</label>
                        <input type="text" name="riderTechUrl" id="riderTechUrl" placeholder='https://...' onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="riderTechUpload">{t("artistForm.riderTech2")}</label>
                        <input type="file" id="riderTechUpload" name="riderTechUpload" onChange={handleFileChange} accept='.pdf,.doc,.docx,.xls,.xlsx' />
                    </div>

                    {/* Checkbox autorisation d'enregistrement */}
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
                        {preview && (
                            <img 
                                src={preview} 
                                alt="Aperçu" 
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                            />
                        )}
                        <label htmlFor='promoPhoto'>{t("artistForm.pics")}</label>
                        <input id='promoPhoto' name='promoPhoto' type="file" accept="image/*" onChange={handlePromoPhotoChange} />
                    </div>

                    {/* Réseaux sociaux */}
                    <div>
                        <label htmlFor='instagram'>Instagram</label>
                        <input id='instagram' name="instagram" placeholder="https://instagram.com/xxx" value={formData.socialLinks?.instagram || ''} onChange={handleSocialLinkChange} />
                        <label htmlFor='soundcloud'>Soundcloud</label>
                        <input id='soundcloud' name="soundcloud" placeholder="https://soundcloud.com/xxx" value={formData.socialLinks?.soundcloud || ''} onChange={handleSocialLinkChange} />
                        <label htmlFor='spotify'>Spotify</label>
                        <input id='spotify' name="spotify" placeholder="https://spotify.com/xxx" value={formData.socialLinks?.spotify || ''} onChange={handleSocialLinkChange} />
                        <label htmlFor='facebook'>Facebook</label>
                        <input id='facebook' name="facebook" placeholder="https://facebook.com/xxx" value={formData.socialLinks?.facebook || ''} onChange={handleSocialLinkChange} />
                        <label htmlFor='website'>Website</label>
                        <input id='website' name="website" placeholder="https://monsite.com" value={formData.socialLinks?.website || ''} onChange={handleSocialLinkChange} />
                        <label htmlFor='youtube'>Youtube</label>
                        <input id='youtube' name="youtube" placeholder="https://www.youtube.com/xxx" value={formData.socialLinks?.youtube || ''} onChange={handleSocialLinkChange} />
                    </div>

                    <div>
                        <label htmlFor='musicalStyle'>{t("artistForm.style")}</label>
                        <input id='musicalStyle' name="musicalStyle" value={formData.musicalStyle || ''} onChange={handleChange} />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}


                    <Button type="submit" className="btn form-btn" disabled={loading}>
                        {loading ? t("btn.loading") : t("btn.submit")}
                    </Button>

                    {modal && (
                        <Modal
                            text={t("form.successMsg")}
                            type="success"
                            onClose={() => {
                                setModal(false)
                                navigate('/countdown')
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
