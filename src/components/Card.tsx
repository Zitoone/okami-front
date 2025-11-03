import { useNavigate } from "react-router-dom"
import { RiSoundcloudLine, RiInstagramFill } from "react-icons/ri"
import { CiGlobe } from "react-icons/ci"
import { useState } from "react"

type socialProps={
    instagram?: string,
    soundcloud?: string,
    website?: string
}
type CardProps={
    className?: string,
    url?: string
    title: string,
    icon?: React.ReactNode,
    subtitle?: string,
    image?:string,
    content?: string,
    socials?: socialProps,
    children?: React.ReactNode,
}

const Card: React.FC<CardProps> = ({
    className,
    url,
    title,
    subtitle,
    image,
    icon,
    content,
    socials,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleClick = () =>{ //Si la card a un URL, navigue vers l'URL sinon elle bascule en isOpen et affichera le contenu children
        if(url) {
            navigate(url)
            return
        }
        setIsOpen(!isOpen)
    }
    const handleClose = () =>{
        if(isOpen){
            setIsOpen(false)
        }
    }

    const cardContent = (
            <article className={`${className} ${isOpen ? "open" : ""}`}
                onClick={handleClick}>
                {image && <img src={image} alt={title} />}
                {icon && <span>{icon}</span>}
                {title && <h3>{title}</h3>}
                {subtitle && <h4>{subtitle}</h4>}
                {content && <p>{content}</p>}
                
                <div className="card-socials">
                    {socials &&
                        ["instagram", "soundcloud", "website"].map((key)=>{ //On parcourt le tableau des socials, on définit la clé et récupère le lien correspondant
                            const url = socials[key as keyof typeof socials] //Pour éviter les erreurs TypeScript
                            if (!url) return null //S'il n'y a pas de lien, on ne retourne rien

                            let icon, label //On définit l'icone et le nom
                            switch (key) {
                                case "instagram":
                                    icon = <RiInstagramFill />
                                    label = 'Instagram'
                                    break
                                case "soundcloud":
                                    icon = <RiSoundcloudLine />
                                    label = 'Soundcloud'
                                    break
                                case "website":
                                    icon = <CiGlobe />
                                    label = 'Site web'
                                    break
                                default:
                                    return null
                            }

                        return ( //On crée le lien cliquable 
                            <a
                                key={key}
                                href={url}
                                target="_blank" //Dans un nouvel onglet
                                rel="noopener noreferrer" //Indique qu'il n'y a pas de relation entre les 2 sites (pour + de sécurité)
                                className="btn"
                                aria-label={label}
                                onClick={e => e.stopPropagation()} //Pour éviter le clic sur la carte globale
                            >
                                {icon}
                            </a>
                        )
                    })}
                </div>
            </article>
        )    

        if(isOpen){
            return(
                <article className={className}>
                    <button onClick={handleClose} className="btn">X</button>
                    {children}
                </article>
            )
        }
        return cardContent
}

export default Card 
