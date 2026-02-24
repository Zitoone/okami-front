import Header from '../components/Header'
import Footer from '../components/Footer'
import Collapse from "../components/Collapse"
import { useTranslation } from "react-i18next"

const Informations: React.FC=()=>{
    const { t } = useTranslation()
    return (
        <>
        <Header />
        <main className="info-page">
            <div className="main-wrap">
                <h1>{t('informations.title')}</h1>
                <p>{t('informations.intro')}</p>
            <section id="general-info">
                <img src="/panneaux.webp" alt="Panneaux de signalisation du festival" loading="lazy" />
                <span>
                    <h2>{t('informations.general.title')}</h2>
                    <p>{t('informations.general.edition')}</p>
                    <p>{t('informations.general.access')}</p>
                </span>
            </section>

            <section id="faq">
                <h2>{t('informations.faq.title')}</h2>
                <Collapse title={t('informations.faq.tickets.question')}>
                <h4>{t('informations.faq.tickets.title')}</h4>
<p>{t('informations.faq.tickets.intro')}</p>
<strong>{t('informations.faq.tickets.pass5days')}</strong> 
<ul>
    <li>{t('informations.faq.tickets.phase1')}</li>
    <li>{t('informations.faq.tickets.phase2')}</li>
    <li>{t('informations.faq.tickets.phase3')}</li>
</ul>
<strong>{t('informations.faq.tickets.passKids')}</strong>
<ul>
    <li>{t('informations.faq.tickets.kidsPrice')}</li>
</ul>
<p>{t('informations.faq.tickets.onlyPass5')}</p>
<p>{t('informations.faq.tickets.limited')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.resell.question')}>
                <p>{t('informations.faq.resell.intro')}</p>
<p>{t('informations.faq.resell.platform')} <a href="https://www.ticketswap.fr" target="_blank" rel="noopener noreferrer" aria-label="Revendre votre pass sur TicketSwap">TicketSwap</a> !</p>
<p>{t('informations.faq.resell.warning')}</p>

                
                </Collapse>

                <Collapse title={t('informations.faq.access.question')}>
                <p>{t('informations.faq.access.address')}<br/></p>
<p>{t('informations.faq.access.gps')}</p>
<p>{t('informations.faq.access.train')}</p>
<p>{t('informations.faq.access.carpool')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.dogs.question')}>
                <p>{t('informations.faq.dogs.answer')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.payment.question')}>
                <p>{t('informations.faq.payment.intro')}</p>
                <p>{t('informations.faq.payment.cashless')}</p>
<ul>
    <li>{t('informations.faq.payment.step1')}</li>
    <li>{t('informations.faq.payment.step2')}</li>
    <li>{t('informations.faq.payment.step3')}</li>
</ul>
<p>{t('informations.faq.payment.tip')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.facilities.question')}>
                <p>{t('informations.faq.facilities.intro')}</p>
<ul>
    <li>{t('informations.faq.facilities.toilets')}</li>
    <li>{t('informations.faq.facilities.recycling')}</li>
    <li>{t('informations.faq.facilities.bins')}</li>
    <li>{t('informations.faq.facilities.water')}</li>
 </ul>   
    <p>{t('informations.faq.facilities.eco')}</p>
    <p>{t('informations.faq.facilities.camping')}</p>
        <ul>
            <li>{t('informations.faq.facilities.families')}</li>
            <li>{t('informations.faq.facilities.lateNight')}</li>
            <li>{t('informations.faq.facilities.dogs')}</li>
        </ul>
        <p>{t('informations.faq.facilities.tips')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.accessibility.question')}>
                <p>{t('informations.faq.accessibility.intro')}</p>
                <p>{t('informations.faq.accessibility.pmr')}</p>
                <p>{t('informations.faq.accessibility.wheelchair')}</p>
                <p>{t('informations.faq.accessibility.parking')}</p>
                <p>{t('informations.faq.accessibility.freePass')}</p>
                <p>{t('informations.faq.accessibility.contact')}</p>
                </Collapse>

                <Collapse title={t('informations.faq.kidzone.question')}>
                <p>{t('informations.faq.kidzone.title')}</p>
<p>{t('informations.faq.kidzone.intro')}</p>
<p>{t('informations.faq.kidzone.activities')}</p>
<p>{t('informations.faq.kidzone.shows')}</p>
<p>{t('informations.faq.kidzone.team')}</p>
<p>{t('informations.faq.kidzone.conclusion')}</p>
                </Collapse>

            </section>


            </div>
        </main>
        <Footer />
        </>
    )
}
export default Informations
