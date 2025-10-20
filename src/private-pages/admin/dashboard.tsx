// Cette page mènera aux différentes routes selon le type dintervenants à l'aide de boutons
import Button from "../../components/Button"

const Dashboard: React.FC = () =>{
/* const token = localStorage.getItem('authToken') */
    return(
        <main className="dashboard-page">
            <div className="main-wrap">
                <h1>Bienvenue sur le tableau de bord administrateur</h1>

                <div>
                    <Button type="button" className="btn" to="/admin/artists"> Artistes </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Bénévoles </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Stands </Button>
                    <Button type="button" className="btn" to="/admin/artist"> PSH </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Prestataires </Button>
                </div>

            </div>
        </main>
    )

}
export default Dashboard

//TODO: Mettre en place Zustand pour green IT et limité les appels API
//TODO: Faire système de déconnexion