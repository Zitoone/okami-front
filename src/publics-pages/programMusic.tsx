import { useState, useEffect } from "react"
import { RiSoundcloudLine, RiInstagramFill } from "react-icons/ri"
import Button from "../components/Button"

type Artist = {
    _id: string
    personalInfo: {
        projectName?: string
        pics?: string
        socials?: string
    }
    adminInfo: {
        style?: string
        descriptionFr?: string
    }
}

const MusicProgram: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [openId, setOpenId] = useState<string | null>(null)

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/public`)
                const data = await res.json()
                console.log("Données reçues :", data)
                setArtists(data)
            } catch (error) {
                console.log("Erreur lors du chargement des artistes :", error)
            }
        }
    fetchArtists()
    }, [])

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id))
    }
    const handleSocialClick = (socials: string, type: string) => {
        const urls = socials.split(',').map(s => s.trim())
        const url = urls.find(u => u.includes(type))
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <main className="program-music-page">
            <div>
                <h1>Musiciens & DJs 2026</h1>
                <p>Découvrez la sélection éclectique d'artistes qui feront vibrer les scènes Dolma et Selva. Des rythmes envoûtants des DJs aux performances live captivantes, chaque musicien apporte une énergie unique qui promet de transformer chaque instant en une expérience inoubliable. Préparez-vous à danser, à vous émerveiller et à vous connecter à travers la musique.</p>
            </div>

            <div className="artist-cards">
                {artists.map((artist) => {
                const isOpen = openId === artist._id
                return (
                    <article
                        key={artist._id}
                        className={`artist-card-page ${isOpen ? "open" : ""}`}
                        onClick={() => toggle(artist._id)} >
                    {!isOpen ? (
                        <>
                            <img
                            src={artist.personalInfo?.pics ?`${import.meta.env.VITE_APP_API_URL}${artist.personalInfo.pics}`: ''}
                            alt={artist.personalInfo?.projectName || 'Artiste'}/>
                            <h3>{artist.personalInfo?.projectName || 'Artiste'}</h3>
                            <span>{artist.adminInfo?.style || ""}</span>
                            <div className="card-socials">
                    {artist.personalInfo?.socials?.includes("soundcloud") &&(                       <Button onClick={(e) => { e.stopPropagation()
                    handleSocialClick(artist.personalInfo.socials, "soundcloud")}} className="btn"><RiSoundcloudLine /> </Button>
)}
                    {artist.personalInfo?.socials?.includes("instagram") && (
                        <Button onClick={(e)=> { e.stopPropagation()
handleSocialClick(artist.personalInfo.socials, "instagram")}} className="btn"><RiInstagramFill /> 
                        </Button>
)}
                </div>
                        </>
                    ) : (
                        <div className="card-description">
                            <button onClick={(e) => { e.stopPropagation(); toggle(artist._id) }}>X</button>
                            <p>{artist.adminInfo?.descriptionFr || "Aucune description disponible."}</p>
                        </div>
                    )}
                    </article>
                )
                })}
            </div>
        </main>
    )
}

export default MusicProgram

//Revoir le comportement au clik des card
