import { useState, useEffect } from "react"
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
        <main className="album-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2024</h1>
                <p>Celle ci sera notre dernière édition à Castelnau, marquée par des violentes pluies à nouveau...</p>
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
    )
}

export default Album2024