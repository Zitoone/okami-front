
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'


export type PersonalInfo ={
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    projectName: string,
    invitName?: string,
    infoRun?: string,
    setupTimeInMin?: number | string,
    soundcheck?: string,
    record?: string,
    setup?: string,
    artistComments?: string,
    pics?: string,
    socials?: string,
    promoText?: string
}

const ArtistForm: React.FC=()=>{
    const { t } = useTranslation()

    const [formData, setFormData] = useState<PersonalInfo>({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        projectName: "",
        invitName: "",
        infoRun: "",
        setupTimeInMin: "",
        soundcheck: "",
        record: "",
        setup: "",
        artistComments: "",
        socials: "",
        promoText: ""
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const upload = new FormData()       
        if(file){
            upload.append('pics', file)
        }
        upload.append('personalInfo', JSON.stringify(formData))

        try {
            const res=await fetch(`${import.meta.env.VITE_APP_API_URL}artists/form`, {
                method: "POST",
                body: upload
            })
            if(!res.ok) throw new Error("Impossible d'ajouter l'artiste")

            setModal(true)

        } catch (error) { 
            console.error("❌ Erreur :", error)            
        }
    }
    return(
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
                            <input name="invitName" value={formData.invitName} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.infoRun")}</label>
                            <textarea name="infoRun" value={formData.infoRun} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.setupTimeInMin")}</label>
                        <input type="number" min={0} max={100} name="setupTimeInMin" value={formData.setupTimeInMin} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.soundcheck")}</label>
                            <input name="soundcheck" value={formData.soundcheck} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.record")}</label>
                        <input name="record" value={formData.record} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.setup")}</label>
                        <input name="setup" value={formData.setup} onChange={handleChange} />
                        </div>

                        <div>
                        <label>{t("artistForm.artistComments")}</label>
                        <textarea name="artistComments" value={formData.artistComments} onChange={handleChange} />
                        </div>

                        <div>
                            <label>{t("artistForm.pics")}</label>
                            <input type="file" name="pics" onChange={(e) => {
                                if (e.target.files &&  e.target.files.length > 0){
                                    setFile(e.target.files[0])
                                }
                            }} className='pics-file'/>
                        </div>

                        <div>
                            <label>{t("artistForm.socials")}</label>
                            <input type='text' name='socials' placeholder='https://soundcloud.com/xxx , https://instagram.com/xxx' value={formData.socials} onChange={handleChange}></input>
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
    )
}

export default ArtistForm

//TODO: Faire un composant pour div : input + label
// Utiliser un map sur formData