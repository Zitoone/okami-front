import Seo from '../components/Seo'

const Home: React.FC=()=>{
    return(
        <Seo
        titleKey="home.title"
        descriptionKey="home.description"
        keywordsKey="home.keywords"
        ogTitleKey="home.ogTitle"
        ogDescriptionKey="home.ogDescription"
        ogImage="https://www.okamifestival.com/images/festival-banner.jpg"
        ogUrl="https://www.okamifestival.com"
        ogType="website"
        ogSiteName="OKAMI Festival" />
    )
}

export default Home