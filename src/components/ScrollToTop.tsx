import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0) //Fonction native du navigateur qui scroll la page en haut a gauche (0,0)
    }, [pathname]) // L'effet est déclenché à chaque changement de page

    return null
}

export default ScrollToTop
