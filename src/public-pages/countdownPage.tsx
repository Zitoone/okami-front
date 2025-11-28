import Countdown from "../components/Countdown"
import FormHeader from "../components/FormHeader"
const CountdownPage: React.FC=()=>{
    return(
        <main className="countdown-page">
            
            <FormHeader />

            <div className="main-wrap">
                <p>Merci, on se retrouve bientôt...</p>
                <Countdown targetDate="2026-06-03T14:30:00" />
            </div>



        </main>
    )
}

export default CountdownPage