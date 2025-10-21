import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

function Construction() {
    const {t} = useTranslation()

    return(
        <main id="construction">
            <div >
                <h1>{t("construction.title")}</h1>
                <p>{t("construction.message")}</p>
                <Link to="/">{t("construction.homeLink")} ✨</Link>
            </div>          
        </main>
    )
}
export default Construction