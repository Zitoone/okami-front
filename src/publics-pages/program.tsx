import Card from '../components/Card'


const Program: React.FC=()=>{
    return(
        <main className="program-page">
            <div className="main-wrap">
                <h1>Programme 2026</h1>
                <p>Entrez dans l’univers de l’Okami Festival, là où chaque journée est une invitation à l’émerveillement. Laissez-vous surprendre par des spectacles qui jouent avec vos sens, des ateliers où l’on crée, rit et découvre, et des performances circassiennes qui défient l’imagination. Deux scènes battent au rythme des concerts et des DJ sets, pour faire vibrer vos pas et vos cœurs jusqu’au petit matin. Entre exploration musicale et moments de détente dans notre village healing, chaque instant est une aventure unique. Ici, la musique, la magie et le partage se rencontrent pour vous offrir bien plus qu’un festival… une véritable expérience à vivre intensément.</p>
                <div className='program-cards'>
                    <Card url={'/program/music'} title="Musiciens & DJs" image='/DJs.jpg' className='program-card' />
                    <Card url={'/program/healing'} title="Healing zone" className='program-card' image='/healing2.jpg'/>
                    <Card url={'/program/shows'} title="Performers & spectacles" className='program-card' image='performer.jpg' /> 
                    <Card url={'/program/kidzone'} title="Kidzone" className='program-card' image='kid2024.jpg'/>
                    <Card url={'/program/activities'} title="Ateliers & activités" className='program-card' image='activite.jpg' />
                </div>
            </div>
    </main>
    )
}
export default Program