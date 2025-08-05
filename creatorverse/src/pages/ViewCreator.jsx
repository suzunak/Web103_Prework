import { supabase } from '../client.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ViewCreator.css'
import Delete from '../components/Delete.jsx'
import Edit from '../components/Edit.jsx'
import NavBar from '../components/NavBar.jsx'

function ViewCreator() {
    let params = useParams();
    const creatorId = params.id;

    console.log('creatorId: ', creatorId)

    const [creator, setCreator] = useState();
    const [loading, setLoading] = useState(true)

    const mediaLogos = {
        YouTube: '/yt_icon_red_digital.png', 
        Instagram: '/Instagram_Glyph_Gradient.png',
        TikTok: '/TikTok_Icon_Black_Square.png',
        X: '/x-logo-black.png'
    }

    const [creatorMedias, setCreatorMedias] = useState({
        YouTube: "",
        Instagram: "",
        TikTok: "",
        X: ""
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', creatorId)
                .single()

            if (error) {
                console.error('Error', error)
            } else {
                setCreator(data);
                console.log(data);

                const updatedMedias = {};

                Object.entries(data.url).forEach(([key, val]) => {
                    if (!val) return null;

                    const match = val.match(/\/([^\/]+)\/?$/);
                    const username = match ? match[1] : "";

                    if (username) {
                        if (username.startsWith('@')) {
                            updatedMedias[key] = username;
                        } else {
                            updatedMedias[key] = '@' + username;
                        }
                    };
                });

                setCreatorMedias((prev) => ({
                    ...prev,
                    ...updatedMedias
                }));
            }

            setLoading(false);
        }

        fetchCreator();
    }, []);

    if (loading) {
        return(
            <p>loading</p>
        )
    };

    return (
        <div className="ViewCreator flex-start-center-column">
            <NavBar />
            {
                creator ? 
                    (
                        <>
                        <div className="creator-container flex-center-row">
                            <div className="creator-img-container">
                                <img src={creator.imageURL} alt="creator" />
                            </div>

                            <div className="creator-details-container">
                                <h1 className="">{creator.name}</h1>

                                <p className="lucida-sans-geneva-verdana-sans-serif">{creator.description}</p>

                                <div className="social-medias flex-even-column">
                                    {
                                        Object.entries(creator.url).map(([key, val]) => {
                                            if (!val) return null;

                                            return (
                                                <div className="platform" key={key}>
                                                    <a 
                                                        href={val.startsWith("http") ? val : `https://${val}`}
                                                        target="_blank"
                                                    > 
                                                        <img className="each-media-logo" alt={`${key}-logo`} src={mediaLogos[key]} />
                                                        <p>{creatorMedias[key]}</p>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="edit-delete-container flex-center-row">
                            <Edit
                                id={creatorId}
                            />
                            <Delete 
                                id={creatorId}
                            />
                        </div>
                        </>
                    ):(
                        <p>something went wrong - send to 404 page</p>
                    )
            }
        </div>
    )
}

export default ViewCreator;
