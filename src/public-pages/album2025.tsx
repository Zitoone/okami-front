import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"

const Album2025: React.FC = () => {
    const images = albums["okami_2025"]
    const [visibleCount, setVisibleCount] = useState(100)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    // Stocke la position X du début du swipe
    const [touchStart, setTouchStart] = useState<number | null>(null)

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
        setSelectedIndex((selectedIndex + 1) % images.length)
    }

    // Détecte le début du swipe et enregistre la position X de départ
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    // Détecte la fin du swipe et calcule la direction
    const handleTouchEnd = (e: React.TouchEvent) => {
        // Récupère la position X de fin du swipe (variable locale, pas state)
        const currentTouchEnd = e.changedTouches[0].clientX
        
        // Si pas de position de départ enregistrée, on annule
        if (touchStart === null) return

        // Calcule la distance horizontale du swipe (positif = gauche, négatif = droite)
        const distance = touchStart - currentTouchEnd

        // Si distance > 50px, c'est un swipe vers la gauche → image suivante
        if (distance > 50) {
            handleNext()
        }
        // Si distance < -50px, c'est un swipe vers la droite → image précédente
        else if (distance < -50) {
            handlePrev()
        }
        
        // Reset la position de départ pour le prochain swipe
        setTouchStart(null)
    }

    useEffect(() => {
        if(selectedIndex === null) return

            const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                handlePrev()
            } else if (e.key === 'ArrowRight') {
                handleNext()
            } else if (e.key === 'Escape') {
                setSelectedIndex(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedIndex])

    return(
        <>
        <Header />
        <main className='album-page'>
            <div className="main-wrap">
                <h1>Souvenirs de 2025</h1>

                <div className="flyer">
                    <div>
                        <p>2025 marque un nouveau chapitre pour OKAMI : un lieu inédit, des surprises à chaque coin et une énergie renouvelée qui a électrisé le public.</p>
                        <p>Avec ses deux scènes vibrantes, la Kidzone qui s’agrandit et la Healing Zone proposant un programme fabuleux, le festival a offert des expériences inédites et des moments de partage intenses. Entre performances captivantes, découvertes musicales et instants de détente, cette édition a créé de nouveaux souvenirs que personne n’est prêt d’oublier, inscrivant encore plus profondément OKAMI dans le cœur de ses festivaliers.</p>
                        <a href="https://2025.okamifestival.com/" target="_blank" rel="noopener noreferrer">Visite <span>ici </span>la première version de notre site crée cette année là</a>
                    </div>
                    <img src="/affiche25.webp" alt="Affiche Okami 2025" loading="lazy" /> 
                </div>

                <div className="soundcloud">
                    <iframe 
  width="100%" 
  height="120" 
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/okami-festival&color=%23ff5500&inverse=false&auto_play=false&show_user=true">
</iframe>
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
                        <div className="lightbox-content"
                            onClick={(e)=> e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
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

export default Album2025
