import { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!showButton) return null

    return (
        <button 
            onClick={scrollToTop}
            className='scroll-top-btn'
            aria-label="Retour en haut"
        >
            ↑
        </button>
    )
}

export default ScrollToTopButton
