import {useTranslation} from 'react-i18next'

function Legal(){
   const {t} = useTranslation()

   return(
      <main id='legalNotice'>
         <h1>{t("legal.title")}</h1>

         <h2>{t("legal.siteEdit")}</h2>

         <dl>
            <dt>{t("legal.association")}</dt>
            <dd>{t("legal.name")}</dd>
            <dd>{t("legal.address")}</dd>
            <dd>{t("legal.email")}</dd>
            <dd>{t("legal.phone")}</dd>
            <dd>{t("legal.siret")}</dd>
         </dl>
         <dl>
            <dt>{t("legal.publicationDirector")}</dt>
            <dd>Olivia Nanquette</dd>
         </dl>
         <dl>
            <dt>{t("legal.hosting")}</dt>
            <dd>{t("legal.hostName")}</dd>
         </dl>

         <h2>{t("legal.personalDataTitle")}</h2>
         <dl>
            <dt>{t("legal.personalDataSubtitle")}</dt>
            <dd>{t("legal.personalDataContent1")}</dd>
            <dd>{t("legal.personalDataContent2")}</dd>
            <dd>{t("legal.personalDataContent3")}</dd>
         </dl>

         <dl>
            <dt>{t("legal.cookiesTitle")}</dt>
            <dd>{t("legal.cookiesContent1")}</dd>
            <dd>{t("legal.cookiesContent2")}</dd>
         </dl>

         <h2>{t("legal.intellectualPropertyTitle")}</h2>
         <p>{t("legal.intellectualPropertyContent")}</p>




        <h2>{t("legal.responsibilityTitle")}</h2>
         <p>{t("legal.responsibilityContent")}</p>

        <h2>{t("legal.contactTitle")}</h2>
         <p>{t("legal.contactContent")}</p>
      </main>
   )
}
export default Legal