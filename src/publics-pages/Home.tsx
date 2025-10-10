import Seo from '../components/Seo'
import { GiComputerFan } from "react-icons/gi"

const Home: React.FC=()=>{
    return(
        <>
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

            <main>
                <h1>Bienvenue sur le site du festival OKAMI</h1>
                <h2><GiComputerFan /> Site en construction <GiComputerFan /></h2>
            </main>
        </>
    )
}

export default Home