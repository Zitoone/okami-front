import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from "../components/Card"
import { useTranslation } from "react-i18next"

const Souvenir: React.FC=()=>{
    const { t } = useTranslation()
    return (
        <>
        <Header />
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>{t('albums.title')}</h1>
                <p>{t('albums.intro')}</p>
            
                <div className="editions-cards">
                    <Card 
                        url={"/souvenir/2022"} 
                        title="2022" 
                        image="/couv22.webp"
                        className="souvenir-card"
                    ></Card>                   

                    <Card 
                        url={"/souvenir/2023"} 
                        title="2023" 
                        image="/couv2023.webp"
                        className="souvenir-card"
                    ></Card>

                    <Card 
                        url={"/souvenir/2024"} 
                        title="2024" 
                        image="/love2024.webp"
                        className="souvenir-card"
                        
                    ></Card>

                    <Card 
                        url={"/souvenir/2025"} 
                        title="2025" 
                        image="/doma.webp"
                        className="souvenir-card"
                    ></Card>




                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}
export default Souvenir

//TODO : Faire une partie Présentation association, équipe, valeurs
