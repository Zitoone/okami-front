import Header from '../components/Header'
import Footer from '../components/Footer'
import Collapse from "../components/Collapse"

const Informations: React.FC=()=>{
    return (
        <>
        <Header />
        <main className="info-page">
            <div className="main-wrap">
                <h1>Informations pratiques</h1>
                <p>Retrouve ici toutes les infos nécessaires pour tout savoir sur l'Okami Festival. Des détails sur la réservation des billets aux activités spéciales pour les enfants, en passant par comment devenir bénévole. Si tu ne trouves pas la réponse à ta question, écris-nous, nous sommes là pour t'aider!</p>
            <section id="general-info">
                <img src="/panneaux.webp" alt="Panneaux de signalisation du festival" loading="lazy" />
                <span>
                    <h2>Infos générales</h2>
                    <p>La 5ème édition du festival OKAMI aura lieu du  3 au  7 JUIN 2026 à Saint Christaud en Haute Garonne (31)</p>
                    <p>L'accès au site sera possible à partir du Mercredi 14h jusqu'au Dimanche minuit.</p>
                </span>
            </section>

            <section id="faq">
                <h2>Questions fréquentes</h2>
                <Collapse title={"Quels types de billets sont disponibles ?"}>
                <h4>🎟️ Tarifs des Pass 🎟️</h4>
<p>Les prix des pass varient en fonction des phases de vente et du nombre de jours choisis. Découvrez ci-dessous les différentes options pour vivre pleinement l'expérience Okami Festival !</p>
<strong>Pass 5 jours :</strong> 
<ul>
    <li>Phase 1 : 110€ - Epuisée</li>
    <li>Phase 2 : 135€ </li>
    <li>Phase 3 : 155€ </li>
</ul>
<strong>Pass 5 jours ENFANT moins de 15 ans :</strong>
<ul>
    <li>30€</li>
</ul>
<p>Pour une immersion totale dans l’univers d’Okami, seuls les pass 5 jours sont disponibles à la vente.
Des pass journaliers seront proposés sur place uniquement si la jauge le permet.</p>
<p>💡 Les places sont limitées, alors ne tardez pas à réserver votre pass pour vivre un moment inoubliable !</p>
                </Collapse>

                <Collapse title={"Où revendre son PASS si, malheureusement, un imprévu vous empêche de venir ?"}>
                <p>🎟️ Si vous ne pouvez pas venir… vous allez nous manquer ! 🥹</p>
<p>Mais pas de panique, vous pouvez revendre votre PASS en toute simplicité via notre plateforme officielle de revente sécurisée : <a href="https://www.ticketswap.fr" target="_blank" rel="noopener noreferrer" aria-label="Revendre votre pass sur TicketSwap">TicketSwap</a> !</p>
<p>💡 Acheteurs, soyez vigilants !
Les fraudeurs peuvent parfois se cacher, alors en cas de doute, contactez toujours l’équipe d’Okami Festival via notre site dans la rubrique "Nous contacter". Nous sommes là pour vous garantir une expérience sans soucis et vous protéger des mauvaises surprises.</p>

                
                </Collapse>

                <Collapse title={"Comment se rendre sur le site du festival"}>
                <p>Pour vous rendre sur le site, entrez l’adresse suivante dans votre GPS :<br />316 chemin de la Piche, 31310 Saint-Christaud.<br/></p>
<p>⚠️ Petite précision : Google Maps peut parfois être un peu capricieux, donc on vous recommande de privilégier Waze pour une navigation plus précise !</p>
<p>🚉 En transport en commun :
La gare de Cazères se trouve à seulement 10 minutes en voiture du festival.</p>
<p>🤝 Covoiturage, c’est plus fun et plus économique !
N’oubliez pas de rejoindre notre groupe Okami Family sur Facebook pour partager vos annonces de covoiturage et voyager ensemble dans la bonne humeur ! 🌿</p>
                </Collapse>

                <Collapse title={"Est ce que les chiens sont autorisés ?"}>
                <p>🐾 Les chiens ne sont autorisés ni sur le site du festival, ni sur le parking/camping pour des raisons de sécurité et de confort pour tous les participants. Nous vous remercions de votre compréhension et vous encourageons à planifier en conséquence pour assurer une expérience agréable à tous! 🌿</p>
                </Collapse>

                <Collapse title={"Comment consommer dans le festival ?"}>
                <p>Envie d’un café au lever du soleil, d’un jus frais après une séance de yoga, d’un bon repas ou d’un verre au bar à la tombée du jour ?
Nos espaces food & drinks sont là pour vous régaler tout au long du festival 🌞🌙
Ces espaces sont bien entendu payants.</p>
                <p>💳 Pour faciliter vos achats sur le festival, nous utilisons un système de paiement cashless. Voici comment ça marche :</p>
<ul>
    <li>Avant le festival, vous pouvez recharger votre bracelet cashless en ligne via notre plateforme sécurisée.</li>
    <li>Sur place, vous pourrez également recharger votre bracelet aux points de recharge situés à différents endroits du site.</li>
    <li>Utilisez simplement votre bracelet pour effectuer vos achats aux bars et stands de restauration.</li>
</ul>
<p>💡 Astuce : N’oubliez pas de vérifier le solde de votre bracelet régulièrement pour profiter pleinement de l’expérience Okami Festival sans interruption !</p>
                </Collapse>

                <Collapse title={"Quelles commodités sont mise à disposition pour assurer un maximum de confort pour les festivaliers?"}>
                <p>Pour garantir une expérience agréable à tous nos festivaliers, nous mettons à votre disposition plusieurs commodités essentielles :</p>
<ul>
    <li>🚻 Toilettes sèches et douches sont installés à divers endroits du site pour votre confort.</li>
    <li>♻️ Points de recyclage et poubelles : Nous encourageons le tri des déchets avec des points de recyclage clairement indiqués sur le site.</li>
    <li>🗑️ Poubelles : Des poubelles sont disposées stratégiquement pour maintenir la propreté du festival.</li>
    <li>💧 Points d'eau potable : Des fontaines à eau sont disponibles pour vous hydrater tout au long de la journée.</li>
 </ul>   
    <p>Nous vous invitons à respecter ces installations et à contribuer à la préservation de notre environnement pendant le festival. Ensemble, faisons de l’Okami Festival un événement éco-responsable et agréable pour tous ! 🌿</p>
    <p>⛺️ Camping & Parking : Un grand champ de 6 hectares est mis à disposition pour le stationnement et le camping, que vous veniez en tente, van, camping-car ou autre véhicule.
🌀 L’espace est organisé par zones pour plus de confort :</p>
        <ul>
            <li>Familles avec enfants 👨‍👩‍👧‍👦</li>
            <li>Festivaliers couche-tard 🎶</li>
            <li>Personnes accompagnées de leurs chiens 🐕 (les chiens doivent impérativement être tenus en laisse et sont autorisés uniquement dans la zone parking — merci pour votre responsabilité 🙏)</li>
        </ul>
        <p>☀️ Petits conseils pour un séjour au top:
Que vous soyez en tente ou en véhicule, pensez à aménager un coin ombragé et confortable. 
🌿 Emportez de l’eau, de quoi vous hydrater, vous protéger du soleil et de la pluie. Pensez à apporter des bouchons d’oreilles pour une nuit paisible et tout ce qui rendra votre expérience encore plus agréable.
On vous invite à être autonomes, on s’occupe du reste avec tout notre ❤️</p>
                </Collapse>

                <Collapse title={"Vous êtes une personne en situation de handicap ?"}>
                <p>Parce que l’inclusion fait partie de nos valeurs, nous avons mis en place plusieurs dispositifs pour faciliter l’accueil des personnes en situation de handicap.</p>
                <p>✅ Douches et toilettes sèches adaptées PMR sont disponibles sur le site.</p>
                <p>✅ L’accès aux scènes est possible en fauteuil roulant. À noter : le site s'étend sur deux niveaux, et la montée peut nécessiter l’aide d’un accompagnant pour plus de confort.</p>
                <p>✅ Un espace réservé est prévu à l’entrée des parkings et campings, afin de simplifier l’accès au festival.</p>
                <p>🎟️ Les PASS sont offerts aux accompagnants sur présentation d’un justificatif.</p>
                <p>📩 Pour toute question ou besoin spécifique, vous pouvez contacter Angèle au 06 23 63 96 16.</p>
                </Collapse>

                <Collapse title={"Quels types d’activités sont proposées dans la Kid’s zone ?"}>
                <p>🎨 Bienvenue à la Kid's Zone 🌈
L’endroit rêvé pour éveiller la curiosité et la créativité des enfants dès 3 ans !</p>
<p>Ici, les petits peuvent s’amuser et apprendre à travers des ateliers initiatiques : jeux sensoriels, activités créatives, découvertes éducatives et jeux collectifs — tout est pensé pour stimuler leur imagination et leur esprit d’équipe.</p>
<p>🎭 Des spectacles enchanteurs leur seront également proposés, spécialement conçus pour nourrir leur épanouissement et leur émerveillement.</p>
<p>✨ Le tout sera animé par des intervenants passionnés qui sauront transmettre leur enthousiasme et leur savoir-faire avec bienveillance.</p>
<p>Une expérience ludique, joyeuse et enrichissante pour nos jeunes festivaliers, où chaque moment est une invitation à grandir et à s’amuser !</p>
                </Collapse>

            </section>


            </div>
        </main>
        <Footer />
        </>
    )
}
export default Informations
