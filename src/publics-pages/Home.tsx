import Seo from '../components/Seo'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { BsFillSpeakerFill, BsSpeaker } from "react-icons/bs"
import { FaShieldHeart } from "react-icons/fa6"
import { FaChild } from "react-icons/fa"
import { TbShoppingBagHeart } from "react-icons/tb"
import { MdNoFood } from "react-icons/md"
import { useState, useEffect } from 'react'
import Button from '../components/Button'

type Artist={
    _id: string
    personalInfo:{
        projectName?: string
        pics?: string
        socials?: string
    }
    adminInfo:{
        style?: string
    }}

const Home: React.FC=()=>{

    const[artists, setArtists]=useState<Artist[]>([])

    useEffect(()=>{
        const fetchArtists=async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}artists/public`)
            const data = await res.json()
            setArtists(data)
        } catch (error) {
            console.log("Erreur lors du chargement des artistes :", error)
        }
    }
        fetchArtists()
        },[]
    )

    return(
        <>
            <Seo
            titleKey="home.title"
            descriptionKey="home.description"
            keywordsKey="home.keywords"
            ogTitleKey="home.ogTitle"
            ogDescriptionKey="home.ogDescription"
            ogImage="https://www.okamifestival.com/images/festival-banner.jpg"
            ogUrl="https://www.okamifestival.com"
            ogType="website"
            ogSiteName="OKAMI Festival" />

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
                </section>

                <section id='after-movie'>
                    <h2>Revis l’énergie vibrante de l’Okami Festival</h2>

                    <div className='video-container'>
                        <iframe /* width="560" height="315"  */src="https://www.youtube.com/embed/LF9PxP_JzfQ?si=OP-m0yOH5QOxWvwO&amp;start=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
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
                    <Carousel autoPlayDelay={3000} loop={artists.length > 2} showPagination={false} showNavigation={true}>
                        {artists?.map((artist)=>(
                            <Card className={"artist-card"}
                            key={artist._id}
                            url={`/program`}
                            title={artist.personalInfo?.projectName || 'Artiste'}
                            content={artist.adminInfo?.style || ''}
                            image={ artist.personalInfo?.pics
    ? `${import.meta.env.VITE_APP_API_URL}${artist.personalInfo.pics}`
    : ''}
                            socials={artist.personalInfo?.socials}
                            />
                        ))}
                    </Carousel>
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
                    <div />
                    <span>
                    <p>Revivez les moments forts des précédentes éditions à travers nos aftermovies et galeries photos.</p>
                    <Button to="/editions" className="btn">Flashback en images</Button>
                    </span>
                </section>

            </main>
        </>
    )
}

export default Home

//TODO: Revoir le style des cards dans le carousel