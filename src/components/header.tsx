import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

function Header() {
  const { t, i18n } = useTranslation();

  return (
    <header>
        <h1>{t("welcome")}</h1>
      <nav>
        
        <button onClick={() => i18n.changeLanguage("fr")} ><ReactCountryFlag countryCode="FR" className="emojiFlag" aria-label="French" /></button>
        <button onClick={() => i18n.changeLanguage("en")}><ReactCountryFlag countryCode="GB" className="emojiFlag" aria-label="English" /></button>
      </nav>
      <ul>
        <li>{t("menu.home")}</li>
        <li>{t("menu.about")}</li>
      </ul>
    </header>
  );
}

export default Header;
