import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useTranslation } from 'react-i18next'

const Program: React.FC=()=>{
    const { t } = useTranslation()
    
    return(
        <>
        <Header />
        <main className="program-page">
            <div className="main-wrap">
                <h1>{t('program.title')}</h1>
                <p>{t('program.description')}</p>
                <div className='program-cards'>
                    <Card url={'/program/music'} title={t('program.music')} image='/DJs.webp' className='program-card' />
                    <Card url={'/program/healing'} title={t('program.healing')} className='program-card' image='/healing2.webp'/>
                    <Card url={'/program/shows'} title={t('program.shows')} className='program-card' image='performer.webp' /> 
                    <Card url={'/program/kidzone'} title={t('program.kidzone')} className='program-card' image='kid2024.webp'/>
                    <Card url={'/program/activities'} title={t('program.activities')} className='program-card' image='activite.webp' />
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}
export default Program
