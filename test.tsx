
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'
import FormHeader from '../components/FormHeader'
import type { Artist } from '../types/Artist'
import { artistApi } from '../services/api'

const ArtistForm: React.FC=()=>{
    const { t } = useTranslation()

    const [formData, setFormData] = useState<Partial<Artist>>({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        projectName: "",
        guestName: "",
        runInfo: "",
        setupTime: "",
        needsSoundcheck: false,
        canRecordSet: false,
        setup: "",
        comments: "",
        socialLinks: {},
        promoText: "",
        dataSource: "artist"
        })
    
    const [file, setFile] = useState<File | null>(null)
    const [modal, setModal]=useState(false)

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const upload = new FormData()
        
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== 'socialLinks') {
                upload.append(key, String(value))
            }
        })
        
        if (formData.socialLinks) {
            upload.append('socialLinks', JSON.stringify(formData.socialLinks))
        }
        
        if(file){
            upload.append('promoPhoto', file)
        }

        try {
            const res=await fetch(`${import.meta.env.VITE_API_URL}artists/form`, {
                method: "POST",
                body: upload
            })
            
            if(!res.ok) {
                const errorData = await res.json()
                console.error("Erreur backend:", errorData)
                throw new Error(errorData.message || "Impossible d'ajouter l'artiste")
            }

            setModal(true)

        } catch (error) { 
            console.error("❌ Erreur complète:", error)            
        }
    }
    return(
        <>
        <FormHeader />
        <main className='form'>
            <div className='all-forms'>
                <h1>{t("artistForm.title")}</h1>
                <p>{t("artistForm.intro")}</p>

{/*                 {submitted?(
                    <div className="form-success-msg">
                        <BsHandThumbsUpFill />
                        <p>{t("form.successMsg")}</p>
                    </div>
                ):( */}
                
                    <form onSubmit={handleSubmit} className='artist-form' action="artist-pics" method='post' encType="multipart/form-data">
                        
                        <div>
                            <label>{t("artistForm.lastName")} <span>*</span></label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.firstName")} <span>*</span></label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.email")} <span>*</span></label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.phone")} <span>*</span></label>
                            <input name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>

                        <div>
                            <label>{t("artistForm.projectName")} <span>*</span></label>
                            <input name="projectName" value={formData.projectName} onChange={handleChange} required />
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
                        <label>{t("artistForm.setupTimeInMin")}</label>
                        <input name="setupTime" value={formData.setupTime || ''} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.setup")}</label>
                        <input name="setup" value={formData.setup || ''} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.artistComments")}</label>
                        <textarea name="comments" value={formData.comments || ''} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.pics")}</label>
                            <input type="file" name="promoPhoto" onChange={(e) => {
                                if (e.target.files &&  e.target.files.length > 0){
                                    setFile(e.target.files[0])
                                }
                            }} className='pics-file'/>
                        </div>

                        <div>
                            <label>Instagram</label>
                            <input type='text' name='instagram' placeholder='https://instagram.com/xxx' value={formData.socialLinks?.instagram || ''} onChange={handleSocialLinkChange} />
                        </div>

                        <div>
                            <label>Soundcloud</label>
                            <input type='text' name='soundcloud' placeholder='https://soundcloud.com/xxx' value={formData.socialLinks?.soundcloud || ''} onChange={handleSocialLinkChange} />
                        </div>

                        <div>
                            <label>Website</label>
                            <input type='text' name='website' placeholder='https://monsite.com' value={formData.socialLinks?.website || ''} onChange={handleSocialLinkChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.promoText")}</label>
                            <textarea name='promoText' value={formData.promoText} onChange={handleChange}></textarea>
                        </div>

                        <Button type="submit" className="btn form-btn">{t("artistForm.submit")} </Button>

                        {modal && (
                            <Modal
                                text= {t("form.successMsg")}
                                type="success"
                                onClose={()=>{
                                setModal(false)
                                navigate('/')
                    }} />
                        )}
                    
                    </form>
               {/*  )} */}
            </div>

        </main>
        </>
    )
}

export default ArtistForm