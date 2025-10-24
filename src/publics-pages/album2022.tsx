import Carousel from "../components/Carousel";
import Construction from "../components/Construction";

const Album2022: React.FC=()=>{
    return (
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2022</h1>
                <p>Revivez les moments forts de l'édition 2022 du festival OKAMI à travers cette sélection d'images et de vidéos capturant l'ambiance unique de l'événement.</p>
            
                <div className="album-2022-carousel">
                    <Construction/>

                </div>
            </div>
        </main>
    )
}
export default Album2022