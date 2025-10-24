import Card from "../components/Card"


const Souvenirs: React.FC=()=>{
    return (
        <main className="souvenirs-page">
            <div className="main-wrap">
                <h1>Souvenirs des éditions passées</h1>
                <p>Depuis 2022, des images et vidéos vous racontent l’histoire de chaque édition. Plongez dans l’ambiance et revivez les moments forts du festival !</p>
            
                <div className="editions-cards">
                    <Card 
                        url={"/album2022"} 
                        title="2022" 
                        image="/DJs2.jpg"
                        className="souvenir-card"
                    ></Card>                   

                    <Card 
                        url={"/album2023"} 
                        title="2023" 
                        image="/couv2023.jpg"
                        className="souvenir-card"
                    ></Card>

                    <Card 
                        url={""} 
                        title="2024" 
                        image="/love2024.jpeg"
                        className="souvenir-card"
                        
                    ></Card>

                    <Card 
                        url={""} 
                        title="2025" 
                        image="/doma.jpg"
                        className="souvenir-card"
                    ></Card>




                </div>
            </div>
        </main>
    )
}
export default Souvenirs