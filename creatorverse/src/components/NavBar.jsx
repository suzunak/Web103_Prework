import { useNavigate } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="NavBar flex-start-center-row">
            <button id="home-button" onClick={() => navigate('/')}>Home</button>
        </div>
    )
}

export default NavBar;
