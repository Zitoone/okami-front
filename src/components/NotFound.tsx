import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

export default function Error() {
    const {t} = useTranslation()

    return(
        <div id='error'>
            <div>
            <h1>{t("error.title")}</h1>
            <p>{t("error.message")}</p>
            <Link to="/">{t("error.homeLink")} ✨</Link>
            </div>
        </div>
    )
}