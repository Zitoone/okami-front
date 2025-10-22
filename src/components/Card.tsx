import { Link } from "react-router-dom"
import Button from '../components/Button'
import { RiSoundcloudLine, RiInstagramFill } from "react-icons/ri"
import { useState } from "react"

type CardProps={
    className?: string,
    url?: string
    title: string,
    icon?: React.ReactNode,
    subtitle?: string,
    image?:string,
    content?: string,
    socials?: string,
    children?: React.ReactNode,
    isOpen?: boolean
    
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
    /* isOpen */
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    }
    const handleClick = () =>{
        if(url) return
        setIsOpen(!isOpen)
    }
    const handleClose = () =>{
        if(isOpen){
            setIsOpen(false)
        }
    }

    const cardContent = (
            <article className={`${className} ${isOpen ? "open" : ""}`} onClick={handleClick} onClick={handleClick}>
                {image && <img src={image} alt={title} />}
                {icon && <span>{icon}</span>}
                {title && <h3>{title}</h3>}
                {subtitle && <h4>{subtitle}</h4>}
                {content && <p>{content}</p>}
                
                <div className="card-socials">
                    {socials?.includes("soundcloud") && (
                        <button onClick={()=>handleSocialClick(socials)} className="btn">
                            <RiSoundcloudLine /> 
                        </button>
                    )}
                    {socials?.includes("instagram") && (
                        <Button onClick={()=>handleSocialClick(socials)} className="btn">
                            <RiInstagramFill /> 
                        </Button>
                    )}
                    
                </div>
            </article>
        )    
        if (url) {
            return <Link to={url}>{cardContent}</Link>
        }

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
