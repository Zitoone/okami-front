import { useNavigate } from 'react-router-dom'
import type { FC, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  to?: string           // route interne
  href?: string         // lien externe
  type?: 'button' | 'submit' | 'reset'
  className?: string    // optionnel, pour ajouter des classes CSS
}

const Button: FC<ButtonProps> = ({
  children,
  to,
  href,
  type = 'button',
  className = '',
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else if (href) {
      window.open(href, '_blank') // ouvre le lien externe dans un nouvel onglet
    }
    }

  return (
    <button type={type} onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

export default Button
