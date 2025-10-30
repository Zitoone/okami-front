import { useNavigate } from 'react-router-dom'

export const AdminHeader = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <div className="admin-header-layout">
        <header className="admin-header">
            <div className="logo" onClick={() => navigate('/dashboard')}>OKAMI Manager</div>
            <button onClick={handleLogout} className="btn btn-secondary">Déconnexion</button>
        </header>
        <main className="admin-main">{children}</main>
        </div>
    );
};
