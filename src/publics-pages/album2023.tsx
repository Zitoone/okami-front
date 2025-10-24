import Carousel from "../components/Carousel"
import albums from "../data/albums.json"

const Album2023: React.FC=()=>{
    return (
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2023</h1>
                <p>Revivez les moments forts de l'édition 2023 du festival OKAMI à travers cette sélection d'images et de vidéos capturant l'ambiance unique de l'événement.</p>
            
                <div className="album-2022-carousel">

        <Carousel autoPlayDelay={3000} loop={true} showNavigation={true} showPagination={false}>
            {albums["2023"].map((url, i) => (
            <img
                key={i}
                src={url}
                alt={`Photo ${i + 1}`}
            />
            ))}
        </Carousel>
                </div>
            </div>
        </main>
    )
}
export default Album2023