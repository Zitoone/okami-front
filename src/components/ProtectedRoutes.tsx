//Garde route pour protéger les routes admin, sinon redirige vers la page login

import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('authToken')
    return token ? <>{children}</> : <Navigate to="/login" />
}
