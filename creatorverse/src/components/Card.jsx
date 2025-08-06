import "./Card.css"
import { useNavigate } from 'react-router-dom'

function Card( { id, user_img_url, username, social_platforms, description } ) {    
    const mediaLogos = {
        YouTube: '/yt_icon_red_digital.png', 
        Instagram: '/Instagram_Glyph_Gradient.png',
        TikTok: '/TikTok_Icon_Black_Square.png',
        X: '/x-logo-black.png'
    }

    const userImg = {
        backgroundImage: `url(${user_img_url})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    console.log('Showing cards')

    const navigate = useNavigate();

    const handleViewCreator = () => {
        navigate(`view-creator/${id}`);
    }

    const handleEditCreator = () => {
        navigate(`edit-creator/${id}`)
    }

    return (
        <div className="Cards flex-end-column" style={userImg}>
            <div className="card-details-container">
                <div className="username-edit-container flex-start-row">
                    <p className="username">{username}</p>
                    <div className="info-edit-container">
                        <button className="info-button flex-center-column" onClick={handleViewCreator}>
                            <img src="/info-black.png" alt="info-icon"/>
                        </button>
                        <button className="edit-button flex-center-column" onClick={handleEditCreator}>
                            <img src="/edit-black.png" alt="edit-icon"/>
                        </button>
                    </div>
                </div>

                <div className="social-media-container flex-center-space-even-row"> 
                    {social_platforms && (
                        Object.entries(social_platforms).map(([key, val]) => {
                            if (!val) return null;
                            
                            return (
                                <div className="social" key={key}>
                                    <a 
                                        href={val.startsWith("http") ? val : `https://${val}`}
                                        target="_blank"
                                    > 
                                        <img className="media-logo" alt={`${key}-logo`} src={mediaLogos[key]} />
                                    </a>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="description-container">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
