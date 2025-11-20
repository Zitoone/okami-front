import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from "../components/Card"

const Souvenir: React.FC=()=>{
    return (
        <>
        <Header />
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>Souvenirs des éditions passées</h1>
                <p>Depuis 2022, des images et vidéos vous racontent l’histoire de chaque édition. Plongez dans l’ambiance et revivez les moments forts du festival !</p>
            
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