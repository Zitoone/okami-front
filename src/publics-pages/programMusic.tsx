import Card from "../components/Card"
import { useState, useEffect } from "react"

type Artist={
    _id: string
    personalInfo:{
        projectName?: string
        pics?: string
        socials?: string
    }
    adminInfo:{
        style?: string
        descriptionFr?: string
    }}

const MusicProgram: React.FC=() => {
        const[artists, setArtists]=useState<Artist[]>([])
        
    
        useEffect(()=>{
            const fetchArtists=async()=>{
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
            },[]
        )

    return (
        <main className="program-music-page">
            <div>
                <h1>Musiciens & DJs 2026</h1>
                <p>Découvrez la sélection éclectique d'artistes qui feront vibrer les scènes Dolma et Selva. Des rythmes envoûtants des DJs aux performances live captivantes, chaque musicien apporte une énergie unique qui promet de transformer chaque instant en une expérience inoubliable. Préparez-vous à danser, à vous émerveiller et à vous connecter à travers la musique.</p>
            </div>

            <div className="artist-cards">
                {artists.map((artist)=>(
                    <Card
                        className="artist-card-page"
                        key={artist._id}
                        title={artist.personalInfo?.projectName || 'Artiste'}
                        socials={artist.personalInfo?.socials}
                        subtitle={artist.adminInfo?.style || ""}
                        image={artist.personalInfo?.pics ? `${import.meta.env.VITE_APP_API_URL}${artist.personalInfo.pics}`: ''
                        }
                        /* isOpen={false} */
                        children={artist.adminInfo?.descriptionFr || "Aucune  description disponible."}
                    >
                    </Card>
))}
            </div>
            {/* <Construction /> */}
        </main>
                
    )
}

export default MusicProgram

//TODO: const isOpen pour changer la class