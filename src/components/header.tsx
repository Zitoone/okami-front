import { NavLink, useLocation } from "react-router-dom"
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => { if (isMenuOpen) setIsMenuOpen(false) }
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(".navbar")
      const burger = document.querySelector(".burger")
      if (nav && !nav.contains(event.target as Node) && burger && !burger.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    const handleScroll = () => { if (isMenuOpen) setIsMenuOpen(false) }

    document.addEventListener("click", handleClickOutside)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  return (
    <header>
      <div className="container">
        <NavLink to="/"><img src="/logo.png" alt="Logo Okami festival" /></NavLink>

        <div className="burger" onClick={toggleMenu}>
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
        </nav> 

        <Button href="https://tinyurl.com/mrz6jv8v" className="btn buyTickets">
          {t("btnTickets")}
        </Button>

        <div className="language-switcher">
          <button onClick={() => i18n.changeLanguage("fr")} >
            <ReactCountryFlag countryCode="FR" className="btn" aria-label="French" />
          </button>
          <button onClick={() => i18n.changeLanguage("en")}>
            <ReactCountryFlag countryCode="GB" className="btn" aria-label="English" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
