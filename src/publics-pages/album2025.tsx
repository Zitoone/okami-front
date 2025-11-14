import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"

const Album2025: React.FC = () => {
    const images = albums["okami_2025"]
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
        setSelectedIndex((selectedIndex + 1) % images.length)
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
                <p>2025 marque un nouveau chapitre pour OKAMI : un lieu inédit, des surprises à chaque coin et une énergie renouvelée qui a électrisé le public. Avec ses deux scènes vibrantes, la Kidzone qui s’agrandit et la Healing Zone proposant un programme magnifique, le festival a offert des expériences inédites et des moments de partage intenses. Entre performances captivantes, découvertes musicales et instants de détente, cette édition a créé de nouveaux souvenirs que personne n’est prêt d’oublier, inscrivant encore plus profondément OKAMI dans le cœur de ses festivaliers.</p>
            </div>

                <div className="soundcloud">
                    <iframe 
                        width="100%" 
                        height="450" 
                        scrolling="no" 
                        frameBorder="no" 
                        allow="autoplay" 
                    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/okami-festival&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
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
                    <div className="lightbox-content" onClick={(e)=> e.stopPropagation()}>
                        <button className="lightbox-btn prev" onClick={handlePrev}>‹</button>
                        <img src={images[selectedIndex]} alt={`Photo ${selectedIndex + 1}`} />
                        <button className="lightbox-btn next" onClick={handleNext}>›</button>


                    </div>

            </div>
        )}

        </main>
        <Footer />
        </>
    
    )


}

export default Album2025
