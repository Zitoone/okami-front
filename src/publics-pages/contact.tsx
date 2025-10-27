import { useState } from "react"
import CustomInput from "../components/CustomInput"
import Button from "../components/Button"

type FormData = {
    name: string
    email: string
    object: string
    message: string
    isAgree: boolean
}

const Contact: React.FC=()=>{
    const [formData, setFormData] = useState<FormData>({
        name:"",
        email:"",
        object:"",
        message:"",
        isAgree: false
    })

    const handleChange = (e)=>{
        const {name, type, value, checked} = e.target
        setFormData((prevState)=>({
            ...prevState, [name]: type === "checkbox" ? checked : value,
        }))
    }
    
    const formSubmit=(e) => {
        e.preventDefault()
        setFormData({
            name:"",
            email:"",
            object:"",
            message:"",
            isAgree: false
        })
    }
    return (
        <main className="contact-page">
            <div className="main-wrap">
            <h1>Nous contacter</h1>
            <p>Une question, une info, une suggestion ?
Tu es au bon endroit !
Remplis le formulaire de contact et notre équipe te répondra rapidement par email.
Merci de nous aider à faire du Okami Festival une aventure toujours plus magique 💫</p>
        
            <form onSubmit={formSubmit}>
                <CustomInput label="Nom & prénom" value={formData.name} onChange={handleChange}required />
                <CustomInput label="Email" value={formData.email} onChange={handleChange}required />
                <CustomInput label="Objet" value={formData.object} onChange={handleChange} />
                <div className="input-container">
                    <label htmlFor="">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                </div>

                <Button type="submit" className="form-btn btn">Envoyer</Button>

            </form>   
            </div>
        </main>



    )
}
export default Contact