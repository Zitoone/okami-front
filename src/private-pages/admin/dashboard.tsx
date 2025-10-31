import Button from "../../components/Button"
import { AdminHeader } from "../../components/AdminHeader"

const Dashboard: React.FC = () =>{
    return(
        <>
        <AdminHeader />
        <main className="dashboard-page">
            <div className="main-wrap">
                <h1>Bienvenue sur le tableau de bord administrateur</h1>

                <div>
                    <Button type="button" className="btn" to="/admin/artists"> Artistes </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Bénévoles </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Stands </Button>
                    <Button type="button" className="btn" to="/admin/artist"> PMR </Button>
                    <Button type="button" className="btn" to="/admin/artist"> Prestataires </Button>
                </div>

            </div>
        </main>
        </>
    )

}
export default Dashboard