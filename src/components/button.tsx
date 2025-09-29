import { useNavigate } from 'react-router-dom'
import type { FC, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  to?: string           // route interne
  href?: string         // lien externe
  type?: 'button' | 'submit' | 'reset'
  className?: string    // optionnel, pour ajouter des classes CSS
  onClick?: (e:React.MouseEvent<HTMLButtonElement>)=> void
}

const Button: FC<ButtonProps> = ({
  children,
  to,
  href,
  type = 'button',
  className = '',
  onClick
}) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (to) {
      navigate(to)
    } else if (href) {
      window.open(href, '_blank') // ouvre le lien externe dans un nouvel onglet
    }

    if (onClick) onClick(e)
}

  return (
    <button type={type} onClick={type === "button" ? handleClick : undefined} className={className}>
      {children}
    </button>
  )
}

export default Button
