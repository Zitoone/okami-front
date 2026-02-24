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
                <h1>{t('participate.title')}</h1>
                <p>{t('participate.intro')}</p>

                <section id="volonteers">                    
                    <div>
                        <img src="/benevole.webp" alt="Photo love d'un bénévole" loading="lazy" /> 
                        <span>
                        <h2>{t('participate.volunteers.title')}</h2>
                        <p>{t('participate.volunteers.description')}</p>
                        <p className="float-text">{t('participate.volunteers.openingSoon')}</p> 
                        <Button to="/" className="btn">{t('participate.volunteers.formBtn')}</Button>
</span>
                </div>
                </section>

                <section id="market">
                    <div>
                        <span>
                            <h2>{t('participate.market.title')}</h2>
                            <p>{t('participate.market.description')}</p>
                            <p className="float-text">{t('participate.market.apply')} <br />👉 {t('participate.market.email')}<br /></p>
                            <p>{t('participate.market.food')}</p>
                        </span>
                        <img src="/ombrelles.webp" alt="Photo d'un stand" loading="lazy" />
                    </div>
                </section>

                <section id="tickets">
                    <p>{t('participate.tickets.description')}</p>
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
