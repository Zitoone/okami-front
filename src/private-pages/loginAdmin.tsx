//Page destinée au login des admin/référents pour la gestion des intervenants
// Pas besoin de traduction

import React, { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'

const LoginForm: React.FC = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if(!emailRegex.test(email)){
        setError("Merci d'entrer un email valide")
        return
    }
    if(password.length < 6){
        setError("6 caractères minimum")
        return
    }
    try {
            const req=await fetch('http://localhost:3000/api/admin/login',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            if(!req.ok) throw new Error("Impossible de se connecter")
            
            const res = await req.json()

            if(res.token){
                localStorage.setItem("authToken", res.token)
                console.log("connexion OK")
                window.location.href = '/admin/dashboard' 
                setError('')
                //Emmene sur le  tableau de bord admin
            }

        } catch (error) {
            setError("Erreur lors de la connexion")
            console.error(error)
        }
//si OK faire le fetch avec le bon format de données     {"email": "olivia@okamifestival.com",
/* "password": "pass1234"} */
//Si reponse OK récupéré token, le stocker (local storage)
    }
    return(
        <main id='login-page'>
            <div className="main-wrap">
                <h1>Connexion privée</h1>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div>
                        <label>Email <span>*</span></label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div>
                        <label>Mot de passe <span>*</span></label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <Button type="submit" className="btn form-btn">Connecte moi</Button>

                </form>
                {error && (
                    <Modal text={`⛔ ${error}`} type="error" onClose={() => setError('')} />
                )}
            </div>
        </main>
    )
}

export default LoginForm

//TODO: Vider le form si erreur de connexion