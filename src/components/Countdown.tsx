import { useState, useEffect } from 'react'

type TimeLeft = {
    days: number
    hours: number
    minutes: number
    seconds: number
} | null

type CountdownProps = {
    targetDate: string
}

const Countdown = ({ targetDate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(null)

    useEffect(() => {
        const interval = setInterval(() => { //exécute une fonction chaque seconde pour recalculer le temps restant.
        const now = new Date().getTime()
        const distance = new Date(targetDate).getTime() - now //Différence etre le le temps actuel et la date clible

        if (distance < 0) { //Si cette différence est terminée, on met tout a 0
            clearInterval(interval)
            setTimeLeft(null)
            return
        }

        setTimeLeft({ //Si la date n'est pas dépassé on convertit en jour, heure, min et sec
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
    }, 1000)

    return () => clearInterval(interval) //Fonction pour arrêter le minuteur
    }, [targetDate])

    if (!timeLeft) return <div>OKAMI : C'est parti ! 🎉</div>

    return (
        <div className='countdown'>
        {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    )
}

export default Countdown
