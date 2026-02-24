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
import { artistApi } from '../services/api'
import { useTranslation } from 'react-i18next'

const Home: React.FC=()=>{
    const { t } = useTranslation()
    const[artists, setArtists]=useState<Artist[]>([])

    useEffect(()=>{
        const fetchArtists=async()=>{
        try {
            const datas = await artistApi.getPublic()
        
            setArtists(Array.isArray(datas) ? datas : [])
        } catch (error) {
            console.error("Erreur lors du chargement des artistes :", error)
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
                            <img src="/avatar.webp" alt="Image Flyer Okami Festival 2026" fetchPriority="high" />
                            <div>
                                <h1>{t('homepage.hero.title')}</h1>
                            <span>{t('homepage.hero.dates')}</span>
                            <h2>{t('homepage.hero.subtitle')}</h2>
                            <p>{t('homepage.hero.description')}</p>
                            <p>{t('homepage.hero.disclaimer')}</p>
                            <a href="https://www.okamifestival.com/" target='_blank' aria-label="Visitez le site officiel de l'Okami">{t('homepage.hero.officialSite')}</a>
                            </div>
                        </article>
                        <Countdown targetDate="2026-06-03T14:30:00" />
                    </section>

                    <section id='after-movie'>
                        <h2>{t('homepage.afterMovie.title')}</h2>

                        <div className='video-container'>
                            <iframe src="https://www.youtube.com/embed/LF9PxP_JzfQ?si=OP-m0yOH5QOxWvwO&amp;start=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                    </section>

                    <section id='spaces'>
                        <h2>{t('homepage.spaces.title')}</h2>
                            <div>
                                <Card url={`/program/music`} title={t('homepage.spaces.doma.title')} content={t('homepage.spaces.doma.description')} icon={<BsFillSpeakerFill />} className='space-card'></Card>
                                <Card url={`/program/music`} title={t('homepage.spaces.selva.title')} content={t('homepage.spaces.selva.description')} icon={<BsSpeaker />} className='space-card'></Card>
                                <Card url={`/program/healing`} title={t('homepage.spaces.healing.title')} content={t('homepage.spaces.healing.description')} icon={<FaShieldHeart />} className='space-card'></Card>
                                <Card url={`/program/kidzone`} title={t('homepage.spaces.kidzone.title')} content={t('homepage.spaces.kidzone.description')} icon={<FaChild />} className='space-card'></Card>
                                <Card url={`/program`} title={t('homepage.spaces.market.title')} content={t('homepage.spaces.market.description')} icon={<TbShoppingBagHeart />} className='space-card'></Card>
                                <Card url={`/program`} title={t('homepage.spaces.food.title')} content={t('homepage.spaces.food.description')} icon={<MdNoFood />} className='space-card'></Card>
                            </div>
                    </section>

                    <section id='lineup'>
                        <div>
                            <h2>{t('homepage.lineup.title')}</h2>
                            {artists.length === 0 ? (
                                <p style={{textAlign: 'center', padding: '2rem'}}>{t('homepage.lineup.comingSoon')}</p>
                            ) : (
                            <Carousel autoPlayDelay={3000} loop={artists.length > 2} showPagination={false} showNavigation={true}>
                            {artists.map((artist)=>(
                                <Card className={"artist-card"}
                                key={artist._id}
                                url={`/program/music`}
                                title={artist.projectName || 'Artiste'}
                                content={artist.musicalStyle || ''}
                                image={artist.promoPhoto || ''}
                                />
                            ))}
                            </Carousel>
                            )}
                        </div>
                    </section>

                    <section id='participate'>
                        <h2>{t('homepage.participate.title')}</h2>
                        <div>
                            <img src="/participer.webp" alt="Photo d'un volontaire sur un tracteur à l'édition 2023 du festival Okami" loading="lazy" />
                            <span>
                                <p>{t('homepage.participate.description')}</p>
                                <Button to="/participate" className="btn">{t('btn.learnMore')}</Button>
                            </span>
                        </div>
                    </section>

                    <section id='editions'>
                        <h2>{t('homepage.editions.title')}</h2>
                        <div/> 
                        <span>
                            <p>{t('homepage.editions.description')}</p>
                            <Button to="/souvenir" className="btn">{t('btn.flashback')}</Button>
                        </span>
                    </section>

            </main>
            <Footer />
        </>
    )
}

export default Home
