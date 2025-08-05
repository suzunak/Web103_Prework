import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();

    return (
        <div className="Header">
            <div className="image-wrapper">
                <img src="/political-clipart.jpg" alt="political-clipart" />
                <button className="overlay-add-creator-button" onClick={() => navigate('/add-creator')}>Add Creator</button>
            </div>
        </div>
    )
}

export default Header;
