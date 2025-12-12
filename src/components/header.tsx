import { NavLink, useLocation } from "react-router-dom" //Permet de détecter l'url actuel
import { TiThMenu } from "react-icons/ti";
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"
import Button from "./Button"

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const path = location.pathname
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen) //Change l'état du menu au clic

  useEffect(() => {
    const handleResize = () => { if (isMenuOpen) setIsMenuOpen(false) }
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(".navbar")
      const burger = document.querySelector(".burger")
      if (nav && !nav.contains(event.target as Node) && burger && !burger.contains(event.target as Node)) {
        setIsMenuOpen(false) //Fermer le menu si on clic en dehors
      }
    }
    const handleScroll = () => { if (isMenuOpen) setIsMenuOpen(false) }

    document.addEventListener("click", handleClickOutside)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => { //fonction de nettoyage
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  return (
    <header>
      <div className="container">
        <NavLink to="/"><img src="/logo.webp" alt="Logo Okami festival"/></NavLink>

        <div className="burger" onClick={toggleMenu} aria-label="Menu burger">
          <TiThMenu />
        </div>

        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/program"
                onClick={toggleMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {t("menu.program")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/participate"
                onClick={toggleMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {t("menu.participate")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                onClick={toggleMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {t("menu.faq")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/souvenir"
                onClick={toggleMenu}
                className={({ isActive }) => isActive || path.includes("album") ? "active" : ""}
              >
                {t("menu.souvenir")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {t("menu.contact")}
              </NavLink>
            </li>
          </ul>

{/* Boutons pour le menu en responsive */}
          <Button href="https://tinyurl.com/mrz6jv8v" className="btn buyTickets">
            {t("btnTickets")}
          </Button>

          <div className="language-switcher">
            <button onClick={() => i18n.changeLanguage("fr")} aria-label="Changer la langue en français">
              <ReactCountryFlag countryCode="FR" className="btn" aria-label="French" />
            </button>
            <button onClick={() => i18n.changeLanguage("en")} aria-label="Change language to English">
              <ReactCountryFlag countryCode="GB" className="btn" aria-label="English" />
            </button>
          </div> 
        </nav> 

{/* Boutons pour le header en mode desktop */}
        <Button href="https://tinyurl.com/mrz6jv8v" className="btn buyTickets">
          {t("btnTickets")}
        </Button>

        <div className="language-switcher">
          <button onClick={() => i18n.changeLanguage("fr")} aria-label="Changer la langue en français">
            <ReactCountryFlag countryCode="FR" className="btn" aria-label="French" />
          </button>
          <button onClick={() => i18n.changeLanguage("en")} aria-label="Change language to English">
            <ReactCountryFlag countryCode="GB" className="btn" aria-label="English" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
