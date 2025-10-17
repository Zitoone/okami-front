import { Link } from "react-router-dom"

type CardProps={
    url?: string
    title: string,
    icon?: React.ReactNode,
    subtitle?: string,
    image?:string,
    content: string,
/*     links?: {
        url: string,
        label?: string,
        icon?: React.ReactNode
    }[] */
    children?: React.ReactNode,
    
}

const Card: React.FC<CardProps> = ({
    url,
    title,
    subtitle,
    image,
    icon,
    content,
    /* links, */
    children
}) => {
    const cardContent = (
            <article className="card">
                {image && <img src={image} alt={title} />}
                {icon && <span>{icon}</span>}
                {title && <h3>{title}</h3>}
                {subtitle && <h4>{subtitle}</h4>}
                {content && <p>{content}</p>}
                {/* {links && <Link to={links}></Link> } */}

                {children && <div>{children}</div>}
            </article>
        )    
        if (url) {
            return <Link to={url}>{cardContent}</Link>
        }
}

export default Card

// Toutes les cards doivent être cliquables