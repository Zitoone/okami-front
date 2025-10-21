import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

function NotFound() {
    const {t} = useTranslation()

    return(
        <main id="error">
            <div>
                <h1>{t("error.title")}</h1>
                <p>{t("error.message")}</p>
                <Link to="/">{t("error.homeLink")} ✨</Link>
            </div>          
        </main>
    )
}
export default NotFound