import { useState } from "react"
import albums from "../data/albums.json"
import Button from "../components/Button"

const Album2024: React.FC = () => {
    const images = albums["okami_2024"]
    const [visibleCount, setVisibleCount] = useState(100)

    const loadMore = () => {
    setVisibleCount((prev) => prev + 52)
    }

    return(
        <main className="album-page">
            <div className="main-wrap">
                <h1>Souvenirs de l'édition 2024</h1>
                <p>Celle ci sera notre dernière édition à Castelnau, marquée par des violentes pluies à nouveau...</p>
            </div>

    <div className="album">
        {images.slice(0, visibleCount).map((url, i) => (
        <img key={i} 
            src={url} 
            alt={`Photo ${i + 1}`}
            loading="lazy" />
        ))}
    </div>
        {visibleCount < images.length && (
            <div className="load-more">
            <   Button onClick={loadMore} className="form-btn btn">Voir plus</>
            </div>
        )}

        </main>
    )
}

export default Album2024