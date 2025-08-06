import Card from '../components/Card'
import { supabase } from '../client.js'
import { useState, useEffect } from 'react'
import './ShowCreators.css'
import NavBar from '../components/NavBar.jsx'
import Header from '../components/Header.jsx'

function ShowCreators() {
    const [creators, setCreators] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreators = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select();

            if (error) {
                console.error('Error: ', error);
            } else {
                console.log('Data: ', data);
                setCreators(data);
            }

            setLoading(false);
        }

        fetchCreators();
    }, [])

    if (loading) {
        return (
            <div className="loading">
                loading...
            </div>
        )
    }
        
    return (
        <div className="ShowCreators flex-start-center-column">
            <NavBar />
            <Header />
            { creators.length > 0 ? 
                (
                    <div className="card-container grid flex-start-center-column">
                        {creators.map((creator) => {
                            return(
                                <Card
                                    key={creator.id}
                                    id={creator.id}
                                    user_img_url={creator.imageURL}
                                    username={creator.name}
                                    social_platforms={creator.url}
                                    description={creator.description}
                                />
                            )
                        })}
                    </div>
                ):(
                    <p>No Creators</p>
                )
            }
        </div>
    )
}

export default ShowCreators;
