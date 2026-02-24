import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import albums from "../data/albums.json"
import Button from "../components/Button"
import { useTranslation } from "react-i18next"

const Album2025: React.FC = () => {
    const { t } = useTranslation()
    const images = albums["okami_2025"]
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
        setSelectedIndex((selectedIndex + 1) % images.length)
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
                <h1>{t('albums.2025.title')}</h1>

                <div className="flyer">
                    <div>
                        <p>{t('albums.2025.description1')}</p>
                        <p>{t('albums.2025.description2')}</p>
                        <a href="https://2025.okamifestival.com/" target="_blank" rel="noopener noreferrer">{t('albums.2025.visitSite')} <span>{t('albums.2025.visitSiteLink')} </span>{t('albums.2025.visitSiteEnd')}</a>
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

export default Album2025
