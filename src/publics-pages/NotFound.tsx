import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function NotFound() {
    const {t} = useTranslation()

    return(
        <>
        <Header />
        <main id="error">
            <div>
                <h1>{t("error.title")}</h1>
                <p>{t("error.message")}</p>
                <Link to="/">{t("error.homeLink")} ✨</Link>
            </div>          
        </main>
        <Footer />
        </>
    )
}
export default NotFound