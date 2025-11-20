import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"

const Album2024: React.FC = () => {
    const images = albums["okami_2024"]
    const [visibleCount, setVisibleCount] = useState(100)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const loadMore = () => {
    setVisibleCount((prev) => prev + 52)
    }

    const handleClick = (index: number) => {
        setSelectedIndex(index)
    }
    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation?.()
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex -1 + images.length) % images.length)
    }
    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation?.()
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex +1) % images.length)
    }

    useEffect(() => {
        if (selectedIndex === null) return // lightbox fermée

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev()
            else if (e.key === "ArrowRight") handleNext()
            else if (e.key === "Escape") setSelectedIndex(null)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedIndex])

    return(
        <>
        <Header />
        <main className="album-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2024</h1>
                <div className="flyer">
                    <div>
                    <p>Dernière danse sur les terres de Castelnau, berceau de notre aventure et témoin de tant de moments inoubliables.</p>
                    <p>C’est ici que tout a commencé, que les premiers sourires se sont échangés, que la musique a résonné jusque dans les étoiles.</p>
                    <p>Nous tenons à remercier du fond du cœur les propriétaires, pour leur accueil, leur confiance et leur soutien indéfectible.
                    Grâce à eux, la magie a pu opérer une fois encore, réunissant âmes, artistes et bénévoles autour de cette même énergie bienveillante et vibrante.</p>
                    <p>Castelnau restera à jamais gravé dans notre histoire</p>
                    </div>
                    <img src="/affiche24.webp" alt="Affiche Okami 2024" loading="lazy" />
                </div>    
            
                <div className="video-container">
                    <iframe src="https://www.youtube.com/embed/LF9PxP_JzfQ?si=7LDW9dVtIBy5ns9s" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>

            <div className="album">
                {images.slice(0, visibleCount).map((url, i) => (
                <img key={i} 
                    src={url} 
                    alt={`Photo ${i + 1}`}
                    loading="lazy" 
                    onClick={() => handleClick(i)}
                    />
                ))}
            </div>

            {visibleCount < images.length && (
                <div className="load-more">
                    <Button onClick={loadMore} className="form-btn btn">Voir plus</Button>
                </div>
            )}

            {selectedIndex !== null && (
                <div className="lightbox" onClick={() => setSelectedIndex(null)}>
                    <div className="lightbox-content" onClick={(e)=> e.stopPropagation()}>
                        <button className="lightbox-btn prev" onClick={handlePrev} aria-label="Photo précédente">‹</button>
                        <img src={images[selectedIndex]} alt={`Photo ${selectedIndex + 1}`} />
                        <button className="lightbox-btn next" onClick={handleNext} aria-label="Photo suivante">›</button>
                    </div>
                </div>       
        )}
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Album2024

