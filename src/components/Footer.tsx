import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

function Footer(){
    const {t} = useTranslation()

    return(
        <footer>
            <div className='container'>
                <Link to="/"><img src='/logo.png' alt="Logo Okami festival" /></Link>
                <div className='legal'>
                    <Link to="/legal">{t("footer.link")}</Link>
                    <p>© OKAMI Festival</p>
                </div>

                <div className='social'>
                    <Link to="https://www.facebook.com/profile.php?id=100083597941322" target='_blank' aria-label="Visitez notre page Facebook"><FaFacebook /></Link>
                    <Link to="https://www.instagram.com/okami_festival/" target='_blank' aria-label="Visitez notre page Instagram"><FaInstagramSquare /></Link>
                    <Link to='/contact' aria-label="Nous contacter par email"><MdOutlineMail /></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer