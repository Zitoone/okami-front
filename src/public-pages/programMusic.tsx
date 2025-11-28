import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RiSoundcloudLine, RiInstagramFill } from "react-icons/ri"
import Button from "../components/Button"
import type { Artist } from '../types/Artist'
import { artistApi } from "../services/api"

const MusicProgram: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [openId, setOpenId] = useState<string | null>(null)

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const datas = await artistApi.getPublic()
                setArtists(datas)
            } catch (error) {
                console.error("Erreur lors du chargement des artistes :", error)
            }
        }
    fetchArtists()
    }, [])

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id))
    }


    return (
        <>
        <Header />
        <main className="program-music-page">
            <div className="main-wrap">
                <div>
                    <h1>Musiciens & DJs 2026</h1>
                    <p>Découvrez la sélection éclectique d'artistes qui feront vibrer les scènes Dolma et Selva. Des rythmes envoûtants des DJs aux performances live captivantes, chaque musicien apporte une énergie unique qui promet de transformer chaque instant en une expérience inoubliable. Préparez-vous à danser, à vous émerveiller et à vous connecter à travers la musique.</p>
                </div>

            <div className="artist-cards">
                {artists.length === 0 ? (
                    <p style={{textAlign: 'center', padding: '2rem'}}>Notre programmation démantielle arrive bientôt ! 🎵</p>
                ) : (
                    artists.map((artist) => {
                const isOpen = openId === artist._id
                return (
                    <article
                        key={artist._id}
                        className={`artist-card-page ${isOpen ? "open" : ""}`}
                        onClick={() => toggle(artist._id)} >
                    {isOpen ? (
                        <div className="card-description">
                            <button onClick={(e) => { e.stopPropagation(); toggle(artist._id) }} aria-label="Fermer">X</button>
                            <p>Aucune description disponible.</p>
                        </div>
                    ) : (
                        <>
                            <img
                            src={artist.promoPhoto || ''}
                            alt={artist.projectName || 'Artiste'}/>
                            <h3>{artist.projectName || 'Artiste'}</h3>
                            <span>{artist.musicalStyle || ""}</span>
                            <div className="card-socials">
                    {artist.socialLinks?.soundcloud && (
                        <Button onClick={(e) => { e.stopPropagation()
                            window.open(artist.socialLinks.soundcloud, '_blank')}} className="btn"><RiSoundcloudLine /> </Button>
)}
                    {artist.socialLinks?.instagram && (
                        <Button onClick={(e)=> { e.stopPropagation()
                            window.open(artist.socialLinks.instagram, '_blank')}} className="btn"><RiInstagramFill /> 
                        </Button>
)}

                </div>
                
                        </>
                    )}
                    
                    </article>
                )
                })
                )}
            </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default MusicProgram