
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/header'

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
        pics: ""
        })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const res=await fetch("http://localhost:3000/api/artists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ personalInfo: formData })
            })
            const data=await res.json()
            console.log("✅ Artiste ajouté :", data)
        } catch (error) { console.error("❌ Erreur :", error)            
        }
    }
    return(
        <>
        <Header />
        <main>
            <div>
                <h1>{t("artistForm.title")}</h1>
                <p>{t("artistForm.intro")}</p>
                <form onSubmit={handleSubmit}>
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
                    <input type="number" name="setupTimeInMin" value={formData.setupTimeInMin} onChange={handleChange} />
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
                        <input type="text" name="pics" value={formData.pics} onChange={handleChange} />
                    </div>

                    <button type="submit">{t("artistForm.submit")}</button>
                </form>
            </div>
        </main>
        </>
    )
}

export default ArtistForm
