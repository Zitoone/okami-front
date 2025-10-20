import { Link } from "react-router-dom"
import { RiSoundcloudLine, RiInstagramFill } from "react-icons/ri"

type CardProps={
    className?: string,
    url?: string
    title: string,
    icon?: React.ReactNode,
    subtitle?: string,
    image?:string,
    content: string,
    socials?: string,
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
    children
}) => {
    const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    }
    const cardContent = (
            <article className={className}>
                {image && <img src={image} alt={title} />}
                {icon && <span>{icon}</span>}
                {title && <h3>{title}</h3>}
                {subtitle && <h4>{subtitle}</h4>}
                {content && <p>{content}</p>}
                <div className="card-socials">
                    {socials?.includes("soundcloud") && (
                        <button onClick={()=>handleSocialClick(socials)}>
                            <RiSoundcloudLine /> 
                        </button>
                    )}
                    {socials?.includes("instagram") && (
                        <button onClick={()=>handleSocialClick(socials)}>
                            <RiInstagramFill /> 
                        </button>
                    )}
                </div>

                {children && <div>{children}</div>}
            </article>
        )    
        if (url) {
            return <Link to={url}>{cardContent}</Link>
        }
        return cardContent
}

export default Card

// Toutes les cards doivent être cliquables