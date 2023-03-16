import { useNavigate, Link } from 'react-router-dom';
import './header.scss'


export function Header(){
    const firstname = localStorage.getItem('firstname');

    const logout = () => {
        localStorage.clear();
    }
return(
    <header>
        <div>
            <p>Bienvenue : {firstname}</p>
            <Link onClick={logout} to='/'>Déconnexion</Link>
        </div>
    </header>
)
}