import React, { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from "../components/Carousel"
import albums from "../data/albums.json"

const Album2023v1: React.FC = () => {
    const images = albums["okami_2023"]
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
    setSelectedIndex(index)
    }

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation?.()
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation?.()
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex + 1) % images.length)
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



    return (
        <>
        <Header />
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2023</h1>
                <p>
                Revivez les moments forts de l'édition 2023 du festival OKAMI à travers cette sélection
                d'images et de vidéos capturant l'ambiance unique de l'événement.
                </p>

        <div className="album-carousel">
            <Carousel autoPlayDelay={3000} loop={true} showNavigation={true}>
            {images.map((url, i) => (
                <img
                key={i}
                src={url}
                alt={`Photo ${i + 1}`}
                onClick={() => handleClick(i)}
                style={{ cursor: "pointer" }}
                />
            ))}
            </Carousel>
        </div>

        {/* LIGHTBOX avec navigation */}
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

export default Album2023v1
