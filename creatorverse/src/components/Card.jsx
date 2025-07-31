function Cards( { user_img_url, username, social_platforms, description} ) {
    const mediaLogos = {
        YouTube: '/yt_icon_red_digital.png', 
        Instagram: '/Instagram_Glyph_Gradient.png',
        TikTok: '/TikTok_Icon_Black_Square.png',
        X: '/x-logo-black.png'
    }

    const userImg = {
        backgroundImage: `url(${user_img_url})`
    }

    return (
        <div className="Cards" style={userImg}>
            <div className="username-edit-container">
                <p>{username}</p>
                <button>
                    <img src="/edit-black.png" alt="icon"/>
                </button>
            </div>

            <div className="social-media-container"> 
                {social_platforms && (
                    Object.entries(social_platforms).map(([key, val]) => {
                        if (!val) return null;
                        
                        return (
                            <div className="social" key={key}>
                                <a href={val} target="_blank">
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
    )
}

export default Cards;
