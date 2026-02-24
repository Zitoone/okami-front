import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"
import { useTranslation } from "react-i18next"

const Album2024: React.FC = () => {
    const { t } = useTranslation()
    const images = albums["okami_2024"]
    const [visibleCount, setVisibleCount] = useState(100)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
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
        setSelectedIndex((selectedIndex +1) % images.length)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const currentTouchEnd = e.changedTouches[0].clientX
        if (touchStart === null) return
        const distance = touchStart - currentTouchEnd
        if (distance > 50) {
            handleNext()
        }
        else if (distance < -50) {
            handlePrev()
        }
        setTouchStart(null)
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
                <h1>{t('albums.2024.title')}</h1>
                <div className="flyer">
                    <div>
                    <p>{t('albums.2024.description1')}</p>
                    <p>{t('albums.2024.description2')}</p>
                    <p>{t('albums.2024.description3')}</p>
                    <p>{t('albums.2024.description4')}</p>
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
                    <Button onClick={loadMore} className="form-btn btn">{t('albums.loadMore')}</Button>
                </div>
            )}

            {selectedIndex !== null && (
                <div className="lightbox" onClick={() => setSelectedIndex(null)}>
                    <div className="lightbox-content"
                        onClick={(e)=> e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button className="lightbox-btn prev" onClick={handlePrev} aria-label={t('albums.prevPhoto')}>‹</button>
                        <img src={images[selectedIndex]} alt={`Photo ${selectedIndex + 1}`} />
                        <button className="lightbox-btn next" onClick={handleNext} aria-label={t('albums.nextPhoto')}>›</button>
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
