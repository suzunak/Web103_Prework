import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditCreator.css'

function EditCreator() {
    const params = useParams();
    const creatorId = params.id

    const [creatorData, setCreatorData] = useState();

    useEffect(() => {
        const fetchCreator = async () => {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('id', creatorId)
                .single()

            if (error) {
                console.error('Error: ', error);
            } else {
                console.log('Creator: ', data);
                setCreatorData({
                    name: data.name || "",
                    url: {
                        YouTube: data.url.YouTube || "",
                        Instagram: data.url.Instagram || "",
                        TikTok: data.url.TikTok || "",
                        X: data.url.X || ""
                    },
                    description: data.description || "",
                    imageURL: data.imageURL || ""
                });
            }
        }

        fetchCreator();
    }, [creatorId]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('updating creator')

        const { error } = await supabase 
            .from('creators')
            .update(creatorData)
            .eq('id', creatorId);

        if (error) {
            console.error('Error: ', error)
        } else {
            console.log('Creator submitted!');
            navigate(`/view-creator/${creatorId}`)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { dataset, name, value } = e.target; // dataset = data-*
        console.log(name, value)

        if (dataset.id === 'url') {
            console.log(dataset.id)
            setCreatorData((prev) => ({
                ...prev,
                [dataset.id]: {
                    ...prev[dataset.id],
                    [name]: value 
                }
            }));
        } else {
            setCreatorData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="EditCreator flex-start-center-column">
            <h1 className="flex-center-row">Edit a Creator Card!</h1>
            {
                creatorData ? 
                    (
                        <form onSubmit={handleSubmit} id="edit-form" className="edit-creator-form">

                            <div className="name flex-start-column">
                                <label htmlFor="name">Creator's Name</label>
                                <input
                                id="name"
                                name="name"
                                value={creatorData.name}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input creator's name"
                                required
                                />
                            </div>

                            <div className="description flex-start-column">
                                <label htmlFor="description">Creator Description</label>
                                <textarea
                                id="description"
                                name="description"
                                value={creatorData.description}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input description"
                                required
                                />
                            </div>

                            <div className="imgURL flex-start-column">
                                <label htmlFor="imageURL">Image URL</label>
                                <input
                                id="imageURL"
                                name="imageURL"
                                value={creatorData.imageURL}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input image URL"
                                required
                                />
                            </div>

                            <div className="url-YouTube flex-start-column">
                                <h2>Social Media Platforms</h2>
                                <label htmlFor="url-YouTube">YouTube</label>
                                <input
                                id="url-YouTube"
                                data-id="url"
                                name="YouTube"
                                value={creatorData.url.YouTube}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input YouTube URL"
                                required
                                />
                            </div>

                            <div className="url-Instagram flex-start-column">
                                <label htmlFor="url-Instagram">Instagram</label>
                                <input
                                id="url-Instagram"
                                data-id="url"
                                name="Instagram"
                                value={creatorData.url.Instagram}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input Instagram URL"
                                required
                                />
                            </div>

                            <div className="flex-start-column">
                                <label htmlFor="url-TikTok">TikTok</label>
                                <input
                                id="url-TikTok"
                                data-id="url"
                                name="TikTok"
                                value={creatorData.url.TikTok}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input TikTok URL"
                                required
                                />
                            </div>

                            <div className="flex-start-column">
                                <label htmlFor="url-X">X</label>
                                <input
                                id="url-X"
                                data-id="url"
                                name="X"
                                value={creatorData.url.X}
                                onChange={handleChange}
                                className="input-margin"
                                placeholder="Input X URL"
                                required
                                />
                            </div>
                        </form>

                    ):(
                        <p>loading</p>
                    )
            }

            <div className="cancel-save-buttons flex-center-row">
                <button type="button" className="edit-form-cancel" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="edit-form-save" form="edit-form">Save</button>
            </div>
        </div>
    ) 
}

export default EditCreator;
