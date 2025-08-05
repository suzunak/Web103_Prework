import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './AddCreator.css'
import NavBar from '../components/NavBar.jsx'

function AddCreator() {
    const navigate = useNavigate();

    const [addCreator, setAddCreator] = useState({
        name: "",
        url: {
            YouTube: "",
            Instagram: "",
            TikTok: "",
            X: ""
        },
        imageURL: "",
        description: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('updating creator')

        const { error } = await supabase 
            .from('creators')
            .insert(addCreator)

        if (error) {
            console.error('Error: ', error)
        } else {
            console.log('Creator submitted!');
            navigate(`/`)
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { dataset, name, value } = e.target; // dataset = data-*
        console.log(name, value)

        if (dataset.id === 'url') {
            console.log(dataset.id)
            setAddCreator((prev) => ({
                ...prev,
                [dataset.id]: {
                    ...prev[dataset.id],
                    [name]: value 
                }
            }));
        } else {
            setAddCreator((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="AddCreator flex-start-center-column">
            <NavBar />
            <h1 className="flex-center-row">Add a Creator Card!</h1>
            <form onSubmit={handleSubmit} id="add-form" className="add-creator-form">

                <div className="name flex-start-column">
                    <label htmlFor="name">Creator's Name</label>
                    <input
                    id="name"
                    name="name"
                    value={addCreator.name}
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
                    value={addCreator.description}
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
                    value={addCreator.imageURL}
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
                    value={addCreator.url.YouTube}
                    onChange={handleChange}
                    className="input-margin"
                    placeholder="Input YouTube URL"
                    />
                </div>

                <div className="url-Instagram flex-start-column">
                    <label htmlFor="url-Instagram">Instagram</label>
                    <input
                    id="url-Instagram"
                    data-id="url"
                    name="Instagram"
                    value={addCreator.url.Instagram}
                    onChange={handleChange}
                    className="input-margin"
                    placeholder="Input Instagram URL"
                    />
                </div>

                <div className="flex-start-column">
                    <label htmlFor="url-TikTok">TikTok</label>
                    <input
                    id="url-TikTok"
                    data-id="url"
                    name="TikTok"
                    value={addCreator.url.TikTok}
                    onChange={handleChange}
                    className="input-margin"
                    placeholder="Input TikTok URL"
                    />
                </div>

                <div className="flex-start-column">
                    <label htmlFor="url-X">X</label>
                    <input
                    id="url-X"
                    data-id="url"
                    name="X"
                    value={addCreator.url.X}
                    onChange={handleChange}
                    className="input-margin"
                    placeholder="Input X URL"
                    />
                </div>
            </form>

            <div className="cancel-add-buttons flex-center-row">
                <button type="button" className="add-form-cancel" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="add-form-save" form="add-form">Add</button>
            </div>
        </div>
    )
}

export default AddCreator;
