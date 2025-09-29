import {useTranslation} from 'react-i18next'

function Privacy(){
   const {t} = useTranslation()

   return(
      <main id='privacyPolicy'>
         <h1>{t("privacy.title")}</h1>

      </main>
   )
}