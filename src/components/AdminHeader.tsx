import { useNavigate } from 'react-router-dom'

export const AdminHeader = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('isAdmin')
        navigate('/login')
    };

    return(
        <header className='admin-header'>
            <div className='container'>
                <div className="logo" onClick={() => navigate('/admin/dashboard')}>OKAMI Manager</div>
                <button onClick={handleLogout} className="btn btn-secondary">Déconnexion</button>
            </div>
        </header>
    )
}
