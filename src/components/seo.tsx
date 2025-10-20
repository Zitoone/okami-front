import React from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

type SeoProps = {
    titleKey: string
    descriptionKey: string
    keywordsKey?: string
    ogTitleKey?: string
    ogDescriptionKey?: string
    ogImage?: string
    ogUrl?: string
    ogType?: string
    ogSiteName?: string
}

const Seo: React.FC<SeoProps> = ({
    titleKey,
    descriptionKey,
    keywordsKey,
    ogTitleKey,
    ogDescriptionKey,
    ogImage,
    ogUrl,
    ogType,
    ogSiteName,
}) => {
    const { t } = useTranslation()

    const jsonLdEvent = {
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        "name": "OKAMI Festival 2026",
        "startDate": "2026-06-10",
        "endDate": "2026-06-14",
        "location": {
            "@type": "Place",
            "name": "Saint Christaud",
            "address": "Saint Christaud, 31, France"
        }
    }

    return (
        <Helmet>
            <title>{t(titleKey)}</title>
            <meta name="description" content={t(descriptionKey)} />
            {keywordsKey && <meta name="keywords" content={t(keywordsKey)} />}
            {ogTitleKey && <meta property="og:title" content={t(ogTitleKey)} />}
            {ogDescriptionKey && <meta property="og:description" content={t(ogDescriptionKey)} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {ogType && <meta property="og:type" content={ogType} />}
            {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
            <script type="application/ld+json">
                {JSON.stringify(jsonLdEvent)}
            </script>
        </Helmet>
    )
}

export default Seo
