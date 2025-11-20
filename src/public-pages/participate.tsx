import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from "../components/Button"
import { useTranslation } from "react-i18next"

const Participate: React.FC=()=>{
    const { t } = useTranslation()
    return (
        <>
        <Header />
        <main className="participate-page">
            <div className="main-wrap">
                <h1>Participer</h1>
                <p>Rejoignez l’aventure et apportez votre énergie au festival! Bénévoles, exposants, performers ou intervenants… chacun a sa place pour créer des moments inoubliables.</p>

                <section id="volonteers">                    
                    <div>
                        <img src="/benevole.webp" alt="Photo love d'un bénévole" loading="lazy" /> 
                        <span>
                        <h2>Bénévoles</h2>
                        <p>Envie de vivre le festival de l’intérieur? Devenez bénévole et contribuez à faire de cet événement un succès. Que vous soyez passionné par la logistique, l’accueil, la communication ou l’animation, nous avons besoin de vous! En échange de votre temps et de votre énergie, vous bénéficierez d’un accès privilégié au festival, d’une expérience enrichissante et de rencontres inoubliables. Rejoignez notre équipe de bénévoles et faites partie de cette aventure collective!</p>
                        <p className="float-text">Les candidatures seront ouvertes dès début Janvier 2026! Un formulaire d'inscription sera disponible ici!</p> 
                        <Button to="/" className="btn">Formulaire d'inscription</Button>
</span>
                </div>
                </section>

                <section id="market">
                    <div>
                        <span>
                            <h2>Artisans exposants</h2>
                            <p>Nous accueillons uniquement des artisans et créateurs passionnés. C’est l’occasion de présenter vos œuvres, vos créations uniques et de rencontrer un public curieux et enthousiaste. Rejoignez-nous pour partager votre savoir-faire et faire vivre l’univers du festival à travers vos talents.</p>
                            <p className="float-text">Pour postuler (avant Janvier 2026) c'est par ici <br />👉 stand@okamifestival.com<br /></p>
                            <p>La nourriture ? On gère tout !
                                Pour l’instant, nous ne prenons pas de food trucks ... mais qui sait, peut-être un jour on se laissera tenter !</p>
                        </span>
                        <img src="/ombrelles.webp" alt="Photo d'un stand" loading="lazy" />
                    </div>
                </section>

                <section id="tickets">
                    <p>Envie de vivre l’expérience à fond ? Prends ton ticket et plonge dans 5 jours de pure magie avec ta tribu ✨
Ton énergie et ton soutien font battre le cœur du festival. Alors, qu’est-ce que t’attends ? 💫</p>
                        <Button href="https://tinyurl.com/mrz6jv8v" className="btn buyTickets">
        {t("btnTickets")}
      </Button>
                </section>

            </div>
        </main>
        <Footer />
        </>
    )
}
export default Participate