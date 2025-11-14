import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"

const Album2023: React.FC = () => {
    const images = albums["okami_2023"]
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
        if (selectedIndex === null) return

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
                <h1>Souvenirs de l'édition 2023</h1>
                <div className="flyer">
                    <div>
                        <p>La deuxième édition du festival OKAMI a rassemblé encore plus de festivaliers et gagné en énergie, offrant des moments encore plus forts de musique, de rencontres et de convivialité.</p>
                        <p>Cet album retrace les temps forts du festival : les performances des artistes, les ateliers, les moments de partage et l’ambiance unique qui a marqué ces quelques jours. Une belle manière de revivre la magie de cette édition 2023.</p>
                    </div>
                    <img src="/affiche23.jpg" alt="Affiche Okami 2023" />
                </div>

                <div className="video-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Lc9sEFxK9Hc?si=8ihdj0LxmVEDTLOL" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
                </div>
            </main>
            <Footer />
            </>
            )
}

export default Album2023
