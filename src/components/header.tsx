import { Link, NavLink } from "react-router-dom"
import { TiThMenu } from "react-icons/ti";
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"
import Button from "./button"

function Header() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(".navbar")
      const burger = document.querySelector(".burger")
      if (nav && !nav.contains(event.target as Node)&& burger && !burger.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <div className="container">
      <Link to="/"><img src="/logo.png" alt="Logo Okami festival" /></Link>

      <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <TiThMenu />
      </div>
      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/" onClick={toggleMenu}>{t("menu.home")}</NavLink></li>
          <li><NavLink to="/program" onClick={toggleMenu}>{t("menu.program")}</NavLink></li>
          <li><NavLink to="/participate" onClick={toggleMenu}>{t("menu.participate")}</NavLink></li>
          <li><NavLink to="/faq" onClick={toggleMenu}>{t("menu.faq")}</NavLink></li>
          <li><NavLink to="/souvenir" onClick={toggleMenu}>{t("menu.souvenir")}</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>{t("menu.contact")}</NavLink></li>
        </ul>
      </nav> 

      <Button href="https://www.helloasso.com/associations/attrape-reve-31/formulaires/1" className="btn buyTickets">
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
