import Seo from '../components/Seo'
import Card from '../components/Card'
import { BsFillSpeakerFill, BsSpeaker } from "react-icons/bs"
import { FaShieldHeart } from "react-icons/fa6"
import { FaChild } from "react-icons/fa"
import { TbShoppingBagHeart } from "react-icons/tb"
import { MdNoFood } from "react-icons/md"


const Home: React.FC=()=>{
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
                    <div className='hero-img' />
                    <div className='hero-text'>
                    <h1>Bienvenue sur le site du festival OKAMI</h1>
                    <span>3 - 7 JUIN 2026</span>
                    
                    <h2>Ou la music et la nature se rencontrent</h2>
                    <p>Cinq jours d’expérience unique en pleine nature, bercés par le son de la rivière et les vibrations de la musique électronique.
Un lieu où se rencontrent l’art, le bien-être et la créativité : espaces détente, healing zone, kids-zone, spectacles vivants, performances artistiques et artisanat local.
Une aventure humaine et sensorielle à vivre ensemble, entre fête, partage et reconnexion à l’essentiel.</p>

                    </div>
                </section>

                <section id='after-movie'>
                    <h2>Revis l’énergie vibrante de l’Okami Festival</h2>

                    <div className='video-container'>
                        <iframe /* width="560" height="315"  */src="https://www.youtube.com/embed/LF9PxP_JzfQ?si=OP-m0yOH5QOxWvwO&amp;start=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                </section>

                <section id='spaces'>
                    <h2>Explore nos espaces sacrés</h2>
                        <div className='spaces-card'>
                    <Card url={`/program`} title='Scène DOMA' content='Viens découvrir la scène principale ' icon={<BsFillSpeakerFill />} ></Card>
                    <Card url={`/program`} title='Scène SELVA' content="Ici l'accent sera mis sur le downtempo et la musique live " icon={<BsSpeaker />}></Card>
                    <Card url={`/program`} title="Espace bien être" content="Un sanctuaire ton esprit, ton corps et ton âme" icon={<FaShieldHeart />}></Card>
                    <Card url={`/program`} title="Kidzone" content="L'univers des enfants pour des aventures créatives amusantes" icon={<FaChild />}></Card>
                    <Card url={`/program`} title="Marché artisanal" content="Artisans créatifs sélectionnés avec soin" icon={<TbShoppingBagHeart />}></Card>
                    <Card url={`/program`} title="Bar et restauration" content="2 bars et un espace pour vous restaurer pendant toute la durée du festival" icon={<MdNoFood />}></Card>

                    </div>
                </section>

                <section id='lineup'>
                    <h2>Line Up 2026</h2>
                    <p>Programmation démentielle à venir</p>

                </section>

                <section id='participate'>
                    <h2>Participer</h2>

                </section>

                <section>
                    <h2>Au fil des éditions</h2>
                </section>





            </main>
        </>
    )
}

export default Home