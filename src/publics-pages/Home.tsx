import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { BsFillSpeakerFill, BsSpeaker } from "react-icons/bs"
import { FaShieldHeart } from "react-icons/fa6"
import { FaChild } from "react-icons/fa"
import { TbShoppingBagHeart } from "react-icons/tb"
import { MdNoFood } from "react-icons/md"
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import Countdown from '../components/Countdown'
import type { Artist } from '../types/Artist'

const Home: React.FC=()=>{

    const[artists, setArtists]=useState<Artist[]>([])

    useEffect(()=>{
        const fetchArtists=async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}artists/public`)
            const data = await res.json()
            console.log("Données reçues:", data)
            setArtists(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log("Erreur lors du chargement des artistes :", error)
        }
    }
        fetchArtists()
        },[]
    )

    return(
        <>
        <Header />
        <main id='main-home'>
                <section className='hero'>
                    
                    <article>                       
                        <img src="/face.jpg" alt="Image Flyer Okami Festival 2026" />
                        <div>
                            <h1>Bienvenue sur le site du festival OKAMI</h1>
                        <span>3 - 7 JUIN 2026</span>
                        <h2>Ou la music et la nature se rencontrent</h2>
                        <p>Cinq jours d’expérience unique en pleine nature, bercés par le son de la rivière et les vibrations de la musique électronique.
Un lieu où se rencontrent l’art, le bien-être et la créativité : espaces détente, healing zone, kids-zone, spectacles vivants, performances artistiques et artisanat local.
Une aventure humaine et sensorielle à vivre ensemble, entre fête, partage et reconnexion à l’essentiel.</p>
                        </div>
                    </article>
                    <Countdown targetDate="2026-06-03T14:30:00" />
                </section>

                <section id='after-movie'>
                    <h2>Revis l’énergie vibrante de l’Okami Festival</h2>

                    <div className='video-container'>
                        <iframe src="https://www.youtube.com/embed/LF9PxP_JzfQ?si=OP-m0yOH5QOxWvwO&amp;start=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                </section>

                <section id='spaces'>
                    <h2>Explore nos espaces sacrés</h2>
                        <div>
                            <Card url={`/program`} title='Scène DOMA' content='Viens découvrir la scène principale ' icon={<BsFillSpeakerFill />} className='space-card'></Card>
                            <Card url={`/program`} title='Scène SELVA' content="Scène dédiée à la musique downtempo, live, organique, ethnique. " icon={<BsSpeaker />} className='space-card'></Card>
                            <Card url={`/program`} title="Espace bien être" content="Un sanctuaire ton esprit, ton corps et ton âme" icon={<FaShieldHeart />} className='space-card'></Card>
                            <Card url={`/program`} title="Kidzone" content="L'univers des enfants pour des aventures créatives amusantes" icon={<FaChild />} className='space-card'></Card>
                            <Card url={`/program`} title="Marché artisanal" content="Artisans créatifs sélectionnés avec soin" icon={<TbShoppingBagHeart />} className='space-card'></Card>
                            <Card url={`/program`} title="Bar et restauration" content="2 bars et un espace pour vous restaurer pendant toute la durée du festival" icon={<MdNoFood />} className='space-card'></Card>
                        </div>
                </section>

                <section id='lineup'>
                    <div>
                        <h2>Line Up 2026</h2>
                        <p>Programmation démentielle à venir</p>
                        {artists.length === 0 ? (
                            <p style={{textAlign: 'center', padding: '2rem'}}>Aucun artiste pour le moment. La programmation arrive bientôt ! 🎵</p>
                        ) : (
                        <Carousel autoPlayDelay={3000} loop={artists.length > 2} showPagination={false} showNavigation={true} activateZoom={false}>
                        {artists.map((artist)=>(
                            <Card className={"artist-card"}
                            key={artist._id}
                            url={`/program/music`}
                            title={artist.projectName || 'Artiste'}
                            content={artist.musicalStyle || ''}
                            image={artist.promoPhoto ? `http://localhost:5001/${artist.promoPhoto}` : ''}
                            socials={artist.socialLinks?.instagram || artist.socialLinks?.soundcloud || ''}
                            />
                        ))}
                        </Carousel>
                        )}
                    </div>
                </section>

                <section id='participate'>
                    <h2>Participer</h2>
                    <div>
                        <img src="/participer.jpg" alt="Photo d'un volontaire sur un tracteur à l'édition 2023 du festival Okami" />
                        <span>
                            <p>Implique toi pleinement en rejoignant notre équipe de bénévoles, ou notre team restauration ou encore nos performers.</p>
                            <Button to="/participate" className="btn">En savoir plus</Button>
                        </span>
                    </div>


                </section>

                <section id='editions'>
                    <h2>Au fil des éditions</h2>
                    <div/>
                    <span>
                        <p>Revivez les moments forts des précédentes éditions à travers nos aftermovies et galeries photos.</p>
                        <Button to="/souvenir" className="btn">Flashback en images</Button>
                    </span>
                </section>

        </main>
        <Footer />
        </>
    )
}

export default Home